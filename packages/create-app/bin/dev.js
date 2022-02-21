#!/usr/bin/env node

import runCreateApp from "../dist/index.js"

process.removeAllListeners('warning');

runCreateApp();
