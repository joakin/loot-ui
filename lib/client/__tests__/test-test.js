import assert from 'assert'
import { describe, it } from 'mocha'

/**
 * Test test. Let's see if the runner works properly and if we can require
 * components that use styles.
 *
 * WILL BE REMOVED IN NEXT COMMIT
 */

import Section from '../components/section/index.js'

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(5))
      assert.equal(-1, [1, 2, 3].indexOf(0))
    })
  })
})
