import { describe, it, expect } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { ScaffoldOptions, scaffold } from './template'
import { join as joinPath } from './path'
import { writeFile, exists, readFile, mkDir } from './fs'

describe('scaffold basic file', () => {
  it('scaffold template', async () => {
    await temporary.directory((tmpDir) => {
      // Given
      const sourceDirectory = joinPath(tmpDir, 'source')
      const targetDirectory = joinPath(tmpDir, 'target')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const fileName = 'hello-world.txt'
      const sourceFile = joinPath(sourceDirectory, fileName)
      mkDir(sourceDirectory)
      writeFile(sourceFile, '')
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      scaffold(scaffoldOptions)
      // Then
      const targetFile = joinPath(targetDirectory, fileName)
      expect(exists(targetFile))
    })
  })
})

describe('scaffold handlebar file', () => {
  it('scaffold template', async () => {
    await temporary.directory((tmpDir) => {
      // Given
      const sourceDirectory = joinPath(tmpDir, 'source')
      const targetDirectory = joinPath(tmpDir, 'target')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const sourceFileName = '{{name}}.txt.hbs'
      const sourceFile = joinPath(sourceDirectory, sourceFileName)
      const sourceContent = '{{name}}'
      mkDir(sourceDirectory)
      writeFile(sourceFile, sourceContent)
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      scaffold(scaffoldOptions).then(() => {
        // Then
        expect(exists(targetDirectory))
        const expectedFile = joinPath(targetDirectory, 'my-cool-project.txt')
        expect(exists(expectedFile))
        const expectedContent = 'my-cool-project'
        readFile(expectedFile).then((content) => {
          expect(content).toEqual(expectedContent)
        })
      })
    })
  })
})
