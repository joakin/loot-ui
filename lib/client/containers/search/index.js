import React from 'react'
import { connect } from 'react-redux'
import Chrome from '../../components/chrome'
import { startSearchSession } from '../../actions.js'
import SearchOverlay from '../../components/search-overlay'

const SearchContainer = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    search: React.PropTypes.object
  },
  render () {
    const {isSearching} = this.props.search

    if (isSearching) {
      return <SearchOverlay onSearchChange={this.onSearchChange}/>
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
  onSearchChange () {
  }
})

function select ({ search }) {
  return { search }
}

export default connect(select)(SearchContainer)
