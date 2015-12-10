import assert from 'assert'
let {describe, it} = global

/**
 * toasts reducer
 */
import {toasts} from '../reducers'
import {addToast, removeToast} from '../actions'
describe('Toasts', () => {
  const initialToasts = () => toasts(undefined, {})
  const toast = { text: 'hi' }
  it('should initialize without any toasts', () =>
     assert.equal(initialToasts().length, 0))
  it('should store a toast when getting an add toast action', () => {
    let newToasts = toasts(initialToasts(), addToast(toast))
    assert.equal(newToasts.indexOf(toast), 0)
  })
  it('should remove a toast from the store when getting a remove action', () => {
    let newToasts = toasts(toasts(initialToasts(), addToast(toast)), removeToast(toast))
    assert.equal(newToasts.indexOf(toast), -1)
  })
})

/**
 * menu reducer
*/
import {menu} from '../reducers'
import {showMenu, hideMenu} from '../actions'
describe('Menu reducer', () => {
  const initialMenu = () => menu(undefined, {})
  it('should initialize as closed', () =>
     assert.equal(initialMenu().open, false))

  it('should open when receiving a show menu action', () =>
     assert.equal(menu(initialMenu(), showMenu()).open, true))

  it('should remain open when receiving a show menu action while being open', () =>
     assert.equal(menu(menu(initialMenu(), showMenu()), showMenu()).open, true))

  it('should close when receiving a hide menu action while being open', () =>
     assert.equal(menu(menu(initialMenu(), showMenu()), hideMenu()).open, false))

  it('should stay closed when receiving a hide menu action while being closed', () =>
     assert.equal(menu(initialMenu(), hideMenu()).open, false))
})
