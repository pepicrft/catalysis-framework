import fg from 'fast-glob'
import { join as joinPath, relative, dirname } from './path'
import { copyFile, mkDir, readFile, writeFile } from './fs'

export type ScaffoldOptions = {
  sourceDirectory: string
  targetDirectory: string
  data: { [key: string]: string }
}

export async function scaffold(scaffoldOptions: ScaffoldOptions) {
  const entries = await fg(
    [joinPath(scaffoldOptions.sourceDirectory, '**/*')],
    {
      dot: true,
      onlyFiles: true,
    }
  )
  for (let i = 0; i < entries.length; i++) {
    const relativePath = relative(scaffoldOptions.sourceDirectory, entries[i])
    let targetFile = joinPath(scaffoldOptions.targetDirectory, relativePath)
    const targetFileDirectory = dirname(targetFile)
    mkDir(targetFileDirectory)
    if (targetFile.endsWith('.hbs')) {
      const templateContent = readFile(targetFile)
      let targetData = ''
      for (let handlebar in scaffoldOptions.data) {
        const value = scaffoldOptions.data[handlebar]
        handlebar = ['{{', handlebar, '}}'].join('')
        templateContent.then((content) => {
          targetData = content.replace(handlebar, value)
          // make this more robust, what if there are spaces?
        })
        targetFile.replace(handlebar, value)
      }
      targetFile = targetFile.replace('.hbs', '')
      writeFile(targetFile, targetData)
    } else {
      await copyFile(entries[i], targetFile)
    }
  }
}
