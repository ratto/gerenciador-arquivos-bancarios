<template>
  <div class="gab-landing">
    <!-- FAB de menu fixo -->
    <q-btn
      round
      unelevated
      color="primary"
      icon="menu"
      class="gab-fab-menu"
      aria-label="Abrir menu"
      @click="drawerOpen = true"
    />

    <!-- Hero Section -->
    <section class="gab-hero" aria-label="Apresentação do GAB">
      <div class="gab-hero__overlay" />
      <div class="gab-hero__logo">GAB</div>
      <div class="gab-hero__content">
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

    <!-- Features Section -->
    <section class="gab-features" aria-label="Funcionalidades principais">
      <div class="gab-features__container">
        <h2 class="gab-features__title">O que o GAB oferece</h2>
        <div class="gab-features__grid">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="gab-feature-card"
          >
            <q-icon :name="feature.icon" size="2.5rem" color="secondary" />
            <h3 class="gab-feature-card__title">{{ feature.title }}</h3>
            <p class="gab-feature-card__desc">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona Section -->
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

    <!-- Tecnologias Section -->
    <section class="gab-tech" aria-label="Tecnologias utilizadas">
      <div class="gab-tech__container">
        <h2 class="gab-tech__title">Construído com</h2>
        <div class="gab-tech__grid">
          <div
            v-for="tech in technologies"
            :key="tech.name"
            class="gab-tech-badge"
          >
            <span class="gab-tech-badge__name">{{ tech.name }}</span>
            <span class="gab-tech-badge__desc">{{ tech.description }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final Section -->
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

    <!-- Footer -->
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

    <!-- QDrawer retrátil -->
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
          <q-icon
            :name="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
            color="white"
          />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const drawerOpen = ref(false);

const features = [
  {
    icon: 'description',
    title: 'Processamento CNAB 240/400',
    description:
      'Suporte completo aos padrões FEBRABAN para geração de arquivos de pagamento e cobrança.',
  },
  {
    icon: 'verified',
    title: 'Validação Automática',
    description:
      'Campos validados em tempo real: tipo, tamanho, valores permitidos e totalizadores calculados.',
  },
  {
    icon: 'download',
    title: 'Download Imediato',
    description:
      'Arquivo .txt gerado em memória e disponível para download sem necessidade de backend.',
  },
] as const;

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
    description:
      'Baixe o arquivo .txt pronto, com posicionamento exato conforme a especificação FEBRABAN.',
  },
] as const;

const technologies = [
  { name: 'Vue 3', description: 'Composition API' },
  { name: 'Quasar v2', description: 'UI Framework' },
  { name: 'TypeScript', description: 'Strict Mode' },
  { name: 'Pinia', description: 'State Management' },
] as const;
</script>

<style lang="scss" scoped>
// FAB fixo
.gab-fab-menu {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

// ===========================
// Hero Section
// ===========================
.gab-hero {
  position: relative;
  height: 100vh;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f1b2d, #1a3a5c);
  overflow: hidden;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    pointer-events: none;
  }

  &__logo {
    position: absolute;
    top: 32px;
    left: 32px;
    font-family: var(--gab-font-ui);
    font-size: 2rem;
    font-weight: 700;
    color: #14bdac;
    letter-spacing: 4px;
    z-index: 1;
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

  &__headline {
    font-family: var(--gab-font-ui);
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    color: #e8edf3;
    margin: 0;
  }

  &__subtitle {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-subtitle);
    font-weight: 400;
    color: #a0aeba;
    margin: 0;
    line-height: 1.6;
  }

  &__cta {
    margin-top: 8px;
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 24px;
    color: #a0aeba;
    animation: gab-bounce 2s infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}

@keyframes gab-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
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

// ===========================
// Features Section
// ===========================
.gab-features {
  padding: 80px 24px;
  background: var(--gab-surface-100);

  :global(.body--dark) & {
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

    :global(.body--dark) & {
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
  background: #ffffff;
  border-radius: var(--gab-radius-md);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--gab-shadow-card);
  transition: box-shadow 0.2s ease;

  :global(.body--dark) & {
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

    :global(.body--dark) & {
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

// ===========================
// Como Funciona Section
// ===========================
.gab-how-it-works {
  padding: 80px 24px;
  background: var(--gab-surface-200);

  :global(.body--dark) & {
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

    :global(.body--dark) & {
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
    background: #1a3a5c;
    color: #e8edf3;
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

    :global(.body--dark) & {
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

// ===========================
// Tecnologias Section
// ===========================
.gab-tech {
  padding: 64px 24px;
  background: var(--gab-surface-100);

  :global(.body--dark) & {
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

    :global(.body--dark) & {
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
  background: #ffffff;
  box-shadow: var(--gab-shadow-card);

  :global(.body--dark) & {
    background: var(--gab-dark-surface);
    border-color: var(--gab-dark-border);
  }

  &__name {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-subtitle);
    font-weight: 600;
    color: #1a3a5c;

    :global(.body--dark) & {
      color: #14bdac;
    }
  }

  &__desc {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-small);
    color: var(--gab-text-muted);
    margin-top: 4px;
  }
}

// ===========================
// CTA Final Section
// ===========================
.gab-cta-final {
  padding: 96px 24px;
  background: #1a3a5c;
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
    color: #e8edf3;
    margin: 0;
  }

  &__sub {
    font-family: var(--gab-font-ui);
    font-size: var(--gab-text-body);
    color: #a0aeba;
    margin: 0;
    line-height: 1.6;
  }
}

// ===========================
// Footer
// ===========================
.gab-footer {
  background: #0f1b2d;
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
    color: #14bdac;
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
    color: #a0aeba;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: #14bdac;
    }
  }

  &__version {
    font-family: var(--gab-font-mono);
    font-size: var(--gab-text-caption);
    color: #a0aeba;
  }
}

// ===========================
// Drawer
// ===========================
.gab-drawer {
  background: #0f1b2d !important;

  :global(.body--light) & {
    background: #1a3a5c !important;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px;
    border-bottom: 1px solid #2a3f58;
  }

  &__logo {
    font-family: var(--gab-font-ui);
    font-size: 1.5rem;
    font-weight: 700;
    color: #14bdac;
    letter-spacing: 4px;
  }
}
</style>
