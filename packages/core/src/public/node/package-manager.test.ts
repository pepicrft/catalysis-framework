import { describe, test } from 'vitest'
import { findPackageJsonUp } from './package-manager.js'
import { inTemporarydirectory, writeFile } from './fs.js'
import { encodeJSON } from '../common/json.js'

describe('findPackageJsonUp', () => {
  test('returns the package.json if it exists', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.pathAppendingComponent('package.json')
      const packageJson = {
        name: 'test',
      }
      await writeFile(packageJsonPath, encodeJSON(packageJson))

      // When
      const got = await findPackageJsonUp({ fromDirectory: tmpDir })
    })
  })
})
