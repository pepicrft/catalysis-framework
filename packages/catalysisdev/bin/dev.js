#!/usr/bin/env node

process.removeAllListeners('warning');

import runCatalysis from "../dist/public/node/index.js"

runCatalysis();
