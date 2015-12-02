import React from 'react'
import { connect } from 'react-redux'
import Chrome from '../../components/chrome'
import { startSearchSession, search, stopSearchSession } from '../../actions.js'
import SearchOverlay from '../../components/search-overlay'

const SearchContainer = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    search: React.PropTypes.object
  },
  render () {
    const {isSearching, results} = this.props.search

    if (isSearching) {
      return <SearchOverlay
        onSearchChange={this.onSearchChange}
        results={results}
        onCloseClick={this.onCloseClick}
      />
    }

    return <Chrome
      isSearchDisabled
      onSearchClick={this.onSearchClick}
    />
  },
  onSearchClick () {
    const {dispatch} = this.props

    dispatch(startSearchSession())
  },
  onSearchChange (e) {
    const q = e.target.value.trim()
    const {dispatch} = this.props

    if (q.length >= 3) {
      dispatch(search(q))
    }
  },
  onCloseClick () {
    const {dispatch} = this.props

    dispatch(stopSearchSession())
  }
})

function select ({ search }) {
  return { search }
}

export default connect(select)(SearchContainer)
