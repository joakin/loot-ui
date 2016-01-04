import React from 'react'

export default function ReadMore ({ title, onExpand }) {
  let expand = (e) => { preventAll(e); onExpand() }
  return (
    <div className='Article-readMore'>
      <a href={`/wiki/${title}?full`} onClick={expand}>Read more...</a>
    </div>
  )
}

function preventAll (e) {
  e.preventDefault()
  e.stopPropagation()
}
