import type { FC, ReactElement } from 'react'
import React from 'react'

import type { ITask } from '../../model'

import module from './TasksItem.module.scss'

interface IProps {
  task: ITask
  children: ReactElement | ReactElement[]
}

interface ChildComponentProps {
  task: ITask
}

export const TasksItem: FC<IProps> = ({ task, children }) => {
  const additionalProps = {
    task: task
  }

  return (
    <tr className={module.TasksItem}>
      <td>
        <span>{task.title}</span>
      </td>
      <td onClick={evt => evt.stopPropagation()}>
        {React.Children.map(children, child => {
          if (React.isValidElement<ChildComponentProps>(child)) {
            return React.cloneElement(child, additionalProps)
          }
          return child
        })}
      </td>
    </tr>
  )
}
