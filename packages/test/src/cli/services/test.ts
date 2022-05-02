import { tsc, error } from '@gestaltjs/core/cli'
import { vitest } from 'vitest'

export async function configureTests(directory: string, ...config) {
    //await tsc.run(['--noEmit'], directory)
    console.log(directory)
}
