import { describe, it, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { locateConfiguration } from './config'
import { configurationFileName } from '../../constants'
import { join as pathJoin } from '../../path'
import { writeFile } from '../../fs'

describe('locateConfiguration', () => {
  it('returns undefined if the file could not be located', async () => {
    await temporary.directory(async (tmpDir) => {
      // When
      const got = await locateConfiguration(tmpDir)

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
      const got = await locateConfiguration(tmpDir)

      console.log(got)
      // Then
      expect(got).toEqual(filePath)
    })
  })
})
