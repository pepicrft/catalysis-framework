import fg from 'fast-glob'
import {
  joinPath,
  relativePathFrom,
  parentDirectory,
  absolutePath,
  AbsolutePath,
} from './path.js'
import { copyFile, makeDirectory, writeFile, readFile } from './fs.js'
import Handlebars from 'handlebars'

export type ScaffoldOptions = {
  sourceDirectory: AbsolutePath
  targetDirectory: AbsolutePath
  data: { [key: string]: string }
}

/**
 * Scaffolds files from templates substituting handlebars by desired values.
 * @param scaffoldOptions {{ScaffoldOptions}} Object containing source and target
 * directories as well has handlebar data.
 */
export async function scaffold(scaffoldOptions: ScaffoldOptions) {
  const entries = await fg(
    [joinPath(scaffoldOptions.sourceDirectory.pathString, '**/*')],
    {
      dot: true,
      onlyFiles: true,
    }
  )
  await Promise.all(
    entries.map(async (sourceFileString) => {
      const sourceFile = absolutePath(sourceFileString)
      const path = relativePathFrom(
        scaffoldOptions.sourceDirectory.pathString,
        sourceFile.pathString
      )
      let targetFile = joinPath(
        scaffoldOptions.targetDirectory.pathString,
        path
      )
      if (targetFile.endsWith('.hbs')) {
        const sourceContent = await readFile(sourceFile)
        const contentTemplate = Handlebars.compile(sourceContent)
        const targetContent = contentTemplate(scaffoldOptions.data)
        const fileNameTemplate = Handlebars.compile(targetFile)
        targetFile = fileNameTemplate(scaffoldOptions.data)
        targetFile = targetFile.replace('.hbs', '')
        const targetFileDirectory = parentDirectory(targetFile)
        await makeDirectory(absolutePath(targetFileDirectory))
        await writeFile(absolutePath(targetFile), targetContent)
      } else {
        const targetFileDirectory = parentDirectory(targetFile)
        await makeDirectory(absolutePath(targetFileDirectory))
        await copyFile(sourceFile, absolutePath(targetFile))
      }
    })
  )
}
