# loot-ui

An experimental server that renders a web UI for Wikipedia content.

This is a research project of the [Reading Web Team](https://www.mediawiki.org/wiki/Reading/Web/Team)
from the Wikimedia Foundation.

The main objective is to get Wikipedia content to load really fast on 2G
connections. More concretely, to
[load Barack Obama's article: in under 15 seconds on 2G](https://www.mediawiki.org/wiki/Reading/Web/Projects/Barack_Obama_in_under_15_seconds_on_2G).

For that, the approach of the research is to create a web application that will
leverage client side caching and that will be server rendered on first load
with a minimal lean HTML.

## Features

* Lean and fast HTML only mode (server side rendering of client side web app).
* Client side webapp that picks up from server side render.
  * Leverage modern client side technologies (indexeddb, service worker).
* Offline use and reading of content.

## Links

* [Documentation](http://joakin.github.io/loot-ui)
* [Deployed version](https://reading-web-research.wmflabs.org/wiki/Moon)

## External documentation

* [A frontend powered by parsoid](https://www.mediawiki.org/wiki/Reading/Web/Projects/A_frontend_powered_by_Parsoid)
* [Weekly development notes](https://www.mediawiki.org/wiki/Reading/Web/Projects/A_frontend_powered_by_Parsoid/Notes)
