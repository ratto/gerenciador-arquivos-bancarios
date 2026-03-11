# QA REPORT — [Nome da Funcionalidade] — Ciclo [N]

> Escrito pelo AGENT_QA.
> Lido pelo AGENT_ARCH e pelo orquestrador humano.

## Resultado

`APROVADO` | `REPROVADO — ciclo de remediação necessário`

## Resultados da Execução de Testes

### Testes Unitários + Componente (`npm test`)

```
(cole a saída completa)
```

Resultado: PASSOU / FALHOU

### Lint (`npm run lint`)

```
(cole a saída completa)
```

Resultado: PASSOU / FALHOU

### Testes E2E (`npm run test:e2e`) — somente se unitários/componente passaram

```
(cole a saída completa)
```

Resultado: PASSOU / FALHOU / PULADO

## Achados do Code Review

### Crítico (deve corrigir antes do merge)

| ID | Arquivo | Linha | Achado |
|----|---------|-------|--------|
| C1 | `src/model/lib/cnab/cnab240.ts` | 42 | Campo numérico com padding de espaço; deve ser zero |

### Maior (deve corrigir)

| ID | Arquivo | Linha | Achado |
|----|---------|-------|--------|

### Menor (recomendável corrigir)

| ID | Arquivo | Linha | Achado |
|----|---------|-------|--------|

### Observações Positivas

- ...

## Verificação de Corretude CNAB

| Verificação | Resultado | Notas |
|-------------|-----------|-------|
| Comprimento de linha CNAB240 = 240 | PASSOU/FALHOU | |
| Terminações de linha `\r\n` | PASSOU/FALHOU | |
| Padding numérico com zero | PASSOU/FALHOU | |
| Padding alfanumérico com espaço | PASSOU/FALHOU | |
| Campos totalizadores corretos | PASSOU/FALHOU | |
| Códigos de tipo de registro conforme FEBRABAN | PASSOU/FALHOU | |

## Testes E2E Implementados (se APROVADO)

Liste os novos arquivos em `tests/e2e/`:

| Arquivo | Fluxo coberto |
|---------|--------------|
| `tests/e2e/cnab240-generation.cy.ts` | Selecionar leiaute → preencher → download |

## Decisão

- [ ] Todos os achados críticos resolvidos → MERGE
- [ ] Achados críticos pendentes → Invocar novo AGENT_DEV com TASKS.md de remediação
  - Novo TASKS.md escrito: SIM / NÃO
