import classNames from 'classnames'
import type { InputHTMLAttributes, FC } from 'react'
import React, { memo } from 'react'

import module from './Switch.module.scss'

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string | number
  checked: boolean
  className?: string
}

export const Switch: FC<IProps> = memo(props => {
  const { className, id, checked, ...rest } = props

  const switchClasses = classNames(module.Switch, className)

  return (
    <div className={switchClasses}>
      <input
        className="visually-hidden"
        id={String(id)}
        checked={checked}
        type="checkbox"
        {...rest}
      />
      <label htmlFor={String(id)}>
        <div className={module.Switch_toggler} />
      </label>
    </div>
  )
})
