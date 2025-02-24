import classNames from 'classnames'
import type { FC } from 'react'

import { Portal } from 'shared/lib'

import { useModalStore } from '../../model'

import module from './ConfirmModal.module.scss'

export const ConfirmModal: FC = () => {
  const {
    isOpenConfirmModal,
    isNotesTypeConfirmModal,
    childrenConfirmModal,
    toggleShowConfirmModal
  } = useModalStore()

  if (!isOpenConfirmModal) return null

  const confirmModalClasses = classNames(module.ConfirmModal, {
    [module.notes]: isNotesTypeConfirmModal
  })

  return (
    <Portal>
      <div
        className={confirmModalClasses}
        onClick={() => toggleShowConfirmModal(false, null)}>
        <div className={module.ConfirmModal_shadow} />
        <div
          className={module.ConfirmModal_window}
          onClick={e => e.stopPropagation()}>
          {childrenConfirmModal}
        </div>
      </div>
    </Portal>
  )
}
