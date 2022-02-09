#!/usr/bin/env node
import url from 'url'
import pc from "picocolors";
import path from "pathe";
import fs from "fs";
import {execa} from "execa";
import { fileURLToPath } from 'url';
import fg from "fast-glob";
import tempy from 'tempy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isExecuted = import.meta.url === url.pathToFileURL(process.argv[1]).href;

const errorCodes = {
    missingOutputArgument: 1,
    alreadyExistingDirectory: 2,
    commandError: 3
}

function abort(errorMessage, exitCode) {
    console.error(errorMessage);
    process.exit(exitCode);
}

async function aggregatedDependencies() {
    const packages = ["gestalt", "core", "create-app"];
    const packagePackageJsons = packages.map((packageName) => path.join(__dirname, "../packages", packageName, "package.json"));
    const packageJsons = await Promise.all(packagePackageJsons.map(async (packageJsonPath) => {
        return JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'))
    }))
    const dependencies = Object.fromEntries(packageJsons.flatMap((packageJson) => {
        return Object.entries(packageJson.dependencies ?? {});
    }))
    delete dependencies["@gestaltjs/core"]
    return dependencies;
}

/**
 * Executes the given command formatting the standard output and error event.
 * @param {string} The command to be executed.
 * @param {string[]} The arguments to pass to the given command.
 * @param {Object} Options to pass when executing the process.
 */
async function execute(command, args, options = {}) {
    const execution = execa(command, args, options)
    execution.stdout.on('data', (data) => {
        process.stdout.write(pc.gray(`${command}: ${data}`))
    })
    execution.stderr.on('data', (data) => {
        process.stderr.write(pc.gray(`${command}: ${data}`))
    })
    try {
        await execution
    } catch (error) {
        abort(error.shortMessage, errorCodes.commandError);
    }
}

/**
 * This script bundles and exports the Gesalt CLIs into the given
 * directory to be executable outside of the context of this repository.
 */
export async function exportCLIs(outputDirectory) {
    await tempy.directory.task(async (temporaryDirectory) => {

        const gestaltOutputDirectory = path.join(outputDirectory, "gestalt");
        if (fs.existsSync(gestaltOutputDirectory)) {
            abort(`The directory already exists ${gestaltOutputDirectory}`, errorCodes.alreadyExistingDirectory);
        }

        await fs.promises.mkdir(gestaltOutputDirectory, {recursive: true});

        console.log(pc.green(pc.bold(`Creating package.json`)))
        const dependencies = await aggregatedDependencies();
        const packageJson = {
            "name": "@gestaltjs/gestalt",
            "private": true,
            "dependencies": dependencies
        }
        await fs.promises.writeFile(
            path.join(gestaltOutputDirectory, "package.json"),
            JSON.stringify(packageJson, null, 4),
            'utf-8'
        )
        console.log(pc.green(pc.bold(`Installing dependencies`)))
        await execute("pnpm", ["install"], {cwd: gestaltOutputDirectory})

        console.log(pc.green(pc.bold(`Packing packages`)))

        console.log(`Packing gestaltjs`)
        const gestaltPackageDirectory = path.join(__dirname, "../packages/gestalt");
        await execute("pnpm", ["pack", "--pack-destination", temporaryDirectory], {cwd: gestaltPackageDirectory})

        console.log(pc.gray(`Packing @gestaltjs/create-app`))
        const createAppPackageDirectory = path.join(__dirname, "../packages/create-app");
        await execute("pnpm", ["pack", "--pack-destination", temporaryDirectory], {cwd: createAppPackageDirectory})

        console.log(pc.gray(`Packing @gestaltjs/core`))
        const corePackageDirectory = path.join(__dirname, "../packages/core");
        await execute("pnpm", ["pack", "--pack-destination", temporaryDirectory], {cwd: corePackageDirectory})

        console.log(pc.green(pc.bold(`Packing packages`)))
        const tars = await fg([path.join(temporaryDirectory, "*.tgz")], {onlyFiles: true});
        const coreTar = tars.find((path) => path.includes("core"))
        const createAppTar = tars.find((path) => path.includes("create-app"))
        const gestaltTar = tars.find((path) => path !== coreTar && path !== createAppTar )
        const unpackPath = path.join(temporaryDirectory, "unpack");
        await fs.promises.mkdir(unpackPath, {recursive: true})

        const createAppPath = path.join(gestaltOutputDirectory, "create-app");
        await fs.promises.mkdir(path.dirname(createAppPath), {recursive: true})
        await execute("tar", ["-zx", "-f", createAppTar], {cwd: unpackPath})
        await fs.promises.rename(path.join(unpackPath, "package"), createAppPath)

        const gestaltPath = path.join(gestaltOutputDirectory, "gestalt");
        await fs.promises.mkdir(path.dirname(gestaltPath), {recursive: true})
        await execute("tar", ["-zx", "-f", gestaltTar], {cwd: unpackPath})
        await fs.promises.rename(path.join(unpackPath, "package"), gestaltPath)

        const corePath = path.join(gestaltOutputDirectory, "node_modules/@gestaltjs/core");
        await fs.promises.mkdir(path.dirname(corePath), {recursive: true})
        await execute("tar", ["-zx", "-f", coreTar], {cwd: unpackPath})
        await fs.promises.rename(path.join(unpackPath, "package"), corePath)

        console.log(pc.green(pc.bold(`🎉 CLIs successfully exported`)));
        console.log(pc.green(`To create an app run: ${path.join(gestaltOutputDirectory, "create-app/bin/run.js")}`))
        console.log(pc.green(`To run Gestalt run: ${path.join(gestaltOutputDirectory, "gestalt/bin/run.js")}`))
    })
}

if (isExecuted) {
    if (process.argv.length !== 3) {
        await exportCLIs(tempy.directory());
    } else {
        await exportCLIs(process.argv[2]);
    }
}
