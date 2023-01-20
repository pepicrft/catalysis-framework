#!/usr/bin/env node

process.removeAllListeners('warning');

import runCreateProject from "../dist/public/node/index.js"

await runCreateProject();
