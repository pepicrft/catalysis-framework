import { AbsolutePath } from '../../../../public/node/path.js'
import { BaseCompiler } from '../compiler.js'
import { build as esbuild } from 'esbuild'

export class ESBuildBaseCompiler implements BaseCompiler {
  async compile(
    inputPath: AbsolutePath,
    outputPath: AbsolutePath
  ): Promise<void> {
    const result = await esbuild({
      entryPoints: [inputPath.pathString],
      bundle: false,
      outfile: outputPath.pathString,
      logLevel: 'silent',
    })
    console.log(`YOLO:`)
    console.log(result)
  }
}
