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
          QLayout: SlotPassthrough,
          QPageContainer: SlotPassthrough,
          QDrawer: SlotPassthrough,
          QList: SlotPassthrough,
          QItem: SlotPassthrough,
          QItemSection: SlotPassthrough,
          QItemLabel: SlotPassthrough,
          QSeparator: true,
          QIcon: true,
          QToggle: QToggleStub,
          'router-view': true,
          RouterLink: true,
        },
      },
    });
  }

  it('renders the dark mode toggle', () => {
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    expect(toggle.exists()).toBe(true);
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

  it('calls $q.dark.toggle() when the toggle changes', async () => {
    const wrapper = mountLayout();
    const toggle = wrapper.find('[data-testid="dark-mode-toggle"]');
    await toggle.trigger('change');
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
