# Technologies used

The project is a JavaScript based stack, both on the API server and in the UI
server.

In the [Structure of the code](docs/structure-of-the-code.md) section we will
talk more in depth about what happens where.

Here you can find a list of technologies used in the project which you may find
helpful to check and read the docs of.

## Project tasks/building

We use [npm scripts](https://docs.npmjs.com/misc/scripts) for
[running](https://docs.npmjs.com/cli/run-script) the different tasks on the
project.

See [`package.json`](https://github.com/joakin/loot-ui/blob/master/package.json#L6).

## Server

The server is basically a lean server that runs the client side app for
rendering, proxies API requests to the API server and serves some static
assets.

* [express.js](http://expressjs.com/) for the UI server
* [ejs templates](http://www.embeddedjs.com/) for rendering the base
  `index.html`
* Raw node modules like `http`
* All the technologies used on the client are run also in the server for
  server side rendering

## Client

The server is a progressive web application which uses as main technologies:

* Views rendered with [react.js](https://facebook.github.io/react/)
* Routing with [react-router](https://github.com/rackt/react-router)
* State management with [redux](https://github.com/rackt/redux)
* Asset compilation and bundling by [webpack](https://webpack.github.io/)
* es2015 transpilation with [babel.js](http://babeljs.io/)
* [less css](http://lesscss.org/) for styling

