# loot-ui

An experimental server that renders a UI for Wikipedia.

## Features

* Lean and fast HTML only mode
* Client side webapp that picks up from server side render
* Client side routing, views and cache

## Urls

* `/wiki/:title` Renders a wikipedia article
* `/wiki/:title?full` Renders a full wikipedia article (for html-only version)

## Development

Install locally [loot](https://github.com/joakin/loot).

Then, after running loot and an `npm intall`, do `npm start` for starting the
server in development and visit `localhost:7002/wiki/:title`.
