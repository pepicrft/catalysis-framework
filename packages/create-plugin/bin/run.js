#!/usr/bin/env node

process.removeAllListeners('warning');

import runCreatePlugin from "../dist/node/index.js"

runCreatePlugin();
