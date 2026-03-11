# TASKS — [Nome da Funcionalidade] — Ciclo [N]

> Escrito pelo AGENT_ARCH. Lido pelo AGENT_DEV.
> Não modifique este arquivo durante a implementação; acrescente notas ao DEV_REPORT.md.

## Contexto

Breve resumo da funcionalidade e sua posição no roadmap do PRD.

## Pré-requisitos

- Branch atual: `main` (ou especifique a branch de feature)
- Execute `npm install` se novas dependências forem listadas na Tarefa 0.

## Tarefas

---

### Tarefa 0 — Dependências (se houver)

**Tipo**: setup
**Arquivos**: `package.json`

Instale os seguintes pacotes:

```
npm install [pacote] ...
npm install -D [pacote-dev] ...
```

**Aceite**: `node_modules/[pacote]` existe e `npm run build` ainda funciona.

---

### Tarefa 1 — [Título da Tarefa]

**Tipo**: `model | composable | store | component | page | test`
**Arquivos a criar**:
- `src/model/lib/cnab/...`  ← Model: TypeScript puro, zero framework

**Arquivos a modificar**:
- `src/composables/...`     ← ViewModel: ponte entre Model e View
- `src/stores/...`

**Descrição**:
Descrição detalhada do que implementar. Inclua nomes exatos de campos,
posições CNAB (se relevante), tipos TypeScript a definir.

**Critérios de Aceite**:
- [ ] CA1: ...
- [ ] Testes unitários: `tests/vitest/src/model/lib/cnab/tarefa1.test.ts` cobre [...].

---

### Tarefa 2 — [Título da Tarefa]

(mesma estrutura)

---

## Resumo de Requisitos de Teste

| Tarefa | Arquivo de teste | Tipo | Cobertura alvo |
|--------|-----------------|------|----------------|
| 1 | `tests/vitest/src/model/lib/cnab/tarefa1.test.ts` | unitário | todas as funções exportadas |
| 2 | `src/components/__tests__/MeuComp.spec.ts` | componente | render + interação do usuário |

## Definição de Pronto

- [ ] Todas as tarefas implementadas.
- [ ] `npm run lint` sai com código 0.
- [ ] `npm test` sai com código 0 e 0 falhas.
- [ ] `docs/DEV_REPORT.md` escrito.
