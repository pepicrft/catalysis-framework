#!/usr/bin/env node

process.removeAllListeners('warning');

import runGestalt from "../dist/node/index.js"

runGestalt();
