import type { FC } from 'react'

import { Button } from 'shared/ui/Button'

import module from './DeleteModal.module.scss'

interface IProps {
  title: string
  description: string
  cancelDelete: () => void
  successDelete: () => void
}

export const DeleteModal: FC<IProps> = ({
  title,
  description,
  cancelDelete,
  successDelete
}) => {
  return (
    <div className={module.DeleteModal}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={module.DeleteModal_bottom}>
        <Button
          className={module.DeleteModal_button}
          mode="critical-primary"
          label="Удалить"
          onClick={successDelete}
        />
        <Button
          className={module.DeleteModal_button}
          mode="secondary"
          label="Отменить"
          onClick={cancelDelete}
        />
      </div>
    </div>
  )
}
