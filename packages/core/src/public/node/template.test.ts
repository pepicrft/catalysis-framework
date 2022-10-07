import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
import { ScaffoldOptions, scaffold } from './template.js'
import { joinPath } from './path.js'
import { writeFile, pathExists, readFile, makeDirectory } from './fs.js'

describe('scaffold basic file', () => {
  test('scaffold template', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const sourceDirectory = tmpDir.appending('source')
      const targetDirectory = tmpDir.appending('target')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const fileName = 'hello-world.txt'
      const sourceFile = joinPath(sourceDirectory.pathString, fileName)
      await makeDirectory(sourceDirectory.pathString)
      await writeFile(sourceFile, '')
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory.pathString,
        targetDirectory: targetDirectory.pathString,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      const targetFile = joinPath(targetDirectory.pathString, fileName)
      await expect(pathExists(targetFile))
    })
  })
})

describe('scaffold handlebar file', () => {
  test('scaffold template', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const sourceDirectory = tmpDir.appending('source')
      const targetDirectory = tmpDir.appending('{{name}}')
      const handlebarData = {
        name: 'my-cool-project',
      }
      const sourceFileName = '{{name}}.txt.hbs'
      const sourceFile = joinPath(sourceDirectory.pathString, sourceFileName)
      const sourceContent = '{{name}}'
      await makeDirectory(sourceDirectory.pathString)
      await writeFile(sourceFile, sourceContent)
      const scaffoldOptions: ScaffoldOptions = {
        sourceDirectory: sourceDirectory.pathString,
        targetDirectory: targetDirectory.pathString,
        data: handlebarData,
      }
      // When
      await scaffold(scaffoldOptions)
      // Then
      await expect(pathExists(targetDirectory.pathString))
      const expectedFile = joinPath(
        tmpDir.pathString,
        'my-cool-project/my-cool-project.txt'
      )
      await expect(pathExists(expectedFile))
      const expectedContent = 'my-cool-project'
      const targetContent = await readFile(expectedFile)
      await expect(targetContent).toEqual(expectedContent)
    })
  })
})
