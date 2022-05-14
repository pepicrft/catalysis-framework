import { addDependencies, inferDependencyManager } from './npm'
import { join as pathJoin } from '../shared/path'
import { writeFile, makeDirectory } from './fs'
import { describe, test, expect, vi } from 'vitest'
import { exec } from './system'
import { temporary } from '@gestaltjs/testing'

vi.mock('./system')

describe('addDependencies', () => {
  test('runs the right command when npm and dev dependencies', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const packageJsonPath = pathJoin(tmpDir, 'package.json')
      await writeFile(packageJsonPath, JSON.stringify({}))

      // When
      await addDependencies({
        directory: tmpDir,
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
    await temporary.directory(async (tmpDir) => {
      // Given
      const lockfilePath = pathJoin(tmpDir, 'yarn.lock')
      const nestedDirectory = pathJoin(tmpDir, 'a/b/c')
      await makeDirectory(nestedDirectory)
      await writeFile(lockfilePath, '')

      // When
      const got = await inferDependencyManager(nestedDirectory)

      // Then
      expect(got).toEqual('yarn')
    })
  })

  test('returns pnpm when it finds a pnpm-lock.yaml', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const lockfilePath = pathJoin(tmpDir, 'pnpm-lock.yaml')
      const nestedDirectory = pathJoin(tmpDir, 'a/b/c')
      await makeDirectory(nestedDirectory)
      await writeFile(lockfilePath, '')

      // When
      const got = await inferDependencyManager(nestedDirectory)

      // Then
      expect(got).toEqual('pnpm')
    })
  })

  test('returns npm by default', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const nestedDirectory = pathJoin(tmpDir, 'a/b/c')
      await makeDirectory(nestedDirectory)

      // When
      const got = await inferDependencyManager(nestedDirectory)

      // Then
      expect(got).toEqual('npm')
    })
  })
})
