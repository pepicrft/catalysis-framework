import fs from 'fs-extra';

export async function exists(path: string): Promise<boolean> {
    return fs.pathExists(path);
}
