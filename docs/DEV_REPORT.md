# DEV REPORT — Identidade Visual GAB — Ciclo 004

> Escrito pelo AGENT_DEV após concluir todas as tarefas.
> Lido pelo AGENT_QA.

## Resumo

Implementação completa da identidade visual GAB conforme o guia `docs/identidade-visual-gab.md` e os Acceptance Criteria do `docs/SPEC.md`. O ciclo cobriu: paleta de cores da marca no Quasar, variáveis SCSS, CSS variables globais, SCSS de consistência de formulários, fontes Google Fonts via CDN, boot file de dark mode, `LandingLayout` sem topbar, rota raiz atualizada, `LandingPage` com 6 seções completas, `MainLayout` refatorado para uso futuro com toggle no drawer, e testes de componente para ambos os layouts.

## Status

- [x] Todas as tarefas do TASKS.md concluídas (Tarefas 1 a 10)
- [x] `npm run lint` passou — saída vazia (0 erros, 0 warnings)
- [x] `npm test` passou — `Test Files  2 passed (2)` | `Tests  16 passed (16)`

## Arquivos Alterados

| Arquivo | Tipo de mudança | Descrição |
|---------|----------------|-----------|
| `src/css/quasar.variables.scss` | modificado | Paleta de cores GAB substituindo os defaults do Quasar |
| `quasar.config.ts` | modificado | `dark: true`, objeto `brand` com 8 cores, plugin `Dark`, boot `dark-mode` |
| `src/css/app.scss` | modificado | CSS variables globais `--gab-*` e import de `form-consistency` |
| `src/css/form-consistency.scss` | criado | SCSS de consistência de formulários: Inter 16px, 44px, border-radius 4px |
| `index.html` | modificado | `lang="pt-BR"`, tags `<link>` do Google Fonts (Inter + JetBrains Mono) |
| `src/boot/dark-mode.ts` | criado | Boot file que chama `Dark.set(true)` na inicialização |
| `src/layouts/LandingLayout.vue` | criado | Layout minimalista sem QHeader, apenas `<router-view />` |
| `src/layouts/MainLayout.vue` | modificado | Removido QHeader; toggle dark mode movido para o QDrawer |
| `src/router/routes.ts` | modificado | Rota raiz usa `LandingLayout` + `LandingPage` |
| `src/pages/LandingPage.vue` | criado | Landing page com 6 seções: Hero, Features, Como Funciona, Tecnologias, CTA Final, Footer + QDrawer retrátil |
| `tests/vitest/src/layouts/MainLayout.spec.ts` | modificado | Stubs atualizados para QToggle; testes adaptados para nova estrutura sem QHeader |
| `tests/vitest/src/pages/LandingPage.spec.ts` | criado | 12 testes de componente cobrindo: hero, FAB, drawer, toggle dark mode, seções, footer |

## Decisões de Arquitetura

1. Decisão: SCSS scoped com `:global(.body--dark)` em vez de `.body--dark &` na LandingPage.
   Motivo: Como o componente usa `<style lang="scss" scoped>`, os seletores de contexto que referenciam elementos fora do componente (como `.body--dark` no `<body>`) precisam de `:global()` para não serem reescritos pelo hash de scoping do Vue. Sem isso, as regras de dark mode nunca seriam aplicadas.

2. Decisão: `QDrawerStub` no spec da LandingPage renderiza o slot apenas quando `modelValue` é `true`.
   Motivo: Permite testar o comportamento de abertura do drawer de forma realista — antes do clique no FAB o toggle não existe no DOM, após o clique fica visível.

3. Decisão: A LandingPage não usa `QPage` (que requer `QLayout`), conforme determinado pelas restrições técnicas da spec. Toda a estrutura é composta de `<div>`, `<section>`, `<footer>` semânticos.

4. Decisão: `data-testid="dark-mode-toggle"` preservado tanto no `MainLayout` quanto na `LandingPage`.
   Motivo: A spec (AC10) exige que o testid seja mantido para compatibilidade com os testes E2E existentes (`tests/e2e/dark-mode.cy.ts`). Como a rota raiz agora é a `LandingPage`, os testes E2E encontrarão o toggle nela.

## Limitações Conhecidas / Dívida Técnica

- Os warnings de `v-ripple` nos testes são esperados — a diretiva não é registrada no ambiente Vitest. Não afetam os resultados dos testes.
- Os links de navegação do QDrawer na LandingPage (Início, Funcionalidades, Como Funciona) usam ancora sem `href` — navegação por scroll será implementada em ciclo futuro.
- O botão "Acessar o app" no CTA final e na hero ainda não tem rota definida — aguarda implementação das rotas internas em ciclos futuros.
- O arquivo `src/pages/IndexPage.vue` ainda existe no repositório mas não é mais referenciado por nenhuma rota. Pode ser removido em ciclo futuro.

## Saída dos Testes

```
> gerenciador-arquivos-bancarios@0.0.1 test
> vitest run

 RUN  v4.0.18 /home/ratto/Workspace/app/gerenciador-arquivos-bancarios

 ✓ tests/vitest/src/pages/LandingPage.spec.ts (12 tests) 105ms
 ✓ tests/vitest/src/layouts/MainLayout.spec.ts (4 tests) 53ms

 Test Files  2 passed (2)
      Tests  16 passed (16)
```

## Saída do Lint

```
> gerenciador-arquivos-bancarios@0.0.1 lint
> eslint -c ./eslint.config.js "./src*/**/*.{ts,js,cjs,mjs,vue}"

(saída vazia — 0 erros, 0 warnings)
```

## Notas para o QA

- Verificar que AC8 (sem QHeader na rota raiz) está satisfeito: `LandingLayout.vue` não contém `QHeader` nem `QLayout`.
- Verificar AC10 (toggle exclusivamente no drawer): o `data-testid="dark-mode-toggle"` está no QDrawer tanto do `MainLayout.vue` quanto da `LandingPage.vue`.
- Verificar AC15 (testes do MainLayout continuam passando): 4 testes passam.
- Verificar AC16 (testes da LandingPage): 12 testes cobrem hero, FAB, drawer, toggle, seções com aria-label e footer.
- A feature não envolve lógica CNAB — a seção de corretude CNAB no QA_REPORT pode ser marcada como N/A.
- Os warnings de Vue nos testes são esperados e documentados acima.
