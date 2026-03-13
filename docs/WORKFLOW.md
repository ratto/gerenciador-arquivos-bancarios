# Workflow Multi-Agente de Desenvolvimento

## Visão Geral

```
Humano → AGENT_ARCH ──────────────────────────────────────────────────────┐
              │                                                             │
              ▼                                                             │
         AGENT_DEV (nova instância, TDD)                                   │
              │                                                             │
              │  DEV_REPORT.md                                              │
              ▼                                                             │
         AGENT_QA (nova instância)                                          │
              │                                                             │
      ┌───────┴────────┐                                                    │
      │ Bug encontrado │  Sem bugs                                          │
      ▼                ▼                                                     │
 AGENT_DEV          Testes E2E                                              │
 (nova instância,    (AGENT_QA)                                             │
  fix TDD)              │                                                   │
      │             QA_REPORT.md                                            │
      │  (+1 volta)      └──────────────────────────────────────────────►  │
      └──────► AGENT_QA (nova instância)                                    │
                                                                            │
         Se voltas > 3: AGENT_ARCH interrompe e avisa o humano  ◄──────────┘
```

O AGENT_ARCH orquestra todo o ciclo. Ele **não implementa código** — delega a agentes e monitora relatórios. Cada agente é **uma nova instância** iniciada pelo AGENT_ARCH ou AGENT_QA via ferramenta Agent.

## Pré-requisitos

1. `npm install` — instala todas as dependências incluindo vitest e cypress.
2. `.claude/agents/arch.md`, `.claude/agents/dev.md`, `.claude/agents/qa.md` existem (commitados no repositório).

## Iniciando um Novo Ciclo de Desenvolvimento

### Passo 1 — Atualize develop e crie a branch

```bash
git checkout develop
git pull origin develop
git checkout -b [tipo]/[número-da-spec]-[breve-descrição]
# Exemplo: git checkout -b feature/1-implementar-tema-escuro
```

### Passo 2 — Escreva a spec

Copie `docs/SPEC_TEMPLATE.md` para `docs/SPEC.md` e preencha todas as seções.
A spec representa uma história de usuário ou fatia de funcionalidade.

### Passo 3 — Acione o workflow

Na sessão principal do Claude Code, diga:

> "Use o AGENT_ARCH para ler docs/SPEC.md e projetar as tarefas deste ciclo."

O AGENT_ARCH irá:
1. Ler `docs/SPEC.md` e o estado atual de `src/`.
2. Escrever `docs/TASKS.md`.
3. Iniciar uma nova instância de AGENT_DEV com instrução de usar TDD.

### Passo 4 — Acompanhe o ciclo de QA

Quando o AGENT_DEV terminar, escreve `docs/DEV_REPORT.md`.
O AGENT_ARCH inicia uma nova instância de AGENT_QA automaticamente.

O AGENT_QA pode:
- **Encontrar bugs** → inicia novo AGENT_DEV para corrigir. O AGENT_ARCH contabiliza +1 volta.
- **Não encontrar bugs** → implementa testes E2E, escreve `docs/QA_REPORT.md` e encerra.

### Passo 5 — Revise o resultado final

Leia `docs/QA_REPORT.md`:
- **APROVADO**: O AGENT_ARCH faz push da branch de feature para o GitHub. O merge na `develop` e o restante do pipeline ficam por conta do humano.
- **INTERROMPIDO (> 3 voltas)**: O AGENT_ARCH interrompe todos os agentes e notifica o humano para revisão manual.

## Fluxo Detalhado por Agente

### AGENT_ARCH

1. Lê `docs/SPEC.md`.
2. Explora `src/` com Glob/Grep.
3. Escreve `docs/TASKS.md` (inclui campo `volta: 0`).
4. Inicia AGENT_DEV (nova instância) com: _"Leia docs/TASKS.md e implemente usando TDD."_
5. Aguarda `docs/DEV_REPORT.md`.
6. Inicia AGENT_QA (nova instância) com: _"Leia docs/DEV_REPORT.md e execute o ciclo de QA. Esta é a volta N."_
7. Aguarda `docs/QA_REPORT.md`.
8. Se `status: APROVADO` → faz `git push origin HEAD` e notifica o humano.
9. Se `status: BUGS_ENCONTRADOS` e volta ≤ 3 → incrementa volta, inicia novo AGENT_QA.
10. Se volta > 3 → interrompe tudo, escreve `docs/QA_REPORT.md` com `status: INTERROMPIDO` e notifica o humano.

### AGENT_DEV (nova instância a cada invocação)

Segue **TDD estrito**:
1. Para cada tarefa: escreve o teste primeiro → confirma que falha → implementa → confirma que passa → próxima tarefa.
2. Ao terminar todas as tarefas, executa `npm run lint` e `npm test`.
3. Escreve `docs/DEV_REPORT.md`.

### AGENT_QA (nova instância a cada invocação)

1. Lê `docs/DEV_REPORT.md`.
2. Faz code review completo (ver checklist no agent).
3. Executa `npm run lint` e `npm test`.
4. Se bugs encontrados:
   - Escreve `docs/TASKS.md` de remediação (tarefas `[FIX]`).
   - Inicia novo AGENT_DEV (nova instância) com: _"Leia docs/TASKS.md e corrija usando TDD."_
   - Aguarda novo `docs/DEV_REPORT.md`.
   - Repete o code review.
5. Se sem bugs:
   - Implementa testes E2E em `tests/e2e/`.
   - Escreve `docs/QA_REPORT.md` com `status: APROVADO`.

## Contador de Voltas (Responsabilidade do AGENT_ARCH)

```
Volta 0 → desenvolvimento inicial
Volta 1 → primeira rodada de correção
Volta 2 → segunda rodada de correção
Volta 3 → terceira rodada de correção (limite máximo)
Volta 4 → AGENT_ARCH INTERROMPE. Notifica humano.
```

O campo `volta` é registrado em `docs/TASKS.md` e em cada `docs/DEV_REPORT.md`.
Se o AGENT_ARCH detectar volta > 3, ele:
1. Não inicia novos agentes.
2. Escreve `docs/QA_REPORT.md` com `status: INTERROMPIDO`, descrevendo os bugs persistentes.
3. Notifica o humano para intervenção manual.

## Invocação Manual de Agentes

Você pode invocar qualquer agente diretamente na sessão principal:

> "Use o AGENT_DEV para ler docs/TASKS.md e implementar todas as tarefas usando TDD."
> "Use o AGENT_QA para ler docs/DEV_REPORT.md e iniciar o ciclo de QA. Esta é a volta 1."
> "Use o AGENT_ARCH para ler docs/SPEC.md e projetar as tarefas deste ciclo."

## Ciclo de Vida dos Artefatos

```
docs/SPEC.md             ← humano escreve (um por ciclo)
docs/TASKS.md            ← AGENT_ARCH escreve (inicial) ou AGENT_QA escreve (remediação)
docs/DEV_REPORT.md       ← AGENT_DEV escreve, AGENT_QA lê
docs/QA_REPORT.md        ← AGENT_QA escreve (APROVADO) ou AGENT_ARCH escreve (INTERROMPIDO)
```

Os artefatos são commitados junto com as mudanças de código e servem como trilha de auditoria.

## Referência de Comandos de Teste

| Comando | Finalidade | Executado por |
|---------|-----------|---------------|
| `npm test` | Executa todos os testes unitários + componente uma vez | AGENT_DEV, AGENT_QA |
| `npm run test:watch` | Modo watch durante desenvolvimento | AGENT_DEV (TDD) |
| `npm run test:cov` | Gera relatório de cobertura | AGENT_QA (opcional) |
| `npm run test:e2e` | Executa testes Cypress E2E | AGENT_QA |
| `npm run test:e2e:open` | Abre o Cypress interativo | debug humano |
| `npm run lint` | ESLint em todos os arquivos fonte | AGENT_DEV, AGENT_QA |

## Estratégia de Branches

```
main
 └── develop
      └── [tipo]/[número-da-spec]-[breve-descrição]   ← agentes trabalham aqui
```

**Convenção de nomenclatura:**
- `tipo` → `feature` | `fix` | `refactor` | `chore` | `docs`
- `número` → número da SPEC (ex.: 1, 2, 3…)
- `descrição` → slug curto em kebab-case

**Exemplos:**
- `feature/1-implementar-tema-escuro`
- `fix/2-corrigir-parsing-cnab240`

**Fluxo:**
1. Humano atualiza `develop` e cria a branch de feature antes de acionar o AGENT_ARCH.
2. Agentes trabalham na branch de feature.
3. Após QA APROVADO, o AGENT_ARCH faz push da branch de feature para o GitHub.
4. O humano faz o merge na `develop` e gerencia o restante do pipeline (CI/CD, merge em `main`, etc.).

## Estrutura de Diretórios Após Setup

```
.claude/
  agents/
    arch.md
    dev.md
    qa.md
docs/
  PRD.md
  WORKFLOW.md              ← este arquivo
  SPEC_TEMPLATE.md
  TASKS_TEMPLATE.md
  DEV_REPORT_TEMPLATE.md
  QA_REPORT_TEMPLATE.md
  SPEC.md                  ← humano gerencia por ciclo
  TASKS.md                 ← agentes gerenciam
  DEV_REPORT.md            ← agentes gerenciam
  QA_REPORT.md             ← agentes gerenciam
src/
  model/                   ← Model: TypeScript puro, zero dependência de framework
    lib/
      cnab/
        layouts/           ← definições declarativas de leiaute CNAB
    utils/                 ← utilitários TypeScript puros
  composables/             ← ViewModel: composables que conectam Model e View
  stores/
  components/
  pages/
tests/
  vitest/                  ← testes unitários e de componente (Vitest)
    src/                   ← espelha a estrutura de src/
      model/
        lib/
          cnab/
            layouts/
      composables/
      stores/
      components/
      pages/
  e2e/                     ← testes Cypress
    support/
      e2e.ts
vitest.config.ts
vitest.setup.ts
cypress.config.ts
```
