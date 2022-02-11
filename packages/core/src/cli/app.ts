import {fs} from './index';

export interface App {
    name: string;
}

export async function load(directory: string): Promise<App> {
    if (!await fs.exists(directory)) {
        throw new Error(`App does not exist in directory ${directory}`)
    }

    return {
        name: "My app"
    }

    //   const configPath = ["cjs", "mjs"]
    //     .map((extension) => path.join(directory, `gestalt.config.${extension}`))
    //     .find((configPath) => fs.existsSync(configPath))

    //   if(configPath){
    //     const configurationContent = await import(configPath)
    //     const configuration: Configuration = await ConfigurationSchema.parseAsync(configurationContent)
    //   } else {
    //     throw new Error(`Config file does not exist in ${directory}`)
    //   }

    //   // directory / gestalt.config.js

    //   // gestalt.config.js

    //   return {
    //     directory: directory,
    //     routes: [],
    //     configuration: {
    //       name: "name"
    //     }
    //   };
}

export async function watch() {

}
