import { AbsolutePath } from '../../../../public/node/path.js'
import { BaseTranspiler } from '../transpiler.js'
import { build as esbuild } from 'esbuild'

export class ESBuildBaseTranspiler implements BaseTranspiler {
  async transpile(
    inputPath: AbsolutePath,
    outputPath: AbsolutePath
  ): Promise<void> {
    await esbuild({
      entryPoints: [inputPath.pathString],
      bundle: false,
      outfile: outputPath.pathString,
      logLevel: 'silent',
    })
  }
}
