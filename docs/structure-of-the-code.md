# Structure of the code

High level overview of what's in the code base. Nice to have a look at for
knowing where things are and getting started.

## Documentation

  * [`README.md`](https://github.com/joakin/loot-ui/tree/master/README.md) → Project documentation main page
  * [`docs`](https://github.com/joakin/loot-ui/tree/master/docs) → Project docs

## Project configuration

  * [`package.json`](https://github.com/joakin/loot-ui/tree/master/package.json) → npm project configuration
  * [`book.json`](https://github.com/joakin/loot-ui/tree/master/book.json) → Documentation generator config
  * [`webpack`](https://github.com/joakin/loot-ui/tree/master/lib/server/webpack) → Webpack configuration files
  * [`public`](https://github.com/joakin/loot-ui/tree/master/lib/server/public) → Compiled assets folder

## Source code

  * [`index.js`](https://github.com/joakin/loot-ui/tree/master/index.js) → Server entry point
  * [`lib`](https://github.com/joakin/loot-ui/tree/master/lib) → Source folder
    * [`client`](https://github.com/joakin/loot-ui/tree/master/lib/client) → Client side web application (browser code)
      * [`index.js`](https://github.com/joakin/loot-ui/tree/master/lib/client/index.js) → Client side entry point
      * [`routes.js`](https://github.com/joakin/loot-ui/tree/master/lib/client/routes.js) → Client side routes
      * [`actions.js`](https://github.com/joakin/loot-ui/tree/master/lib/client/actions.js) → [Action creators](http://redux.js.org/docs/basics/Actions.html)
      * [`reducers.js`](https://github.com/joakin/loot-ui/tree/master/lib/client/reducers.js) → [Reducers](http://redux.js.org/docs/basics/Reducers.html)
      * [`components`](https://github.com/joakin/loot-ui/tree/master/lib/client/components) → [UI components](https://facebook.github.io/react/docs/tutorial.html#your-first-component)
      * [`containers`](https://github.com/joakin/loot-ui/tree/master/lib/client/containers) → [Container UI components](http://redux.js.org/docs/basics/UsageWithReact.html#container-and-presentational-components)
      * [`api.js`](https://github.com/joakin/loot-ui/tree/master/lib/client/api.js) → Api methods
      * [`db`](https://github.com/joakin/loot-ui/tree/master/lib/client/db) → Database storage methods
    * [`server`](https://github.com/joakin/loot-ui/tree/master/lib/server) → Server side application
        * [`index.js`](https://github.com/joakin/loot-ui/tree/master/lib/server/index.js) → Server initialization
        * [`routes.js`](https://github.com/joakin/loot-ui/tree/master/lib/server/routes.js) → Server routes
        * [`views`](https://github.com/joakin/loot-ui/tree/master/lib/server/views) → HTML generation templates (for index.html)
