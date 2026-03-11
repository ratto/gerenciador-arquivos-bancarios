# PRD — Gerenciador de Arquivos Bancários

## 1. Visão Geral

O **Gerenciador de Arquivos Bancários** é uma aplicação web voltada a desenvolvedores, testers e engenheiros de software que trabalham com soluções de processamento de arquivos bancários de cobrança e pagamento. O objetivo central é permitir que o usuário selecione um leiaute bancário, preencha os dados de lançamentos ou cobranças por meio de um formulário guiado e gere um arquivo-texto pronto para uso — sem necessidade de backend, banco de dados ou conhecimento prévio da especificação técnica de cada leiaute.

---

## 2. Problema

Arquivos bancários como CNAB240 e CNAB400 seguem especificações rígidas de posicionamento de campos, tipos de registro e valores codificados. Montar esses arquivos manualmente é suscetível a erros e exige que o profissional consulte constantemente a documentação do leiaute. Ferramentas existentes geralmente são proprietárias, acopladas a um único banco ou leiaute, ou exigem instalação local.

A ausência de uma ferramenta agnóstica, acessível via browser e orientada ao desenvolvedor/tester cria atrito no dia a dia de quem precisa:

- Gerar arquivos de teste para homologação de integrações.
- Reproduzir cenários específicos de cobrança ou pagamento.
- Validar parsers e processadores de arquivos bancários.
- Produzir exemplos documentados para times de QA.

---

## 3. Público-Alvo

| Perfil | Necessidade Principal |
|---|---|
| Desenvolvedor de software | Gerar arquivos de teste para pipelines de CI/CD e homologação de integrações bancárias |
| Tester / QA | Criar cenários variados (campos limítrofes, lançamentos múltiplos, diferentes tipos de registro) sem conhecer a fundo a especificação |
| Engenheiro de integração | Validar rapidamente se um leiaute está sendo interpretado corretamente pelo sistema downstream |

---

## 4. Objetivos do Produto

1. Oferecer suporte a múltiplos leiautes de arquivos bancários (CNAB240, CNAB400/RCB001 e outros).
2. Guiar o usuário no preenchimento dos campos obrigatórios e opcionais de cada leiaute por meio de formulários dinâmicos e validados.
3. Gerar e disponibilizar para download o arquivo-texto com o leiaute correto, sem persistência em banco de dados.
4. Funcionar 100% no browser, sem autenticação e sem envio de dados a qualquer servidor.

---

## 5. Funcionalidades

### 5.1 Seleção de Leiaute

- O usuário escolhe o leiaute desejado em uma lista com busca/filtro.
- Cada leiaute exibe uma descrição resumida com banco de origem, versão e tipo (cobrança/pagamento/retorno).
- Leiautes suportados inicialmente:
  - **CNAB240** — padrão FEBRABAN de 240 caracteres por linha, suportado por múltiplos bancos.
  - **CNAB400 / RCB001** — padrão de 400 caracteres por linha (cobrança).
  - Outros leiautes podem ser adicionados de forma incremental.

### 5.2 Formulário de Dados

- O formulário é gerado dinamicamente com base no leiaute selecionado.
- Os campos são agrupados conforme a estrutura do leiaute: **Header de Arquivo**, **Header de Lote**, **Segmentos de Detalhe** (A, B, C, J etc.), **Trailer de Lote** e **Trailer de Arquivo**.
- Campos com valor fixo ou calculável (ex.: totalizadores, número sequencial de linha) são preenchidos automaticamente.
- Validação em tempo real: tipo de dado (numérico, alfanumérico), tamanho máximo, valores permitidos por código (ex.: tipo de movimento, forma de pagamento).
- O usuário pode adicionar múltiplos lotes e múltiplos registros de detalhe dentro de cada lote.

### 5.3 Geração e Download do Arquivo

- O arquivo é montado em memória, respeitando o posicionamento exato de cada campo conforme a especificação do leiaute.
- O usuário pode pré-visualizar as primeiras linhas do arquivo antes de baixar.
- Download em formato `.txt` com o nome sugerido pelo leiaute (ex.: `CB240001.TXT`).

### 5.4 Gerenciamento de Estado (Sessão)

- Todo o estado (leiaute selecionado, lotes, registros) é mantido no Pinia durante a sessão do browser.
- Nenhum dado é enviado a servidor ou persistido após o fechamento da aba.
- O usuário pode limpar/reiniciar a sessão a qualquer momento.

### 5.5 Importação de Arquivo Existente *(v2)*

- O usuário pode carregar um arquivo bancário existente para que a aplicação o interprete e preencha o formulário automaticamente, permitindo edição e re-geração.

---

## 6. Fluxo Principal de Uso

```
1. Acessa a aplicação
        ↓
2. Seleciona o leiaute (ex.: CNAB240 - Banco do Brasil - Pagamento)
        ↓
3. Preenche o Header de Arquivo (dados da empresa cedente/pagadora)
        ↓
4. Adiciona um ou mais Lotes
   └─ Para cada lote: preenche Header de Lote e adiciona registros de detalhe
        ↓
5. Revisa os dados e a pré-visualização do arquivo
        ↓
6. Faz o download do arquivo .txt gerado
```

---

## 7. Requisitos Não-Funcionais

| Atributo | Requisito |
|---|---|
| **Privacidade** | Nenhum dado trafega fora do browser; sem analytics, sem chamadas a APIs externas |
| **Offline** | A aplicação deve funcionar sem conexão após o carregamento inicial |
| **Performance** | A geração do arquivo deve ser imperceptível para arquivos com até 10.000 registros de detalhe |
| **Acessibilidade** | Formulários com labels, mensagens de erro claras e navegação por teclado |
| **Extensibilidade** | A definição de cada leiaute deve ser declarativa (arquivo de configuração/schema), permitindo adicionar novos leiautes sem alterar a lógica de renderização do formulário ou de geração do arquivo |

---

## 8. Fora do Escopo (v1)

- Autenticação e controle de acesso.
- Persistência de dados em banco de dados local ou remoto.
- Envio do arquivo gerado diretamente ao banco.
- Processamento/parsing de arquivos de retorno bancário.
- Suporte a leiautes de outros países (foco exclusivo no padrão FEBRABAN/Brasil).

---

## 9. Métricas de Sucesso

- O usuário consegue gerar um arquivo válido sem consultar a documentação do leiaute.
- O arquivo gerado é aceito sem erros pelo sistema bancário ou pelo parser alvo.
- Tempo médio do fluxo completo (seleção → preenchimento → download) inferior a 5 minutos para um lote com 10 registros.

---

## 10. Referências

- Especificações FEBRABAN CNAB240: [febraban.org.br](https://www.febraban.org.br)
- Leiautes Banco do Brasil: [bb.com.br/site/pro-seu-negocio/aplicativos-leiautes-de-arquivos](https://www.bb.com.br/site/pro-seu-negocio/aplicativos-leiautes-de-arquivos)
- Padrão CNAB: Centro Nacional de Automação Bancária
