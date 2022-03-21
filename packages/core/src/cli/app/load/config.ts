import { createServer } from 'vite'

export default async function loadConfig(path: string) {
  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
  })
  const { render } = await vite.ssrLoadModule(path)
}
