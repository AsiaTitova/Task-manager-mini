import type { FC } from 'react'

import { Edit } from 'shared/assets/icons'
import { Button } from 'shared/ui/Button'
import { useModalStore } from 'shared/ui/ModalPortal'

import type { ITask } from 'entities/Task'
import { useTasksStore } from 'entities/Task'

import module from './TaskEditButton.module.scss'

interface IProps {
  task?: ITask
  label?: string
}

export const TaskEditButton: FC<IProps> = ({ task, label }) => {
  const { toggleShowModal } = useModalStore()
  const { setIsEdit } = useTasksStore()

  const openModalHandler = (): void => {
    setIsEdit(true)
    const init = {
      id: task?.id || '',
      title: task?.title || ''
    }
    toggleShowModal(true, init)
  }

  return (
    <div className={module.TaskEditButton}>
      <Button
        className={module.TaskEditButton_button}
        mode="secondary"
        label={label}
        icon={<Edit />}
        onClick={openModalHandler}
      />
    </div>
  )
}
