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

<style lang="scss" scoped>
.gab-drawer {
  &__header {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--gab-dark-border, #2a3f58);
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
