#!/usr/bin/env node

process.removeAllListeners('warning');

import runGestalt from "../dist/cli/index.js"

runGestalt();
