import fg from 'fast-glob'
import { join as joinPath, relative, dirname } from './path'
import { copyFile, mkDir, writeFile, readFile } from './fs'
import Handlebars from 'handlebars'

export type ScaffoldOptions = {
  sourceDirectory: string
  targetDirectory: string
  data: { [key: string]: string }
}

/**
 * Scaffolds files from templates substituting handlebars by desired values.
 * @param scaffoldOptions {{ScaffoldOptions}} Object containing source and target
 * directories as well has handlebar data.
 */
export async function scaffold(scaffoldOptions: ScaffoldOptions) {
  const entries = await fg(
    [joinPath(scaffoldOptions.sourceDirectory, '**/*')],
    {
      dot: true,
      onlyFiles: true,
    }
  )
  for (let i = 0; i < entries.length; i++) {
    const sourceFile = entries[i]
    const relativePath = relative(scaffoldOptions.sourceDirectory, sourceFile)
    let targetFile = joinPath(scaffoldOptions.targetDirectory, relativePath)
    if (targetFile.endsWith('.hbs')) {
      const sourceContent = await readFile(sourceFile)
      const contentTemplate = Handlebars.compile(sourceContent)
      const targetContent = contentTemplate(scaffoldOptions.data)
      const fileNameTemplate = Handlebars.compile(targetFile)
      targetFile = fileNameTemplate(scaffoldOptions.data)
      targetFile = targetFile.replace('.hbs', '')
      const targetFileDirectory = dirname(targetFile)
      await mkDir(targetFileDirectory)
      writeFile(targetFile, targetContent)
    } else {
      const targetFileDirectory = dirname(targetFile)
      await mkDir(targetFileDirectory)
      await copyFile(sourceFile, targetFile)
    }
  }
}
