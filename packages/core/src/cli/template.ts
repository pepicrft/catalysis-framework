import fg from 'fast-glob'
import { join as joinPath, relative, dirname } from './path'
import { copyFile, mkDir, writeFile, readFileSync } from './fs'

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
    const targetFileDirectory = dirname(targetFile)
    mkDir(targetFileDirectory)
    if (targetFile.endsWith('.hbs')) {
      let fileContent = readFileSync(sourceFile)
      for (let handlebar in scaffoldOptions.data) {
        const value = scaffoldOptions.data[handlebar]
        handlebar = ['{{', handlebar, '}}'].join('')
        fileContent = fileContent.replace(handlebar, value)
        targetFile = targetFile.replace(handlebar, value)
      }
      targetFile = targetFile.replace('.hbs', '')
      writeFile(targetFile, fileContent)
    } else {
      await copyFile(sourceFile, targetFile)
    }
  }
}
