# Workflow Multi-Agente de Desenvolvimento

## Visão Geral

```
Humano → [sessão Claude Code] → AGENT_ARCH ──┬──→ AGENT_DEV (subagente)
                                              │        │
                                              │    DEV_REPORT.md
                                              │        │
                                              └──→ AGENT_QA (subagente)
                                              │        │
                                              │    QA_REPORT.md
                                              │        │
                                              └── merge develop (se aprovado)
                                              ↑________|
                                         (loop de remediação se reprovado)
```

A sessão principal do Claude Code invoca o **AGENT_ARCH** como agente. O ARCH, por sua vez, invoca **AGENT_DEV** e **AGENT_QA** como **subagentes** — cada um roda em contexto completamente novo e independente (equivalente a uma nova aba). Como os subagentes não herdam o contexto do ARCH, o prompt de invocação deve conter **todo o contexto necessário** para que o subagente execute sua tarefa de forma autônoma.

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
3. Invocar o AGENT_DEV automaticamente.

### Passo 4 — Monitore o progresso do DEV (subagente)

O AGENT_ARCH invoca o AGENT_DEV como **subagente em contexto separado**. O DEV trabalha de forma autônoma: implementa código, roda lint e testes, e escreve `docs/DEV_REPORT.md`. Quando o subagente retorna, o ARCH lê o relatório e prossegue.

> **Importante:** O AGENT_DEV não tem acesso ao contexto do ARCH. O prompt de invocação deve incluir: branch atual, stack, caminhos dos arquivos relevantes, e a instrução "Leia docs/TASKS.md e implemente todas as tarefas."

### Passo 5 — Monitore o progresso do QA (subagente)

O AGENT_ARCH invoca o AGENT_QA como **subagente em contexto separado**. O QA faz code review, executa testes, implementa testes E2E (se aprovado), e escreve `docs/QA_REPORT.md`.

> **Importante:** O AGENT_QA também não herda contexto. O prompt deve incluir: branch atual, stack, e a instrução "Leia docs/DEV_REPORT.md e inicie o ciclo de QA."

### Passo 6 — Revise o resultado do QA

Leia `docs/QA_REPORT.md`:
- **APROVADO**: O AGENT_ARCH faz o merge da branch na `develop` e push para o GitHub automaticamente. O humano gerencia o pipeline (CI/CD, merge em `main`, etc.) a partir daí.
- **REPROVADO**: O AGENT_ARCH invoca um novo AGENT_DEV (subagente) com o TASKS.md de remediação escrito pelo QA. Monitore `docs/DEV_REPORT.md` para o próximo ciclo.

## Invocação Manual de Agentes

Você pode invocar qualquer agente diretamente na sessão principal:

> "Use o AGENT_ARCH para ler docs/SPEC.md e projetar as tarefas deste ciclo."

Para invocação direta de subagentes (sem o ARCH como orquestrador):

> "Use o AGENT_DEV para ler docs/TASKS.md e implementar todas as tarefas."
> "Use o AGENT_QA para ler docs/DEV_REPORT.md e iniciar o ciclo de QA."

**Nota:** Ao invocar subagentes manualmente, lembre-se de fornecer contexto completo no prompt, pois eles rodam em contexto isolado.

## Modelo de Contexto dos Subagentes

| Agente | Tipo | Contexto |
|--------|------|----------|
| AGENT_ARCH | Agente principal | Invocado pela sessão Claude Code. Tem acesso ao histórico da conversa. |
| AGENT_DEV | Subagente do ARCH | Contexto completamente novo. Recebe instruções via prompt do ARCH. |
| AGENT_QA | Subagente do ARCH | Contexto completamente novo. Recebe instruções via prompt do ARCH. |

Os subagentes leem toda informação necessária dos artefatos em disco (`TASKS.md`, `DEV_REPORT.md`, `CLAUDE.md`, etc.) e dos arquivos de definição do agente (`.claude/agents/*.md`). O prompt de invocação deve orientá-los sobre **o que fazer**, não sobre **como fazer** — o "como" está nos arquivos `.md` do agente.

## Ciclo de Vida dos Artefatos

```
docs/SPEC.md             ← humano escreve (um por ciclo)
docs/TASKS.md            ← AGENT_ARCH escreve, AGENT_DEV lê
docs/DEV_REPORT.md       ← AGENT_DEV escreve, AGENT_QA lê
docs/QA_REPORT.md        ← AGENT_QA escreve, humano lê
```

Os artefatos são commitados junto com as mudanças de código e servem como trilha de auditoria de cada ciclo.

## Referência de Comandos de Teste

| Comando | Finalidade | Executado por |
|---------|-----------|---------------|
| `npm test` | Executa todos os testes unitários + componente uma vez | AGENT_DEV, AGENT_QA |
| `npm run test:watch` | Modo watch durante desenvolvimento | AGENT_DEV |
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
1. Humano atualiza `develop` e cria a branch antes de acionar o AGENT_ARCH.
2. Agentes trabalham na branch de feature.
3. Após QA APROVADO, o AGENT_ARCH faz merge na `develop` e push para o GitHub.
4. O humano gerencia o pipeline (CI/CD, merge em `main`, etc.) a partir daí.

## Contador de Ciclos

Acrescente o número do ciclo ao TASKS.md e nos relatórios:
- Primeiro ciclo: "Ciclo 1"
- Após remediação por QA REPROVADO: "Ciclo 2", etc.

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
