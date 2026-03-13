# DEV REPORT — 01 - Dark Mode — Ciclo 1

> Escrito pelo AGENT_DEV apos concluir todas as tarefas.
> Lido pelo AGENT_QA.

## Resumo

Implementacao do suporte a dark mode na aplicacao. A feature consiste em:
1. Configuracao do Quasar Dark Plugin para deteccao automatica de preferencia do sistema (`dark: 'auto'` em `quasar.config.ts`).
2. Botao de toggle no toolbar do `MainLayout.vue` com icone dinamico, aria-label acessivel e acao de alternancia imediata.
3. Suite de 6 testes de componente para `MainLayout.vue` cobrindo renderizacao, icones dinamicos, aria-labels e interacao de click.

## Status

- [x] Todas as tarefas do TASKS.md concluidas
- [x] `npm run lint` passou (0 erros, 0 warnings)
- [x] `npm test` passou (6 tests passed, 1 test file, 0 failures)

## Arquivos Alterados

| Arquivo | Tipo de mudanca | Descricao |
|---------|----------------|-----------|
| `quasar.config.ts` | modificado | Adicionado `dark: 'auto'` em `framework.config` para deteccao automatica de tema do sistema |
| `src/layouts/MainLayout.vue` | modificado | Adicionado `q-btn` de toggle com icone dinamico, aria-label e data-testid; importado `useQuasar` |
| `tests/vitest/src/layouts/MainLayout.spec.ts` | criado | 6 testes de componente: renderizacao do toggle, icone claro/escuro, aria-label claro/escuro, chamada ao toggle |

## Decisoes de Arquitetura

1. Decisao: Nao criar composable ou Pinia store para o dark mode.
   Motivo: Conforme especificado na SPEC, o Quasar Dark Plugin ja mantem estado reativo global via `$q.dark`. A logica e simples o suficiente para residir diretamente no `<script setup>` de `MainLayout.vue` via `useQuasar()`.

2. Decisao: Usar stubs customizados nos testes em vez dos stubs `true` globais.
   Motivo: O `vitest.setup.ts` registra `QBtn: true` como stub global, que renderiza `<q-btn-stub>` sem preservar atributos como `data-testid`. Para possibilitar a selecao por `data-testid`, o teste usa um stub customizado `QBtnStub` que renderiza como `<button>` preservando todos os atributos via `inheritAttrs: true`.

## Limitacoes Conhecidas / Divida Tecnica

- Warnings de Vue sobre "extraneous non-props attributes" aparecem durante os testes. Sao inofensivos e decorrem dos stubs passthrough que nao declaram props para os atributos dos componentes Quasar (ex.: `view`, `elevated`, `bordered`). Nao afetam a corretude dos testes.

## Saida dos Testes

```
 RUN  v4.0.18 /home/ratto/Workspaces/app/gerenciador-arquivos-bancarios

 v tests/vitest/src/layouts/MainLayout.spec.ts (6 tests) 56ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  01:41:47
   Duration  862ms (transform 217ms, setup 101ms, import 192ms, tests 56ms, environment 230ms)
```

## Saida do Lint

```
> gerenciador-arquivos-bancarios@0.0.1 lint
> eslint -c ./eslint.config.js "./src*/**/*.{ts,js,cjs,mjs,vue}"

(sem erros)
```

## Notas para o QA

- A feature nao envolve logica CNAB — a secao de "Verificacao de Corretude CNAB" do QA_REPORT pode ser marcada como N/A.
- Os warnings de Vue nos testes sao esperados e documentados acima.
- O teste de click (`calls $q.dark.toggle()`) verifica que a funcao mock `toggle` foi chamada exatamente 1 vez apos o click, validando a integracao entre o template e o `useQuasar()`.
