# Running the project

## Dependencies

### Technology

* [node.js](https://nodejs.org/) > 4.0.0
* [npm](https://docs.npmjs.com/getting-started/installing-node) > 3.0.0

### Getting and running the code

* Install locally [loot](https://github.com/joakin/loot).
  1. Clone it somewhere
  2. Run `npm install`
  3. Run `npm start` to start the API server in port 7001
* Install locally [loot-ui](https://github.com/joakin/loot-ui)
  1. Clone it somewhere
  2. Run `npm install`
  3. Run `npm start` to start the UI server in port 7002

### Generating docs

Inside the `loot-ui` repository:

* `npm run docs:watch` to kick off the docs watcher
  * Visit http://localhost:4000 to see the docs
* `npm run docs:build` to build the docs in `_book`

