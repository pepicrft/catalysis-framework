/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { absolutePath } from 'typed-file-system-path'
import { describe, expect, test, vi } from 'vitest'
import { isPnpmPresent, pnpmInstall } from './pnpm.js'
import { exec } from './system.js'

vi.mock('./system.js')

describe('pnpmInstall', () => {
  test('it runs the right pnpm command', async () => {
    // Given
    const output: any = {}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(exec).mockResolvedValue(output)
    const directory = absolutePath('/tmp')
    const stdout: any = 'stdout'
    const stderr: any = 'stderr'

    // When
    await pnpmInstall({
      directory: directory,
      stdout,
      stderr,
    })

    // Then
    expect(exec).toHaveBeenCalledWith('pnpm', ['install'], {
      cwd: directory.pathString,
      stdout,
      stderr,
    })
  })
})
describe('isPnpmPresent', () => {
  test("returns true if the 'pnpm -h' command fails", async () => {
    // Given
    const error = new Error('not found')
    vi.mocked(exec).mockRejectedValue(error)

    // When
    const got = await isPnpmPresent()

    // Then
    expect(got).toEqual(false)
    expect(exec).toHaveBeenCalledWith('pnpm', ['-h'])
  })

  test("returns true if the 'pnpm -h' command succeeds", async () => {
    // Given
    const output: any = {}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    vi.mocked(exec).mockResolvedValue(output)

    // When
    const got = await isPnpmPresent()

    // Then
    expect(got).toEqual(true)
    expect(exec).toHaveBeenCalledWith('pnpm', ['-h'])
  })
})
