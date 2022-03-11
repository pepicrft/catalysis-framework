import { pascalCase as pc } from 'case-anything'
export function pascalCase(input: string): string {
  return pc(input)
}
