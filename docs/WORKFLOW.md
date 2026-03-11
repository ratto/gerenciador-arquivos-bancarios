# Workflow Multi-Agente de Desenvolvimento

## Visão Geral

```
Humano → [sessão Claude Code] → AGENT_ARCH → AGENT_DEV → AGENT_QA
                                                   ↑___________|
                                             (loop de remediação)
```

A sessão principal do Claude Code atua como orquestradora. Ela não implementa código diretamente — aciona agentes e monitora os relatórios.

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

### Passo 4 — Monitore o progresso do DEV

O AGENT_DEV trabalha de forma autônoma. Quando concluir, escreve `docs/DEV_REPORT.md`.
O AGENT_ARCH então invoca o AGENT_QA automaticamente.

### Passo 5 — Revise o resultado do QA

Leia `docs/QA_REPORT.md`:
- **APROVADO**: O AGENT_ARCH faz o merge da branch na `develop` e push para o GitHub automaticamente. O humano gerencia o pipeline (CI/CD, merge em `main`, etc.) a partir daí.
- **REPROVADO**: O AGENT_QA já invocou um novo AGENT_DEV para iteração de remediação.
  Monitore `docs/DEV_REPORT.md` para o próximo ciclo.

## Invocação Manual de Agentes

Você pode invocar qualquer agente diretamente na sessão principal:

> "Use o AGENT_DEV para ler docs/TASKS.md e implementar todas as tarefas."
> "Use o AGENT_QA para ler docs/DEV_REPORT.md e iniciar o ciclo de QA."
> "Use o AGENT_ARCH para ler docs/SPEC.md e projetar as tarefas deste ciclo."

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
