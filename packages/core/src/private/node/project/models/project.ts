import { AbsolutePath } from 'typed-file-system-path'
import { Project } from '../../../../public/node/project/models/project.js'
import { Configuration } from '../../../../public/node/project/models/configuration.js'
import { joinPath } from '../../../../public/node/path.js'

export type ProjectImplConstructorOptions = {
  /** The directory that contains the project */
  directory: AbsolutePath

  /** The project's configuration loaded from the gestalt.config.{js,ts} file */
  configuration: Configuration
}

export class ProjectImpl implements Project {
  directory: AbsolutePath
  configuration: Configuration

  constructor(options: ProjectImplConstructorOptions) {
    this.directory = options.directory
    this.configuration = options.configuration
  }

  get sourcesGlob(): string {
    return joinPath(`${this.sourceDirectory}`, '**/*.ts')
  }

  get sourceDirectory(): AbsolutePath {
    return this.directory.appending('src')
  }

  get middlewaresDirectory(): AbsolutePath {
    return this.sourceDirectory.appending('middlewares')
  }
}
