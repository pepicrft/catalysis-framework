#!/usr/bin/env node

process.removeAllListeners('warning');

import runGestalt from "../dist/public/node/index.js"

runGestalt();
