import {error} from "@gestaltjs/core/cli";
import { run, flush, settings, Errors } from '@oclif/core';

// Adding the "init" argument to run the command by default
if (process.argv.findIndex((arg) => arg === "init") === -1) {
    const executableIndex = process.argv.findIndex((arg) => arg.includes("bin/run"))
    process.argv[executableIndex+1] = "init"
}

const isDebug = process.env.DEBUG === "1"
settings.debug = isDebug;

const runCreateApp = () => {
    run(void 0, import.meta.url).then(flush).catch((thrownError) => {
        return error.handler(thrownError).then(Errors.handle);
    })
}

export default runCreateApp;
