import {
  precache, router, cacheFirst, networkFirst, options
} from 'sw-toolbox'

options.debug = process.env.NODE_ENV === 'development'

// TODO: generate this as a JSON file from webpack automatically
// See https://github.com/henrikjoreteg/hjs-webpack#user-content-html-optional-can-be-boolean-or-function
// for an example of generating files with webpack compilation data.
const staticAssets = [
  '/bundle.js',
  '/style.css'
]

// Prefetch static assets
precache(staticAssets)

// Serve static assets from cache first
staticAssets.forEach((asset) => router.get(asset, cacheFirst))

// Cache wikipedia images
router.get('/(.*)', cacheFirst, {
  name: 'images',
  maxEntries: 100,
  origin: /upload\.wikimedia\.org$/
})

// Rest of calls go to network first
router.default = networkFirst

// Boilerplate to ensure our service worker takes control of the page as soon as possible.
global.addEventListener('install', event => event.waitUntil(global.skipWaiting()))
global.addEventListener('activate', event => event.waitUntil(global.clients.claim()))
