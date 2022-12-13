import chokidar from 'chokidar'
import { absolutePath, AbsolutePath } from 'typed-file-system-path'

/**
 * A union representing the file-watching events that are available.
 */
export type FileWatcherEvent =
  | 'add'
  | 'addDir'
  | 'change'
  | 'unlink'
  | 'unlinkDir'

export type FileWatcher = {
  /** It closes the file watcher */
  close: () => Promise<void>
}

export type WatchFilesOptions = {
  /** Patterns used to filter file-watching events */
  patterns: string | ReadonlyArray<string>
  /** Callback that's invoked on file-watching events */
  on: (event: FileWatcherEvent, path: AbsolutePath) => void
}

/**
 * It watches for directory and file changes and notifies updates.
 * @returns A FileWatcher instance.
 */
export function watchFiles(options: WatchFilesOptions): FileWatcher {
  const fileWatcher = chokidar.watch(options.patterns, {
    persistent: true,
  })
  fileWatcher.on('all', (event, path: string) => {
    options.on(event, absolutePath(path))
  })
  return fileWatcher
}
