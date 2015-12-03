import React from 'react'

import './search.less'

export default React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    focus: React.PropTypes.bool
  },
  getInitialState () {
    return { showClear: false }
  },
  render () {
    let { disabled, onClick, onChange, focus } = this.props
    let { showClear } = this.state
    return (
      <div className='Search'>
        <input
          ref='input'
          type='search'
          placeholder='Search Wikipedia'
          title='Search Wikipedia [f]'
          accessKey='f'
          className='Search-input'
          autoComplete='off'
          disabled={disabled}
          onClick={onClick}
          onChange={this.onChange}
          autoFocus={focus}
        />
        <a className={`Search-clear ${showClear ? 'is-visible' : ''}`}
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
  }
})
