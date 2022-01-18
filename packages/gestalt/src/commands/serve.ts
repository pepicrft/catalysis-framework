import fs from 'fs';
import path from 'path';

import express from 'express';
import { createServer } from 'vite';
import { Command } from '@oclif/core';

export default class Serve extends Command {
  static description = 'Serve your Gestalt application';

  static flags = {};

  static examples = [
    `$ oex serve --path=../../../../example
`,
  ];

  static args = [
    {
      name: 'path',
      description: 'The directory that contains the app',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Serve);
    const directory = path.resolve(args.path);
    process.cwd();

    const app = express();
    const vite = await createServer();
    const port = 3000;

    app.all('*', async (req, res) => {
      const routePath = path.join(
        directory,
        'src/routes',
        `${req.path}.ts`,
      );
      if (fs.existsSync(routePath)) {
        const route = await vite.ssrLoadModule(routePath);
        route.get(req, res);
      } else {
        res.status(400).send('Bad Request');
      }
    });

    app.listen(port, () => {
      console.log(`
      Example app listening at http://localhost:${port}
      `);
    });
  }
}
