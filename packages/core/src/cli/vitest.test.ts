import { describe, test, expect, vi } from 'vitest'
import { exec } from './system'

import { run } from './vitest'

vi.mock('./system')

describe('run', () => {
  test('returns the path to the executable', async () => {
    // Given
    const args = ['first']
    const cwd = '/temp/project'

    // When
    await run(args, cwd)

    // Then
    expect(exec).toHaveBeenCalledOnce()
    const [_, gotArgs, gotOptions] = vi.mocked(exec).mock.calls[0]
    expect(gotArgs).toEqual(args)
    expect(gotOptions).toEqual({ stdio: 'inherit', cwd })
  })
})
