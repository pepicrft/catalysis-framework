#!/usr/bin/env node

process.removeAllListeners('warning');

import runCreatePlugin from "../dist/index.js"

runCreatePlugin();
