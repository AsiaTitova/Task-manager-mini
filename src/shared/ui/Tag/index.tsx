import classNames from 'classnames'
import type { FC } from 'react'
import React, { memo } from 'react'

import { CrossTag } from 'shared/assets/icons'

import module from './Tag.module.scss'

interface IProps {
  id: string | number
  label: string | undefined
  removeHandler?: (id: string | number) => void
  className?: string
  borderRadius?: number
}

export const Tag: FC<IProps> = memo(props => {
  const { id, label, removeHandler, className, borderRadius } = props

  const handlerRemove = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.stopPropagation()
    if (removeHandler) {
      removeHandler(id)
    }
  }

  const borderRadiusStyle: React.CSSProperties = borderRadius
    ? {
        borderRadius: `${borderRadius}px`
      }
    : {}

  return (
    <div
      className={classNames(module.Tag, className)}
      style={borderRadiusStyle}>
      <span>{label}</span>
      {removeHandler && (
        <button
          type="button"
          className={module.Tag_button}
          onClick={(evt: React.MouseEvent<HTMLButtonElement>) =>
            handlerRemove(evt)
          }>
          <CrossTag />
        </button>
      )}
    </div>
  )
})
