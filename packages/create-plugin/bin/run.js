#!/usr/bin/env node

process.removeAllListeners('warning');

import runCreatePlugin from "../dist/public/node/index.js"

runCreatePlugin();
