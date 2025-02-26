import classNames from 'classnames'
import type { FC, ReactNode } from 'react'

import module from './EmptyList.module.scss'

interface IProp {
  children: ReactNode
  className?: string
}

export const EmptyList: FC<IProp> = ({ children, className }) => {
  const classesEmptyList = classNames(module.EmptyList, className)
  return <div className={classesEmptyList}>{children}</div>
}
