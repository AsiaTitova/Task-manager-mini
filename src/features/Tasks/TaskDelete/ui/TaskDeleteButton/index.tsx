import type { FC } from 'react'

import { Trash } from 'shared/assets/icons'
import { Button } from 'shared/ui/Button'
import { DeleteModal, useModalStore } from 'shared/ui/ModalPortal'
import { usePortalToastStore } from 'shared/ui/Toast'

import type { ITask } from 'entities/Task'
import { useTasksStore } from 'entities/Task'

import module from './TaskDeleteButton.module.scss'

interface IProps {
  task?: ITask
  label?: string
}

export const TaskDeleteButton: FC<IProps> = ({ task, label }) => {
  const { toggleShowConfirmModal } = useModalStore()
  const { pushToast } = usePortalToastStore()
  const { deleteTask, setTasks } = useTasksStore()

  const uniq: number = Number(task?.id as number)
  const data: ITask = task as ITask

  const openDeleteModal = (): void => {
    if (task) {
      toggleShowConfirmModal(
        true,
        <DeleteModal
          title="Удалить задачу?"
          description="Удаление повлечет потерю всех данных по задаче"
          cancelDelete={cancelDelete}
          successDelete={successDelete}
        />
      )
    }
  }

  const cancelDelete = (): void => {
    toggleShowConfirmModal(false, null)
  }

  const successDelete = (): void => {
    if (task) {
      setTasks(updatedList(true, useTasksStore.getState().tasks))
      pushToast({
        id: uniq,
        data: data,
        label: 'Задача удалена',
        cancelLabel: 'Восстановить',
        cancelHandle: () => restoreHandler(),
        successHandle: () => deleteAction()
      })
      cancelDelete()
    }
  }

  const restoreHandler = (): void => {
    setTasks(updatedList(false, useTasksStore.getState().tasks))
  }

  const deleteAction = (): void => {
    if (task) {
      deleteTask(uniq).then(() => {
        toggleShowConfirmModal(false, null)
      })
    }
  }

  const updatedList = (isDelete: boolean, tasks: ITask[]): ITask[] => {
    let list: ITask[] = []
    if (!isDelete) {
      list = tasks.concat([data as ITask]).sort((a, b) => a.id - b.id)
    } else {
      list = tasks.filter(item => String(item.id) !== String(data?.id))
    }
    return list || []
  }

  return (
    <div className={module.TaskDeleteButton}>
      <Button
        className={module.TaskDeleteButton_button}
        mode="critical"
        label={label}
        icon={<Trash />}
        borderRadius={12}
        onClick={openDeleteModal}
      />
    </div>
  )
}
