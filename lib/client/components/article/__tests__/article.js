import assert from 'assert'
let {describe, it} = global

import React from 'react'
import {renderIntoDocument} from 'react-addons-test-utils'

import Article from '../'

describe('Article component', () => {
  it('should accept receiving a null document when it loads from SW (no initial data)', () =>
    assert.doesNotThrow(() =>
      renderIntoDocument(
        <Article title='Test' expanded={false} full={false} doc={null} />
      )))
})
