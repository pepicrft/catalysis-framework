import { describe, it, expect, vi } from 'vitest'
import { eslint } from '@gestaltjs/core/cli'
import styles from './styles'
vi.mock('@gestaltjs/core/cli')
describe('run', () => {
  it('runs eslint cli command', async () => {
    // Given
    const options = getOptions({ fix: false })

    const expectedArgs = [options.app.sourcesGlob]

    // When
    await styles(options)

    // Then
    expect(eslint.run).toHaveBeenCalledWith(expectedArgs, options.app.directory)
  })

  it('runs eslint cli command with fix option', async () => {
    // Given
    const options = getOptions({ fix: true })
    const expectedArgs = ['--fix', options.app.sourcesGlob]

    // When
    await styles(options)

    // Then
    expect(eslint.run).toHaveBeenCalledWith(expectedArgs, options.app.directory)
  })
})

function getOptions({ fix }: { fix: boolean }) {
  return {
    fix,
    app: {
      directory: '/app',
      configuration: {
        name: 'app',
      },
      routes: [],
      sourcesGlob: '/app/src/**/*.{ts,js}',
    },
  }
}
