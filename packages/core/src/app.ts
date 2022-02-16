import { z } from "zod";

export type App = {
    directory: string;
    routes: Route[];
    configuration: Configuration;
}

export type Route = {
    route: string;
}

export const ConfigurationSchema = z.object({
    name: z.string(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;
