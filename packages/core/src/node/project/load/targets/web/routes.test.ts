import { loadRoutes } from './routes.js'
import { describe, test, expect, vi } from 'vitest'
import { inTemporarydirectory } from '@gestaltjs/core/testing/temporary'
import { testWebTarget } from '@gestaltjs/core/testing/fixtures'
import { parentDirectory, joinPath } from '../../../../path.js'
import { writeFile, makeDirectory } from '../../../../fs.js'
import { Route } from '../../../../../common/models/targets/web/route.js'

describe('loadRoutes', () => {
  test('loads the routes', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const load = vi.fn()
      const webTarget = testWebTarget()
      load.mockResolvedValue(webTarget)
      const aboutUIFilePath = joinPath(tmpDir, 'about.ui.static.jsx')
      const settingsUIFilePath = joinPath(tmpDir, 'settings/index.ui.jsx')
      const postsLayoutFile = joinPath(tmpDir, 'posts/_layout.jsx')
      const postUIFilePath = joinPath(tmpDir, 'posts/[post].ui.static.jsx')
      const postListFilePath = joinPath(tmpDir, 'posts/[post].list.ts')
      const postGetFilePath = joinPath(tmpDir, 'posts/[post].get.js')

      await makeDirectory(parentDirectory(aboutUIFilePath))
      await makeDirectory(parentDirectory(settingsUIFilePath))
      await makeDirectory(parentDirectory(postUIFilePath))

      await writeFile(aboutUIFilePath, '')
      await writeFile(settingsUIFilePath, '')
      await writeFile(postsLayoutFile, '')
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

      // Then: Posts Layout (static page with data)
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
