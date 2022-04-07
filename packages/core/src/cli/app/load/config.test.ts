import { describe, it, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { lookupConfigurationPathTraversing, load as loadConfig } from './config'
import { configurationFileName } from '../../constants'
import { join as pathJoin, dirname as pathDirname } from '../../path'
import { writeFile } from '../../fs'
import { fileURLToPath } from 'url'
import { workspace } from '@gestaltjs/testing'

describe('lookupConfigurationPathTraversing', () => {
  it('returns undefined if the file could not be located', async () => {
    await temporary.directory(async (tmpDir) => {
      // When
      const got = await lookupConfigurationPathTraversing(tmpDir)

      // Then
      expect(got).toBeUndefined()
    })
  })

  it('returns the path if the configuration is .js', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const fileName = `${configurationFileName}.js`
      const filePath = pathJoin(tmpDir, fileName)
      await writeFile(filePath, 'content')

      // When
      const got = await lookupConfigurationPathTraversing(tmpDir)

      // Then
      expect(got).toEqual(filePath)
    })
  })
})

describe('loadConfig', () => {
  it('loads the configuration when the configuration is a valid .ts configuration', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const fileName = `${configurationFileName}.ts`
      const filePath = pathJoin(tmpDir, fileName)
      const { configuration: configurationModule } =
        workspace.gestaltjsPackageModules()

      await writeFile(
        filePath,
        `
      import {defineConfiguration} from "gestaltjs/configuration"

      export default defineConfiguration({
        name: "Test"
      })
      `
      )

      // When
      const got = await loadConfig(filePath, {
        alias: [
          {
            find: configurationModule.name,
            replacement: configurationModule.path,
          },
        ],
      })

      // Then
      expect(got.name).toEqual('Test')
    })
  })

  it('loads the configuration when the configuration is a valid .js configuration', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const fileName = `${configurationFileName}.js`
      const filePath = pathJoin(tmpDir, fileName)
      const { configuration: configurationModule } =
        workspace.gestaltjsPackageModules()

      await writeFile(
        filePath,
        `
      import {defineConfiguration} from "gestaltjs/configuration"

      export default defineConfiguration({
        name: "Test"
      })
      `
      )

      // When
      const got = await loadConfig(filePath, {
        alias: [
          {
            find: configurationModule.name,
            replacement: configurationModule.path,
          },
        ],
      })

      // Then
      expect(got.name).toEqual('Test')
    })
  })
})
