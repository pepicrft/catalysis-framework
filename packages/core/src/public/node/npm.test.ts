import { addDependencies, inferDependencyManager } from './npm.js'
import { joinPath } from './path.js'
import { writeFile, makeDirectory } from './fs.js'
import { describe, test, expect, vi } from 'vitest'
import { exec } from './system.js'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
import { encodeJson } from './json.js'

vi.mock('./system')

describe('addDependencies', () => {
  test('runs the right command when npm and dev dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'npm',
        type: 'dev',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('npm', ['install', '--save-dev'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when npm and production dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'npm',
        type: 'prod',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('npm', ['install', '--save-prod'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when npm and peer dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'npm',
        type: 'peer',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('npm', ['install', '--save-peer'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when yarn and dev dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'yarn',
        type: 'dev',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('yarn', ['add', '--dev'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when yarn and prod dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'yarn',
        type: 'prod',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('yarn', ['add', '--prod'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when yarn and peer dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'yarn',
        type: 'peer',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('yarn', ['add', '--peer'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when pnpm and dev dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'pnpm',
        type: 'dev',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('pnpm', ['add', '--save-dev'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })

  test('runs the right command when pnpm and peer dependencies', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const packageJsonPath = tmpDir.appending('package.json')
      await writeFile(packageJsonPath, encodeJson({}))

      // When
      await addDependencies({
        directory: tmpDir.pathString,
        dependencies: ['gestaltjs'],
        dependencyManager: 'pnpm',
        type: 'peer',
      })

      // Then
      expect(exec).toHaveBeenCalledWith('pnpm', ['add', '--save-peer'], {
        stdout: undefined,
        stderr: undefined,
        signal: undefined,
      })
    })
  })
})

describe('inferDependencyManager', () => {
  test('returns yarn when it finds a yarn.lock', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const lockfilePath = tmpDir.appending('yarn.lock')
      const nestedDirectory = tmpDir.appending('a/b/c')
      await makeDirectory(nestedDirectory)
      await writeFile(lockfilePath, '')

      // When
      const got = await inferDependencyManager(nestedDirectory.pathString)

      // Then
      expect(got).toEqual('yarn')
    })
  })

  test('returns pnpm when it finds a pnpm-lock.yaml', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const lockfilePath = tmpDir.appending('pnpm-lock.yaml')
      const nestedDirectory = tmpDir.appending('a/b/c')
      await makeDirectory(nestedDirectory)
      await writeFile(lockfilePath, '')

      // When
      const got = await inferDependencyManager(nestedDirectory.pathString)

      // Then
      expect(got).toEqual('pnpm')
    })
  })

  test('returns npm by default', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const nestedDirectory = tmpDir.appending('a/b/c')
      await makeDirectory(nestedDirectory)

      // When
      const got = await inferDependencyManager(nestedDirectory.pathString)

      // Then
      expect(got).toEqual('npm')
    })
  })
})
