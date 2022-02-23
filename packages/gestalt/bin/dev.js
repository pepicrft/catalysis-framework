#!/usr/bin/env node

process.removeAllListeners('warning');

import runGestalt from "../dist/index.js"

runGestalt();
