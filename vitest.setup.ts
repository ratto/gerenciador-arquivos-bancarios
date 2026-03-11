import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'

// Garante Pinia fresca antes de cada teste para evitar vazamento de estado
beforeEach(() => {
  setActivePinia(createPinia())
})

// Componentes Quasar são auto-importados pelo Quasar CLI em runtime.
// No Vitest eles não estão disponíveis, por isso são stubados globalmente.
config.global.stubs = {
  QBtn: true,
  QInput: true,
  QSelect: true,
  QForm: true,
  QPage: true,
  QLayout: true,
  QHeader: true,
  QToolbar: true,
  QToolbarTitle: true,
  QPageContainer: true,
  QDrawer: true,
  QList: true,
  QItem: true,
  QItemSection: true,
  QItemLabel: true,
  QIcon: true,
  QSeparator: true,
  QCard: true,
  QCardSection: true,
  QCardActions: true,
  QBanner: true,
  QField: true,
  QCheckbox: true,
  QRadio: true,
  QToggle: true,
  QSteppers: true,
  QStep: true,
  QStepper: true,
  QTable: true,
  QTd: true,
  QTr: true,
  QTh: true,
}
