import { UserPlugin } from '../../common/manifests/plugin.js'

export type Plugin = UserPlugin & {
  name: string
  directory: string
}
