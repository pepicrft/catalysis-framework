import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { join as joinPath, dirname } from '../../path'
import { mkDir, writeFile } from '../../fs'
import { pluginFileName } from '../../constants'
import { loadPlugins } from './plugin'

describe('loadPlugins', () => {
  test('loads the plugins when the manifest is Javascript and Typescript', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const nodeModulesDirectory = joinPath(tmpDir, 'node_modules')
      const pluginADirectory = joinPath(nodeModulesDirectory, 'A')
      const pluginBDirectory = joinPath(nodeModulesDirectory, 'B')
      const pluginAFile = joinPath(pluginADirectory, `${pluginFileName}.ts`)
      const pluginBFile = joinPath(pluginBDirectory, `${pluginFileName}.js`)
      const pluginContent = `
      import {defineConfiguration} from "gestaltjs/plugin"

      export default definePlugin(renderer: {
        dependencies: {},
      })
      `
      await mkDir(dirname(pluginAFile))
      await mkDir(dirname(pluginBFile))
      await writeFile(pluginAFile, pluginContent)
      await writeFile(pluginBFile, pluginContent)

      // When
      const got = await loadPlugins([tmpDir])
    })
  })
})
