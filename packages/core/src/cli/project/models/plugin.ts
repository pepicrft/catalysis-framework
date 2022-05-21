import { Plugin as UserPlugin } from '../../../node/plugin'
import { Renderer } from './renderer'

export type Plugin = Omit<UserPlugin, 'renderer'> & {
  name: string
  directory: string
} & {
  renderer?: Renderer
}
