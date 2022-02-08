import {path} from "@gestaltjs/core/cli"

export async function prismaExecutablePath() {
  const prismaPath = await path.findUp('node_modules/.bin/prisma', { type: 'file' });
  if (prismaPath) {
    return prismaPath;
  } else {
    throw Error('Path not found');
  }
}
