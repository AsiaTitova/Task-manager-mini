import type { FC, ReactElement, ReactNode } from 'react'

import { Table } from 'shared/ui/Table'

import { useTasksStore } from '../../model'
import type { ITask } from '../../model'
import { TasksItem } from '../TasksItem'

import module from './TasksList.module.scss'

interface IProps {
  children: ReactElement | ReactElement[]
}

export const TasksList: FC<IProps> = ({ children }) => {
  const { tasks } = useTasksStore()

  const getHeadContent = (): ReactNode => {
    return (
      <>
        <th>Название</th>
        <th>
          <span className="visually-hidden">Настройки</span>
        </th>
      </>
    )
  }

  const headContent = getHeadContent()

  const getContent = (): ReactNode => {
    return tasks.map((task: ITask, index: number) => (
      <TasksItem key={index} task={task}>
        {children}
      </TasksItem>
    ))
  }

  const content = getContent()

  return (
    <div className={module.TasksList}>
      <Table content={content} headContent={headContent} pagination={null} />
    </div>
  )
}
