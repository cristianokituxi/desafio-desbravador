# 🐙 GitHub Explorer

Aplicação client-side em React que consome a API pública do GitHub para pesquisar usuários e explorar seus repositórios. Design responsivo, suporte a dark mode, lazy loading e experiência de produção.

## 🚀 Funcionalidades

- 🔍 **Pesquisa de usuários** com debounce e busca instantânea
- 👤 **Perfil do usuário** com avatar, bio, localização, seguidores e mais
- 📦 **Lista de repositórios** paginada com cards responsivos
- 📊 **Ordenação flexível** por estrelas, nome ou última atualização
- 📄 **Detalhes do repositório** com métricas completas
- 🌙 **Dark Mode** com persistência e detecção automática do sistema
- ⚡ **Lazy Loading** de páginas via React.lazy + Suspense
- 🦴 **Skeleton loading** para uma UX fluida
- 🛡️ **Error Boundary** para tratamento de erros
- 🔔 **Toast notifications** para feedback amigável
- 💾 **Persistência** do último usuário pesquisado (LocalStorage)
- ✨ **Animações suaves** em cards e transições

## 🛠️ Tecnologias

| Categoria    | Tecnologia          |
| ------------ | ------------------- |
| Framework    | React 19            |
| Linguagem    | TypeScript          |
| Build        | Vite                |
| Roteamento   | React Router DOM v7 |
| HTTP Client  | Axios               |
| UI Framework | Bootstrap 5         |
| Estilização  | SCSS Modules        |
| Linting      | ESLint + Prettier   |

## 📦 Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd github-explorer

# Instale as dependências
npm install
```

## 🏃 Execução

```bash
# Modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📜 Scripts

| Comando                | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento      |
| `npm run build`        | Gera o build de produção (tsc + vite)     |
| `npm run preview`      | Preview local do build                    |
| `npm run lint`         | Executa ESLint no código fonte            |
| `npm run lint:fix`     | Corrige automaticamente problemas de lint |
| `npm run format`       | Formata código com Prettier               |
| `npm run format:check` | Verifica formatação sem modificar         |
| `npm run type-check`   | Verifica tipos TypeScript                 |

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Funções de chamada à API GitHub
│   └── github.ts
├── components/             # Componentes reutilizáveis
│   ├── Avatar/             # Avatar de usuário com tamanhos
│   ├── ErrorBoundary/      # Error Boundary (class component)
│   ├── Header/             # Header com toggle de tema
│   ├── Loading/            # Spinner e Skeleton loaders
│   ├── Pagination/         # Paginação de repositórios
│   ├── RepositoryCard/     # Card de repositório individual
│   ├── SearchBar/          # Barra de pesquisa com debounce
│   ├── Toast/              # Notificações toast
│   └── UserCard/           # Card de perfil do usuário
├── context/                # Context API
│   ├── ThemeContext.tsx     # Tema claro/escuro
│   └── ToastContext.tsx     # Gerenciamento de toasts
├── hooks/                  # Custom hooks
│   ├── useDebounce.ts      # Debounce + useLocalStorage
│   └── useGithub.ts        # Lógica de busca GitHub
├── pages/                  # Páginas da aplicação
│   ├── Home/               # Página inicial com pesquisa
│   ├── RepositoryDetails/  # Detalhes do repositório
│   └── NotFound/           # Página 404
├── routes/                 # Configuração de rotas
│   └── index.tsx           # React Router + Lazy Loading
├── services/               # Camada de serviços
│   └── github.ts           # Cliente Axios com interceptors
├── styles/                 # Estilos globais
│   └── global.scss         # Import do Bootstrap
├── types/                  # Definições de tipos TypeScript
│   └── index.ts
├── utils/                  # Utilitários
│   ├── constants.ts        # Constantes da aplicação
│   └── formatters.ts       # Formatadores e ordenação
├── App.tsx                 # Componente raiz
├── main.tsx                # Entry point
└── vite-env.d.ts           # Declarações de tipos
```

## 🧠 Decisões Técnicas

### Arquitetura

- **Separação de responsabilidades**: API → Services → Hooks → Components → Pages
- **Nenhuma chamada HTTP em componentes**: a camada `api/` orquestra as chamadas, `services/` configura o cliente Axios
- **Sem Redux**: dados locais gerenciados via hooks + Context API apenas para tema e toasts
- **Clean Code**: funções pequenas, nomes claros, tipagem completa, sem `any`

### Performance

- **Lazy Loading**: páginas carregadas sob demanda com `React.lazy`
- **Debounce**: 500ms de delay na pesquisa por digitação
- **Skeleton Loading**: feedback visual imediato durante carregamentos
- **Ordenação client-side**: sem requisições adicionais ao reordenar

### UX

- **Persistência**: último usuário pesquisado salvo em LocalStorage
- **Dark Mode**: detecta preferência do sistema + toggle manual
- **Error Boundary**: captura erros de renderização globalmente
- **Toast notifications**: feedback visual para erros e ações
- **Estados bem definidos**: loading, empty, error, not-found para cada interação

## 🚀 Possíveis Melhorias

- [ ] Adicionar autenticação OAuth do GitHub para aumentar rate limit
- [ ] Implementar testes unitários com Vitest + React Testing Library
- [ ] Adicionar visualização de commits e issues
- [ ] Filtro por linguagem nos repositórios
- [ ] Gráficos de contribuição do usuário
- [ ] Comparação lado a lado de usuários
- [ ] Progressive Web App (PWA) com service worker
- [ ] Internacionalização (i18n)

## 📤 Deploy

O build gera arquivos estáticos na pasta `dist/`. Para deploy:

```bash
npm run build
```

Faça o deploy da pasta `dist/` em qualquer provedor de hospedagem estática:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

---

Desenvolvido como desafio técnico Front-End.
