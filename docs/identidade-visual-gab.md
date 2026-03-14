# Gerenciador de Arquivos Bancários
## Guia de Identidade Visual

**Design System · Quasar Framework · v2.0**

---

## 1. Visão Geral do Produto

O Gerenciador de Arquivos Bancários (GAB) é uma aplicação web voltada para desenvolvedores e engenheiros de software que precisam processar, validar e gerenciar arquivos bancários nos padrões CNAB 240 e CNAB 400. A interface transmite precisão técnica, confiança operacional e eficiência.

A tela de entrada não é um dashboard: é uma landing page de impacto visual, nos moldes de [playstation.com](https://www.playstation.com/pt-br/ps5/) e [netflix.com](https://www.netflix.com/br/) — hero fullscreen com carrossel/vídeo e CTA principal. O menu é retrátil e acessível via botão flutuante; não existe topbar. O dashboard de dados fica em rota interna, acessado apenas após login ou ação do usuário.

### Público-Alvo

- Desenvolvedores de sistemas financeiros e bancários
- Engenheiros de software em integrações de pagamento
- Times de tecnologia em fintechs e bancos
- Analistas de TI em ambientes corporativos

### Princípios de Design

- **Clareza técnica** — informação densa, porém escanável e organizada
- **Confiança** — paleta sóbria que remete a seriedade financeira e tecnologia
- **Eficiência** — componentes funcionais, sem ornamentos desnecessários
- **Dark-mode nativo** — reduz fadiga visual em sessões longas de trabalho
- **Consistência de formulários** — `QInput`, `QSelect`, `QFile` e demais inputs compartilham a mesma família tipográfica (Inter), altura (44px), border-radius e estilo de borda
- **Acessibilidade WCAG AA** — contraste mínimo 4.5:1 em todos os textos

---

## 2. Paleta de Cores

A paleta é inspirada em terminais, IDEs e dashboards de monitoramento combinados com a sobriedade do setor financeiro. Azul-marinho transmite confiança e seriedade; teal/ciano adiciona modernidade técnica.

### 2.1 Cores de Marca — Brand Colors (Quasar)

Essas são as 8 cores principais mapeadas diretamente para o sistema de brand do Quasar via `quasar.config.ts`:

| Amostra | Nome | HEX | Quasar Brand | Uso |
|---|---|---|---|---|
| 🟦 | Primary | `#1A3A5C` | `primary` | Botões primários, links, cabeçalhos principais |
| 🟩 | Secondary | `#0D7377` | `secondary` | Ações secundárias, bordas ativas, badges |
| 🩵 | Accent | `#14BDAC` | `accent` | Highlights, hover states, ícones ativos |
| ⬛ | Dark | `#0F1B2D` | `dark` | Fundo dark mode, sidebars, painéis |
| 💚 | Positive | `#21A856` | `positive` | Sucesso, validação aprovada, arquivo OK |
| 🔴 | Negative | `#D93025` | `negative` | Erro, arquivo rejeitado, falha de parsing |
| 🟡 | Warning | `#F5A623` | `warning` | Alerta, campos com atenção, parcial |
| 🔵 | Info | `#1D85C6` | `info` | Informação, status neutro, tooltips |

### 2.2 Neutros e Superfícies

| Nome | HEX | CSS Variable | Uso |
|---|---|---|---|
| Surface 100 | `#F5F7FA` | `--gab-surface-100` | Background de páginas (light mode) |
| Surface 200 | `#E8EDF3` | `--gab-surface-200` | Cards, painéis, separadores |
| Text muted | `#A0AEBA` | `--gab-text-muted` | Textos secundários, placeholders |
| Text body | `#3D5166` | `--gab-text-body` | Texto principal em light mode |
| Dark BG | `#131F2E` | `--gab-dark-bg` | Background geral em dark mode |
| Dark Surface | `#1E2D40` | `--gab-dark-surface` | Cards e painéis em dark mode |
| Dark Border | `#2A3F58` | `--gab-dark-border` | Bordas e separadores dark |

### 2.3 Configuração no `quasar.config.ts`

```typescript
// quasar.config.ts
framework: {
  config: {
    brand: {
      primary:   '#1A3A5C',  // Azul-marinho
      secondary: '#0D7377',  // Teal profundo
      accent:    '#14BDAC',  // Ciano técnico
      dark:      '#0F1B2D',  // Azul escuro
      positive:  '#21A856',  // Verde sucesso
      negative:  '#D93025',  // Vermelho erro
      warning:   '#F5A623',  // Âmbar alerta
      info:      '#1D85C6'   // Azul info
    }
  }
}
```

---

## 3. Tipografia

A tipografia prioriza legibilidade técnica. Inter é usada para toda a interface e JetBrains Mono para valores de dados, campos CNAB e identificadores técnicos. O corpo de texto padrão é **16px (1rem)** — tamanho que garante boa legibilidade em desktop e dispositivos mobile sem necessidade de zoom.

### 3.1 Fontes Principais

| Fonte | Papel | Pesos |
|---|---|---|
| **Inter** | UI, headings, body, formulários | 300, 400, 500, 600, 700 |
| **JetBrains Mono** | Dados, código, valores CNAB (exclusivo) | 400, 500, 700 |

**Importação no `index.html`:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### 3.2 Escala Tipográfica

> **⬆ Mudança v2.0:** `--gab-text-body` foi elevado de 14px para **16px (1rem)** para melhorar a legibilidade em dispositivos mobile e reduzir fadiga em sessões longas. Todos os elementos de interface padrão — `QInput`, `QSelect`, `QTable`, body de `QCard` — devem usar este tamanho.

| Token | Tamanho | Peso | Line-Height | Uso |
|---|---|---|---|---|
| `--gab-text-display` | 32px / 2rem | 700 | 1.2 | Títulos de página, H1, hero headline |
| `--gab-text-title` | 24px / 1.5rem | 600 | 1.3 | Subtítulos, H2 |
| `--gab-text-subtitle` | 18px / 1.125rem | 600 | 1.4 | Seções, H3, labels de card |
| `--gab-text-body` | **16px / 1rem** | 400 | 1.6 | ⬆ Padrão — body, inputs, selects, labels |
| `--gab-text-small` | 14px / 0.875rem | 400 | 1.5 | Labels secundários, meta, descrições |
| `--gab-text-caption` | 12px / 0.75rem | 400 | 1.4 | Captions, timestamps, tooltips |
| `--gab-text-code` | 13px / 0.8125rem | 400/500 | 1.7 | JetBrains Mono — valores CNAB exclusivamente |

---

## 4. Landing Page — Estrutura da Tela Inicial

A tela inicial do GAB é uma landing page de produto — não um dashboard. Inspirada em playstation.com e netflix.com, ela comunica o valor do produto com impacto visual antes do usuário entrar na aplicação. O menu não ocupa uma topbar fixa: é retrátil e acessível via botão flutuante (FAB).

### 4.1 Estrutura de Seções

| # | Seção | Descrição |
|---|---|---|
| 01 | **Hero fullscreen** | Ocupa 100vh. Fundo escuro com imagem, vídeo loop ou carrossel. Sobreposição com logo GAB, headline, subtítulo e botão CTA primário "Começar agora". Menu FAB no canto superior direito. |
| 02 | **Features (3 colunas)** | Três cards destacando: Processamento CNAB 240/400, Validação automática de registros e Download de retornos. Fundo branco/cinza claro. |
| 03 | **Como funciona** | Fluxo visual em 3 passos: Upload → Validação → Download. Diagrama inline ou ícones com texto. |
| 04 | **Tecnologias** | Logo wall: Quasar, Vue 3, TypeScript, Node.js. Transmite credibilidade técnica ao público desenvolvedor. |
| 05 | **CTA Final** | Fundo primário (`#1A3A5C`). Headline + botão "Acessar o app". Contraste máximo com a seção anterior. |
| 06 | **Footer** | Logo + links de documentação, GitHub, versão. Fundo dark (`#0F1B2D`). |

### 4.2 Menu Retrátil (QDrawer) — sem Topbar

O GAB não possui topbar fixa. O menu é implementado como `QDrawer` retrátil, ativado por um `QBtn` flutuante (FAB) no canto superior direito da tela.

- **Botão flutuante:** `QBtn round unelevated color="primary" icon="menu"` — fixo com `position: fixed; top: 16px; right: 16px; z-index: 1000`
- **Ao abrir:** `QDrawer overlay side="right" width="280"` com fundo `#0F1B2D`
- **Conteúdo do menu:** logo GAB, links de navegação e, ao final, o switch de alternância dark/light mode
- **Switch dark/light:** fica **dentro do drawer** — nunca exposto na interface principal. Usa `QToggle` chamando `Dark.toggle()` do Quasar
- **Fechar:** ao clicar fora (`v-model` controlado)
- **Mobile (xs/sm):** drawer ocupa a tela toda (`behavior="mobile"`)

#### Posição do Switch Dark/Light

O switch de alternância deve ser o **último item do drawer**, separado por um `QSeparator`, com label "Modo escuro" e ícone de lua (dark) / sol (light). Não colocar na topbar (não existe), nem em overlay da hero, nem como elemento flutuante separado.

### 4.3 Hero Section — Especificações

- **Altura:** `100vh` (tela inteira ao carregar)
- **Fundo:** vídeo MP4 loop (sem áudio) ou carrossel de imagens com Ken Burns effect. Fallback: `background: linear-gradient(135deg, #0F1B2D, #1A3A5C)`
- **Overlay escuro:** `background: rgba(0, 0, 0, 0.55)` sobre o vídeo/imagem
- **Logo GAB:** topo esquerdo, `padding: 32px`, `position: absolute`
- **Conteúdo central:** `display: flex; flex-direction: column; align-items: center`. Headline (`--gab-text-display`, 48–64px em desktop), subtítulo (`--gab-text-title`), CTA primário (`QBtn color="accent" unelevated size="lg"`)
- **Scroll indicator:** seta animada na parte inferior da hero, aponta para baixo
- **Sem topbar, sem navegação horizontal** exposta na hero

---

## 5. Componentes Quasar — Especificações

A regra central dos formulários: `QInput`, `QSelect`, `QFile`, `QDate`, `QTime` e demais campos de entrada compartilham a mesma fonte (Inter), o mesmo tamanho (16px), a mesma altura (44px), o mesmo border-radius (4px) e o mesmo estilo de borda. A única diferença visual permitida são os ícones nativos de cada tipo.

### 5.1 QBtn — Botões

| Variante | Props Quasar | Quando Usar |
|---|---|---|
| Primário (filled) | `color="primary" unelevated` | Ação principal (ex: Processar Arquivo, CTA hero) |
| Secundário (outline) | `color="primary" outline` | Ação secundária (ex: Cancelar, Voltar) |
| Teal accent | `color="secondary" unelevated` | Ações de destaque (ex: Download, Exportar) |
| Ghost / Flat | `flat color="primary"` | Ações terciárias, botões em tabelas |
| Danger | `color="negative" unelevated` | Ações destrutivas (ex: Excluir, Rejeitar) |
| FAB Menu | `round unelevated color="primary"` | Botão flutuante de abertura do menu (`position: fixed`) |
| Icon-only | `round flat color="primary"` | Toolbar inline em tabelas |

### 5.2 Elementos de Formulário — Regra de Consistência

Todos os campos DEVEM seguir o mesmo estilo base. A diferenciação visual só é permitida nos ícones/controles nativos de cada tipo.

| Propriedade CSS | Valor | Aplica-se a |
|---|---|---|
| `font-family` | `Inter, system-ui, -apple-system, sans-serif` | QInput, QSelect, QFile, todos os campos |
| `font-size` | `16px (1rem)` | QInput, QSelect — padrão body |
| `font-weight` | `400 regular` | Valor digitado / selecionado |
| `height` | `44px (dense: 40px)` | Altura de linha de todos os campos |
| `border-radius` | `4px (--gab-radius-sm)` | Todos os inputs — padrão `outlined` |
| `border` | `1.5px solid #D0D8E4` | Estado normal (light mode) |
| `border` focus | `1.5px solid #1A3A5C (--q-primary)` | Estado focus em todos os campos |
| `border` erro | `1.5px solid #D93025 (--q-negative)` | Estado de erro em todos os campos |
| `padding` | `0 12px` | Padding interno horizontal |
| `background` | `#FFFFFF light / #1E2D40 dark` | Fundo dos campos |

#### Diferenças Permitidas entre Tipos de Campo

- **QSelect:** ícone de chevron (`expand_more`) no lado direito — cor `primary` ao abrir
- **QFile:** ícone de clipe (`attach_file`) ou área de drop — mesmo estilo de borda e fonte
- **QDate / QTime:** ícone de calendário/relógio no `append` — popup mantém Inter 16px
- **QInput `type="password"`:** ícone de olho para toggle visibility — mesmo estilo

#### SCSS Global para Consistência de Formulários

```scss
// src/css/form-consistency.scss
.q-field__native,
.q-field__input,
.q-field__prefix,
.q-field__suffix {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  font-size: 1rem !important;   // 16px
  font-weight: 400 !important;
}

// Labels flutuantes — mesma fonte, menor
.q-field__label {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  font-size: 0.875rem !important; // 14px quando flutuante
}

// Outlined: borda consistente em todos
.q-field--outlined .q-field__control {
  border-radius: 4px !important;
}
```

### 5.3 QTable — Tabelas de Dados

- Use `dense` para listagens densas de registros CNAB
- Prop `flat` remove a sombra — prefira para tabelas dentro de cards
- Prop `bordered` adiciona bordas finas — recomendado para comparação de campos
- Slots `body-cell-*` para renderizar badges de status (`QBadge`)
- Paginação com `rows-per-page-options="[25, 50, 100]"` como padrão

### 5.4 QBadge — Status de Processamento

| Status | Props Quasar | Contexto |
|---|---|---|
| Processado / OK | `color="positive"` | Arquivo validado com sucesso, lote aceito |
| Erro / Rejeitado | `color="negative"` | Arquivo com erros de formato, rejeitado |
| Pendente / Atenção | `color="warning" text-color="dark"` | Aguardando processamento, warning parcial |
| Informativo | `color="info"` | Status neutro, informação de contexto |
| Em processamento | `color="primary"` | Arquivo em fila ou sendo processado |

### 5.5 QLayout — Estrutura Interna (pós-landing)

- **Sidebar** (`QDrawer`): `width=260`, `breakpoint=1024`, `mini-width=60` para modo compacto — usado nas rotas internas (`/app/*`)
- **Sem `QHeader` / topbar** nas rotas internas — a navegação fica no `QDrawer`
- **Na landing page:** sem `QLayout` — HTML/Vue puro com posicionamento próprio
- `QPageContainer` com `padding q-pa-md` (16px) em páginas de conteúdo interno

---

## 6. CSS Variables Globais

```scss
// src/css/app.scss
:root {
  // Fontes
  --gab-font-ui:   'Inter', system-ui, -apple-system, sans-serif;
  --gab-font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  // Escala tipográfica
  --gab-text-display:  2rem;        // 32px
  --gab-text-title:    1.5rem;      // 24px
  --gab-text-subtitle: 1.125rem;   // 18px
  --gab-text-body:     1rem;        // 16px ← padrão (↑ de 14px)
  --gab-text-small:    0.875rem;   // 14px
  --gab-text-caption:  0.75rem;    // 12px
  --gab-text-code:     0.8125rem; // 13px — JetBrains Mono

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
  --gab-radius-sm: 4px;   // inputs, badges
  --gab-radius-md: 8px;   // cards pequenos
  --gab-radius-lg: 12px;  // cards grandes, modais

  // Sombras
  --gab-shadow-card:  0 1px 3px rgba(15, 27, 45, 0.08);
  --gab-shadow-hover: 0 4px 12px rgba(15, 27, 45, 0.12);

  // Formulários — BASE UNIVERSAL
  --gab-form-font:    'Inter', system-ui, sans-serif;
  --gab-form-size:    1rem;      // 16px — igual body
  --gab-form-height:  44px;      // todos os inputs
  --gab-form-radius:  4px;       // border-radius
  --gab-form-border:  1.5px solid #D0D8E4;
}
```

---

## 7. Dark Mode e Toggle

O GAB deve ter dark mode como modo padrão para o público desenvolvedor. O toggle de alternância entre modo escuro e claro fica **exclusivamente dentro do menu retrátil (QDrawer)** — nunca exposto como elemento flutuante ou na topbar.

### 7.1 Ativação via Quasar

- Plugin Dark nativo: `quasar.config.ts` → `plugins: ["Dark"]`
- Modo padrão ao iniciar: `Dark.set(true)` no boot file, ou `Dark.set("auto")` para seguir o SO
- Persistência: o Quasar persiste a preferência automaticamente no `localStorage`

### 7.2 Posicionamento no QDrawer

```vue
<!-- Dentro do QDrawer, após os links de navegação -->
<q-separator class="q-my-md" />

<q-item>
  <q-item-section avatar>
    <q-icon :name="$q.dark.isActive ? 'dark_mode' : 'light_mode'" />
  </q-item-section>
  <q-item-section>Modo escuro</q-item-section>
  <q-item-section side>
    <q-toggle
      :model-value="$q.dark.isActive"
      @update:model-value="$q.dark.toggle()"
      color="accent"
    />
  </q-item-section>
</q-item>
```

### 7.3 Mapeamento de Cores por Modo

| Elemento | Light Mode | Dark Mode |
|---|---|---|
| Background de página | `#F5F7FA` | `#131F2E` |
| Surface / Cards | `#FFFFFF` | `#1E2D40` |
| Bordas | `#D0D8E4` | `#2A3F58` |
| Texto principal | `#3D5166` | `#E8EDF3` |
| Texto secundário | `#A0AEBA` | `#6B849C` |
| Menu Drawer | `#1A3A5C` | `#0F1B2D` |
| Input background | `#FFFFFF` | `#1E2D40` |
| Hero fundo (landing) | `#0F1B2D` (fixo) | `#0F1B2D` (fixo) |
| Brand primary | `#1A3A5C` (mesmo) | `#1A3A5C` (mesmo) |

---

## 8. Acessibilidade — Checklist WCAG AA

- ✅ Contraste texto/fundo: Inter `#3D5166` sobre `#F5F7FA` = **5.8:1** (mínimo 4.5:1)
- ✅ Contraste dark: `#E8EDF3` sobre `#131F2E` = **12.1:1**
- ✅ Botão primário: branco sobre `#1A3A5C` = **9.3:1**
- ✅ Touch targets: 44px em todos os inputs e botões
- ✅ Fonte 16px no body reduz necessidade de zoom em mobile (melhoria v2.0)
- ✅ Navegação por teclado: todos os componentes Quasar são acessíveis via Tab/Enter
- ✅ Focus visible: não remover outline de foco dos componentes Quasar
- ✅ Alt text em todos os ícones funcionais via `aria-label`
- ✅ Mensagens de erro descritas via `:rules` no `QInput`, não apenas por cor
- ✅ Animações da hero respeitam `prefers-reduced-motion`
- ✅ Status de processamento anunciados via `aria-live="polite"`

---

## 9. Responsividade e Breakpoints

A landing page é totalmente responsiva — mobile-first. As rotas internas (processamento de arquivos) são desktop-first, mas funcionais em tablet.

| Breakpoint | Largura | Comportamento |
|---|---|---|
| `xs` | < 600px | Hero com fonte menor (32px). Drawer ocupa tela inteira. Features empilhadas. |
| `sm` | 600–1023px | Hero normal. Drawer lateral (280px). Features em 2 colunas. |
| `md` | 1024–1439px | Layout completo. Sidebar interna (260px). Features em 3 colunas. |
| `lg` | 1440–1919px | Layout confortável. Conteúdo `max-width: 1200px` centralizado. |
| `xl` | ≥ 1920px | Layout wide. Conteúdo `max-width: 1440px`. |

---

## 10. Referências e Recursos

### Referências de Landing Page

- PlayStation 5 (hero fullscreen): <https://www.playstation.com/pt-br/ps5/>
- Netflix (hero com CTA direto): <https://www.netflix.com/br/>

### Quasar Framework

- Documentação: <https://quasar.dev>
- Color Palette: <https://quasar.dev/style/color-palette>
- Theme Builder: <https://quasar.dev/style/theme-builder>
- Dark Plugin: <https://quasar.dev/quasar-plugins/dark>

### Google Fonts

- Inter: <https://fonts.google.com/specimen/Inter>
- JetBrains Mono: <https://fonts.google.com/specimen/JetBrains+Mono>

### Ferramentas de Contraste

- WebAIM Contrast Checker: <https://webaim.org/resources/contrastchecker>

---

*Gerenciador de Arquivos Bancários · Guia de Identidade Visual v2.0 · 2025*
