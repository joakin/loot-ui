import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import History from '../../components/history'
import {loadHistory} from '../../actions'

const HistoryContainer = React.createClass({
  propTypes: {
    loadHistory: React.PropTypes.func
  },
  render () {
    return <History {...this.props} />
  },
  componentDidMount () {
    this.props.loadHistory()
  }
})

function selectHistory ({ history }) { return { ...history } }

function selectActions (dispatch) {
  return bindActionCreators({ loadHistory }, dispatch)
}
export default connect(selectHistory, selectActions)(HistoryContainer)
