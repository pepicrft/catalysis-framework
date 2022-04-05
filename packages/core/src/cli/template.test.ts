import { describe, it, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { ScaffoldOptions, scaffold } from './template'
import { join as joinPath } from './path'
import { writeFile, exists, readFile, mkDir } from './fs'

describe('scaffold basic file', () => {
  it('scaffold template', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const sourceDirectory = joinPath(tmpDir, 'source')
      const targetDirectory = joinPath(tmpDir, 'target')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const fileName = 'hello-world.txt'
      const sourceFile = joinPath(sourceDirectory, fileName)
      await mkDir(sourceDirectory)
      await writeFile(sourceFile, '')
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      const targetFile = joinPath(targetDirectory, fileName)
      await expect(exists(targetFile))
    })
  })
})

describe('scaffold handlebar file', () => {
  it('scaffold template', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const sourceDirectory = joinPath(tmpDir, 'source')
      const targetDirectory = joinPath(tmpDir, '{{name}}')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const sourceFileName = '{{name}}.txt.hbs'
      const sourceFile = joinPath(sourceDirectory, sourceFileName)
      const sourceContent = '{{name}}'
      await mkDir(sourceDirectory)
      await writeFile(sourceFile, sourceContent)
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      await expect(exists(targetDirectory))
      const expectedFile = joinPath(
        tmpDir,
        'my-cool-project/my-cool-project.txt'
      )
      await expect(exists(expectedFile))
      const expectedContent = 'my-cool-project'
      const targetContent = await readFile(expectedFile)
      await expect(targetContent).toEqual(expectedContent)
    })
  })
})
