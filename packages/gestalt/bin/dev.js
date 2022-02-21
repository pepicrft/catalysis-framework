#!/usr/bin/env node

import runGestalt from "../dist/index.js"

process.removeAllListeners('warning');

runGestalt();
