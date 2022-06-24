#!/usr/bin/env node

process.removeAllListeners('warning');

import runCreateProject from "../dist/node/index.js"

runCreateProject();
