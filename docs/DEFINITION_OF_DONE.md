# Definition of Done — Gerenciador de Arquivos Bancários

> Requisitos globais da aplicação. Todo ciclo de desenvolvimento deve satisfazer **todos** estes critérios, independente da feature implementada. Os agentes ARCH, DEV e QA devem consultar este arquivo em toda execução.
>
> Os critérios de aceite específicos de cada funcionalidade ficam na seção **Acceptance Criteria** do `docs/SPEC.md` do ciclo.

---

## 1. Qualidade TypeScript

- Sem tipos `any` — todos os tipos devem ser explícitos.
- Use `import type` para imports exclusivamente de tipo (regra ESLint ativa).
- `noUncheckedIndexedAccess` ativo: todo acesso a array deve ser protegido.
- `exactOptionalPropertyTypes` ativo: não atribua `undefined` a propriedades opcionais.
- TypeScript strict mode ativo — nenhum `// @ts-ignore` ou `// @ts-nocheck` sem justificativa documentada.

## 2. Arquitetura MVVM (fronteira obrigatória)

| Camada | Pasta | Regra |
|--------|-------|-------|
| **Model** | `src/model/` | TypeScript puro. **Zero** imports de Vue, Pinia, Quasar ou qualquer framework. |
| **ViewModel** | `src/composables/` | Composables `.ts`. Única ponte Model↔View: chama Model, expõe estado reativo. |
| **View** | `src/pages/`, `src/components/`, `src/layouts/` | Arquivos `.vue`. **Nunca** importam diretamente de `src/model/`. |

- Mutações de estado de store pertencem a `src/stores/`.
- Lógica CNAB pertence a `src/model/lib/cnab/`.

## 3. Convenções Vue / Quasar

- `<script setup lang="ts">` em todos os componentes.
- Props via `defineProps<Props>()` com interface explícita.
- Emits via `defineEmits<{ ... }>()`.
- **Sem** imports explícitos de componentes Quasar em arquivos `.vue` — eles são auto-importados.
- Aliases de path do Quasar nas importações: `components/`, `layouts/`, `pages/`, `stores/`, `boot/`, `assets/`, `composables/`, `model/`.

## 4. Pinia Stores

- Um store por conceito de domínio (ex.: `useLayoutStore`, `useCnabStore`).
- `acceptHMRUpdate` exportado no final de cada arquivo de store.
- Sem manipulação direta do DOM dentro de stores.
- Todo estado da aplicação vive no Pinia — sem `localStorage` ou `sessionStorage`.

## 5. Corretude CNAB

- Linhas CNAB240: exatamente **240** caracteres + terminação `\r\n`.
- Linhas CNAB400: exatamente **400** caracteres + terminação `\r\n`.
- Campos numéricos: alinhados à direita, preenchidos com zeros à esquerda.
- Campos alfanuméricos: alinhados à esquerda, preenchidos com espaços à direita.
- Totalizadores e números sequenciais calculados corretamente.
- Códigos de tipo de registro conformes à especificação FEBRABAN.

## 6. Qualidade dos Testes

- Toda função TypeScript pura nova ou modificada possui testes unitários (`.test.ts`).
- Todo componente Vue novo ou modificado possui pelo menos um teste de componente (`.spec.ts`).
- Testes verificam **comportamento observável** (saídas, efeitos), não estado interno.
- Sem testes ignorados (`it.skip`, `describe.skip`, `xit`, `xdescribe`).
- Arquivos de teste espelham a estrutura de `src/` dentro de `tests/vitest/`.

## 7. Pipeline de Qualidade (obrigatório antes do relatório)

```bash
npm run lint   # deve produzir 0 erros
npm test       # deve produzir 0 falhas
```

Nenhum ciclo pode ser considerado concluído com lint ou testes com falha.

## 8. Restrições de Runtime

- A aplicação é **100% client-side** — sem backend, chamadas de API externas ou banco de dados.
- Sem uso de `localStorage`, `sessionStorage` ou cookies para persistência de estado.
- A aplicação deve funcionar como SPA em modo hash (`vueRouterMode: 'hash'`).
