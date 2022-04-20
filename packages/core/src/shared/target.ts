import { z } from 'zod'

/**
 * It represents the schema of the gestalt.config.toml file.
 */
export const Schema = z.object({})

/** Type that represents a gestalt.config.toml file */
type Target = z.infer<typeof Schema>
export default Target
