import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
import { ScaffoldOptions, scaffold } from './template.js'
import { joinPath } from './path.js'
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
      await expect(pathExists(targetFile))
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
      await expect(pathExists(targetDirectory))
      const expectedFile = tmpDir.pathAppendingComponent(
        'my-cool-project/my-cool-project.txt'
      )
      await expect(pathExists(expectedFile))
      const expectedContent = 'my-cool-project'
      const targetContent = await readFile(expectedFile)
      await expect(targetContent).toEqual(expectedContent)
    })
  })
})
