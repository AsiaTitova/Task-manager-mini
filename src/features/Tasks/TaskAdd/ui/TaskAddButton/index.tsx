import type { FC } from 'react'

import { Plus } from 'shared/assets/icons'
import { Button } from 'shared/ui/Button'
import { useModalStore } from 'shared/ui/ModalPortal'

import type { ITaskData } from 'entities/Task'
import { useTasksStore } from 'entities/Task'

import module from './TaskAddButton.module.scss'

const initialValue: ITaskData = {
  title: ''
}

export const TaskAddButton: FC = () => {
  const { toggleShowModal } = useModalStore()
  const { setIsEdit } = useTasksStore()

  const openModalHandler = (): void => {
    setIsEdit(false)
    toggleShowModal(true, initialValue, 'task')
  }

  return (
    <div className={module.TaskAddButton}>
      <Button
        className={module.TaskAddButton_button}
        label="Добавить задачу"
        icon={<Plus />}
        onClick={() => openModalHandler()}
      />
    </div>
  )
}
