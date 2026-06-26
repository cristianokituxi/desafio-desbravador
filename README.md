# 🐙 GitHub Explorer

[![CI](https://github.com/username/github-explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/username/github-explorer/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/tested%20with-Vitest-6E9F18?logo=vitest)](https://vitest.dev/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-FE5196?logo=conventionalcommits)](https://www.conventionalcommits.org/)

Aplicação client-side em React + TypeScript que consome a API pública do GitHub para pesquisar usuários e explorar seus repositórios. Design responsivo, dark mode, lazy loading, animações e cobertura de testes.

<p align="center">
  <img src="screenshots/home.png" alt="Tela inicial do GitHub Explorer" width="800" />
</p>

## 🚀 Funcionalidades

- 🔍 **Pesquisa de usuários** com debounce e busca instantânea (≥ 2 caracteres)
- 👤 **Perfil do usuário** com avatar, bio, localização, seguidores e mais
- ⭐ **Favoritar usuários** com persistência em localStorage
- 📊 **Estatísticas agregadas** — total de estrelas, linguagem principal, repo mais popular
- 📦 **Lista de repositórios** paginada (6 por página) com cards responsivos
- 🔎 **Pesquisa local** por nome/descrição + **filtro por linguagem**
- 📊 **Ordenação flexível** por estrelas, nome ou última atualização
- 📄 **Detalhes do repositório** com métricas completas (stars, forks, watchers, issues)
- 📋 **Copiar link** do repositório com um clique
- ↗️ **Compartilhar perfil** via Web Share API (mobile) ou clipboard
- 🌙 **Dark Mode** com persistência e detecção automática do sistema
- 📡 **Indicador de rate limit** da API GitHub no header (com barra de progresso)
- ⚡ **Lazy Loading** de páginas via `React.lazy` + `Suspense`
- 🦴 **Skeleton loading** com shimmer para UX fluida
- ✨ **Micro-animações** com Framer Motion (fade-in, stagger)
- 🛡️ **Error Boundary** para captura de erros de renderização
- 🔔 **Toast notifications** com auto-dismiss (4s)
- 💾 **Persistência** do último usuário pesquisado (localStorage)
- ♿ **Acessibilidade** — aria-labels, aria-hidden em emojis, navegação por teclado

## 🛠️ Stack

| Categoria    | Tecnologia                                 |
| ------------ | ------------------------------------------ |
| Framework    | React 19.2                                 |
| Linguagem    | TypeScript 6.0                             |
| Build        | Vite 8.1                                   |
| Roteamento   | React Router DOM v7 (data router)          |
| HTTP Client  | Axios 1.18 (com interceptors)              |
| UI Framework | Bootstrap 5.3                              |
| Estilização  | SCSS Modules                               |
| Animações    | Framer Motion                              |
| Testes       | Vitest 4.1 + React Testing Library + jsdom |
| Linting      | ESLint 9 + Oxlint + Prettier               |
| Git Hooks    | Husky 9 + lint-staged                      |
| Commits      | Commitlint (Conventional Commits)          |
| CI/CD        | GitHub Actions                             |

## 📦 Instalação

```bash
git clone https://github.com/username/github-explorer.git
cd github-explorer

# Requer Node.js 22+ (ver .nvmrc)
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

| Variável            | Descrição                                    | Padrão |
| ------------------- | -------------------------------------------- | ------ |
| `VITE_GITHUB_TOKEN` | Token de acesso pessoal do GitHub (opcional) | —      |

Sem token: **60 req/h**. Com token: **5000 req/h**.

## 🏃 Execução

```bash
npm run dev       # Servidor de desenvolvimento (http://localhost:5173)
npm run build     # Build de produção (tsc + vite)
npm run preview   # Preview local do build
```

## 🧪 Testes

```bash
npm test          # Executa todos os testes uma vez
npm run test:watch  # Modo watch
npm run test:coverage # Com relatório de cobertura
```

**59 testes** cobrindo utilities, hooks e componentes.

## 📜 Scripts

| Comando                 | Descrição                            |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Servidor de desenvolvimento          |
| `npm run build`         | TypeScript check + build de produção |
| `npm run preview`       | Preview do build                     |
| `npm test`              | Vitest run                           |
| `npm run test:watch`    | Vitest watch                         |
| `npm run test:coverage` | Vitest com coverage                  |
| `npm run lint`          | ESLint                               |
| `npm run lint:fix`      | ESLint auto-fix                      |
| `npm run format`        | Prettier                             |
| `npm run format:check`  | Prettier check                       |
| `npm run type-check`    | TypeScript --noEmit                  |

## 🔄 Pipeline CI/CD

O GitHub Actions executa em todo `push` e `pull request` para `main`:

```
push/PR → main
  │
  ├── quality    type-check, lint, format-check
  ├── test        vitest run (59 testes)
  └── build       vite build + upload artifact
```

Os hooks do Husky garantem qualidade local:

- **pre-commit**: lint-staged (prettier + eslint nos arquivos staged)
- **commit-msg**: commitlint (Conventional Commits)

## 📁 Estrutura do Projeto

```
src/
├── api/                     # Funções de chamada à API GitHub
│   └── github.ts
├── components/              # 11 componentes reutilizáveis
│   ├── Avatar/              # Avatar com lazy loading
│   ├── ErrorBoundary/       # Class component error boundary
│   ├── Header/              # Header + rate limit badge + theme toggle
│   ├── Layout/              # Layout raiz (Header + Outlet)
│   ├── Loading/             # Spinner + skeleton loaders (3 variantes)
│   ├── Pagination/          # Paginação com máximo 5 páginas visíveis
│   ├── RepositoryCard/      # Card de repositório (memo)
│   ├── SearchBar/           # Campo de busca com debounce
│   ├── Toast/               # Container de notificações toast
│   ├── UserCard/            # Card de perfil do usuário (memo)
│   └── UserStats/           # Estatísticas agregadas do usuário
├── context/                 # 3 contexts React
│   ├── RateLimitContext.tsx # Informações de rate limit da API
│   ├── ThemeContext.tsx      # Tema claro/escuro
│   └── ToastContext.tsx      # Gerenciamento de toasts
├── errors/                  # Tratamento centralizado de erros
│   └── github.ts            # GitHubErrorCode enum + parse/getMessage
├── hooks/                   # 5 custom hooks
│   ├── useDebounce.ts       # Debounce genérico
│   ├── useFavorites.ts      # Favoritar usuários (localStorage)
│   ├── useGithub.ts         # Lógica principal de busca
│   ├── useLocalStorage.ts   # Estado persistente em localStorage
│   └── ...                  # Tipagens e helpers
├── pages/                   # 3 páginas (lazy-loaded)
│   ├── Home/                # Busca + perfil + estatísticas + lista de repos
│   ├── RepositoryDetails/   # Detalhes do repositório
│   └── NotFound/            # Página 404
├── routes/                  # Configuração do React Router (data router)
│   └── index.tsx
├── services/                # Camada de serviços
│   ├── github.ts            # Cliente Axios + interceptors + token
│   └── rateLimitStore.ts    # Store pub/sub para rate limit
├── test/                    # Testes
│   ├── components/          # Testes de componentes (RTL)
│   ├── hooks/               # Testes de hooks (renderHook)
│   ├── services/            # Testes de services
│   ├── utils/               # Testes de utilitários
│   └── setup.ts             # Config do @testing-library/jest-dom
├── types/                   # Definições TypeScript
│   └── index.ts
├── utils/                   # Utilitários
│   ├── constants.ts         # Constantes da aplicação
│   └── formatters.ts        # Formatadores e ordenação
├── App.tsx                  # Componente raiz
└── main.tsx                 # Entry point
```

## 🧠 Decisões Técnicas

### Arquitetura

- **Separação de responsabilidades**: API → Services → Hooks → Components → Pages
- **Data router**: `createBrowserRouter` com layout route para Header dentro do contexto do router
- **Sem estado global pesado**: Context API apenas para tema, toasts e rate limit
- **Pub/sub para rate limit**: `rateLimitStore` como bridge entre Axios (fora da árvore React) e o context React
- **Erros tipados**: `GitHubErrorCode` enum + `parseGitHubError()` eliminam strings mágicas
- **Clean Code**: funções pequenas, nomes claros, tipagem completa, zero `any`

### Performance

- **Lazy Loading**: páginas carregadas sob demanda com `React.lazy` + `Suspense`
- **React.memo**: RepositoryCard e UserCard evitam re-renders desnecessários
- **useMemo**: filtros, ordenação e estatísticas computados apenas quando dependências mudam
- **Debounce ref-based**: busca automática sem efeitos colaterais desnecessários
- **Ordenação client-side**: sem requisições adicionais ao reordenar
- **CSS Modules**: escopo isolado, sem conflitos de classes

### UX

- **Persistência**: último usuário pesquisado + favoritos salvos em localStorage
- **Dark Mode**: `prefers-color-scheme` + toggle manual + `data-bs-theme`
- **Error Boundary**: captura erros de renderização com fallback amigável
- **Toast notifications**: feedback visual com auto-dismiss (4s)
- **Estados bem definidos**: loading (skeleton), empty, error, not-found, initial para cada interação
- **Animações sutis**: Framer Motion com fade-in e stagger nos cards

### Acessibilidade

- `aria-label` em todos os inputs e botões
- `aria-hidden="true"` em todos os emojis decorativos
- `aria-pressed` no toggle de tema
- `aria-current="page"` na paginação ativa
- `aria-live="polite"` nos toasts
- `role="status"` e `role="alert"` adequados
- Navegação por teclado funcional

## 📤 Deploy

O build gera arquivos estáticos na pasta `dist/`:

```bash
npm run build
```

Faça o deploy da pasta `dist/` em qualquer plataforma:

| Plataforma           | Configuração                                   |
| -------------------- | ---------------------------------------------- |
| **Vercel**           | Deploy automático a partir do GitHub           |
| **Netlify**          | Publish directory: `dist`                      |
| **GitHub Pages**     | Branch: `gh-pages`, pasta: `/dist`             |
| **Cloudflare Pages** | Build command: `npm run build`, output: `dist` |

> **Importante**: Configure `VITE_GITHUB_TOKEN` nas variáveis de ambiente do seu provedor para aumentar o rate limit em produção.

## 🚀 Melhorias Futuras

- [ ] PWA com service worker para modo offline
- [ ] Internacionalização (i18n) com suporte a múltiplos idiomas
- [ ] Gráficos de contribuição com GitHub Contribution Graph
- [ ] Comparação lado a lado de usuários
- [ ] Autenticação OAuth do GitHub
- [ ] Visualização de commits e issues
- [ ] Testes E2E com Playwright ou Cypress
- [ ] Deploy preview por PR

---

Desenvolvido como demonstração de domínio técnico Front-End.
