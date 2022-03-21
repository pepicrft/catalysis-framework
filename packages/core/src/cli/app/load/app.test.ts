import { describe, it, expect } from 'vitest'
import tempy from 'tempy'
import toml from '@iarna/toml'
import { join as pathJoin } from '../../path'
import { writeFile } from '../../fs'
import load, { DirectoryNotFoundError, ConfigFileNotFoundError } from './app'

describe('load', () => {
  it('throws an error when the directory does not exist', async () => {
    // When/Then
    const directory = '/invalid-path'
    await expect(load(directory)).rejects.toThrowError(
      DirectoryNotFoundError(directory)
    )
  })

  it('throws an error when the config file not found', async () => {
    await tempy.directory.task(async (tempDirectory) => {
      await expect(load(tempDirectory)).rejects.toThrowError(
        ConfigFileNotFoundError()
      )
    })
  })

  it('throws an error when the config file is invalid', async () => {
    await tempy.directory.task(async (tempDirectory) => {
      // Given
      const invalidConfig = {}
      const configurationPath = pathJoin(tempDirectory, 'gestalt.config.toml')

      const invalidConfigFileContent = toml.stringify(invalidConfig)
      await writeFile(configurationPath, invalidConfigFileContent)

      // Write
      await expect(load(tempDirectory)).rejects.toThrowError()
    })
  })
})
