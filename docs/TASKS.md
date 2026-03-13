# TASKS — 01 - Dark Mode — Ciclo 1

> Escrito pelo AGENT_ARCH. Lido pelo AGENT_DEV.
> Nao modifique este arquivo durante a implementacao; acrescente notas ao DEV_REPORT.md.

## Contexto

Adicionar suporte a dark mode na aplicacao. O Quasar Dark Plugin ja esta disponivel no bundle — basta configura-lo para deteccao automatica via `prefers-color-scheme` e expor um toggle no toolbar do layout principal. Nao ha camada Model, composable ou Pinia store envolvidos; toda a logica reside diretamente na View via `useQuasar()`.

## Pre-requisitos

- Branch atual: `feature/01-dark-mode`
- Nenhuma dependencia nova a instalar.

## Tarefas

---

### Tarefa 1 — Habilitar deteccao automatica de tema do sistema

**Tipo**: config
**Arquivos a modificar**:
- `quasar.config.ts`

**Descricao**:
No objeto `framework.config` de `quasar.config.ts`, adicionar a chave `dark` com o valor `'auto'`. Isso instrui o Quasar Dark Plugin a ler a media query `prefers-color-scheme: dark` na inicializacao da aplicacao e aplicar o tema correspondente sem nenhum codigo adicional em runtime.

**Criterios de Aceite**:
- [ ] CA1: `quasar.config.ts` contem `dark: 'auto'` dentro de `framework.config`.
- [ ] A aplicacao carregada em um sistema com preferencia escura aplica automaticamente `body--dark` no `<body>` sem acao do usuario.

---

### Tarefa 2 — Adicionar toggle de dark mode no toolbar do MainLayout

**Tipo**: component
**Arquivos a modificar**:
- `src/layouts/MainLayout.vue`

**Descricao**:
No `<script setup>` de `MainLayout.vue`, importar `useQuasar` de `'quasar'` e instanciar `const $q = useQuasar()`. No `<template>`, adicionar um `<q-btn>` no lado direito do `q-toolbar` (apos o `<div>` que exibe a versao do Quasar) com as seguintes caracteristicas:

- `flat round dense` (consistente com o botao de menu existente).
- `:icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"` — icone dinamico.
- `:aria-label="$q.dark.isActive ? 'Ativar modo claro' : 'Ativar modo escuro'"` — acessibilidade.
- `data-testid="dark-mode-toggle"` — seletor para testes.
- `@click="$q.dark.toggle()"` — acao de alternancia.

**Criterios de Aceite**:
- [ ] CA2: Um `q-btn` com icone dinamico (`dark_mode` / `light_mode`) aparece no lado direito do toolbar.
- [ ] CA3: Clicar no botao alterna o tema imediatamente via `$q.dark.toggle()` sem recarregar a pagina.
- [ ] O `aria-label` alterna entre `"Ativar modo escuro"` e `"Ativar modo claro"` conforme o estado.
- [ ] O botao e focavel via teclado (comportamento padrao de `q-btn`).
- [ ] O atributo `data-testid="dark-mode-toggle"` esta presente no botao.

---

### Tarefa 3 — Testes de componente para MainLayout

**Tipo**: test
**Arquivos a criar**:
- `tests/vitest/src/layouts/MainLayout.spec.ts`

**Descricao**:
Criar testes de componente para `MainLayout.vue` usando Vitest e `@vue/test-utils`. O `useQuasar` deve ser mockado via `vi.mock('quasar')` com um objeto controlavel que expoe `dark.isActive` (getter reativo) e `dark.toggle` (mock function). Componentes Quasar devem ser stubados para evitar dependencias de runtime.

**Estrategia de stubs**:
O `vitest.setup.ts` global registra `QBtn: true` como stub, que nao preserva atributos como `data-testid` no DOM. Para contornar isso, o teste deve usar `global.stubs` local com:
- Stubs passthrough (renderizam slot default) para componentes de layout: `QLayout`, `QHeader`, `QToolbar`, `QToolbarTitle`, `QPageContainer`, `QDrawer`, `QList`, `QItem`, `QItemSection`, `QItemLabel`.
- Um stub customizado de `QBtn` que renderiza como `<button>` preservando todos os atributos (`inheritAttrs: true`, render via `h('button', { ...attrs })`).
- `EssentialLink: true` e `router-view: true` como stubs simples.

**Cenarios de teste obrigatorios (6 testes)**:

1. **Renderizacao do botao de toggle**: verificar que o componente renderiza um elemento com `data-testid="dark-mode-toggle"`.
2. **Icone no modo claro (padrao)**: verificar que o botao recebe `icon="dark_mode"` quando `darkState.isActive` e `false`.
3. **Icone no modo escuro ativo**: setar `darkState.isActive = true` antes de montar, verificar que o botao recebe `icon="light_mode"`.
4. **aria-label no modo claro**: verificar que o `aria-label` e `"Ativar modo escuro"` quando o modo claro esta ativo.
5. **aria-label no modo escuro**: verificar que o `aria-label` e `"Ativar modo claro"` quando o modo escuro esta ativo.
6. **Chamada ao toggle**: emitir evento `click` no botao e verificar que `toggle` do mock foi chamado.

**Criterios de Aceite**:
- [ ] Arquivo `tests/vitest/src/layouts/MainLayout.spec.ts` existe.
- [ ] Os 6 cenarios listados acima possuem pelo menos um `it` / `test` cada.
- [ ] `npm test` executa o arquivo sem erros e todos os testes passam.
- [ ] Nenhum `console.error` nao tratado durante os testes (warnings de Vue sobre atributos extra sao aceitaveis).

---

## Resumo de Requisitos de Teste

| Tarefa | Arquivo de teste | Tipo | Cobertura alvo |
|--------|-----------------|------|----------------|
| 3 | `tests/vitest/src/layouts/MainLayout.spec.ts` | componente | renderizacao do toggle, icone dinamico, aria-label dinamico, chamada ao toggle |

## Definicao de Pronto

- [ ] Todas as tarefas implementadas.
- [ ] `npm run lint` sai com codigo 0.
- [ ] `npm test` sai com codigo 0 e 0 falhas.
- [ ] `docs/DEV_REPORT.md` escrito.
