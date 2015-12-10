import assert from 'assert'
let {describe, it} = global

/**
 * toasts actions
 */
import {ADD_TOAST, REMOVE_TOAST, showToast} from '../actions'
describe('Toasts actions', () => {
  it('should add a toast and remove it after the delay when triggering showToast action', (done) => {
    let actions = []
    const toastText = 'hi'
    showToast(toastText, 1)((action) => actions.push(action)).then(() => {
      assert.equal(actions.length, 2, 'It triggers two actions (add and remove)')
      assert.equal(actions[0].type, ADD_TOAST, 'It triggers an add toast action')
      assert.equal(actions[1].type, REMOVE_TOAST, 'It triggers a remove toast action')
      assert.equal(actions[0].toast.text, toastText, 'Add toast text is the one we passed to showToast')
      assert.equal(actions[1].toast.text, toastText, 'Remove toast text is the one we passed to showToast')
      done()
    }).catch((e) => done(e))
  })
})
