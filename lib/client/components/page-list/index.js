import React from 'react'
import { Link } from 'react-router'
import './page-list.less'

export default (props) => {
  let {items, onItemClick} = props
  let attrs = { ...props, items: undefined, onItemClick: undefined }
  return <div {...attrs} className='PageList'>
    {items.map((item) => <PageListItem {...item} onClick={onItemClick}/>)}
  </div>
}

export const PageListItem = ({title, onClick}) => {
  const href = `/wiki/${title}`
  return <li className='PageListItem' key={title}>
    <Link to={href} onClick={onClick}>
      <strong>{title}</strong>
    </Link>
    <Link to={href} onClick={onClick}
      className='PageList-item-cover-link'
      tabIndex='-1' aria-hidden />
  </li>
}
