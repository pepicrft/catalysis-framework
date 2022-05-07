import { loadRoutes } from './routes'
import { describe, test, expect, vi } from 'vitest'
import { temporary } from '@gestaltjs/testing'
import { models } from '@gestaltjs/testing'
import { dirname, join as pathJoin } from '../../../../path'
import { writeFile, makeDirectory } from '../../../../fs'
import { Route } from '../../../models/target/route'

describe('loadRoutes', () => {
  test('loads the routes', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const load = vi.fn()
      const mainTarget = models.testMainTarget()
      load.mockResolvedValue(mainTarget)
      const aboutUIFilePath = pathJoin(tmpDir, 'about.ui.static.jsx')
      const settingsUIFilePath = pathJoin(tmpDir, 'settings/index.ui.jsx')
      const postUIFilePath = pathJoin(tmpDir, 'posts/[post].ui.static.jsx')
      const postListFilePath = pathJoin(tmpDir, 'posts/[post].list.ts')
      const postGetFilePath = pathJoin(tmpDir, 'posts/[post].get.js')

      await makeDirectory(dirname(aboutUIFilePath))
      await makeDirectory(dirname(settingsUIFilePath))
      await makeDirectory(dirname(postUIFilePath))

      await writeFile(aboutUIFilePath, '')
      await writeFile(settingsUIFilePath, '')
      await writeFile(postUIFilePath, '')
      await writeFile(postListFilePath, '')
      await writeFile(postGetFilePath, '')

      // When
      const got = await loadRoutes(tmpDir)

      // Then: About (static page without data)
      const aboutRoute = got.lookup('/about') as Route | undefined
      expect(aboutRoute?.type).toEqual('ui')
      if (aboutRoute?.type === 'ui') {
        expect(aboutRoute?.moduleFilePath).toEqual(aboutUIFilePath)
        expect(aboutRoute?.rendering).toEqual('static')
        expect(aboutRoute?.getModuleFilePath).toBeUndefined()
        expect(aboutRoute?.listModuleFilePath).toBeUndefined()
      }

      // Then: Settings (dynamic UI page)
      const settingsRoute = got.lookup('/settings') as Route | undefined
      expect(settingsRoute?.type).toEqual('ui')
      if (settingsRoute?.type === 'ui') {
        expect(settingsRoute?.moduleFilePath).toEqual(settingsUIFilePath)
        expect(settingsRoute?.rendering).toEqual('dynamic')
      }

      // Then: Post (static page with data)
      const postRoute = got.lookup('/posts/1') as Route | undefined
      expect(postRoute?.type).toEqual('ui')
      if (postRoute?.type === 'ui') {
        expect(postRoute?.moduleFilePath).toEqual(postUIFilePath)
        expect(postRoute?.rendering).toEqual('static')
        expect(postRoute?.getModuleFilePath).toEqual(postGetFilePath)
        expect(postRoute?.listModuleFilePath).toEqual(postListFilePath)
      }
    })
  })
})
