import type { FC } from 'react'
import { memo } from 'react'

import { Portal } from 'shared/lib'

import { usePortalToastStore } from '../../model'
import { Toast } from '../Toast'

import module from './ToastWrapper.module.scss'

export const ToastWrapper: FC = memo(() => {
  const { toasts } = usePortalToastStore()

  return (
    <Portal>
      <div
        id="ToastsWrapper"
        className={module.ToastWrapper}
        onClick={evt => evt.stopPropagation()}>
        {toasts.map(item => (
          <Toast key={item.id} item={item} />
        ))}
      </div>
    </Portal>
  )
})
