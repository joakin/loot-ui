import React from 'react'
import { Link } from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import './page-list.less'

export default ({items, onItemClick, ...props}) => (
  <CSSTransitionGroup component='div' className='PageList'
    {...props} transitionName='pagelistitem'
    transitionAppear transitionAppearTimeout={500}
    transitionEnterTimeout={500} transitionLeaveTimeout={300}>

    {items.map((item, i) =>
      <PageListItem key={`${item.title}-${i}`} {...item} onClick={onItemClick}/>)}

  </CSSTransitionGroup>
)

export const PageListItem = ({title, onlyText, onClick}) => {
  const href = `/wiki/${title}`
  return <li className='PageListItem'>
    {onlyText
      ? <div onClick={onClick}>{title}</div>
      : <div>
          <Link to={href} onClick={onClick}>
            <strong>{title}</strong>
          </Link>
          <Link to={href} onClick={onClick}
            className='PageList-item-cover-link'
            tabIndex='-1' aria-hidden />
        </div>}
  </li>
}
