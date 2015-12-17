import React from 'react'
import api from '../../api'
import Router from 'react-router'

export default React.createClass({
  mixins: [ Router.History ],
  componentDidMount: function() {
    const h = this.props.history
    this.request = api.random().then((r)=>(
      h.pushState(null, `/wiki/${r.title}`, {})
    ))
  },
  render: function() {
    return (<div className='Random'>
      <h1>Random</h1>
      <p>
        Finding you something exciting to read…
      </p>
    </div>)
  }
})
