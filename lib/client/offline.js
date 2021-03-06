import getStore from './get-store'
import { showToast } from './actions'

export function init () {
  // Initialize service worker if available
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((reg) => {
      // registration worked
      console.log('ServiceWorker: Registration succeeded. Scope is ' + reg.scope)
      reg.addEventListener('updatefound', () => onUpdateFound(reg))
    }).catch((error) =>
      // registration failed
      console.log('ServiceWorker: Registration failed with ' + error)
    )
  }
}

function onUpdateFound (registration) {
  let newWorker = registration.installing

  registration.installing.addEventListener('statechange',
    () => onStateChange(newWorker))
}

function onStateChange (newWorker) {
  if (newWorker.state === 'activated') {
    onFirstLoad()
    if (navigator.serviceWorker.controller) {
      onClaimed()
    }
  } else if (
    newWorker.state === 'installed' &&
    navigator.serviceWorker.controller
  ) {
    onInstalled()
  }
}

function onFirstLoad () {
  console.log('Service Worker: ready to work offline')

  // First activation, tell the user this works offline
  let informed = window.localStorage.getItem('informed-about-offline')
  if (informed) { return }

  getStore().dispatch(showToast('Ready to work offline'))

  return window.localStorage.setItem('informed-about-offline', true)
}

function onClaimed () {
  console.log('Service Worker: claimed')
  // Here we can send messages to the service worker about DOM stuff like webp
  // support and things like that.
  // navigator.serviceWorker.controller.postMessage({
  //   type: 'supportsWebp',
  //   value: supportsWebp()
  // });
}

function onInstalled () {
  console.log('Service Worker: installed')
  // Here we can query stuff on indexedDB that service worker has written on
  // installation (like the version for example).
}
