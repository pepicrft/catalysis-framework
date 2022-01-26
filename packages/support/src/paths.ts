
import _findUp from 'find-up';

export async function findUp(path: string, type: "file" | "directory"): Promise<string | undefined> {
  return await _findUp(path, { type });
}
