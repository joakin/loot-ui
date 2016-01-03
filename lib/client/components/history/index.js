import React from 'react'
import PageList from '../page-list'

export default ({ session, all }) => (
  <div className='History'>
    <h1>History</h1>
    {session.length === 0 ? null
      : <div>
          <h2>This session</h2>
          <PageList items={session.map((title) => ({ title }))} />
        </div>}
    {all.length === 0 ? null
      : <div>
          <h2>Previously visited</h2>
          <PageList items={all.map((title) => ({ title }))} />
        </div>}
    {session.length === 0 && all.length === 0
      ? <p>When you visit some pages, you will see them in here!</p>
      : null}
  </div>
)
