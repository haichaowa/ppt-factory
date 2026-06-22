import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
// @ts-expect-error - Ignoring the error of missing types for the uno config
import config from '@slidev/client/uno.config'
import { mergeConfigs, presetAttributify, presetIcons, presetWebFonts, presetWind3 } from 'unocss'

export default mergeConfigs([
  config,
  {
    safelist: [
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
    ],
    presets: [
      presetWind3({
        dark: 'class',
      }),
      presetAttributify(),
      presetIcons({
        collections: {
          ...createExternalPackageIconLoader('@proj-airi/lobe-icons'),
        },
      }),
      presetWebFonts({
        provider: 'bunny',
        fonts: {
          sans: 'Orbitron',
          mono: 'JetBrains Mono',
          hand: 'Press Start 2P',
        },
        timeouts: {
          failure: 60000,
          warning: 60000,
        },
      }),
    ],
  },
])
