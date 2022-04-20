import {describe, test, expect, vi} from "vitest"
import { ConfigFileNotFoundError, loadProject } from "./project"
import { temporary } from "@gestaltjs/testing"
import {path, fs} from "@gestaltjs/core/cli"
import { configurationFileName } from '../../constants'
import { workspace } from '@gestaltjs/testing'

describe("loadProject", () => {
    test("throws a ConfigFileNotFoundError error if a config file can't be found", async () => {
        await temporary.directory(async (tmpDir) => {
            // Given
            const veryNestedDirectory = path.join(tmpDir, "first", "second")
            await fs.makeDirectory(veryNestedDirectory)

            // When/Then
            await expect(async () => {
                await loadProject(veryNestedDirectory)
            }).rejects.toThrowError(ConfigFileNotFoundError())
        })
    })

    test("resolves with the project when the project is valid", async () => {
        await temporary.directory(async (tmpDir) => {
            // Given
            const configurationFilePath = path.join(tmpDir, `${configurationFileName}.ts`)
            const veryNestedDirectory = path.join(tmpDir, "first", "second")
            await fs.makeDirectory(veryNestedDirectory)
            await fs.writeFile(
                configurationFilePath,
                `
              import {defineConfiguration} from "gestaltjs/configuration"

              export default defineConfiguration({
                name: "Test"
              })
              `
              )
            const { configuration: configurationModule } =
              workspace.gestaltjsPackageModules()

            // When
            const got = await loadProject(veryNestedDirectory, {
                alias: [
                  {
                    find: configurationModule.identifier,
                    replacement: configurationModule.path,
                  },
                ],
            })

            // Then
            expect(got.configuration.name).toEqual("Test")
            expect(got.directory).toEqual(tmpDir)
        })
    })
})
