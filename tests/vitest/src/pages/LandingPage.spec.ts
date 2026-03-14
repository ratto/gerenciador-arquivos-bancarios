import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, defineComponent, ref } from 'vue';

// Mutable dark state to control mock between tests
const darkState = { isActive: true };
const toggleMock = vi.fn(() => {
  darkState.isActive = !darkState.isActive;
});

vi.mock('quasar', () => ({
  useQuasar: () => ({
    dark: {
      get isActive() {
        return darkState.isActive;
      },
      toggle: toggleMock,
    },
    screen: { lt: { md: false } },
  }),
}));

// Must import after vi.mock
import LandingPage from 'pages/LandingPage.vue';

// QBtn stub renders as <button> preserving all bound attributes
const QBtnStub = defineComponent({
  name: 'QBtn',
  inheritAttrs: true,
  setup(_, { attrs }) {
    return () => h('button', { ...attrs });
  },
});

// QToggle stub renders as <input type="checkbox"> preserving all bound attributes
const QToggleStub = defineComponent({
  name: 'QToggle',
  inheritAttrs: true,
  props: ['modelValue'],
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

// QDrawer stub: renders slot content only when modelValue is true
const QDrawerStub = defineComponent({
  name: 'QDrawer',
  inheritAttrs: true,
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { slots }) {
    return () => (props.modelValue ? slots.default?.() ?? null : null);
  },
});

// Transparent wrapper stubs that render their default slot content
const SlotPassthrough = defineComponent({
  setup(_, { slots }) {
    return () => slots.default?.() ?? null;
  },
});

describe('LandingPage', () => {
  beforeEach(() => {
    darkState.isActive = true;
    toggleMock.mockClear();
  });

  function mountPage() {
    return mount(LandingPage, {
      global: {
        stubs: {
          QBtn: QBtnStub,
          QDrawer: QDrawerStub,
          QToggle: QToggleStub,
          QList: SlotPassthrough,
          QItem: SlotPassthrough,
          QItemSection: SlotPassthrough,
          QSeparator: true,
          QIcon: true,
        },
      },
    });
  }

  it('renderiza a hero section com aria-label correto', () => {
    const wrapper = mountPage();
    const hero = wrapper.find('[aria-label="Apresentação do GAB"]');
    expect(hero.exists()).toBe(true);
  });

  it('renderiza o texto da headline na hero section', () => {
    const wrapper = mountPage();
    const headline = wrapper.find('.gab-hero__headline');
    expect(headline.exists()).toBe(true);
    expect(headline.text()).toContain('Gere arquivos bancários');
  });

  it('renderiza o botão CTA "Começar agora" na hero', () => {
    const wrapper = mountPage();
    const cta = wrapper.find('[aria-label="Começar agora — acessar o aplicativo"]');
    expect(cta.exists()).toBe(true);
  });

  it('renderiza o botão FAB de menu', () => {
    const wrapper = mountPage();
    const fab = wrapper.find('[aria-label="Abrir menu"]');
    expect(fab.exists()).toBe(true);
  });

  it('abre o drawer ao clicar no FAB', async () => {
    const wrapper = mountPage();
    // Antes do clique o drawer está fechado (QDrawerStub não renderiza)
    expect(wrapper.find('[data-testid="dark-mode-toggle"]').exists()).toBe(false);

    const fab = wrapper.find('[aria-label="Abrir menu"]');
    await fab.trigger('click');

    // Após o clique o drawer abre e o toggle fica visível
    expect(wrapper.find('[data-testid="dark-mode-toggle"]').exists()).toBe(true);
  });

  it('renderiza o toggle de dark mode dentro do drawer após abertura', async () => {
    const wrapper = mountPage();
    const fab = wrapper.find('[aria-label="Abrir menu"]');
    await fab.trigger('click');

    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.exists()).toBe(true);
  });

  it('chama $q.dark.toggle() ao acionar o toggle de dark mode', async () => {
    const wrapper = mountPage();
    // Abre o drawer
    const fab = wrapper.find('[aria-label="Abrir menu"]');
    await fab.trigger('click');

    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    await toggle.trigger('change');
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it('as seções principais têm aria-label', () => {
    const wrapper = mountPage();
    expect(wrapper.find('[aria-label="Apresentação do GAB"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Funcionalidades principais"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Como funciona o GAB"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Tecnologias utilizadas"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Chamada para ação final"]').exists()).toBe(true);
  });

  it('renderiza as 3 features cards', () => {
    const wrapper = mountPage();
    const cards = wrapper.findAll('.gab-feature-card');
    expect(cards).toHaveLength(3);
  });

  it('renderiza os 3 passos do como funciona', () => {
    const wrapper = mountPage();
    const steps = wrapper.findAll('.gab-step');
    expect(steps).toHaveLength(3);
  });

  it('o ref drawerOpen começa como false (drawer fechado)', () => {
    const wrapper = mountPage();
    // QDrawerStub só renderiza seu conteúdo quando modelValue é true
    // Como o drawerOpen inicia em false, o toggle não deve estar visível
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.exists()).toBe(false);
  });

  it('renderiza o footer com o logo GAB', () => {
    const wrapper = mountPage();
    const footer = wrapper.find('footer[role="contentinfo"]');
    expect(footer.exists()).toBe(true);
    const logo = footer.find('.gab-footer__logo');
    expect(logo.text()).toBe('GAB');
  });
});
