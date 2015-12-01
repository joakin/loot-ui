import React from 'react'
import { connect } from 'react-redux'
import Chrome from '../../components/chrome'
import { startSearchSession } from '../../actions.js'

const SearchContainer = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func
  },
  render () {
    return <Chrome
      isSearchDisabled
      onSearchClick={this.onSearchClick}
    />
  },
  onSearchClick () {
    const {dispatch} = this.props

    dispatch(startSearchSession())
  }
})

function select () {
  return {
  }
}

export default connect(select)(SearchContainer)
