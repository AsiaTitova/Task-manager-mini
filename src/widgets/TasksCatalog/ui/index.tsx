import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'

import { ScrollProvider } from 'shared/lib'
import { Modal, ConfirmModal, EmptyList } from 'shared/ui'

import { TasksList, useTasksStore } from 'entities/Task'

import { TaskAdd, TaskAddButton } from 'features/Tasks/TaskAdd'
import { TaskDeleteButton } from 'features/Tasks/TaskDelete'
import { TaskEditButton, TaskEdit } from 'features/Tasks/TaskEdit'

import module from './TasksCatalog.module.scss'

export const Tasks: FC = () => {
  const { tasks, getTasks, isEdit } = useTasksStore()

  useEffect(() => {
    getTasks()
  }, [])

  const getContent = (): ReactNode => {
    if (tasks.length) {
      return (
        <ScrollProvider>
          <div className={module.TasksCatalog_wrap}>
            <TaskAddButton />
          </div>
          <TasksList>
            <TaskEditButton />
            <TaskDeleteButton />
          </TasksList>
        </ScrollProvider>
      )
    } else {
      return (
        <EmptyList>
          <h2>Пока у вас нет ни одной задачи</h2>
          <p>Добавляйте задачи, чтобы управлять проводимыми работами</p>
          <TaskAddButton />
        </EmptyList>
      )
    }
  }

  const content = getContent()

  return (
    <section className={module.TasksCatalog}>
      {content}
      <Modal>{isEdit ? <TaskEdit /> : <TaskAdd />}</Modal>
      <ConfirmModal />
    </section>
  )
}
