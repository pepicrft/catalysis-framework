import { test } from 'vitest'
import { prismaExecutablePath } from './paths';

test('Find prisma path', async () => {
  await prismaExecutablePath();
})
