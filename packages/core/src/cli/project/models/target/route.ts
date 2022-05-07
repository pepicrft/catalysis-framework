/**
 * It represents a target route.
 */
export type Route =
  | {
      /** UI route type */
      type: 'ui'

      /**
       * This property indicates how the route should be rendered.
       * - Static: A static HTML representing the route is generated at
       *           deployment time.
       * - Dynamic: The route is rendered server side and hydrated on the
       *            client.
       */
      rendering: 'static' | 'dynamic'

      /**
       * The path to the module file that exports
       * the route UI.
       */
      moduleFilePath: string

      /**
       * UI routes can have a .get.{js,ts} file that
       * provides data to be passed to the route component
       * when instantiating it.
       */
      getModuleFilePath?: string

      /**
       * Dynamic UI routes that are statically renderered,
       * like posts/[post].ui.static.tsx can have a .list.{js,ts} file
       * that returns the list of possible values the dynamic component
       * of the route can take.
       */
      listModuleFilePath?: string
    }
  | {
      /** Raw route type */
      type: 'raw'

      /**
       * Raw route modules export an asynchronous function
       * that takes a standard Request instance, and return
       * a Response.
       */
      moduleFilePath: string
    }
