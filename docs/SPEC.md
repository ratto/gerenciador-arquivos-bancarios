# SPEC — Identidade Visual GAB

> **Ciclo:** 004
> **Branch:** `feature/004-implementar-identidade-visual`
>
> **Requisitos globais da aplicação** (TypeScript, MVVM, CNAB, testes, pipeline) estão em
> `docs/DEFINITION_OF_DONE.md` e se aplicam a todos os ciclos. Aqui ficam apenas os
> critérios **específicos desta feature**.

## História de Usuário

Como usuário da aplicação GAB,
quero visitar uma aplicação visualmente atraente e padronizada,
para que eu possa ter conforto visual e uma boa experiência ao utilizar a ferramenta.

## Acceptance Criteria (critérios específicos desta feature)

- [ ] AC1: A paleta de cores da marca GAB está configurada no `quasar.config.ts` (brand: primary `#1A3A5C`, secondary `#0D7377`, accent `#14BDAC`, dark `#0F1B2D`, positive `#21A856`, negative `#D93025`, warning `#F5A623`, info `#1D85C6`).
- [ ] AC2: As variáveis SCSS do Quasar em `quasar.variables.scss` refletem a paleta GAB.
- [ ] AC3: As CSS variables globais (`--gab-*`) estão declaradas em `src/css/app.scss`.
- [ ] AC4: As fontes Inter (UI) e JetBrains Mono (código/dados) são carregadas via `<link>` no `index.html`.
- [ ] AC5: O `body` e todos os elementos de interface usam Inter como fonte padrão; campos com valores CNAB usam JetBrains Mono.
- [ ] AC6: O SCSS de consistência de formulários (`form-consistency.scss`) está importado em `app.scss` e aplica fonte Inter 16px, altura 44px e border-radius 4px uniformes a todos os campos Quasar.
- [ ] AC7: A `IndexPage.vue` é uma landing page fullscreen com seis seções: Hero (100vh), Features (3 cards), Como Funciona (3 passos), Tecnologias (logo wall), CTA Final e Footer.
- [ ] AC8: O layout raiz (`/`) não usa mais `MainLayout.vue` com `QHeader` — a landing page tem layout próprio sem topbar.
- [ ] AC9: Um `QDrawer` retrátil (lado direito, largura 280px) é aberto por um `QBtn` FAB fixo (`position: fixed; top: 16px; right: 16px`) com ícone `menu`.
- [ ] AC10: O toggle dark/light está exclusivamente dentro do drawer, como último item, separado por `QSeparator`, usando `QToggle` com `$q.dark.toggle()`.
- [ ] AC11: O plugin Dark do Quasar está habilitado em `quasar.config.ts` com `Dark.set(true)` no boot file (modo escuro como padrão).
- [ ] AC12: A hero section tem gradiente de fallback `linear-gradient(135deg, #0F1B2D, #1A3A5C)` e overlay `rgba(0,0,0,0.55)`, com logo GAB, headline, subtítulo e botão CTA primário centralizados.
- [ ] AC13: A landing page é responsiva: em `xs` a headline reduz para 32px e o drawer ocupa a tela inteira; em `md+` as features exibem 3 colunas.
- [ ] AC14: Um boot file `dark-mode.ts` inicializa o dark mode como padrão e é registrado em `quasar.config.ts`.
- [ ] AC15: O teste de componente `MainLayout.spec.ts` existente continua passando após a refatoração do layout.
- [ ] AC16: Existe ao menos um teste de componente para a `LandingPage.vue` cobrindo: renderização da hero section, abertura do drawer pelo FAB e presença do toggle de dark mode no drawer.

## Escopo

### Dentro do escopo

- Configuração da paleta de cores GAB no Quasar brand system.
- CSS variables SCSS globais conforme o guia de identidade visual.
- Importação das fontes Inter e JetBrains Mono via Google Fonts no `index.html`.
- Arquivo SCSS de consistência de formulários.
- Reescrita da `IndexPage.vue` como landing page com as 6 seções especificadas.
- Refatoração da rota `/` para usar um layout sem topbar (sem `QHeader`).
- Componente de drawer retrátil com FAB e toggle dark/light.
- Boot file para inicializar dark mode como padrão.
- Testes de componente para a landing page.
- Atualização dos testes existentes de `MainLayout.spec.ts` para a nova estrutura.

### Fora do escopo

- Rotas internas da aplicação (`/app/*`) — serão tratadas em ciclos futuros.
- Upload, processamento ou download de arquivos CNAB.
- Autenticação ou controle de acesso.
- Vídeo loop MP4 na hero (usar gradiente de fallback neste ciclo).
- Conteúdo real de FAQ, documentação ou links externos funcionais.

## Contexto de Domínio

Não há lógica CNAB ou bancária neste ciclo. O ciclo é exclusivamente de UI/UX e configuração de design system.

## Notas de UI/UX

### Estrutura de rotas

A rota `/` passa a ser renderizada por um `LandingLayout.vue` (sem `QHeader`, sem `QDrawer` lateral esquerdo). A `IndexPage.vue` é substituída pela landing page completa. O `MainLayout.vue` é preservado para uso futuro nas rotas internas (`/app/*`), mas não deve mais ser usado na rota raiz.

### Landing Page — 6 seções obrigatórias

1. **Hero (100vh):** fundo com gradiente de fallback, overlay escuro, logo "GAB" em texto (`font: 700 2rem Inter, color: #14BDAC`), headline (`font: 700 3rem/48px Inter` em desktop, `2rem/32px` em mobile), subtítulo (`font: 400 1.125rem Inter`), botão CTA `color="accent" unelevated size="lg"` com label "Começar agora". Botão FAB `menu` fixo no canto superior direito abre o drawer.
2. **Features (3 cards):** "Processamento CNAB 240/400", "Validação Automática", "Download de Retornos". Fundo `--gab-surface-100` (light) / `--gab-dark-bg` (dark). Cards com `border-radius: --gab-radius-md`.
3. **Como Funciona (3 passos):** "Upload do Arquivo", "Validação Automática", "Download Pronto". Ícones grandes (`file_upload`, `verified`, `download`), seta de progresso entre os passos em desktop.
4. **Tecnologias:** logos/badges textuais de Quasar, Vue 3, TypeScript. Fundo neutro.
5. **CTA Final:** fundo `#1A3A5C`, headline "Pronto para começar?", botão "Acessar o app" `color="accent"`.
6. **Footer:** logo GAB, links GitHub e versão, fundo `#0F1B2D`.

### Drawer retrátil

- `QDrawer overlay side="right" width="280"` com `v-model` controlado por estado reativo.
- Fundo do drawer: `#0F1B2D` (dark) / `#1A3A5C` (light).
- Conteúdo: logo GAB, links de navegação (Início, Funcionalidades, Como Funciona), `QSeparator`, item com toggle dark/light.
- Em `xs/sm`: `behavior="mobile"` — drawer ocupa tela inteira.

### Toggle Dark/Light

Deve ser movido do `QHeader` (onde está atualmente) para o interior do drawer. O `data-testid="dark-mode-toggle"` deve ser mantido para os testes E2E existentes.

## Notas de Modelo de Dados

Não há novas stores ou tipos TypeScript de domínio. O estado do drawer (aberto/fechado) é local ao componente via `ref<boolean>`.

O plugin Dark do Quasar é controlado via `useQuasar().dark` — sem store dedicada.

## Restrições Técnicas

- Componentes Quasar são auto-importados — nenhum import explícito de componente Quasar nos arquivos `.vue`.
- O `index.html` usa syntax de template EJS do Quasar (`<%= productName %>`) — a tag `<link>` do Google Fonts deve ser adicionada dentro do `<head>` respeitando essa estrutura.
- A landing page não deve usar `QPage` (componente que requer `QLayout`) — usar `<div>` ou `<section>` semânticos diretamente.
- O `dark: 'auto'` atual em `quasar.config.ts` deve ser alterado para `dark: true` e o boot file deve chamar `Dark.set(true)`.
- Animações da hero devem respeitar `prefers-reduced-motion` via `@media`.

## Referências

- Seção do PRD: §1 (Visão Geral), §7 (Requisitos Não-Funcionais — Acessibilidade)
- Guia de Identidade Visual: `docs/identidade-visual-gab.md` (documento completo)
- Arquivos relacionados:
  - `quasar.config.ts` — brand colors, plugins, boot
  - `src/css/quasar.variables.scss` — variáveis Sass do Quasar
  - `src/css/app.scss` — CSS variables globais
  - `index.html` — importação de fontes
  - `src/layouts/MainLayout.vue` — layout atual (a ser preservado para rotas internas)
  - `src/pages/IndexPage.vue` — a ser substituída pela landing page
  - `src/router/routes.ts` — rota raiz a ser atualizada
  - `tests/vitest/src/layouts/MainLayout.spec.ts` — testes existentes a serem atualizados
  - `tests/e2e/dark-mode.cy.ts` — testes E2E existentes
