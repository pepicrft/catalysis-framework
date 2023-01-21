import { Project } from '@catalysisdev/core/node/project'
import { createApp } from 'h3'

type DevProjectOutput = {
  onChange: (project: Project) => void
}

export function devProject(project: Project) {
  const app = createApp()
  app.use('/', () => 'Hello world!')
}
