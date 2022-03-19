import { z } from 'zod'

/**
 * It represents the schema of the gestalt.config.toml file.
 */
export const Schema = z.object({
  /** Name of the project */
  name: z.string(),
})

/** Type that represents a gestalt.config.toml file */
type Configuration = z.infer<typeof Schema>
export default Configuration
