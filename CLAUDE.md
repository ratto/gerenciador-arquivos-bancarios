# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (opens browser automatically)
pnpm build        # Production build
pnpm lint         # ESLint (flat config, src/**/*.{ts,js,cjs,mjs,vue})
pnpm format       # Prettier formatting
```

## Comandos de Teste

```bash
npm test               # Roda testes unitários + componente (Vitest, execução única)
npm run test:watch     # Vitest em modo watch
npm run test:cov       # Vitest com relatório de cobertura V8
npm run test:e2e       # Testes E2E com Cypress (requer servidor dev em :9000)
npm run test:e2e:open  # Cypress em modo interativo
```

Arquivos de teste:
- Testes unitários: `tests/vitest/**/*.test.ts`
- Testes de componente: `tests/vitest/**/*.spec.ts`
- Testes E2E: `tests/e2e/*.cy.ts`

## Workflow Multi-Agente

Veja `docs/WORKFLOW.md` para o guia completo de orquestração.

Os agentes estão definidos em `.claude/agents/`:

| Agente | Arquivo | Tipo | Papel |
|--------|---------|------|-------|
| AGENT_ARCH | `.claude/agents/arch.md` | **Agente principal** | Lê SPEC.md, escreve TASKS.md, orquestra DEV e QA |
| AGENT_DEV  | `.claude/agents/dev.md`  | **Subagente** do ARCH | Lê TASKS.md, implementa features + testes, escreve DEV_REPORT.md |
| AGENT_QA   | `.claude/agents/qa.md`   | **Subagente** do ARCH | Code review, executa testes, escreve QA_REPORT.md, implementa E2E |

**Modelo de contexto:** O AGENT_ARCH é invocado pela sessão principal do Claude Code. Ele invoca AGENT_DEV e AGENT_QA como **subagentes em contextos completamente novos e independentes** (equivalente a abas separadas). Os subagentes não herdam contexto do ARCH — toda informação necessária deve estar no prompt de invocação ou nos artefatos em disco.

Para iniciar um ciclo: copie `docs/SPEC_TEMPLATE.md` → `docs/SPEC.md`, preencha,
depois peça: "Use o AGENT_ARCH para ler docs/SPEC.md e projetar as tarefas deste ciclo."

Branches seguem o padrão `[tipo]/[número-da-spec]-[breve-descrição]` criadas a partir de `develop`.
Após QA aprovado, o AGENT_ARCH faz merge na `develop` e push para o GitHub; o pipeline é tratado manualmente pelo humano.

## Arquitetura MVVM

O projeto segue a camada MVVM de forma explícita:

| Camada | Pasta | Regra |
|--------|-------|-------|
| **Model** | `src/model/` | TypeScript puro, **zero dependência de framework**. Não pode importar Vue, Pinia, Quasar ou qualquer biblioteca de UI. |
| **ViewModel** | `src/composables/` | Composables Vue (`.ts`). Fazem a ponte entre Model e View: chamam funções do Model, expõem estado reativo e ações para os componentes. |
| **View** | `src/pages/`, `src/components/`, `src/layouts/` | Arquivos `.vue`. **Nunca importam diretamente de `src/model/`** — sempre passam por um composable. |

## Layout do Código Fonte

- `src/model/` — Camada Model: lógica de negócio agnóstica de framework.
  - `src/model/lib/cnab/` — TypeScript puro para lógica de campos CNAB (sem Vue, sem Pinia).
  - `src/model/lib/cnab/layouts/` — Objetos declarativos de definição de leiaute por variante CNAB.
  - `src/model/utils/` — Utilitários TypeScript puros de uso geral.
- `src/composables/` — Camada ViewModel: composables que condensam estado e funções de aplicação.

## Stack

- **Quasar v2** (`@quasar/app-vite`) — SPA framework built on Vite. All Quasar components/directives are auto-imported; no explicit imports needed in `.vue` files.
- **Vue 3** with Composition API and TypeScript (strict mode enabled).
- **Pinia** for state management. Stores live in `src/stores/` and support HMR via `acceptHMRUpdate`.
- **Vue Router** in hash mode (`vueRouterMode: 'hash'`).

## Architecture

- `src/model/` — Model layer: pure TypeScript, framework-agnostic business logic. Never imported directly by `.vue` files.
- `src/composables/` — ViewModel layer: Vue composables that bridge Model and View. These are the only entry point for `.vue` files to access Model logic.
- `src/router/routes.ts` — Route definitions with lazy-loaded page components.
- `src/layouts/` — Layout wrappers (e.g. `MainLayout.vue`); pages are nested as router children.
- `src/pages/` — Top-level route components.
- `src/components/` — Reusable components. `models.ts` holds shared TypeScript interfaces/types.
- `src/stores/` — Pinia stores. `index.ts` initializes Pinia; individual store files use `defineStore`.
- `src/boot/` — Quasar boot files (plugins that run before the Vue app mounts). Add entries here and register them in `quasar.config.ts → boot[]`.
- `src/css/app.scss` — Global styles entry point.
- `quasar.config.ts` — Central config for build targets, Vite plugins, extras (icons/fonts), framework plugins, and SSR/PWA/Electron settings.

## Convenções Vue / `<script setup>`

### Exposição de dados ao template

- **Composables de framework** (e.g. `useQuasar()`, `useRouter()`) **não devem ser expostos diretamente ao template**. Extraia os valores necessários em `const`, `ref` ou `computed`:

  ```ts
  // ✅ correto
  const $q = useQuasar();
  const quasarVersion = $q.version;              // const simples
  const darkMode = computed(() => $q.dark.isActive); // computed reativo

  // ❌ evitar
  // {{ $q.version }} no template
  ```

- **Composables customizados** (e.g. `useForm()`, `useUpload()`) podem ser desestruturados e expostos normalmente:

  ```ts
  const { form, validateForm } = useForm(); // ✅ pode ser usado diretamente no template
  ```

### Nomenclatura de funções no template

Funções chamadas por eventos do template (`@click`, `@submit`, etc.) devem ter o nome iniciado por `handle`:

```ts
const handleToggleDarkMode = () => { ... };  // ✅
const handleSubmitForm = () => { ... };       // ✅

function toggleDrawer() { ... }               // ❌ não segue a convenção
```

## Quasar-specific conventions

- Icons use `material-icons`, font is `roboto-font` (both configured in `quasar.config.ts → extras`).
- Path aliases `layouts/`, `pages/`, `components/`, `stores/`, `boot/`, `assets/` resolve relative to `src/` — no `../` traversal needed in imports.
- Type imports must use `import type` syntax (enforced by ESLint rule `@typescript-eslint/consistent-type-imports`).
