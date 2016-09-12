import React from 'react'

import './search-input.less'

export default React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    focus: React.PropTypes.bool
  },
  getInitialState () {
    return { showClear: false }
  },
  render () {
    let { onClick, focus } = this.props
    let { showClear } = this.state
    return (
      <div className='SearchInput'>
        <input
          ref='input'
          type='search'
          placeholder='Search Wikipedia'
          title='Search Wikipedia [f]'
          accessKey='f'
          className='SearchInput-input'
          autoComplete='off'
          onClick={onClick}
          onChange={this.onChange}
          autoFocus={focus}
        />
        <a className={`SearchInput-clear ${showClear ? 'is-visible' : ''}`}
          onClick={this.clearInput}/>
      </div>
    )
  },
  onChange (e) {
    let value = e.target.value
    this.props.onChange(e)
    this.setState({ showClear: Boolean(value) })
  },
  clearInput (e) {
    e.stopPropagation()
    this.refs.input.value = ''
    this.setState({ showClear: false })
    this.refs.input.focus()
  }
})
