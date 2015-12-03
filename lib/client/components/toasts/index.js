import React from 'react'
import Toast from '../toast'

import './toasts.less'

export default function ({ toasts }) {
  return <div className='Toasts'>
    { toasts.map((toast) => <Toast key={toast.text} {...toast} />) }
  </div>
}
