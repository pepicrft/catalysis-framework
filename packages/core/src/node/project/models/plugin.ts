import { Plugin as UserPlugin } from '../../../node/plugin'

export type Plugin = UserPlugin & {
  name: string
  directory: string
}
