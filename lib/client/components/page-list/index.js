import React from 'react'
import { Link } from 'react-router'
import './page-list.less'

export default ({items, onItemClick, ...props}) => (
  <div {...props} className='PageList'>
    {items.map((item) => <PageListItem {...item} onClick={onItemClick}/>)}
  </div>
)

export const PageListItem = ({title, thumbnail, description, onClick}) => {
  const href = `/wiki/${title}`
  let className = ''
  let style = {}

  if (thumbnail) {
    className += thumbnail.height > thumbnail.width ? 'PageList-item-thumb-portrait ' : ''
    style.backgroundImage = `url(${thumbnail.source})`
  }

  return <li className='PageListItem' key={title}>
    <Link to={href} onClick={onClick}>
      <div className={className + 'PageList-item-thumb'}
        style={style}>
      </div>
      <strong>{title}</strong>
      <div className='PageList-item-description'>{description}</div>
    </Link>
    <Link to={href} onClick={onClick}
      className='PageList-item-cover-link'
      tabIndex='-1' aria-hidden />
  </li>
}
