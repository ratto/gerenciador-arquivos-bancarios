import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, defineComponent } from 'vue';

// Mutable dark state to control mock between tests
const darkState = { isActive: false };
const toggleMock = vi.fn(() => {
  darkState.isActive = !darkState.isActive;
});

vi.mock('quasar', () => ({
  useQuasar: () => ({
    version: '2.0.0',
    dark: {
      get isActive() {
        return darkState.isActive;
      },
      toggle: toggleMock,
    },
  }),
}));

// Must import after vi.mock
import MainLayout from 'layouts/MainLayout.vue';

// Custom QBtn stub that renders as a real <button> preserving all bound attributes
const QBtnStub = defineComponent({
  name: 'QBtn',
  inheritAttrs: true,
  setup(_, { attrs }) {
    return () => h('button', { ...attrs });
  },
});

// Transparent wrapper stubs that render their default slot content
const SlotPassthrough = defineComponent({
  setup(_, { slots }) {
    return () => slots.default?.() ?? null;
  },
});

describe('MainLayout', () => {
  beforeEach(() => {
    darkState.isActive = false;
    toggleMock.mockClear();
  });

  function mountLayout() {
    return mount(MainLayout, {
      global: {
        stubs: {
          // Override global stubs with passthrough wrappers so the template renders fully
          QLayout: SlotPassthrough,
          QHeader: SlotPassthrough,
          QToolbar: SlotPassthrough,
          QToolbarTitle: SlotPassthrough,
          QPageContainer: SlotPassthrough,
          QDrawer: SlotPassthrough,
          QList: SlotPassthrough,
          QItem: SlotPassthrough,
          QItemSection: SlotPassthrough,
          QItemLabel: SlotPassthrough,
          // QBtn renders as <button> with all attributes
          QBtn: QBtnStub,
          // EssentialLink and router-view remain stubbed
          EssentialLink: true,
          'router-view': true,
        },
      },
    });
  }

  it('renders the dark mode toggle button', () => {
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.exists()).toBe(true);
  });

  it('shows dark_mode icon when dark mode is inactive', () => {
    darkState.isActive = false;
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.attributes('icon')).toBe('dark_mode');
  });

  it('shows light_mode icon when dark mode is active', () => {
    darkState.isActive = true;
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.attributes('icon')).toBe('light_mode');
  });

  it('has aria-label "Ativar modo escuro" when light mode is active', () => {
    darkState.isActive = false;
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.attributes('aria-label')).toBe('Ativar modo escuro');
  });

  it('has aria-label "Ativar modo claro" when dark mode is active', () => {
    darkState.isActive = true;
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.attributes('aria-label')).toBe('Ativar modo claro');
  });

  it('calls $q.dark.toggle() when the toggle button is clicked', async () => {
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    await toggle.trigger('click');
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
