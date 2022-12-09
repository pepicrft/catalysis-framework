import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
import { ScaffoldOptions, scaffold } from './template.js'
import { writeFile, pathExists, readFile, makeDirectory } from './fs.js'

describe('scaffold basic file', () => {
  test('scaffold template', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const sourceDirectory = tmpDir.pathAppendingComponent('source')
      const targetDirectory = tmpDir.pathAppendingComponent('target')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const fileName = 'hello-world.txt'
      const sourceFile = sourceDirectory.pathAppendingComponent(fileName)
      await makeDirectory(sourceDirectory)
      await writeFile(sourceFile, '')
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      const targetFile = targetDirectory.pathAppendingComponent(fileName)
      const fileExists = await pathExists(targetFile)
      expect(fileExists).toBeTruthy()
    })
  })
})

describe('scaffold handlebar file', () => {
  test('scaffold template', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const sourceDirectory = tmpDir.pathAppendingComponent('source')
      const targetDirectory = tmpDir.pathAppendingComponent('{{name}}')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const sourceFileName = '{{name}}.txt.hbs'
      const sourceFile = sourceDirectory.pathAppendingComponent(sourceFileName)
      const sourceContent = '{{name}}'
      await makeDirectory(sourceDirectory)
      await writeFile(sourceFile, sourceContent)
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory,
        targetDirectory: targetDirectory,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      await expect(async () => {
        await pathExists(targetDirectory)
      }).resolves.toBeTruthy()
      const expectedFile = tmpDir.pathAppendingComponent(
        'my-cool-project/my-cool-project.txt'
      )
      await expect(async () => {
        await pathExists(expectedFile)
      }).resolves.toBeTruthy()
      const expectedContent = 'my-cool-project'
      const targetContent = await readFile(expectedFile)
      expect(targetContent).toEqual(expectedContent)
    })
  })
})
