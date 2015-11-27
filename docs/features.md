# Features

Here you can find a list of the implemented user facing features at the moment.
For more information about the technical features visit next chapter
[Architecture](./architecture.md).

## Article Reading

![Full article viewing of Wikipedia content](./img/article-reading.gif)

---

First visit to an article will show a summarized version to get useful content
to users with bad connections as fast as possible.

![Summary version and loading of full article](./img/article-reading-summary.gif)

The loading strategy (right now opt-in by the user by clicking on read more)
needs to be discussed as different strategies have different trade-offs.

---

Images are lazy loaded when they are closed to the viewport. This way we avoid
blocking rendering and getting the important assets of the site and save on
bandwidth usage of the user and the wikimedia servers.

![Network activity while reading article and lazy images load](./img/article-lazy-images.gif)

---

Navigation happens on the client on enabled browsers, meaning you never see
a blank page and perceived speed is greater.

![Client side navigation never blanks the page](./img/article-client-navigation.gif)

The loading experience will be improved in different ways, for example
pre-fetching link summaries for the current article, using better loading
animations, etc.

---

Client side caching of user accessed data.

When the user visits articles, the content is cached on the client browser, so
when the user goes back to it, either on the same sesion or on a different one,
the loading of the content will be instant since it will already be on their
device.

![Client side caching means instant loading of already visited content and
offline access to it](./img/article-client-caching.gif)

## Next steps

There's a number of features to still be implemented.

In the technical side, full caching via Service Worker.

In the user facing features camp there is searching, media gallery, section
collapsing, language selector, etc.

We'll get to it step by step, ping us in the
[issues](https://github.com/joakin/loot-ui/issues) with any comments you have.
