import {findUp} from '@gestaltjs/support';

export async function prismaExecutablePath() {
  const path = await findUp('node_modules/.bin/exe', 'file');
  if (path) {
    return path;
  } else {
    throw Error('Path not found');
  }
}
