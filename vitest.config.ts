import { resolve } from 'path'
import type { AliasOptions } from 'vite'
import { defineConfig } from 'vite'

const r = (p: string) => resolve(__dirname, p)
import fg from 'fast-glob';


export const alias: AliasOptions = {
  ...Object.fromEntries(fg.sync(r('./packages/*/package.json'), { dot: false }).map((path: string) => {
    const packageName = path.split('packages/')[1].replace('/package.json', '');
    return [`@gestaltjs/${packageName}`, r(`packages/${packageName}/src`)]
  }))
}

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias,
  },
  test: {
    isolate: false,
  },
})
