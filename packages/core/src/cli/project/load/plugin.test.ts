import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { join as joinPath, dirname } from '../../path'
import { mkDir, writeFile } from '../../fs'
import { pluginFileName } from '../../constants'
import {
  loadPlugins,
  PackageJsonNotFoundError,
  NoNameInPackageJsonError,
} from './plugin'
import { workspace } from '@gestaltjs/testing'

describe('loadPlugins', () => {
  test('loads the plugins when the manifest is Javascript and Typescript', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const nodeModulesDirectory = joinPath(tmpDir, 'node_modules')
      const pluginADirectory = joinPath(nodeModulesDirectory, 'A')
      const pluginBDirectory = joinPath(nodeModulesDirectory, 'B')
      const pluginAFilePath = joinPath(pluginADirectory, `${pluginFileName}.ts`)
      const pluginAPackageJsonPath = joinPath(pluginADirectory, `package.json`)
      const pluginBFilePath = joinPath(pluginBDirectory, `${pluginFileName}.js`)
      const pluginBPackageJsonPath = joinPath(pluginBDirectory, `package.json`)

      const pluginContent = `
      import {definePlugin} from "@gestaltjs/plugins"

      export default definePlugin({
        renderer: {
          dependencies: {
            "test": "1.2.3"
          },
        }
      })
      `
      const { plugins: pluginsModule } = workspace.gestaltjsPackageModules()

      await mkDir(dirname(pluginAFilePath))
      await mkDir(dirname(pluginBFilePath))
      await writeFile(pluginAFilePath, pluginContent)
      await writeFile(pluginBFilePath, pluginContent)
      await writeFile(pluginAPackageJsonPath, JSON.stringify({ name: 'A' }))
      await writeFile(pluginBPackageJsonPath, JSON.stringify({ name: 'B' }))

      // When
      const got = (
        await loadPlugins([tmpDir], {
          alias: [
            {
              find: pluginsModule.identifier,
              replacement: pluginsModule.path,
            },
          ],
        })
      ).sort((lhs, rhs) => (lhs.name < rhs.name ? -1 : 1))

      // Then
      expect(got.length).toEqual(2)
      expect(got[0].name).toEqual('A')
      expect(got[1].name).toEqual('B')
    })
  })

  test('throws an error if the plugin lacks a package.json', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const nodeModulesDirectory = joinPath(tmpDir, 'node_modules')
      const pluginDirectory = joinPath(nodeModulesDirectory, 'Plugin')
      const pluginFilePath = joinPath(pluginDirectory, `${pluginFileName}.ts`)

      const pluginContent = `
      import {definePlugin} from "@gestaltjs/plugins"

      export default definePlugin({
        renderer: {
          dependencies: {
            "test": "1.2.3"
          },
        }
      })
      `
      const { plugins: pluginsModule } = workspace.gestaltjsPackageModules()

      await mkDir(dirname(pluginFilePath))
      await writeFile(pluginFilePath, pluginContent)

      // When
      await expect(async () => {
        await loadPlugins([tmpDir], {
          alias: [
            {
              find: pluginsModule.identifier,
              replacement: pluginsModule.path,
            },
          ],
        })
      }).rejects.toThrow(PackageJsonNotFoundError(pluginDirectory))
    })
  })

  test("throws an error if the plugin's package.json doesn't have a name attribute", async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const nodeModulesDirectory = joinPath(tmpDir, 'node_modules')
      const pluginDirectory = joinPath(nodeModulesDirectory, 'Plugin')
      const pluginFilePath = joinPath(pluginDirectory, `${pluginFileName}.ts`)
      const pluginPackageJsonPath = joinPath(pluginDirectory, `package.json`)

      const pluginContent = `
      import {definePlugin} from "@gestaltjs/plugins"

      export default definePlugin({
        renderer: {
          dependencies: {
            "test": "1.2.3"
          },
        }
      })
      `
      const { plugins: pluginsModule } = workspace.gestaltjsPackageModules()

      await mkDir(dirname(pluginFilePath))
      await writeFile(pluginFilePath, pluginContent)
      await writeFile(
        pluginPackageJsonPath,
        JSON.stringify({
          /** without name attribute */
        })
      )

      // When
      await expect(async () => {
        await loadPlugins([tmpDir], {
          alias: [
            {
              find: pluginsModule.identifier,
              replacement: pluginsModule.path,
            },
          ],
        })
      }).rejects.toThrow(NoNameInPackageJsonError(pluginDirectory))
    })
  })
})
