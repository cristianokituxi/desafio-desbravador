<h1 align="center">
  🐙 GitHub Explorer
</h1>

<p align="center">
  <strong>Explore usuários e repositórios do GitHub com uma interface moderna, rápida e acessível.</strong>
</p>

<p align="center">
  <a href="#-demonstração">Demonstração</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-stack">Stack</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-testes">Testes</a> •
  <a href="#-deploy">Deploy</a> •
  <a href="#-contribuição">Contribuição</a>
</p>

<p align="center">
  <a href="https://github.com/username/github-explorer/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/username/github-explorer/ci.yml?branch=main&logo=github&label=CI" alt="CI Status" /></a>
  <a href="#-testes"><img src="https://img.shields.io/badge/tests-59%20passed-brightgreen?logo=vitest" alt="59 tests passed" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6.0" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black" alt="React 19.2" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white" alt="Vite 8.1" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D22.0-339933?logo=node.js&logoColor=white" alt="Node >=22" /></a>
  <a href="https://www.conventionalcommits.org/"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-FE5196?logo=conventionalcommits&logoColor=white" alt="Conventional Commits" /></a>
  <a href="#-code-quality"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4?logo=prettier" alt="Prettier" /></a>
</p>

---

## 📖 Índice

- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Stack](#-stack)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Testes](#-testes)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Code Quality](#-code-quality)
- [Decisões Técnicas](#-decisões-técnicas)
- [Performance](#-performance)
- [Segurança](#-segurança)
- [Acessibilidade](#-acessibilidade)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Melhorias Futuras](#-melhorias-futuras)
- [Contribuição](#-contribuição)
- [Por que este projeto se destaca?](#-por-que-este-projeto-se-destaca)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎬 Demonstração

<p align="center">
  <em>Adicione um GIF ou screenshot da aplicação aqui</em><br/>
  <img src="screenshots/home.png" alt="Tela principal do GitHub Explorer" width="800" />
</p>

> **🔗 Links:** [Repositório](https://github.com/username/github-explorer) · [Demo ao vivo](https://github-explorer.vercel.app)

---

## ✨ Funcionalidades

### 🔍 Busca e Descoberta

- **Pesquisa instantânea** com debounce de 500ms (dispara a partir de 2 caracteres)
- **Auto-complete via localStorage** — último usuário pesquisado é persistido e restaurado
- **Input controlado** com feedback visual durante o carregamento

### 👤 Perfil do Usuário

- Avatar, nome, bio, empresa, localização
- Contagem de seguidores, seguindo e repositórios públicos
- **Estatísticas agregadas** — total de estrelas, linguagem mais usada, repositório mais popular
- **Favoritar usuários** com persistência em localStorage e chips de acesso rápido

### 📦 Exploração de Repositórios

- Lista paginada (6 por página) com cards responsivos
- **Pesquisa local** por nome ou descrição
- **Filtro por linguagem** com lista extraída dinamicamente dos repositórios
- **Ordenação** por estrelas (asc/desc), nome (A-Z/Z-A) ou data de atualização
- **Copiar link** do repositório com um clique

### 📄 Página de Detalhes

- Métricas completas: stars, forks, watchers, issues abertas
- Linguagem, licença, datas de criação e atualização
- Link direto para o GitHub
- **Skeleton dedicado** com shimmer durante o carregamento

### 🌙 Experiência do Usuário

- **Dark Mode** com detecção automática via `prefers-color-scheme` e persistência manual
- **Skeleton loading** com animação shimmer em 3 variantes
- **Micro-animações** com Framer Motion (fade-in, slide-up, stagger)
- **Toast notifications** com auto-dismiss (4s) para feedback de ações
- **Estados bem definidos**: loading, empty, error, not-found e initial

### 📡 Infraestrutura e Robustez

- **Indicador de rate limit** no header com barra de progresso colorida
- **Tratamento centralizado de erros** com enum tipado (`GitHubErrorCode`)
- **Error Boundary** para captura de erros de renderização
- **Suporte a token de API** via variável de ambiente (5000 req/h vs 60 req/h)

### ♿ Acessibilidade

- `aria-label` em todos os inputs e botões interativos
- `aria-hidden="true"` em todos os emojis decorativos
- `aria-pressed` no toggle de tema para leitores de tela
- `aria-current="page"` na paginação ativa
- `aria-live="polite"` em notificações toast
- `role="status"` e `role="alert"` nos elementos apropriados
- Navegação completa por teclado

---

## 🏗 Arquitetura

### Fluxo de Dados

```
┌─────────────────────────────────────────────────┐
│                      UI                          │
│  Pages (Home, RepositoryDetails, NotFound)       │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                  Components                      │
│  (SearchBar, UserCard, RepositoryCard, etc.)     │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                   Hooks                          │
│  (useGithub, useFavorites, useDebounce, etc.)    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                    API                           │
│  (fetchUser, fetchUserRepos, fetchRepoDetails)   │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                  Services                        │
│  (Axios instance + interceptors + rate limit)    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              GitHub REST API v3                  │
└─────────────────────────────────────────────────┘
```

### Separação de Responsabilidades

| Camada         | Responsabilidade                              | Exemplo              |
| -------------- | --------------------------------------------- | -------------------- |
| **Pages**      | Composição de layout, orquestração de estados | `Home.tsx`           |
| **Components** | Renderização pura, sem lógica de negócio      | `RepositoryCard.tsx` |
| **Hooks**      | Estado, efeitos colaterais, regras de negócio | `useGithub.ts`       |
| **API**        | Funções de chamada HTTP tipadas               | `fetchUser()`        |
| **Services**   | Configuração do cliente HTTP, interceptors    | `github.ts`          |
| **Errors**     | Tipagem e parsing centralizado de erros       | `GitHubErrorCode`    |
| **Context**    | Estado global leve (tema, toasts, rate limit) | `ThemeContext`       |

---

## 🛠️ Stack

| Categoria        | Tecnologia                             | Versão |
| ---------------- | -------------------------------------- | ------ |
| **Framework**    | React                                  | 19.2   |
| **Linguagem**    | TypeScript                             | 6.0    |
| **Build**        | Vite                                   | 8.1    |
| **Roteamento**   | React Router DOM (data router)         | 7.18   |
| **HTTP Client**  | Axios (com interceptors)               | 1.18   |
| **UI Framework** | Bootstrap                              | 5.3    |
| **Estilização**  | SCSS Modules                           | —      |
| **Animações**    | Framer Motion                          | —      |
| **Testes**       | Vitest + React Testing Library + jsdom | 4.1    |
| **Linting**      | ESLint + Oxlint + Prettier             | 9      |
| **Git Hooks**    | Husky + lint-staged                    | 9      |
| **Commits**      | Commitlint (Conventional Commits)      | —      |
| **CI/CD**        | GitHub Actions                         | —      |

> **Node.js:** Requer versão **22+** (ver `.nvmrc`).

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/username/github-explorer.git
cd github-explorer

# Instale as dependências
npm install
```

## 🏃 Execução

```bash
npm run dev       # Desenvolvimento → http://localhost:5173
npm run build     # Build de produção (tsc + vite)
npm run preview   # Preview local do build
```

## 🔐 Variáveis de Ambiente

Copie o arquivo de exemplo e configure seu token:

```bash
cp .env.example .env
```

| Variável            | Tipo                | Descrição                                                                           |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| `VITE_GITHUB_TOKEN` | `string` (opcional) | Personal access token do GitHub. Sem token: **60 req/h**. Com token: **5000 req/h** |

> Crie seu token em [GitHub Settings > Personal access tokens](https://github.com/settings/tokens). Nenhum scope é necessário para repositórios públicos.

---

## 🧪 Testes

### Estratégia

O projeto segue a **testing trophy** — foco em testes de integração e hooks, complementados por testes unitários de utilitários e componentes.

| Camada          | Ferramenta            | Arquivos                                                |
| --------------- | --------------------- | ------------------------------------------------------- |
| **Hooks**       | `renderHook`          | `useGithub`, `useDebounce`, `useLocalStorage`           |
| **Componentes** | React Testing Library | `SearchBar`, `UserCard`, `RepositoryCard`, `Pagination` |
| **Utilitários** | Vitest                | `formatDate`, `formatNumber`, `sortRepositories`        |
| **Services**    | Vitest                | `rateLimitStore`                                        |

### Execução

```bash
npm test              # Executa todos os testes (59 testes em 8 suites)
npm run test:watch    # Modo watch para desenvolvimento
npm run test:coverage # Relatório de cobertura
```

### Cobertura Atual

| Métrica             | Valor                                     |
| ------------------- | ----------------------------------------- |
| **Test files**      | 8 (todos passando)                        |
| **Total de testes** | 59                                        |
| **Tipos testados**  | Hooks, componentes, utilitários, services |

---

## 📜 Scripts Disponíveis

| Comando                 | Descrição                                    |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento com hot reload   |
| `npm run build`         | TypeScript check + Vite build de produção    |
| `npm run preview`       | Preview local do build de produção           |
| `npm test`              | Executa todos os testes com Vitest           |
| `npm run test:watch`    | Vitest em modo watch                         |
| `npm run test:coverage` | Vitest com relatório de cobertura            |
| `npm run lint`          | ESLint em todo o código fonte                |
| `npm run lint:fix`      | ESLint com auto-fix                          |
| `npm run format`        | Prettier em todo `src/`                      |
| `npm run format:check`  | Verifica formatação sem modificar            |
| `npm run type-check`    | Verificação de tipos TypeScript (sem emitir) |

---

## 🔄 Pipeline CI/CD

### GitHub Actions

Toda alteração em `main` (push ou PR) dispara o pipeline:

```
push / pull_request → main
         │
         ├── quality (paralelo)
         │   ├── TypeScript type-check
         │   ├── ESLint
         │   └── Prettier format-check
         │
         ├── test (paralelo)
         │   └── Vitest (59 testes em jsdom)
         │
         └── build (sequencial: depende de quality + test)
             ├── Vite build de produção
             └── Upload do artifact dist/ (7 dias)
```

### Hooks Locais (Husky)

| Hook         | Ação                               | Ferramenta                          |
| ------------ | ---------------------------------- | ----------------------------------- |
| `pre-commit` | Formata e lint dos arquivos staged | `lint-staged` (Prettier + ESLint)   |
| `commit-msg` | Valida o formato da mensagem       | `commitlint` (Conventional Commits) |

---

## ✨ Code Quality

- **Zero `any`** em todo o código TypeScript
- **Zero warnings** de ESLint
- **Zero erros** de TypeScript
- **Conventional Commits** obrigatórios via commitlint
- **Prettier** para formatação consistente
- **Oxlint** como linter complementar de alta performance

---

## 🧠 Decisões Técnicas

> _"Por que essa escolha e não outra?"_

### Por que React Router Data Router?

O padrão `createBrowserRouter` (v6.4+) substitui o JSX declarativo tradicional. Ele permite **layout routes**, **lazy loading nativo por rota** e **error boundaries por segmento**, tudo sem componentes wrapper extras. No projeto, o `Layout` route envolve `Header` + `<Outlet/>`, mantendo o `<Link>` do Header dentro do contexto correto do router — algo impossível com `<BrowserRouter>` se o Header estivesse fora.

### Por que Axios?

Axios oferece **interceptors** nativos — essenciais para:

- Extrair rate limit dos headers HTTP de toda resposta
- Diferenciar erros 404 (not found) de 403 (rate limit vs forbidden)
- Injetar token de autenticação dinamicamente

### Por que Context API (e não Redux/Zustand)?

O projeto tem **3 estados globais leves** (tema, toasts, rate limit). Context API é suficiente e evita dependências extras. O rate limit usa `useSyncExternalStore` — a API oficial do React 18+ para stores externas — como ponte entre o Axios (fora da árvore React) e os componentes.

### Por que CSS Modules + SCSS?

CSS Modules garantem **escopo isolado** por componente, eliminando conflitos de classe. SCSS adiciona nesting, mixins e variáveis. A combinação oferece o melhor dos dois mundos: **modularidade com poder de pré-processador**.

### Por que Framer Motion?

A biblioteca oferece animações declarativas com suporte nativo a **layout animations** e **gestures**. O impacto no bundle é mínimo (~30KB gzipped). Usado apenas para micro-animações de entrada (fade-in, stagger) — sem exageros.

### Por que Error Boundary como Class Component?

React ainda não oferece Error Boundary como hook ou functional component. A API `componentDidCatch` só existe em class components. É a única classe no projeto inteiro.

### Por que debounce ref-based (e não useEffect)?

O padrão `useEffect + useDebounce` gera o warning `react-hooks/set-state-in-effect` no React 19. A abordagem com `useRef + setTimeout` dentro do callback `handleInputChange` é mais limpa e não dispara efeitos colaterais desnecessários.

---

## ⚡ Performance

| Otimização                | Onde                           | Por que                                           |
| ------------------------- | ------------------------------ | ------------------------------------------------- |
| **Lazy Loading**          | Pages                          | Rotas carregadas sob demanda (`React.lazy`)       |
| **Code Splitting**        | Pages                          | Vite divide cada página em chunk separado         |
| **React.memo**            | `RepositoryCard`, `UserCard`   | Evita re-render quando props não mudam            |
| **useMemo**               | `Home.tsx`, `UserStats.tsx`    | Filtros, ordenação e stats computados sob demanda |
| **useCallback**           | Callbacks estáveis             | Referências estáveis para `memo` e `useEffect`    |
| **Debounce**              | `Home.tsx` (handleInputChange) | Reduz chamadas à API durante digitação            |
| **Paginação client-side** | `Home.tsx`                     | 6 repositórios por página, sem requisições extras |
| **Skeleton Loading**      | `Loading.tsx` (3 variantes)    | Feedback visual imediato durante carregamento     |
| **CSS Modules**           | Todos os componentes           | Escopo isolado, zero conflitos                    |

---

## 🔒 Segurança

### Variáveis de Ambiente

O token do GitHub é injetado via `VITE_GITHUB_TOKEN` no build e nunca é commitado (`.env` está no `.gitignore`). Em produção, configure a variável no painel do seu provedor de deploy.

### Rate Limit

A API do GitHub impõe limites rigorosos. O projeto implementa:

- **Leitura de headers** `X-RateLimit-Remaining`, `X-RateLimit-Limit`, `X-RateLimit-Reset` em toda resposta
- **Indicador visual** no header com barra de progresso (verde → amarelo → vermelho)
- **Mensagem contextual** com horário de reset quando o limite é excedido
- **Diferenciação** entre rate limit (403 + remaining=0) e forbidden real (403 por outros motivos)

### Interceptors

O interceptor de resposta do Axios centraliza todo tratamento de erro:

```typescript
// services/github.ts
client.interceptors.response.use(
  (response) => {
    /* extrai rate limit */
  },
  (error) => {
    /* classifica o erro por código */
  },
);
```

### Tratamento de Erros

Erros são **tipados** via `GitHubErrorCode` enum, **parseados** por `parseGitHubError()` e **exibidos** por `getErrorMessage()` — single source of truth, sem strings mágicas espalhadas.

---

## ♿ Acessibilidade

| Técnica                         | Onde                                                    | WCAG  |
| ------------------------------- | ------------------------------------------------------- | ----- |
| `aria-label` em inputs e botões | SearchBar, Header, RepositoryCard, UserCard, Pagination | 4.1.2 |
| `aria-hidden="true"` em emojis  | Todos os componentes com ícones decorativos             | 4.1.2 |
| `aria-pressed` no toggle        | Header (theme toggle)                                   | 4.1.2 |
| `aria-current="page"`           | Pagination                                              | 4.1.2 |
| `aria-live="polite"`            | Toast notifications                                     | 4.1.3 |
| `role="status"`                 | Rate limit badge                                        | 4.1.2 |
| `role="alert"`                  | Toast messages                                          | 4.1.3 |
| Navegação por teclado           | Todos os componentes interativos                        | 2.1.1 |
| `alt` em imagens                | Avatar, favoritos                                       | 1.1.1 |
| Contraste via Bootstrap         | Toda a UI (tema claro e escuro)                         | 1.4.3 |

---

## 📤 Deploy

O projeto gera arquivos **totalmente estáticos** na pasta `dist/`. Compatível com qualquer plataforma de hospedagem:

### Opções de Deploy

| Plataforma                                           | Método                             | Configuração                           |
| ---------------------------------------------------- | ---------------------------------- | -------------------------------------- |
| **[Vercel](https://vercel.com)**                     | Conexão com GitHub (recomendado)   | Deploy automático ao push              |
| **[Netlify](https://netlify.com)**                   | Git-based deploy                   | Publish directory: `dist`              |
| **[GitHub Pages](https://pages.github.com)**         | Branch `gh-pages` + GitHub Actions | Pasta: `/dist`                         |
| **[Cloudflare Pages](https://pages.cloudflare.com)** | Git integration                    | Build: `npm run build`, output: `dist` |

### Passo a passo rápido (Vercel)

1. Conecte o repositório no dashboard da Vercel
2. Configure a variável de ambiente `VITE_GITHUB_TOKEN`
3. Deploy automático em cada push para `main`

> ⚠️ **Importante:** Sempre configure `VITE_GITHUB_TOKEN` em produção para evitar bloqueios de rate limit (60 req/h sem token).

---

## 📁 Estrutura do Projeto

```
github-explorer/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
├── .husky/
│   ├── pre-commit                  # lint-staged
│   └── commit-msg                  # commitlint
├── public/
│   └── favicon.svg
├── src/
│   ├── api/                        # Chamadas à API tipadas
│   │   └── github.ts               # fetchUser, fetchUserRepos, fetchRepoDetails
│   │
│   ├── components/                 # 11 componentes (todos com SCSS Module)
│   │   ├── Avatar/                 # Avatar com lazy loading e tamanhos
│   │   ├── ErrorBoundary/          # Class component (único no projeto)
│   │   ├── Header/                 # Header + RateLimitBadge + ThemeToggle
│   │   ├── Layout/                 # Layout raiz: Header + Outlet
│   │   ├── Loading/                # Spinner + 3 variantes de skeleton
│   │   ├── Pagination/             # Paginação com até 5 páginas visíveis
│   │   ├── RepositoryCard/         # Card de repositório (React.memo)
│   │   ├── SearchBar/              # Input de busca com debounce
│   │   ├── Toast/                  # Container de notificações
│   │   ├── UserCard/               # Card de perfil (React.memo)
│   │   └── UserStats/              # Estatísticas agregadas
│   │
│   ├── context/                    # 3 contexts React
│   │   ├── RateLimitContext.tsx     # useSyncExternalStore + rateLimitStore
│   │   ├── ThemeContext.tsx         # Tema claro/escuro com persistência
│   │   └── ToastContext.tsx         # Gerenciamento de toasts
│   │
│   ├── errors/                     # Tratamento centralizado de erros
│   │   └── github.ts               # GitHubErrorCode enum + parse + getMessage
│   │
│   ├── hooks/                      # 5 hooks customizados
│   │   ├── useDebounce.ts          # Debounce genérico para qualquer tipo
│   │   ├── useFavorites.ts         # Favoritar usuários (localStorage)
│   │   ├── useGithub.ts            # Lógica de busca (estado + API)
│   │   ├── useLocalStorage.ts      # useState persistente
│   │   └── useRateLimit.ts         # (via RateLimitContext)
│   │
│   ├── pages/                      # 3 páginas (lazy-loaded)
│   │   ├── Home/                   # Busca, perfil, stats, repositórios
│   │   ├── NotFound/               # Página 404
│   │   └── RepositoryDetails/      # Detalhes do repositório
│   │
│   ├── routes/
│   │   └── index.tsx               # createBrowserRouter + lazy routes
│   │
│   ├── services/                   # Infraestrutura
│   │   ├── github.ts               # Axios instance + interceptors
│   │   └── rateLimitStore.ts       # Pub/sub store (ponte Axios ↔ React)
│   │
│   ├── styles/
│   │   └── global.scss             # Bootstrap import
│   │
│   ├── test/                       # 8 suites de teste (59 testes)
│   │   ├── components/             # SearchBar, UserCard, RepositoryCard, Pagination
│   │   ├── hooks/                  # useDebounce, useLocalStorage, useGithub
│   │   ├── services/               # rateLimitStore
│   │   ├── utils/                  # formatDate, formatNumber, sortRepositories
│   │   └── setup.ts                # @testing-library/jest-dom
│   │
│   ├── types/
│   │   └── index.ts                # GitHubUser, GitHubRepository, SearchState, etc.
│   │
│   ├── utils/
│   │   ├── constants.ts            # SORT_OPTIONS, storage keys
│   │   └── formatters.ts           # formatDate, formatNumber, sortRepositories
│   │
│   ├── App.tsx                     # Root component (providers)
│   ├── main.tsx                    # Entry point
│   └── vite-env.d.ts              # TypeScript ambient declarations
│
├── .env.example                    # Documentação das variáveis de ambiente
├── .gitignore
├── .nvmrc                          # Node 22
├── .prettierrc
├── commitlint.config.js
├── eslint.config.mjs
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts                  # Vite + Vitest config
```

---

## 🚀 Melhorias Futuras

### 🔴 Alta Prioridade

- [ ] **Testes E2E** com Playwright ou Cypress
- [ ] **PWA** com service worker para modo offline
- [ ] **Deploy preview** automático por PR

### 🟡 Média Prioridade

- [ ] **Mais gráficos** — contribuições, distribuição de linguagens
- [ ] **Autenticação OAuth** do GitHub para aumentar rate limit
- [ ] **Visualização de commits e issues** por repositório

### 🟢 Baixa Prioridade

- [ ] **Comparação lado a lado** de dois usuários
- [ ] **Internacionalização (i18n)** com suporte a múltiplos idiomas
- [ ] **TurboPack** ou **Rspack** como bundler alternativo
- [ ] **Storybook** para documentação de componentes

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga o fluxo:

1. Faça um **fork** do projeto
2. Crie uma **branch** com sua feature: `git checkout -b feat/minha-feature`
3. Faça commits seguindo **Conventional Commits**: `feat:`, `fix:`, `refactor:`, etc.
4. Garanta que os testes passam: `npm test`
5. Verifique o lint: `npm run lint`
6. Envie um **Pull Request** para `main`

> O CI executará automaticamente type-check, lint e testes no seu PR.

### Padrão de Commits

```
feat: add user contribution graph
fix: correct date formatting in RepositoryCard
refactor: extract search logic to useSearch hook
test: add pagination edge cases
docs: update architecture section
```

---

## 🏆 Por que este projeto se destaca?

### Para Recrutadores e Avaliadores Técnicos

| Diferencial                    | Evidência                                                                |
| ------------------------------ | ------------------------------------------------------------------------ |
| **TypeScript estrito**         | Zero `any`, tipagem completa em todas as camadas                         |
| **Arquitetura em camadas**     | API → Services → Hooks → Components → Pages com responsabilidades claras |
| **Testes abrangentes**         | 59 testes em 8 suites (hooks, componentes, utils, services)              |
| **Pipeline profissional**      | CI/CD com GitHub Actions + Husky + lint-staged + Conventional Commits    |
| **Tratamento de erros tipado** | `GitHubErrorCode` enum elimina strings mágicas                           |
| **Performance**                | Lazy loading, code splitting, React.memo, useMemo, debounce              |
| **Acessibilidade**             | WCAG 2.1 — 9 técnicas de acessibilidade implementadas                    |
| **UX polida**                  | 3 variantes de skeleton, animações Framer Motion, 5 estados de UI        |
| **Segurança**                  | Token via env vars, rate limit com feedback visual, interceptors         |
| **Documentação**               | README completo, arquitetura explicada, decisões justificadas            |

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

|               |                                                                  |
| ------------- | ---------------------------------------------------------------- |
| **Nome**      | [Seu Nome](https://github.com/username)                          |
| **LinkedIn**  | [linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil) |
| **Portfólio** | [seusite.com](https://seusite.com)                               |
| **E-mail**    | [seu@email.com](mailto:seu@email.com)                            |

---

<p align="center">
  <sub>Desenvolvido como demonstração de domínio técnico em Front-End.</sub>
</p>
