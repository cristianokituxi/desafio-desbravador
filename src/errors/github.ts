export enum GitHubErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  FORBIDDEN = 'FORBIDDEN',
  TIMEOUT = 'TIMEOUT',
  NETWORK = 'NETWORK',
}

export interface GitHubError {
  code: GitHubErrorCode;
  /** Unix timestamp in milliseconds for rate limit reset */
  resetTime?: number;
}

const CODE_PATTERNS: Array<{
  test: (message: string) => boolean;
  code: GitHubErrorCode;
  extractReset?: (message: string) => number | undefined;
}> = [
  { test: (m) => m === 'NOT_FOUND', code: GitHubErrorCode.NOT_FOUND },
  {
    test: (m) => m.startsWith('RATE_LIMIT'),
    code: GitHubErrorCode.RATE_LIMIT,
    extractReset: (m) => {
      const iso = m.split('|')[1];
      return iso ? new Date(iso).getTime() : undefined;
    },
  },
  { test: (m) => m === 'FORBIDDEN', code: GitHubErrorCode.FORBIDDEN },
  { test: (m) => m === 'TIMEOUT', code: GitHubErrorCode.TIMEOUT },
  { test: (m) => m === 'NETWORK_ERROR', code: GitHubErrorCode.NETWORK },
];

const CODE_VALUES = new Set<string>(Object.values(GitHubErrorCode) as string[]);

function isGitHubError(value: unknown): value is GitHubError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    CODE_VALUES.has((value as GitHubError).code)
  );
}

/**
 * Convert a raw error thrown by githubService into a typed GitHubError.
 * Handles both GitHubError objects (thrown directly by the interceptor)
 * and legacy string-based Error messages.
 */
export function parseGitHubError(error: unknown): GitHubError {
  if (isGitHubError(error)) {
    return error;
  }

  if (error instanceof Error) {
    for (const pattern of CODE_PATTERNS) {
      if (pattern.test(error.message)) {
        return {
          code: pattern.code,
          resetTime: pattern.extractReset?.(error.message),
        };
      }
    }
  }

  return { code: GitHubErrorCode.NETWORK };
}

/** User-facing Portuguese messages for each error code. */
export function getErrorMessage(error: GitHubError): string {
  switch (error.code) {
    case GitHubErrorCode.NOT_FOUND:
      return 'Usuário não encontrado. Verifique o nome e tente novamente.';

    case GitHubErrorCode.RATE_LIMIT: {
      const resetDate = error.resetTime ? new Date(error.resetTime) : null;
      const resetLabel = resetDate
        ? `Volte às ${resetDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`
        : 'Aguarde um momento.';
      return `Limite de requisições da API excedido. ${resetLabel}`;
    }

    case GitHubErrorCode.FORBIDDEN:
      return 'Acesso negado. Você não tem permissão para acessar este recurso.';

    case GitHubErrorCode.TIMEOUT:
      return 'A requisição excedeu o tempo limite. Verifique sua conexão.';

    case GitHubErrorCode.NETWORK:
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
}
