import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { join as joinPath } from '../../path'
import { pluginFileName } from '../../constants'

describe('loadPlugins', () => {
  test('loads the plugins when the manifest is Javascript and Typescript', async () => {
    await temporary.directory((tmpDir) => {
      // Given
      const nodeModulesDirectory = joinPath(tmpDir, 'node_modules')
      const pluginADirectory = joinPath(nodeModulesDirectory, 'A')
      const pluginBDirectory = joinPath(nodeModulesDirectory, 'B')
      const pluginAFile = joinPath(pluginADirectory, `${pluginFileName}.ts`)
      const pluginBFile = joinPath(pluginADirectory, `${pluginFileName}.js`)
      const pluginContent = `
      import {defineConfiguration} from "gestaltjs/plugin"

      export default definePlugin(renderer: {
        dependencies: {},
      })
      `
    })
  })
})
