import path from 'pathe';
import fg from 'fast-glob';

import {external, plugins, distDir} from '../../configurations/rollup.config';

const gestaltExternal = [...external, '@oclif/core', '@gestaltjs/core/cli', "@gestaltjs/core/framework"]
const gestaltPlugins = [
  ...plugins(__dirname),
]
const gestaltFeatures = ['build', 'db', 'lint', 'serve', 'test', 'type-check'];

const configuration = () => [
  {
    input: path.join(__dirname, 'src/index.ts'),
    output: [
      {
        file: path.join(distDir(__dirname), 'index.js'),
        format: 'esm',
        exports: 'auto',
      },
    ],
    plugins: gestaltPlugins,
    external: gestaltExternal,
  },
  ...gestaltFeatures.flatMap((feature) => {
    const commands = fg.sync([
      path.join(__dirname, `../${feature}/src/cli/commands/**/*.ts`),
      `!${path.join(__dirname, `../${feature}/src/cli/commands/**/*.test.ts`)}`,
    ]);
    return commands.map((commandPath) => {
      const outputPath = path.join(
        distDir(__dirname),
        'commands',
        commandPath.split('src/cli/commands')[1].replace('.ts', '.js'),
      );
      return {
        input: commandPath,
        output: [{file: outputPath, format: 'esm', exports: 'default'}],
        plugins: plugins(__dirname),
        external: [...external, ...gestaltExternal],
      };
    });
  }),
];

export default configuration;
