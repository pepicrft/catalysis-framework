import {
  UserRenderer,
  UserServerRenderer,
  UserClientRenderer,
} from '../../../shared/renderer'

/**
 * An internal renderer type that includes the
 * server and client redererers that are defined
 * in the renderer/client.js and renderer/server.js
 * files
 */
export type Renderer = UserRenderer & {
  server?: UserServerRenderer
  client?: UserClientRenderer
}
