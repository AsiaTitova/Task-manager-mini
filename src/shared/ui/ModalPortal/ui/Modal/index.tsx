import classNames from 'classnames'
import type { ReactNode, FC } from 'react'
import { useRef } from 'react'

import { Portal } from 'shared/lib'

import { useModalStore } from '../../model'

import module from './Modal.module.scss'

interface IProp {
  children: ReactNode
  outsideHandler?: () => void
}

export const Modal: FC<IProp> = ({ children, outsideHandler }) => {
  const { isOpen, isStartAnimation } = useModalStore()
  const windowRef = useRef<HTMLDivElement>(null)

  const openConfirmModalHandler = (): void => {
    if (outsideHandler) outsideHandler()
  }

  if (!isOpen) return null

  const modalShadowClasses = classNames(module.Modal_shadow, {
    [module.show]: isStartAnimation
  })
  const modalWindowClasses = classNames(module.Modal_window, {
    [module.open]: isStartAnimation
  })

  return (
    <Portal>
      <div className={module.Modal} onClick={openConfirmModalHandler}>
        <div className={modalShadowClasses} />
        <div
          className={modalWindowClasses}
          onClick={e => e.stopPropagation()}
          ref={windowRef}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
