import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { resolve } from 'path'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium', name: 'chromium' },
      ],
    },
  },
})
