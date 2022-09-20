import { UserPlugin } from '../manifests/plugin'

export type Plugin = UserPlugin & {
  name: string
  directory: string
}
