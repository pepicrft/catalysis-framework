import { fs, path, error,  } from './index';
import toml from "@iarna/toml";
import { z } from "zod";

export const errors = {
  directoryNotFound: (directory: string) => {
    return new error.Abort(`App does not exist in directory ${directory}`)
  },
  configFileNotFound: () => {
    return new error.Abort('The config file could not be found', 'Make sure the directory or any of its ascendants contains a gestalt.config.toml that identifies the app.');
  },
  validation: () => {
    return new error.Abort("Thre was a validation error");
  }
}

type RenderingType = "client" | "server" | "static"
type UIFramework = "react" | "vue" | "svelte"

type SlugType = "dynamic" | "static"
interface SlugComponent {
  type: SlugType
  value: string
}
interface Route {
  slugComponents: SlugComponent[] // ["blog", "posts", "post(dynamic)"]
  path: string  //  // blog/posts/[post].static.tsx
  data?: string  // blog/posts/[post].data.ts
  slugs?: string  // blog/posts/[post].slugs.ts
  renderingType: RenderingType // static
  uiFramework: UIFramework // react */
}
export interface App {
  directory: string
  configuration: Configuration
  routes: Route[]
}

const ConfigurationSchema = z.object({
  name: z.string(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;

export async function load(directory: string): Promise<App> {
  if (!await fs.exists(directory)) {
      throw errors.directoryNotFound(directory);
  }

  const configPath = await path.findUp('gestalt.config.toml',  {type: 'file', cwd: directory})
  if (!configPath) {
    throw errors.configFileNotFound();
  }

  const configFileString = await fs.readFile(configPath);
  const configFileObject = toml.parse(configFileString);

  let configFile
  try {
    configFile = await ConfigurationSchema.parseAsync(configFileObject)
  }
  catch (zodError: any) {
    throw errors.validation()
  }

  return { configuration: configFile, directory: path.dirname(configPath), routes: [] };
}

export async function watch() {

}
