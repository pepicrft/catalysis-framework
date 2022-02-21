import envinfo from 'envinfo'

type ToolInfo = {
  version: string
  path: string
}

type SystemInfo = {
  OS?: string
  CPU?: string
  Memory?: string
  Shell?: ToolInfo
}

type BinariesInfo = {
  Node?: ToolInfo
  Yarn?: ToolInfo
  npm?: ToolInfo
}

type DatabasesInfo = {
  MongoDB?: ToolInfo
  MySQL?: ToolInfo
  PostgreSQL?: ToolInfo
  SQLite?: ToolInfo
}

type PackageInfo = {
  wanted: string
  installed: string
}

type Info = {
  System?: SystemInfo
  Binaries?: BinariesInfo
  Databases?: DatabasesInfo
  npmPackages: { [key: string]: PackageInfo }
}

export const info = async (): Promise<Info> => {
  const infoJson = await envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'Yarn', 'npm', 'pnpm'],
      Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite'],
      npmPackages: ['gestaltjs', 'react', 'react-dom', 'vue', 'svelte'],
    },
    { json: true }
  )
  return JSON.parse(infoJson) as Info
}
