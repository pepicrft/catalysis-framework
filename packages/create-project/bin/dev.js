#!/usr/bin/env node

process.removeAllListeners('warning');

import runCreateProject from "../dist/index.js"

runCreateProject();
