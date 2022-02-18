import {App} from "./App.tsx"

export function render(url: string, context: any) {
  /**
   * let routeComponent = app.findComponent(url)
   * if (!routeComponent) {
   *  throw Error("not found")
   * }
   * if (routeComponent.isReact) {
   * *******
   *  const {head, body} = ReactDOMServer.render(<App/>)
   * } else if (routeComponent.isVue) {
   *
   * }
   *
   */
  return `<p>this is an examples ${url}</p>`
}
