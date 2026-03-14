# TASKS — Identidade Visual GAB — Ciclo 004

> Escrito pelo AGENT_ARCH. Lido pelo AGENT_DEV.
> Não modifique este arquivo durante a implementação; acrescente notas ao DEV_REPORT.md.

## Contexto

Este ciclo implementa a identidade visual completa do GAB conforme o guia `docs/identidade-visual-gab.md`. O resultado é: paleta de cores da marca configurada no Quasar, CSS variables globais, fontes Inter e JetBrains Mono, SCSS de consistência de formulários, landing page de impacto com 6 seções, drawer retrátil com FAB e toggle dark/light, e dark mode como padrão. Não há lógica CNAB neste ciclo.

## Pré-requisitos

- Branch atual: `feature/004-implementar-identidade-visual`
- Nenhuma nova dependência npm é necessária — todo o design system usa Quasar nativo e Google Fonts via CDN.

---

### Tarefa 1 — Paleta de Cores e Variáveis SCSS

**Tipo**: setup / styles
**Arquivos a modificar**:
- `src/css/quasar.variables.scss`
- `quasar.config.ts`

**Descrição**:

Atualize as variáveis Sass e a configuração de brand do Quasar com a paleta GAB.

**1a. `src/css/quasar.variables.scss`**

Substitua todo o conteúdo pelas variáveis abaixo. Essas variáveis são lidas pelo compilador Sass do Quasar antes de gerar os utilitários de cor:

```scss
// Quasar SCSS Variables — GAB Design System
$primary:   #1A3A5C;
$secondary: #0D7377;
$accent:    #14BDAC;

$dark:      #0F1B2D;
$dark-page: #131F2E;

$positive:  #21A856;
$negative:  #D93025;
$warning:   #F5A623;
$info:      #1D85C6;
```

**1b. `quasar.config.ts`**

Dentro de `framework.config`, substitua `dark: 'auto'` por `dark: true` e adicione o objeto `brand` com as cores GAB:

```typescript
framework: {
  config: {
    dark: true,
    brand: {
      primary:   '#1A3A5C',
      secondary: '#0D7377',
      accent:    '#14BDAC',
      dark:      '#0F1B2D',
      positive:  '#21A856',
      negative:  '#D93025',
      warning:   '#F5A623',
      info:      '#1D85C6',
    },
  },
  plugins: ['Dark'],
},
```

Adicione `'Dark'` ao array `plugins` conforme mostrado acima.

**Critérios de Aceite**:
- [ ] `src/css/quasar.variables.scss` contém exatamente as variáveis acima com os valores HEX especificados.
- [ ] `quasar.config.ts` tem `dark: true`, o objeto `brand` com as 8 cores e `plugins: ['Dark']`.
- [ ] `npm run build` conclui sem erros de compilação.

---

### Tarefa 2 — CSS Variables Globais e SCSS de Consistência de Formulários

**Tipo**: styles
**Arquivos a modificar**:
- `src/css/app.scss`
**Arquivos a criar**:
- `src/css/form-consistency.scss`

**Descrição**:

**2a. `src/css/app.scss`**

Substitua o conteúdo atual (vazio) pelo bloco completo de CSS variables globais e a importação do arquivo de formulários:

```scss
// GAB Design System — CSS Variables Globais
@import 'form-consistency';

:root {
  // Fontes
  --gab-font-ui:   'Inter', system-ui, -apple-system, sans-serif;
  --gab-font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  // Escala tipográfica
  --gab-text-display:  2rem;       // 32px
  --gab-text-title:    1.5rem;     // 24px
  --gab-text-subtitle: 1.125rem;   // 18px
  --gab-text-body:     1rem;       // 16px
  --gab-text-small:    0.875rem;   // 14px
  --gab-text-caption:  0.75rem;    // 12px
  --gab-text-code:     0.8125rem;  // 13px — JetBrains Mono

  // Superfícies — Light Mode
  --gab-surface-100: #F5F7FA;
  --gab-surface-200: #E8EDF3;
  --gab-border:      #D0D8E4;
  --gab-text-color:  #3D5166;
  --gab-text-muted:  #A0AEBA;

  // Superfícies — Dark Mode
  --gab-dark-bg:      #131F2E;
  --gab-dark-surface: #1E2D40;
  --gab-dark-border:  #2A3F58;
  --gab-dark-text:    #E8EDF3;

  // Radius
  --gab-radius-sm: 4px;
  --gab-radius-md: 8px;
  --gab-radius-lg: 12px;

  // Sombras
  --gab-shadow-card:  0 1px 3px rgba(15, 27, 45, 0.08);
  --gab-shadow-hover: 0 4px 12px rgba(15, 27, 45, 0.12);

  // Formulários — BASE UNIVERSAL
  --gab-form-font:    'Inter', system-ui, sans-serif;
  --gab-form-size:    1rem;    // 16px
  --gab-form-height:  44px;
  --gab-form-radius:  4px;
  --gab-form-border:  1.5px solid #D0D8E4;
}

// Tipografia global
body {
  font-family: var(--gab-font-ui);
  font-size: var(--gab-text-body);
  color: var(--gab-text-color);
}

// Valores CNAB / código: JetBrains Mono
.gab-mono,
.gab-cnab-value {
  font-family: var(--gab-font-mono);
  font-size: var(--gab-text-code);
  line-height: 1.7;
}
```

**2b. `src/css/form-consistency.scss`**

Crie este arquivo com as regras que unificam a aparência de todos os campos Quasar:

```scss
// GAB — Consistência de Formulários
// Aplica Inter 16px, altura 44px e border-radius 4px a todos os campos Quasar

.q-field__native,
.q-field__input,
.q-field__prefix,
.q-field__suffix {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  min-height: var(--gab-form-height, 44px);
}

.q-field__label {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  font-size: 0.875rem !important;
}

.q-field--outlined .q-field__control {
  border-radius: 4px !important;
  min-height: var(--gab-form-height, 44px);
}

// Borda no estado normal
.q-field--outlined:not(.q-field--focused):not(.q-field--error) .q-field__control {
  border: 1.5px solid #D0D8E4;
}

// Borda no foco
.q-field--outlined.q-field--focused .q-field__control {
  border: 1.5px solid #1A3A5C !important;
}

// Borda no erro
.q-field--outlined.q-field--error .q-field__control {
  border: 1.5px solid #D93025 !important;
}

// Respeitar prefers-reduced-motion nas animações de label
@media (prefers-reduced-motion: reduce) {
  .q-field__label {
    transition: none !important;
  }
}
```

**Critérios de Aceite**:
- [ ] `src/css/app.scss` declara todas as CSS variables `--gab-*` e importa `form-consistency`.
- [ ] `src/css/form-consistency.scss` existe e aplica as regras de consistência a `.q-field__native`, `.q-field__input`, `.q-field--outlined`.
- [ ] `npm run build` conclui sem erros SCSS.

---

### Tarefa 3 — Fontes Google Fonts no `index.html`

**Tipo**: setup / template
**Arquivos a modificar**:
- `index.html`

**Descrição**:

Adicione as tags `<link>` do Google Fonts no `<head>` do `index.html`, logo antes do fechamento da tag `</head>`. O arquivo usa template EJS do Quasar (`<%= productName %>`) — não altere nenhuma das tags existentes, apenas adicione as novas `<link>` ao final do `<head>`:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
```

Também atualize o atributo `lang` da tag `<html>` para `lang="pt-BR"` para acessibilidade.

**Critérios de Aceite**:
- [ ] `index.html` tem as três tags `<link>` do Google Fonts dentro do `<head>`.
- [ ] A tag `<html>` tem `lang="pt-BR"`.
- [ ] As tags existentes (favicon, viewport, meta) estão intactas.

---

### Tarefa 4 — Boot File de Dark Mode

**Tipo**: boot
**Arquivos a criar**:
- `src/boot/dark-mode.ts`
**Arquivos a modificar**:
- `quasar.config.ts`

**Descrição**:

**4a. `src/boot/dark-mode.ts`**

Crie o boot file que ativa o dark mode como padrão ao inicializar a aplicação:

```typescript
import { boot } from 'quasar/wrappers';
import { Dark } from 'quasar';

export default boot(() => {
  Dark.set(true);
});
```

**4b. `quasar.config.ts`**

Adicione `'dark-mode'` ao array `boot`:

```typescript
boot: ['dark-mode'],
```

**Critérios de Aceite**:
- [ ] `src/boot/dark-mode.ts` existe e chama `Dark.set(true)`.
- [ ] `quasar.config.ts` lista `'dark-mode'` no array `boot`.
- [ ] `npm run build` conclui sem erros.

---

### Tarefa 5 — LandingLayout: Layout sem Topbar

**Tipo**: layout (component)
**Arquivos a criar**:
- `src/layouts/LandingLayout.vue`

**Descrição**:

Crie um layout minimalista para a landing page. Ele não deve ter `QHeader` nem `QDrawer` — apenas o `router-view` renderizando o conteúdo diretamente sem wrapper de layout Quasar, pois a landing page gerencia seu próprio posicionamento:

```vue
<template>
  <router-view />
</template>

<script setup lang="ts">
// Layout sem QLayout/QHeader — a landing page usa posicionamento próprio
</script>
```

**Critérios de Aceite**:
- [ ] `src/layouts/LandingLayout.vue` existe e renderiza apenas `<router-view />`.
- [ ] Nenhum import explícito de componente Quasar no arquivo.

---

### Tarefa 6 — Atualização do Router

**Tipo**: router
**Arquivos a modificar**:
- `src/router/routes.ts`

**Descrição**:

Atualize a rota raiz `'/'` para usar `LandingLayout` em vez de `MainLayout`. Preserve a rota de erro e adicione a rota futura de app interno como placeholder comentado:

```typescript
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [{ path: '', component: () => import('pages/LandingPage.vue') }],
  },
  // Rotas internas — ciclos futuros
  // {
  //   path: '/app',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [],
  // },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
```

**Critérios de Aceite**:
- [ ] A rota `'/'` usa `LandingLayout.vue` como componente de layout.
- [ ] A rota filha vazia usa `pages/LandingPage.vue`.
- [ ] A rota de erro 404 está preservada.

---

### Tarefa 7 — LandingPage: Estrutura Principal e Hero Section

**Tipo**: page (component)
**Arquivos a criar**:
- `src/pages/LandingPage.vue`

**Descrição**:

Crie a landing page completa com as 6 seções. Este é o componente mais extenso do ciclo. Use `<script setup lang="ts">` e `useQuasar()` para acesso ao dark mode. O estado do drawer é um `ref<boolean>` local.

**Estrutura geral do template:**

```vue
<template>
  <div class="gab-landing">
    <!-- FAB de menu fixo -->
    <!-- Hero Section -->
    <!-- Features Section -->
    <!-- Como Funciona Section -->
    <!-- Tecnologias Section -->
    <!-- CTA Final Section -->
    <!-- Footer -->
    <!-- QDrawer retrátil -->
  </div>
</template>
```

**7a. FAB de Menu**

Botão fixo no canto superior direito que abre o drawer. Use `position: fixed` via classe CSS, não via prop do componente:

```vue
<q-btn
  round
  unelevated
  color="primary"
  icon="menu"
  class="gab-fab-menu"
  aria-label="Abrir menu"
  @click="drawerOpen = true"
/>
```

CSS do FAB:
```scss
.gab-fab-menu {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
}
```

**7b. Hero Section**

```vue
<section class="gab-hero" aria-label="Apresentação do GAB">
  <div class="gab-hero__overlay" />
  <div class="gab-hero__content">
    <div class="gab-hero__logo">GAB</div>
    <h1 class="gab-hero__headline">
      Gere arquivos bancários<br />com precisão
    </h1>
    <p class="gab-hero__subtitle">
      Processamento CNAB 240 e 400 diretamente no browser,<br />
      sem backend, sem instalação.
    </p>
    <q-btn
      unelevated
      size="lg"
      color="accent"
      label="Começar agora"
      class="gab-hero__cta"
      aria-label="Começar agora — acessar o aplicativo"
    />
  </div>
  <div class="gab-hero__scroll-indicator" aria-hidden="true">
    <q-icon name="keyboard_arrow_down" size="2rem" />
  </div>
</section>
```

CSS da Hero:
```scss
.gab-hero {
  position: relative;
  height: 100vh;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0F1B2D, #1A3A5C);
  overflow: hidden;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 24px;
    gap: 20px;
  }

  &__logo {
    font-family: var(--gab-font-ui);
    font-size: 2rem;
    font-weight: 700;
    color: #14BDAC;
    letter-spacing: 4px;
    position: absolute;
    top: 32px;
    left: 32px;
  }

  &__headline {
    font-family: var(--gab-font-ui);
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    color: #E8EDF3;
    margin: 0;
  }

  &__subtitle {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-subtitle);
    font-weight: 400;
    color: #A0AEBA;
    margin: 0;
    line-height: 1.6;
  }

  &__cta {
    margin-top: 8px;
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 24px;
    color: #A0AEBA;
    animation: gab-bounce 2s infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}

@keyframes gab-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}

// Responsividade da Hero
@media (max-width: 599px) {
  .gab-hero {
    &__headline {
      font-size: 2rem;
    }
    &__logo {
      font-size: 1.5rem;
      top: 16px;
      left: 16px;
    }
  }
}
```

**7c. Features Section (3 cards)**

```vue
<section class="gab-features" aria-label="Funcionalidades principais">
  <div class="gab-features__container">
    <h2 class="gab-features__title">O que o GAB oferece</h2>
    <div class="gab-features__grid">
      <div class="gab-feature-card" v-for="feature in features" :key="feature.title">
        <q-icon :name="feature.icon" size="2.5rem" color="secondary" />
        <h3 class="gab-feature-card__title">{{ feature.title }}</h3>
        <p class="gab-feature-card__desc">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</section>
```

Array `features` no `<script setup>`:
```typescript
const features = [
  {
    icon: 'description',
    title: 'Processamento CNAB 240/400',
    description: 'Suporte completo aos padrões FEBRABAN para geração de arquivos de pagamento e cobrança.',
  },
  {
    icon: 'verified',
    title: 'Validação Automática',
    description: 'Campos validados em tempo real: tipo, tamanho, valores permitidos e totaliz­adores calculados.',
  },
  {
    icon: 'download',
    title: 'Download Imediato',
    description: 'Arquivo .txt gerado em memória e disponível para download sem necessidade de backend.',
  },
] as const;
```

CSS das Features:
```scss
.gab-features {
  padding: 80px 24px;
  background: var(--gab-surface-100);

  .body--dark & {
    background: var(--gab-dark-bg);
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__title {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-title);
    font-weight: 600;
    text-align: center;
    margin-bottom: 48px;
    color: var(--gab-text-color);

    .body--dark & {
      color: var(--gab-dark-text);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 599px) {
      grid-template-columns: 1fr;
    }
  }
}

.gab-feature-card {
  background: #FFFFFF;
  border-radius: var(--gab-radius-md);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--gab-shadow-card);
  transition: box-shadow 0.2s ease;

  .body--dark & {
    background: var(--gab-dark-surface);
    border: 1px solid var(--gab-dark-border);
  }

  &:hover {
    box-shadow: var(--gab-shadow-hover);
  }

  &__title {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-subtitle);
    font-weight: 600;
    margin: 0;
    color: var(--gab-text-color);

    .body--dark & {
      color: var(--gab-dark-text);
    }
  }

  &__desc {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-body);
    line-height: 1.6;
    margin: 0;
    color: var(--gab-text-muted);
  }
}
```

**7d. Como Funciona Section (3 passos)**

```vue
<section class="gab-how-it-works" aria-label="Como funciona o GAB">
  <div class="gab-how-it-works__container">
    <h2 class="gab-how-it-works__title">Como funciona</h2>
    <div class="gab-how-it-works__steps">
      <div
        v-for="(step, index) in steps"
        :key="step.title"
        class="gab-step"
      >
        <div class="gab-step__number">{{ index + 1 }}</div>
        <q-icon :name="step.icon" size="2rem" color="accent" />
        <h3 class="gab-step__title">{{ step.title }}</h3>
        <p class="gab-step__desc">{{ step.description }}</p>
      </div>
    </div>
  </div>
</section>
```

Array `steps` no `<script setup>`:
```typescript
const steps = [
  {
    icon: 'file_upload',
    title: 'Selecione o leiaute',
    description: 'Escolha o padrão bancário (CNAB 240 ou 400) e o banco de destino.',
  },
  {
    icon: 'edit_note',
    title: 'Preencha os dados',
    description: 'Formulário guiado com validação em tempo real para cada campo do arquivo.',
  },
  {
    icon: 'download',
    title: 'Faça o download',
    description: 'Baixe o arquivo .txt pronto, com posicionamento exato conforme a especificação FEBRABAN.',
  },
] as const;
```

CSS do Como Funciona:
```scss
.gab-how-it-works {
  padding: 80px 24px;
  background: var(--gab-surface-200);

  .body--dark & {
    background: var(--gab-dark-surface);
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__title {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-title);
    font-weight: 600;
    text-align: center;
    margin-bottom: 48px;
    color: var(--gab-text-color);

    .body--dark & {
      color: var(--gab-dark-text);
    }
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 599px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
}

.gab-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;

  &__number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1A3A5C;
    color: #E8EDF3;
    font-family: var(--gab-font-ui);
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-subtitle);
    font-weight: 600;
    margin: 0;
    color: var(--gab-text-color);

    .body--dark & {
      color: var(--gab-dark-text);
    }
  }

  &__desc {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-body);
    line-height: 1.6;
    margin: 0;
    color: var(--gab-text-muted);
  }
}
```

**7e. Tecnologias Section**

```vue
<section class="gab-tech" aria-label="Tecnologias utilizadas">
  <div class="gab-tech__container">
    <h2 class="gab-tech__title">Construído com</h2>
    <div class="gab-tech__grid">
      <div v-for="tech in technologies" :key="tech.name" class="gab-tech-badge">
        <span class="gab-tech-badge__name">{{ tech.name }}</span>
        <span class="gab-tech-badge__desc">{{ tech.description }}</span>
      </div>
    </div>
  </div>
</section>
```

Array `technologies` no `<script setup>`:
```typescript
const technologies = [
  { name: 'Vue 3',       description: 'Composition API' },
  { name: 'Quasar v2',   description: 'UI Framework' },
  { name: 'TypeScript',  description: 'Strict Mode' },
  { name: 'Pinia',       description: 'State Management' },
] as const;
```

CSS do Tecnologias:
```scss
.gab-tech {
  padding: 64px 24px;
  background: var(--gab-surface-100);

  .body--dark & {
    background: var(--gab-dark-bg);
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__title {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-title);
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
    color: var(--gab-text-color);

    .body--dark & {
      color: var(--gab-dark-text);
    }
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
}

.gab-tech-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  border-radius: var(--gab-radius-md);
  border: 1.5px solid var(--gab-border);
  min-width: 140px;
  background: #FFFFFF;
  box-shadow: var(--gab-shadow-card);

  .body--dark & {
    background: var(--gab-dark-surface);
    border-color: var(--gab-dark-border);
  }

  &__name {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-subtitle);
    font-weight: 600;
    color: #1A3A5C;

    .body--dark & {
      color: #14BDAC;
    }
  }

  &__desc {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-small);
    color: var(--gab-text-muted);
    margin-top: 4px;
  }
}
```

**7f. CTA Final Section**

```vue
<section class="gab-cta-final" aria-label="Chamada para ação final">
  <div class="gab-cta-final__container">
    <h2 class="gab-cta-final__headline">Pronto para começar?</h2>
    <p class="gab-cta-final__sub">
      Gere seu primeiro arquivo bancário em minutos, direto no browser.
    </p>
    <q-btn
      unelevated
      size="lg"
      color="accent"
      label="Acessar o app"
      aria-label="Acessar o aplicativo GAB"
    />
  </div>
</section>
```

CSS do CTA Final:
```scss
.gab-cta-final {
  padding: 96px 24px;
  background: #1A3A5C;
  text-align: center;

  &__container {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__headline {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-display);
    font-weight: 700;
    color: #E8EDF3;
    margin: 0;
  }

  &__sub {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-body);
    color: #A0AEBA;
    margin: 0;
    line-height: 1.6;
  }
}
```

**7g. Footer**

```vue
<footer class="gab-footer" role="contentinfo">
  <div class="gab-footer__container">
    <span class="gab-footer__logo">GAB</span>
    <div class="gab-footer__links">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="gab-footer__link"
        aria-label="GitHub do projeto GAB"
      >
        <q-icon name="code" size="1rem" /> GitHub
      </a>
      <span class="gab-footer__version">v0.4.0</span>
    </div>
  </div>
</footer>
```

CSS do Footer:
```scss
.gab-footer {
  background: #0F1B2D;
  padding: 32px 24px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__logo {
    font-family: var(--gab-font-ui);
    font-size: 1.5rem;
    font-weight: 700;
    color: #14BDAC;
    letter-spacing: 4px;
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__link {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-small);
    color: #A0AEBA;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: #14BDAC;
    }
  }

  &__version {
    font-family: var(--gab-font-mono);
    font-size: var(--gab-text-caption);
    color: #A0AEBA;
  }
}
```

**7h. QDrawer retrátil com toggle dark/light**

```vue
<q-drawer
  v-model="drawerOpen"
  side="right"
  overlay
  :width="280"
  :behavior="$q.screen.lt.md ? 'mobile' : 'desktop'"
  class="gab-drawer"
>
  <div class="gab-drawer__header">
    <span class="gab-drawer__logo">GAB</span>
    <q-btn
      flat
      round
      dense
      icon="close"
      color="white"
      aria-label="Fechar menu"
      @click="drawerOpen = false"
    />
  </div>

  <q-list padding>
    <q-item clickable v-ripple aria-label="Ir para o início da página">
      <q-item-section avatar>
        <q-icon name="home" color="white" />
      </q-item-section>
      <q-item-section class="text-white">Início</q-item-section>
    </q-item>

    <q-item clickable v-ripple aria-label="Ir para funcionalidades">
      <q-item-section avatar>
        <q-icon name="description" color="white" />
      </q-item-section>
      <q-item-section class="text-white">Funcionalidades</q-item-section>
    </q-item>

    <q-item clickable v-ripple aria-label="Ir para como funciona">
      <q-item-section avatar>
        <q-icon name="help_outline" color="white" />
      </q-item-section>
      <q-item-section class="text-white">Como funciona</q-item-section>
    </q-item>
  </q-list>

  <q-separator color="blue-grey-8" class="q-my-md" />

  <q-item>
    <q-item-section avatar>
      <q-icon :name="$q.dark.isActive ? 'dark_mode' : 'light_mode'" color="white" />
    </q-item-section>
    <q-item-section class="text-white">Modo escuro</q-item-section>
    <q-item-section side>
      <q-toggle
        :model-value="$q.dark.isActive"
        color="accent"
        data-testid="dark-mode-toggle"
        :aria-label="$q.dark.isActive ? 'Ativar modo claro' : 'Ativar modo escuro'"
        @update:model-value="$q.dark.toggle()"
      />
    </q-item-section>
  </q-item>
</q-drawer>
```

CSS do Drawer:
```scss
.gab-drawer {
  background: #0F1B2D !important;

  .body--light & {
    background: #1A3A5C !important;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px;
    border-bottom: 1px solid #2A3F58;
  }

  &__logo {
    font-family: var(--gab-font-ui);
    font-size: 1.5rem;
    font-weight: 700;
    color: #14BDAC;
    letter-spacing: 4px;
  }
}
```

**Script setup completo:**

```typescript
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const drawerOpen = ref(false);

const features = [ /* ... ver 7c ... */ ] as const;
const steps = [ /* ... ver 7d ... */ ] as const;
const technologies = [ /* ... ver 7e ... */ ] as const;
```

**Critérios de Aceite**:
- [ ] `src/pages/LandingPage.vue` existe com as 6 seções implementadas.
- [ ] O FAB `gab-fab-menu` está fixo com `z-index: 1000` via SCSS.
- [ ] A hero tem 100vh de altura e o gradiente de fallback.
- [ ] O drawer usa `side="right"`, `overlay`, `width=280`.
- [ ] O toggle `data-testid="dark-mode-toggle"` está dentro do drawer, no último item após `QSeparator`.
- [ ] O botão CTA da hero tem `color="accent"` e `unelevated`.
- [ ] A landing page não importa nenhum componente Quasar explicitamente.
- [ ] `npm run build` conclui sem erros TypeScript ou de template.

---

### Tarefa 8 — Atualização do MainLayout para uso futuro (rotas internas)

**Tipo**: component (layout)
**Arquivos a modificar**:
- `src/layouts/MainLayout.vue`

**Descrição**:

O `MainLayout.vue` atual usa uma topbar com o toggle de dark mode inline. Como o toggle foi movido para o drawer no novo design, e o `MainLayout` não é mais usado na rota raiz, atualize-o para preparar para uso futuro nas rotas internas:

- Remova a topbar (`QHeader`) e o botão de dark mode inline.
- Mantenha o `QDrawer` lateral esquerdo, mas limpe os links de exemplo (que apontavam para quasar.dev) substituindo por uma lista vazia ou um único link "Início".
- Adicione o toggle dark/light dentro do drawer com `data-testid="dark-mode-toggle"` mantido para compatibilidade com os testes.
- Mantenha `QLayout`, `QDrawer` e `QPageContainer` — estrutura base para as páginas internas.

O novo template do `MainLayout.vue` deve ser:

```vue
<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="gab-drawer__header q-pa-md">
        <span class="gab-drawer__logo">GAB</span>
      </div>

      <q-list padding>
        <q-item
          clickable
          v-ripple
          to="/"
          aria-label="Ir para a página inicial"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Início</q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-my-md" />

      <q-item>
        <q-item-section avatar>
          <q-icon :name="$q.dark.isActive ? 'dark_mode' : 'light_mode'" />
        </q-item-section>
        <q-item-section>Modo escuro</q-item-section>
        <q-item-section side>
          <q-toggle
            :model-value="$q.dark.isActive"
            color="accent"
            data-testid="dark-mode-toggle"
            :aria-label="$q.dark.isActive ? 'Ativar modo claro' : 'Ativar modo escuro'"
            @update:model-value="$q.dark.toggle()"
          />
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const leftDrawerOpen = ref(false);
</script>
```

**Critérios de Aceite**:
- [ ] `MainLayout.vue` não tem mais `QHeader`.
- [ ] O `QToggle` com `data-testid="dark-mode-toggle"` está no drawer.
- [ ] O `:aria-label` dinâmico do toggle está correto (`'Ativar modo claro'` / `'Ativar modo escuro'`).
- [ ] `useQuasar` permanece importado.

---

### Tarefa 9 — Atualização dos Testes de Componente: MainLayout

**Tipo**: test (componente)
**Arquivos a modificar**:
- `tests/vitest/src/layouts/MainLayout.spec.ts`

**Descrição**:

O `MainLayout.spec.ts` atual testa o toggle de dark mode no `QHeader` (que foi removido). Os testes precisam ser atualizados para refletir a nova estrutura: o toggle agora é um `QToggle` dentro do `QDrawer`, não um `QBtn` na topbar.

As seguintes mudanças são necessárias:

1. **Substituir o stub `QBtnStub`** por um stub de `QToggle` que renderize como `<input type="checkbox">` com os atributos passados:

```typescript
const QToggleStub = defineComponent({
  name: 'QToggle',
  inheritAttrs: true,
  props: ['modelValue', 'ariaLabel'],
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('input', {
        type: 'checkbox',
        checked: props.modelValue,
        'aria-label': attrs['aria-label'],
        'data-testid': attrs['data-testid'],
        onChange: () => emit('update:modelValue', !props.modelValue),
        ...attrs,
      });
  },
});
```

2. **Atualizar os stubs** em `mountLayout()` para incluir `QToggle: QToggleStub` e remover `QHeader` do passthrough se não for mais necessário.

3. **Atualizar todos os testes** para procurar `[data-testid="dark-mode-toggle"]` como `<input>` (QToggle), em vez de `<button>` (QBtn):
   - O teste de renderização verifica que o elemento existe.
   - O teste de ícone deve ser removido ou adaptado (QToggle não tem `icon` como atributo).
   - O teste de `aria-label` verifica o atributo no `QToggle`.
   - O teste de clique deve usar `.trigger('change')` em vez de `.trigger('click')` para o `QToggle`.

4. **Adaptar o teste de toggle** para verificar que `toggleMock` é chamado ao disparar `change` no `QToggle`.

O mock de `useQuasar` deve ser mantido com a mesma estrutura de `darkState` e `toggleMock`, mas adicionar o método `toggle` que é chamado pelo `@update:model-value`:

```typescript
const $q = useQuasar();
// O toggle chama $q.dark.toggle() via @update:model-value="$q.dark.toggle()"
```

Portanto o mock precisa expor `$q.dark.toggle` como `toggleMock`. Verifique se o mock atual já cobre isso — se sim, apenas ajuste os testes de interação.

**Critérios de Aceite**:
- [ ] `tests/vitest/src/layouts/MainLayout.spec.ts` não tem testes marcados com `.skip`.
- [ ] Todos os testes `describe('MainLayout')` passam com `npm test`.
- [ ] O teste verifica a presença do `[data-testid="dark-mode-toggle"]` no drawer.
- [ ] O teste verifica o `aria-label` correto baseado no estado de dark mode.
- [ ] O teste verifica que o toggle de dark mode aciona `$q.dark.toggle()`.

---

### Tarefa 10 — Testes de Componente: LandingPage

**Tipo**: test (componente)
**Arquivos a criar**:
- `tests/vitest/src/pages/LandingPage.spec.ts`

**Descrição**:

Crie testes de componente para a `LandingPage.vue`. Os testes devem cobrir:

1. **Renderização da hero section**: o elemento com `aria-label="Apresentação do GAB"` existe, a headline está visível, o botão CTA "Começar agora" existe.

2. **FAB de menu**: o botão `aria-label="Abrir menu"` existe e está presente no DOM.

3. **Abertura do drawer**: ao clicar no FAB, o `QDrawer` (ou seu stub) recebe `model-value="true"` ou equivalente.

4. **Toggle de dark mode no drawer**: o elemento `[data-testid="dark-mode-toggle"]` existe.

5. **Acessibilidade básica**: as seções principais têm `aria-label`.

Use a mesma estratégia de mocking de `useQuasar` e stubs de componentes Quasar do `MainLayout.spec.ts` como referência.

**Estrutura base dos testes:**

```typescript
// tests/vitest/src/pages/LandingPage.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, defineComponent, ref } from 'vue';

const darkState = { isActive: true };
const toggleMock = vi.fn(() => { darkState.isActive = !darkState.isActive; });

vi.mock('quasar', () => ({
  useQuasar: () => ({
    dark: {
      get isActive() { return darkState.isActive; },
      toggle: toggleMock,
    },
    screen: { lt: { md: false } },
  }),
}));

import LandingPage from 'pages/LandingPage.vue';

// Stubs para componentes Quasar
// ... (similar ao MainLayout.spec.ts, mas adaptado para QDrawer, QToggle, QBtn, QIcon, QList, etc.)

describe('LandingPage', () => {
  beforeEach(() => {
    darkState.isActive = true;
    toggleMock.mockClear();
  });

  it('renderiza a hero section', () => { ... });
  it('renderiza o botão FAB de menu', () => { ... });
  it('renderiza o toggle de dark mode no drawer', () => { ... });
  it('abre o drawer ao clicar no FAB', async () => { ... });
  it('as seções principais têm aria-label', () => { ... });
});
```

**Critérios de Aceite**:
- [ ] `tests/vitest/src/pages/LandingPage.spec.ts` existe com ao menos 5 casos de teste.
- [ ] Todos os testes passam com `npm test`.
- [ ] Nenhum teste está marcado com `.skip`.
- [ ] O teste de abertura do drawer verifica o estado reativo.

---

## Resumo de Requisitos de Teste

| Tarefa | Arquivo de teste | Tipo | Cobertura alvo |
|--------|-----------------|------|----------------|
| 9 | `tests/vitest/src/layouts/MainLayout.spec.ts` | componente | toggle dark mode no drawer, aria-label, interação |
| 10 | `tests/vitest/src/pages/LandingPage.spec.ts` | componente | hero, FAB, drawer, toggle, aria-labels |

## Definição de Pronto

- [ ] Todas as tarefas (1 a 10) implementadas.
- [ ] `npm run lint` sai com código 0.
- [ ] `npm test` sai com código 0 e 0 falhas.
- [ ] `docs/DEV_REPORT.md` escrito com o status de cada tarefa.
