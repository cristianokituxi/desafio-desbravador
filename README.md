<h1 align="center">
  🐙 GitHub Explorer
</h1>

<p align="center">
  <strong>Uma aplicação React + TypeScript de nível profissional que consome a API pública do GitHub.<br/>Pesquise usuários, explore repositórios, visualize métricas e gerencie favoritos — tudo com performance, acessibilidade e código limpo.</strong>
</p>

<p align="center">
  <a href="#-demonstração">Demonstração</a> •
  <a href="#-highlights">Highlights</a> •
  <a href="#-métricas">Métricas</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-stack">Stack</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-testes">Testes</a> •
  <a href="#-princípios-de-engenharia">Princípios</a> •
  <a href="#-deploy">Deploy</a> •
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
- [Highlights](#-highlights)
- [Métricas do Projeto](#-métricas-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura da Aplicação](#-arquitetura-da-aplicação)
  - [Fluxo de Dados (Diagrama de Camadas)](#fluxo-de-dados-diagrama-de-camadas)
  - [Separação de Responsabilidades](#separação-de-responsabilidades)
  - [Fluxo Completo da Busca](#fluxo-completo-da-busca)
- [Stack](#-stack)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Testes](#-testes)
  - [Estratégia e Pirâmide de Testes](#estratégia-e-pirâmide-de-testes)
  - [Execução e Cobertura](#execução-e-cobertura)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Code Quality](#-code-quality)
- [Decisões Técnicas](#-decisões-técnicas)
  - [Por que React?](#por-que-react)
  - [Por que Vite?](#por-que-vite)
  - [Por que TypeScript?](#por-que-typescript)
  - [Por que React Router Data Router?](#por-que-react-router-data-router)
  - [Por que Axios?](#por-que-axios)
  - [Por que Context API?](#por-que-context-api-e-não-reduxzustand)
  - [Por que Bootstrap?](#por-que-bootstrap)
  - [Por que CSS Modules + SCSS?](#por-que-css-modules--scss)
  - [Por que Framer Motion?](#por-que-framer-motion)
  - [Por que Error Boundary?](#por-que-error-boundary-como-class-component)
  - [Por que Lazy Loading?](#por-que-lazy-loading)
  - [Por que React.memo, useMemo e useCallback?](#por-que-reactmemo-usememo-e-usecallback)
  - [Por que debounce ref-based?](#por-que-debounce-ref-based-e-não-useeffect)
- [Trade-offs](#️-trade-offs)
- [Princípios de Engenharia de Software](#-princípios-de-engenharia-de-software)
- [Performance](#-performance)
- [Segurança](#-segurança)
- [Acessibilidade](#-acessibilidade)
- [Lighthouse](#-lighthouse)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Roadmap](#-roadmap)
- [Por que este projeto se destaca?](#-por-que-este-projeto-se-destaca)
- [Sobre este projeto](#-sobre-este-projeto)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎬 Demonstração

> **🔗 Links:** [Repositório](https://github.com/cristianokituxi/desafio-desbravador) · [Demo ao vivo](https://cristianokituxi.github.io/desafio-desbravador/)

---

## ⭐ Highlights

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black&style=for-the-badge" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-Data_Router-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge" alt="React Router" />
  <img src="https://img.shields.io/badge/Axios-1.18-5A29E4?logo=axios&logoColor=white&style=for-the-badge" alt="Axios" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white&style=for-the-badge" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/SCSS-Modules-CC6699?logo=sass&logoColor=white&style=for-the-badge" alt="SCSS Modules" />
  <img src="https://img.shields.io/badge/Framer_Motion-animations-0055FF?logo=framer&logoColor=white&style=for-the-badge" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vitest-59_tests-6E9F18?logo=vitest&logoColor=white&style=for-the-badge" alt="Vitest" />
  <img src="https://img.shields.io/badge/RTL-React_Testing_Library-E33332?logo=testinglibrary&logoColor=white&style=for-the-badge" alt="RTL" />
  <img src="https://img.shields.io/badge/Husky-9-000000?logo=husky&style=for-the-badge" alt="Husky" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions&logoColor=white&style=for-the-badge" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Conventional_Commits-1.0.0-FE5196?logo=conventionalcommits&logoColor=white&style=for-the-badge" alt="Conventional Commits" />
  <img src="https://img.shields.io/badge/Lazy_Loading-✅-success?style=for-the-badge" alt="Lazy Loading" />
  <img src="https://img.shields.io/badge/Code_Splitting-✅-success?style=for-the-badge" alt="Code Splitting" />
  <img src="https://img.shields.io/badge/React.memo-✅-success?style=for-the-badge" alt="React.memo" />
  <img src="https://img.shields.io/badge/Error_Boundary-✅-success?style=for-the-badge" alt="Error Boundary" />
  <img src="https://img.shields.io/badge/Context_API-✅-success?style=for-the-badge" alt="Context API" />
  <img src="https://img.shields.io/badge/Debounce-✅-success?style=for-the-badge" alt="Debounce" />
  <img src="https://img.shields.io/badge/Interceptors-✅-success?style=for-the-badge" alt="Interceptors" />
</p>

> **Legenda:** ✅ = implementado e testado

---

## 📊 Métricas do Projeto

| Métrica                         | Valor                                                                      |
| ------------------------------- | -------------------------------------------------------------------------- |
| **Componentes React**           | 11                                                                         |
| **Custom Hooks**                | 5                                                                          |
| **Páginas (lazy-loaded)**       | 3                                                                          |
| **Contextos React**             | 3                                                                          |
| **Testes unitários/integração** | 59 (8 suites)                                                              |
| **Arquitetura**                 | 7 camadas (Pages → Components → Hooks → API → Services → Errors → Context) |
| **Cobertura TypeScript**        | 100% do código fonte (`strict: true`)                                      |
| **Uso de `any`**                | **Zero**                                                                   |
| **Warnings ESLint**             | **Zero**                                                                   |
| **Erros TypeScript**            | **Zero**                                                                   |
| **Commits padronizados**        | Conventional Commits (obrigatório via commitlint)                          |
| **Pipeline CI/CD**              | GitHub Actions (type-check + lint + test + build)                          |

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
- **Compartilhar perfil** via Web Share API (mobile) ou clipboard

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

## 🏛 Arquitetura da Aplicação

### Fluxo de Dados (Diagrama de Camadas)

```
┌─────────────────────────────────────────────────────────┐
│                       Browser                            │
│                  (React 19.2 renderiza)                   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  React Router DOM v7                     │
│             (createBrowserRouter + Layout)               │
│     Roteia entre Home, RepositoryDetails e NotFound      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                      Layout                              │
│         (Header com RateLimitBadge + Outlet)             │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                       Pages                              │
│   Home.tsx, RepositoryDetails.tsx, NotFound.tsx          │
│   (Lazy-loaded — cada página em seu próprio chunk)       │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    Components                            │
│  11 componentes reutilizáveis com SCSS Modules           │
│  (SearchBar, UserCard, RepositoryCard, Pagination, etc.) │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                      Hooks                               │
│  5 custom hooks com lógica de estado e negócio           │
│  (useGithub, useFavorites, useDebounce, etc.)            │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                       API                                │
│  Funções tipadas: fetchUser, fetchUserRepos,             │
│  fetchRepoDetails                                        │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                     Services                             │
│  Axios instance + interceptors (token, rate limit,       │
│  classificação de erros) + rateLimitStore (pub/sub)      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                 GitHub REST API v3                       │
│        (sem autenticação: 60 req/hora)                   │
│        (com token: 5000 req/hora)                        │
└─────────────────────────────────────────────────────────┘
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

### Fluxo Completo da Busca

Este é o caminho que uma pesquisa de usuário percorre da interação até a renderização:

```
    👤 Usuário digita na SearchBar
              │
              ▼
    ┌─────────────────────┐
    │  handleInputChange   │  ← callback com useRef + setTimeout
    │  (debounce 500ms)    │     limpa timer anterior, agenda novo
    └─────────┬───────────┘
              │ (após 500ms sem digitar, ≥ 2 caracteres)
              ▼
    ┌─────────────────────┐
    │   resetFilters()     │  ← limpa query local, filtro de linguagem
    │   setLastUser()      │     persiste no localStorage
    │   searchUser()       │     dispara a busca
    └─────────┬───────────┘
              │
              ▼
    ┌─────────────────────┐
    │   useGithub hook     │  ← gerencia estado: loading, error, data
    │   setState(loading)  │     reseta user, repos, erro, notFound
    └─────────┬───────────┘
              │
              ▼
    ┌─────────────────────┐
    │  api/fetchUser()     │  ← função tipada, retorna Promise<GitHubUser>
    │  api/fetchUserRepos()│     busca 100 repositórios ordenados
    └─────────┬───────────┘
              │
              ▼
    ┌─────────────────────┐
    │  githubService.get() │  ← Axios instance com baseURL https://api.github.com
    └─────────┬───────────┘
              │
              ▼
    ┌──────────────────────────────┐
    │     Axios Interceptors        │
    │  ┌─────────────────────────┐ │
    │  │ Response (sucesso):      │ │
    │  │ → extrai X-RateLimit-*   │ │
    │  │ → atualiza rateLimitStore│ │
    │  ├─────────────────────────┤ │
    │  │ Response (erro):         │ │
    │  │ → 404 → GitHubErrorCode  │ │
    │  │         .NOT_FOUND       │ │
    │  │ → 403 + remaining=0 →    │ │
    │  │         .RATE_LIMIT      │ │
    │  │ → 403 → .FORBIDDEN       │ │
    │  │ → timeout → .TIMEOUT     │ │
    │  │ → default → .NETWORK     │ │
    │  └─────────────────────────┘ │
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │        Estados da UI          │
    │  ┌─────────────────────────┐ │
    │  │ loading → skeleton       │ │
    │  │ error → mensagem + ícone │ │
    │  │ notFound → mensagem      │ │
    │  │ success → UserCard +     │ │
    │  │   UserStats + cards      │ │
    │  └─────────────────────────┘ │
    └──────────────────────────────┘
```

Cada etapa tem uma responsabilidade única. Os interceptors isolam completamente a lógica de erro e rate limit — os hooks e componentes nunca precisam se preocupar com headers HTTP ou códigos de status.

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

### Estratégia e Pirâmide de Testes

O projeto segue a pirâmide de testes adaptada ao ecossistema React:

```
            ┌─────────┐
            │   E2E   │  ← Playwright/Cypress (planejado)
            │ (poucos) │
           ┌┴─────────┴┐
           │ Integração │  ← RTL + renderHook (hooks + componentes)
           │  (médio)   │     59 testes: useGithub, SearchBar, UserCard, etc.
          ┌┴───────────┴┐
          │  Unitários   │  ← Vitest puro (utilitários + services)
          │   (muitos)   │     formatDate, formatNumber, sortRepositories,
          └──────────────┘     rateLimitStore
```

| Camada          | Ferramenta            | Arquivos                                                |
| --------------- | --------------------- | ------------------------------------------------------- |
| **Hooks**       | `renderHook`          | `useGithub`, `useDebounce`, `useLocalStorage`           |
| **Componentes** | React Testing Library | `SearchBar`, `UserCard`, `RepositoryCard`, `Pagination` |
| **Utilitários** | Vitest                | `formatDate`, `formatNumber`, `sortRepositories`        |
| **Services**    | Vitest                | `rateLimitStore`                                        |

### Execução e Cobertura

```bash
npm test              # Executa todos os testes (59 testes em 8 suites)
npm run test:watch    # Modo watch para desenvolvimento
npm run test:coverage # Relatório de cobertura
```

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

### Por que React?

React 19 foi escolhido por ser o ecossistema mais maduro para SPAs. A versão 19 traz melhorias significativas em **concorrência**, **transições** e **renderização automática de documentos**. O modelo de componentes com one-way data binding força uma arquitetura previsível e testável.

**Impacto:** Componentes puros, fáceis de testar e de dar manutenção.

### Por que Vite?

Vite oferece **HMR instantâneo** (não escala com o tamanho do projeto como Webpack), **build nativo via esbuild/rollup** e **suporte nativo a TypeScript e SCSS** sem configuração adicional. Comparado ao CRA (Create React App, descontinuado), é ordens de magnitude mais rápido.

**Impacto:** Dev server inicia em < 1s. Build de produção em < 3s. Hot reload instantâneo.

### Por que TypeScript?

TypeScript previne erros em tempo de compilação que só seriam descobertos em produção. A configuração `strict: true` garante que todo o código seja completamente tipado — incluindo retornos de API, estados de UI e parâmetros de hooks.

**Impacto:** Refatorações seguras, autocompletar no editor, documentação viva via tipos.

### Por que React Router Data Router?

O padrão `createBrowserRouter` (v6.4+) substitui o JSX declarativo tradicional. Ele permite **layout routes**, **lazy loading nativo por rota** e **error boundaries por segmento**, tudo sem componentes wrapper extras. No projeto, o `Layout` route envolve `Header` + `<Outlet/>`, mantendo o `<Link>` do Header dentro do contexto correto do router — algo impossível com `<BrowserRouter>` se o Header estivesse fora.

**Impacto:** Header usa `<Link>` sem precisar de provider manual. Cada página é um chunk separado. Erros são isolados por rota.

### Por que Axios?

Axios oferece **interceptors** nativos — essenciais para:

- Extrair rate limit dos headers HTTP de toda resposta
- Diferenciar erros 404 (not found) de 403 (rate limit vs forbidden)
- Injetar token de autenticação dinamicamente

O `fetch` nativo exigiria wrappers manuais para cada uma dessas funcionalidades.

**Impacto:** Código mais limpo nos hooks e componentes, tratamento de erro centralizado.

### Por que Context API (e não Redux/Zustand)?

O projeto tem **3 estados globais leves** (tema, toasts, rate limit). Context API é suficiente e evita dependências extras. O rate limit usa `useSyncExternalStore` — a API oficial do React 18+ para stores externas — como ponte entre o Axios (fora da árvore React) e os componentes.

**Impacto:** Bundle menor, menos dependências, API nativa do React.

### Por que Bootstrap?

Bootstrap 5 oferece um design system completo e responsivo, com **variáveis CSS customizáveis** e **suporte nativo a dark mode via `data-bs-theme`**. A integração com o dark mode do projeto é trivial — basta alternar o atributo no `<html>`.

**Impacto:** UI consistente, responsiva e acessível sem escrever CSS do zero. Dark mode com 1 atributo.

### Por que CSS Modules + SCSS?

CSS Modules garantem **escopo isolado** por componente, eliminando conflitos de classe. SCSS adiciona nesting, mixins e variáveis. A combinação oferece o melhor dos dois mundos: **modularidade com poder de pré-processador**.

**Impacto:** Zero conflitos de classes entre componentes. Estilos colocalizados com o componente.

### Por que Framer Motion?

A biblioteca oferece animações declarativas com suporte nativo a **layout animations** e **gestures**. O impacto no bundle é mínimo (~30KB gzipped). Usado apenas para micro-animações de entrada (fade-in, stagger) — sem exageros.

**Impacto:** UX polida com custo mínimo de bundle.

### Por que Error Boundary como Class Component?

React ainda não oferece Error Boundary como hook ou functional component. A API `componentDidCatch` só existe em class components. É a única classe no projeto inteiro.

**Impacto:** Toda a aplicação é coberta por error boundary sem precisar de bibliotecas externas.

### Por que Lazy Loading?

Com `React.lazy()` + `Suspense`, cada página é carregada sob demanda. O Vite automaticamente separa cada `import()` dinâmico em um chunk independente. Isso reduz o bundle inicial significativamente — o usuário só baixa o código da página que está visitando.

**Impacto:** Bundle inicial menor, carregamento mais rápido, UX melhor.

### Por que React.memo, useMemo e useCallback?

- **React.memo** (`RepositoryCard`, `UserCard`): evita re-render quando as props não mudam (comparação shallow). Listas paginadas com 6 cards se beneficiam ao reordenar/filtrar — apenas os cards afetados re-renderizam.
- **useMemo** (filtros, ordenação, estatísticas): dados derivados computados apenas quando as dependências mudam. Evita re-processar 100 repositórios a cada tecla digitada no filtro.
- **useCallback** (callbacks estáveis): referências de função que não mudam a cada render, essenciais para o `React.memo` funcionar.

**Impacto:** Performance percebida melhor, menos trabalho para o React diffing.

### Por que debounce ref-based (e não useEffect)?

O padrão `useEffect + useDebounce` gera o warning `react-hooks/set-state-in-effect` no React 19. A abordagem com `useRef + setTimeout` dentro do callback `handleInputChange` é mais limpa e não dispara efeitos colaterais desnecessários.

**Impacto:** Código compatível com React 19 strict mode, zero warnings de lint.

---

## ⚖️ Trade-offs

Toda decisão de engenharia envolve trade-off. Aqui estão os principais:

### Context API vs Redux / Zustand

|                  | Context API ✅                                                 | Redux / Zustand                                                   |
| ---------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Vantagens**    | Nativo do React, zero dependências, simples para estados leves | DevTools poderosos, middleware, time-travel debugging, escala bem |
| **Desvantagens** | Re-renders em cascata se mal usado, sem DevTools dedicado      | Mais boilerplate, bundle maior, curva de aprendizado              |
| **Escolha**      | ✅ O projeto tem apenas 3 estados globais leves                | Seria overengineering para este caso                              |

### Axios vs Fetch

|                  | Axios ✅                                                                                          | Fetch                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Vantagens**    | Interceptors nativos, timeout configurável, transformação automática de JSON, tipagem de resposta | Nativo do browser, zero dependências                                    |
| **Desvantagens** | Dependência externa (+13KB gzipped)                                                               | Sem interceptors, tratamento manual de timeout, sem tipagem de resposta |
| **Escolha**      | ✅ Interceptors são essenciais para rate limit e classificação de erros                           | Exigiria wrappers manuais                                               |

### Bootstrap vs Tailwind CSS

|                  | Bootstrap ✅                                                                         | Tailwind CSS                                                                     |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **Vantagens**    | Componentes prontos (cards, badges, forms), design system completo, dark mode nativo | Utility-first, altamente customizável, bundle menor (purge)                      |
| **Desvantagens** | Bundle maior (227KB), visual mais "padrão"                                           | Verboso no HTML, sem componentes prontos, exige configurar dark mode manualmente |
| **Escolha**      | ✅ Produtividade com componentes prontos + SCSS Modules para customização            | Exigiria criar todos os componentes do zero                                      |

### CSS Modules vs Styled Components

|                  | CSS Modules + SCSS ✅                                                                         | Styled Components                                         |
| ---------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Vantagens**    | Zero runtime cost, scopo isolado, poder do SCSS (nesting, mixins), arquivos `.scss` separados | CSS-in-JS, props dinâmicas no estilo, theming integrado   |
| **Desvantagens** | Sem props dinâmicas no CSS (usa-se inline styles para isso)                                   | Runtime de CSS no browser, bundle maior, pior performance |
| **Escolha**      | ✅ Performance superior (CSS estático extraído pelo Vite)                                     | Runtime cost desnecessário para este projeto              |

### React Router Data Router vs BrowserRouter tradicional

|                  | Data Router ✅                                                                          | BrowserRouter                                                   |
| ---------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Vantagens**    | Layout routes, lazy loading nativo, error boundaries por rota, loaders/actions          | Simplicidade, sem curva de aprendizado                          |
| **Desvantagens** | API mais complexa no início, documentação ainda migrando                                | Header com `<Link>` fora do router quebra (experiência própria) |
| **Escolha**      | ✅ Layout route resolve o problema do Header + é o padrão recomendado pelo React Router | Incompatível com Header fora do contexto                        |

### Vite vs CRA (Create React App)

|                  | Vite ✅                                                             | CRA                                               |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| **Vantagens**    | HMR instantâneo, build via esbuild/rollup, suporte nativo a TS/SCSS | Familiaridade, ecossistema estabelecido           |
| **Desvantagens** | Plugins ainda migrando (ecossistema mais novo)                      | Descontinuado oficialmente, lento, Webpack legado |
| **Escolha**      | ✅ CRA está obsoleto. Vite é o padrão da indústria em 2026          | —                                                 |

---

## 🏛 Princípios de Engenharia de Software

### Clean Code

**O que é:** Código que é fácil de ler, entender e modificar. Nomes significativos, funções pequenas, uma responsabilidade por unidade.

**Onde foi aplicado:**

- `useGithub.ts` — função `searchUser` com fluxo claro: valida → reseta estado → busca usuário → busca repositórios → trata erros
- `formatters.ts` — cada função faz uma coisa: `formatDate`, `formatNumber`, `sortRepositories`
- `errors/github.ts` — `parseGitHubError` e `getErrorMessage` com responsabilidades distintas

**Benefício:** Um novo desenvolvedor entende o fluxo em minutos, não em horas.

---

### SOLID

#### S — Single Responsibility Principle (SRP)

**O que é:** Cada módulo, classe ou função deve ter uma única razão para mudar.

**Onde foi aplicado:**

- `useDebounce.ts` exporta apenas `useDebounce`. `useLocalStorage.ts` exporta apenas `useLocalStorage`. Separados por terem responsabilidades distintas.
- `services/github.ts` — cuida apenas da configuração do Axios e interceptors
- `services/rateLimitStore.ts` — cuida apenas do estado de rate limit (pub/sub)
- `errors/github.ts` — cuida apenas de tipagem e parsing de erros

**Benefício:** Mudar o storage de rate limit não afeta o cliente HTTP. Mudar o formato de erro não afeta os hooks.

#### O — Open/Closed Principle (OCP)

**O que é:** Entidades devem estar abertas para extensão, mas fechadas para modificação.

**Onde foi aplicado:**

- `GitHubErrorCode` enum — adicionar um novo código de erro (ex: `ABUSE_DETECTION`) não requer modificar `parseGitHubError` ou `getErrorMessage` — basta adicionar ao switch/case existente
- `Loading` variants — adicionar uma nova variante de skeleton (`skeleton-details` foi adicionado sem modificar as variantes existentes)

**Benefício:** Extensível sem risco de quebrar código existente.

#### L — Liskov Substitution Principle (LSP)

**O que é:** Subtipos devem ser substituíveis por seus tipos base sem alterar o comportamento.

**Onde foi aplicado:**

- Componentes `memo(UserCard)` e `memo(RepositoryCard)` — podem ser usados em qualquer lugar que espera um `React.ComponentType`, pois `React.memo` retorna um componente compatível
- `GitHubError` interface — qualquer objeto com `{ code, resetTime? }` pode ser usado onde `GitHubError` é esperado

**Benefício:** Polimorfismo seguro. `React.memo` não quebra contratos de componente.

#### I — Interface Segregation Principle (ISP)

**O que é:** Uma classe não deve ser forçada a implementar interfaces que não usa.

**Onde foi aplicado:**

- `SearchBarProps` — `onInputChange` é opcional. Componentes que não precisam de debounce não são forçados a passar esse callback
- `UserCardProps` — `isFavorite` e `onToggleFavorite` são opcionais. O componente funciona sem eles
- `LoadingProps` — `text` é opcional com valor padrão. Cada variante usa apenas as props que precisa

**Benefício:** Interfaces enxutas, componentes flexíveis, sem props obrigatórias desnecessárias.

#### D — Dependency Inversion Principle (DIP)

**O que é:** Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.

**Onde foi aplicado:**

- `useGithub.ts` (alto nível) depende de `fetchUser` (abstração), não do Axios diretamente
- `api/github.ts` é a camada de abstração entre hooks e o serviço HTTP
- Se o Axios for substituído por `fetch`, apenas `services/github.ts` muda — hooks e componentes permanecem intactos

**Benefício:** Trocar a biblioteca HTTP não quebra hooks ou componentes.

---

### DRY (Don't Repeat Yourself)

**O que é:** Cada pedaço de conhecimento deve ter uma representação única e inequívoca no sistema.

**Onde foi aplicado:**

- `getErrorMessage()` — single source of truth para mensagens de erro em português. `useGithub.ts` e `RepositoryDetails.tsx` usam a mesma função
- `formatNumber()` e `formatDate()` — usados em `UserCard`, `RepositoryCard`, `UserStats`, `RepositoryDetails`
- `SORT_OPTIONS` — constante única usada no `Home.tsx`, evitando duplicação de labels

**Benefício:** Mudar "estrelas totais" para "estrelas acumuladas" é feito em um único lugar.

---

### KISS (Keep It Simple, Stupid)

**O que é:** A solução mais simples é geralmente a melhor. Evitar complexidade desnecessária.

**Onde foi aplicado:**

- **Context API em vez de Redux** — 3 estados globais não justificam uma biblioteca de gerenciamento de estado
- **useRef + setTimeout em vez de biblioteca de debounce** — o debounce do projeto são 10 linhas
- **Framer Motion apenas para entrada** — sem animações complexas de layout ou gestos que exigiriam mais código
- **Componentes funcionais** — sem classes (exceto ErrorBoundary, obrigatório)

**Benefício:** Menos código para manter, menos bugs, onboarding mais rápido.

---

### Separation of Concerns (SoC)

**O que é:** Separar o sistema em camadas distintas, cada uma com uma responsabilidade clara.

**Onde foi aplicado:**

- **7 camadas**: Pages → Components → Hooks → API → Services → Errors → Context
- `Home.tsx` não faz chamadas HTTP diretamente — delega para `useGithub.ts`
- `useGithub.ts` não configura Axios — delega para `api/github.ts`
- `api/github.ts` não trata rate limit — delega para `services/github.ts` (interceptors)

**Benefício:** Testar cada camada isoladamente. Mudar uma camada não afeta as outras.

---

### Component Driven Development (CDD)

**O que é:** Desenvolver de baixo para cima, construindo componentes isolados e compondo-os em páginas.

**Onde foi aplicado:**

- Cada componente no diretório `components/` é autossuficiente: tem seu próprio `.tsx` e `.module.scss`
- `Avatar` é usado por `UserCard` e `RepositoryDetails` — desenvolvido primeiro, reutilizado depois
- `Pagination` é genérico — não sabe nada sobre GitHub, apenas sobre páginas e total

**Benefício:** Componentes testáveis isoladamente. Reutilização natural.

---

### Composition over Inheritance

**O que é:** Preferir composição de componentes a hierarquias de classes.

**Onde foi aplicado:**

- `Layout` compõe `Header` + `Outlet` em vez de herdar de uma classe base
- `UserStats` é composto dentro de `Home` como um componente separado em vez de ser parte do `UserCard`
- `RateLimitBadge` é um componente interno do `Header`, composto inline

**Benefício:** Flexibilidade total. `UserStats` pode ser movido, removido ou substituído independentemente.

---

### Baixo Acoplamento

**O que é:** Módulos devem depender minimamente uns dos outros.

**Onde foi aplicado:**

- Hooks não importam componentes
- Componentes não importam serviços HTTP
- `api/github.ts` é a única interface entre hooks e serviços
- `rateLimitStore` usa pub/sub — o Axios publica, o React consome, sem acoplamento direto

**Benefício:** Testar `useGithub` sem mockar Axios. Testar `RepositoryCard` sem mockar API.

---

### Alta Coesão

**O que é:** Elementos dentro de um módulo devem estar fortemente relacionados.

**Onde foi aplicado:**

- `UserCard/` — tudo relacionado à exibição de um usuário está em um só lugar: TSX, SCSS, tipos
- `errors/` — tudo relacionado a erros da API GitHub está em um módulo coeso
- `hooks/useGithub.ts` — toda a lógica de busca (estado, chamadas, erros) está em um hook coeso

**Benefício:** Navegação intuitiva. Se você quer mudar como usuários são exibidos, vá para `UserCard/`.

---

### Escalabilidade

**O que é:** O sistema deve crescer em complexidade sem crescer em desordem.

**Onde foi aplicado:**

- **Estrutura de pastas por feature** — adicionar uma nova página é criar uma pasta em `pages/` e uma rota em `routes/`
- **Hooks como unidade de lógica** — nova funcionalidade = novo hook, sem poluir componentes existentes
- **Contextos isolados** — novo estado global = novo contexto, sem modificar os existentes

**Benefício:** O projeto pode crescer para dezenas de páginas sem reestruturação.

---

### Modularização

**O que é:** Dividir o sistema em módulos independentes e intercambiáveis.

**Onde foi aplicado:**

- Cada componente é um módulo com `tsx` + `scss` próprios
- Cada hook é um módulo com tipagem própria
- Serviços, API, erros, contextos — cada um em seu próprio arquivo

**Benefício:** Tree-shaking eficiente. O bundle só inclui o que é importado.

---

### Reutilização

**O que é:** Escrever código que pode ser usado em múltiplos contextos sem duplicação.

**Onde foi aplicado:**

- `useLocalStorage<T>` é genérico — usado para último usuário pesquisado e favoritos
- `useDebounce<T>` é genérico — pode debounce qualquer tipo de valor
- `formatters.ts` — `formatNumber` e `formatDate` usados em 4 componentes diferentes

**Benefício:** Menos código, comportamento consistente, menos bugs.

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
| **SCSS**                  | Estilização                    | CSS extraído em build, zero runtime cost          |

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

### GitHub Token

O token é opcional mas recomendado. Sem ele, a API permite 60 requisições/hora. Com um Personal Access Token (sem scopes), são 5000 requisições/hora. O token é injetado no header `Authorization: Bearer <token>` pelo interceptor do Axios.

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

## 🚀 Lighthouse

> _Execute o Lighthouse no Chrome DevTools com a aplicação em produção para preencher os resultados._

| Categoria          | Pontuação  | Observações                                      |
| ------------------ | ---------- | ------------------------------------------------ |
| **Performance**    | 🔄 A medir | Lazy loading, code splitting, CSS Modules        |
| **Accessibility**  | 🔄 A medir | 10 técnicas WCAG 2.1 implementadas               |
| **Best Practices** | 🔄 A medir | HTTPS, sem vulnerabilidades conhecidas           |
| **SEO**            | 🔄 A medir | Meta tags, título descritivo, conteúdo indexável |

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

## 🚀 Roadmap

### ✅ Concluído

- [x] Busca de usuários com debounce
- [x] Perfil do usuário com estatísticas
- [x] Lista de repositórios paginada
- [x] Ordenação flexível (estrelas, nome, data)
- [x] Detalhes do repositório
- [x] Dark mode com persistência
- [x] Favoritar usuários (localStorage)
- [x] Pesquisa local e filtro por linguagem
- [x] Copiar link e compartilhar perfil
- [x] Indicador de rate limit
- [x] Skeleton loading (3 variantes)
- [x] Micro-animações (Framer Motion)
- [x] Error Boundary
- [x] Toast notifications
- [x] Lazy loading e code splitting
- [x] Testes (59 testes, 8 suites)
- [x] CI/CD (GitHub Actions)
- [x] Husky + lint-staged + commitlint
- [x] Tratamento centralizado de erros
- [x] Acessibilidade (10 técnicas WCAG)

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
## 💼 Sobre este projeto

Este projeto foi desenvolvido como demonstração de domínio técnico em engenharia de software Front-End. Cada decisão — da arquitetura de pastas ao tratamento de rate limit — foi tomada com intencionalidade.

### O que este projeto demonstra

| Competência             | Como é demonstrada                                                         |
| ----------------------- | -------------------------------------------------------------------------- |
| **React**               | Hooks, Context API, Error Boundary, Lazy Loading, memo, composição         |
| **TypeScript**          | Strict mode, zero `any`, generics, enums, type narrowing, interfaces       |
| **Arquitetura**         | Separação em 7 camadas, fluxo de dados unidirecional, pub/sub              |
| **Boas práticas**       | SOLID, DRY, KISS, SoC, Clean Code documentados com exemplos reais          |
| **Qualidade de código** | ESLint (zero warnings), Prettier, Conventional Commits, code review via CI |
| **Performance**         | 9 técnicas de otimização implementadas e documentadas                      |
| **UX**                  | 5 estados de UI, skeletons, animações, feedback visual, persistência       |
| **Acessibilidade**      | 10 técnicas WCAG 2.1, navegação por teclado, leitores de tela              |
| **Escalabilidade**      | Estrutura modular, hooks reutilizáveis, componentes desacoplados           |

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


<p align="center">
  <sub>Desenvolvido com intencionalidade. Cada linha de código tem um motivo.</sub>
</p>
