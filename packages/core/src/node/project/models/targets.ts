import { MainTarget } from './targets/main'

export type Targets = {
  /** Main targets. Deliverables like a web or a desktop app. */
  main: { [key: string]: MainTarget }
}
