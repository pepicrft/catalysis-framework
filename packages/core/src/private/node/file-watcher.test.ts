import { describe, vi, test, expect } from 'vitest'
import chokidar from 'chokidar'
import { watchFiles } from './file-watcher.js'
import { absolutePath } from 'typed-file-system-path'

vi.mock('chokidar', () => ({
  default: {
    watch: vi.fn(),
  },
}))

describe('watchFiles', () => {
  test('it delegates file-watching to chokidar', async () => {
    // Given
    const fileWatcher = {
      on: vi.fn(),
      close: vi.fn(),
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(chokidar.watch).mockReturnValue(fileWatcher as any)

    // When
    const options: Parameters<typeof watchFiles>[0] = {
      patterns: '**/*',
      on: vi.fn(),
    }
    const subject = watchFiles(options)

    // Then
    expect(chokidar.watch).toHaveBeenCalledWith('**/*', { persistent: true })
    expect(fileWatcher.on).toHaveBeenCalledWith('all', expect.anything())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const allCallback: any = vi.mocked(fileWatcher.on).mock.calls[0][1]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    allCallback('all', '/index.ts')
    expect(options.on).toHaveBeenCalledWith('all', absolutePath('/index.ts'))
    await subject.close()
    expect(fileWatcher.close).toHaveBeenCalled()
  })
})
