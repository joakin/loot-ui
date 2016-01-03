import React from 'react'
import { Link } from 'react-router'
import './page-list.less'

export default ({items, onItemClick, ...props}) => (
  <div {...props} className='PageList'>
    {items.map((item) => <PageListItem {...item} onClick={onItemClick}/>)}
  </div>
)

export const PageListItem = ({title, onlyText, onClick}) => {
  const href = `/wiki/${title}`
  return <li className='PageListItem' key={title}>
    {onlyText
      ? <div onClick={onClick}>{title}</div>
      : [<Link to={href} onClick={onClick}>
           <strong>{title}</strong>
         </Link>,
         <Link to={href} onClick={onClick}
           className='PageList-item-cover-link'
           tabIndex='-1' aria-hidden />]}
  </li>
}
