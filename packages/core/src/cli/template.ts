import fg from 'fast-glob'
import { joinPath, relative, dirname } from '../node/path.public'
import { copyFile, makeDirectory, writeFile, readFile } from '../shared/fs'
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
  await Promise.all(
    entries.map(async (sourceFile) => {
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
        await makeDirectory(targetFileDirectory)
        await writeFile(targetFile, targetContent)
      } else {
        const targetFileDirectory = dirname(targetFile)
        await makeDirectory(targetFileDirectory)
        await copyFile(sourceFile, targetFile)
      }
    })
  )
}
