import { vitest, path, fs } from '@gestaltjs/core/cli'
import { temporary } from '../../../../testing/src'

export async function configureTests(directory: string) {
  // vitest.config.js
  await temporary.directory(async (tmpDir: string) => {
    const viteConfigContent = `
    import { defineConfig } from 'vitest/config'
    export default defineConfig({
      test: {
        root: ${directory},
        watch: false,
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
      },
    })
    `
    const viteConfigPath = path.join(tmpDir, "vitest.config.ts")
    await fs.writeFile(viteConfigPath, viteConfigContent)
    await vitest.run(['--config', viteConfigPath], directory)
  })
}
