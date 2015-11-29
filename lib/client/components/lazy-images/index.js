import React from 'react'
import {findDOMNode} from 'react-dom'
import throttle from 'lodash.throttle'

const THRESHOLD_DEFAULT = 300

export default React.createClass({
  propTypes: {
    threshold: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
  },
  render () {
    return (
      <div className='LazyImages'>
        {this.props.children}
      </div>
    )
  },
  componentDidMount () {
    // Throttle the function that will be bound to the scroll & resize events
    this.onViewportChange = throttle(this.onViewportChange, THRESHOLD_DEFAULT)
    window.addEventListener('scroll', this.onViewportChange)
    window.addEventListener('resize', this.onViewportChange)
    this.onViewportChange()
  },
  componentDidUpdate () {
    this.onViewportChange()
  },
  componentWillUnmount () {
    window.removeEventListener('scroll', this.onViewportChange)
    window.removeEventListener('resize', this.onViewportChange)
  },
  onViewportChange () {
    if (this.isMounted()) {
      const imagePlaceholders = findDOMNode(this).querySelectorAll('.LootTransformedImage')
      const threshold = this.props.threshold || 200
      const innerHeight = window.innerHeight

      Array.prototype.slice.call(imagePlaceholders).forEach((placeholder) => {
        let bounds = placeholder.getBoundingClientRect()
        if (
          // Bottom border is inside viewport from above
          bounds.top + bounds.height > -threshold &&
          // Top border is inside viewport from below
          bounds.top - threshold < innerHeight
        ) {
          // Placeholder is visible. Transform it to real image.
          transformFakeImage(placeholder)
        }
      })
    }
  }
})

function transformFakeImage (imagePlaceholder) {
  // Remove the class that identifies that the image is not loaded
  imagePlaceholder.classList.remove('LootTransformedImage')
  // Set the real image inside the placeholder.
  // Avoids reflows since the placeholder has width & height set. If we were to
  // replaceChild the wrapper with the image, it would cause a reflow and
  // visible jerkiness on the DOM.
  imagePlaceholder.innerHTML = imagePlaceholder.dataset.replaceWith
}
