import assert from 'assert'
let {describe, it} = global

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
