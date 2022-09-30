import { AbsolutePath } from '../../path.js'
import type { UserConfiguration } from '../../../common/manifests/configuration'

export type Configuration = UserConfiguration & {
  /** The path to the gestalt.config.{js,ts} file */
  path: AbsolutePath
}
