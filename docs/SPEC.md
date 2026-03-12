# SPEC — 01 - Dark Mode

## História de Usuário

Como usuário da aplicação,
quero poder alternar entre modo claro e modo escuro,
para que eu possa ter conforto visual quando necessário.

## Critérios de Aceite

- [ ] CA1: A aplicação deverá aplicar o modo claro ou escuro de acordo com as preferências de modo do sistema do usuário
- [ ] CA2: O usuário poderá alternar entre modo claro e modo escuro através de um toggle visível no toolbar
- [ ] CA3: A preferência selecionada pelo usuário é aplicada imediatamente em toda a interface durante a sessão

---

## Escopo

### Dentro do escopo

- Detectar automaticamente a preferência de tema do sistema operacional via `prefers-color-scheme` ao carregar a aplicação.
- Exibir um botão de toggle no `q-toolbar` do `MainLayout.vue` que alterna entre modo claro e escuro.
- Aplicar o tema imediatamente em todos os componentes Quasar ao acionar o toggle (sem recarregar a página).

### Fora do escopo

- Persistência da preferência do usuário entre sessões (localStorage / cookie).
- Paletas de cores customizadas por modo (além do comportamento padrão do Quasar).
- Suporte a temas além de claro e escuro (ex.: alto contraste).
- Considerações de SSR (a aplicação é 100% SPA).

---

## Contexto de Domínio

Não há domínio CNAB envolvido nesta funcionalidade. Trata-se exclusivamente de infraestrutura de UI para conforto visual do usuário (desenvolvedores, testers e engenheiros que podem usar a ferramenta em ambientes com iluminação variada ou com preferência de sistema configurada para modo escuro).

---

## Notas de UI/UX

### Toggle no Toolbar

- Localização: lado direito do `q-toolbar` em `src/layouts/MainLayout.vue`, antes ou após a versão do Quasar.
- Componente: `<q-btn flat round dense>` — padrão consistente com o botão de menu já existente.
- Ícone:
  - Modo claro ativo → ícone `dark_mode` (indica que clicar ativará o modo escuro).
  - Modo escuro ativo → ícone `light_mode` (indica que clicar ativará o modo claro).
- `aria-label` dinâmico: `"Ativar modo escuro"` / `"Ativar modo claro"`.
- Nenhum label textual necessário; o ícone é suficiente no contexto do toolbar.

### Comportamento de Inicialização (CA1)

- Ao montar a aplicação, o Dark Plugin do Quasar é configurado para `"auto"`, delegando a decisão inicial à preferência do sistema via `prefers-color-scheme: dark`.
- A configuração `dark: 'auto'` é definida em `quasar.config.ts → framework.config.dark`.

### Aplicação Imediata (CA3)

- O toggle chama `$q.dark.toggle()`, que atualiza reativamente `$q.dark.isActive` e aplica/remove a classe `body--dark` no `<body>`.
- Todos os componentes Quasar que respeitam dark mode são atualizados automaticamente sem nenhuma ação adicional.

---

## Notas de Modelo de Dados

### Nenhum store Pinia necessário

O Dark Plugin do Quasar mantém seu próprio estado reativo global. Não é necessário criar ou modificar nenhuma Pinia store.

### Nenhum arquivo em `src/model/` ou `src/composables/`

A lógica de dark mode é simples o suficiente para residir diretamente no `<script setup>` de `MainLayout.vue` via `useQuasar()`. Não há regra de negócio a encapsular — apenas acesso à API do framework.

### Alteração em `quasar.config.ts`

```typescript
framework: {
  config: {
    dark: 'auto'   // detecta preferência do sistema na inicialização
  }
}
```

### Lógica no `<script setup>` de `MainLayout.vue`

```typescript
const $q = useQuasar()
// $q.dark.isActive  → boolean reativo
// $q.dark.toggle()  → alterna o modo
```

---

## Restrições Técnicas

- A aplicação é SPA pura — não há restrições de SSR. A opção `"auto"` é segura.
- Nenhum arquivo em `src/model/` ou `src/composables/` deve ser criado ou modificado — o dark mode é responsabilidade exclusiva da camada View (`MainLayout.vue`) via API do framework (`useQuasar`).
- O botão de toggle deve ser acessível: incluir `aria-label` descritivo e ser acionável via teclado (comportamento padrão do `q-btn`).

---

## Referências

- Seção do PRD: §7 (Requisitos Não-Funcionais — Acessibilidade)
- Quasar Dark Plugin API: https://quasar.dev/quasar-plugins/dark
- Arquivos relacionados:
  - `src/layouts/MainLayout.vue` — View a ser modificada
  - `quasar.config.ts` — configuração inicial do dark mode
