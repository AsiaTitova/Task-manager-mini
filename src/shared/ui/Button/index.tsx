import classNames from 'classnames'
import Link from 'next/link'
import type {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
  HTMLAttributeAnchorTarget
} from 'react'
import React from 'react'
import { memo, useMemo } from 'react'

import module from './Button.module.scss'

export type ButtonMode =
  | 'primary'
  | 'secondary'
  | 'clear'
  | 'critical'
  | 'critical-primary'
export type ButtonSize = 'lg' | 'md' | 'sm'
export type ButtonIconPosition = 'right' | 'left'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: ButtonMode
  size?: ButtonSize
  mini?: boolean
  link?: string
  target?: HTMLAttributeAnchorTarget
  label?: ReactNode
  icon?: ReactNode
  iconPosition?: ButtonIconPosition
  borderRadius?: number
  isCenter?: boolean
}

export const Button: FC<IProps> = memo(
  ({
    mode = 'primary',
    size = 'md',
    label,
    link = '',
    target = '_blank',
    icon,
    type = 'button',
    mini = false,
    iconPosition = 'left',
    isCenter = false,
    borderRadius,
    className,
    ...rest
  }) => {
    const buttonClasses = useMemo(
      () =>
        classNames(
          module.Button,
          {
            [module.mini]: mini,
            [module[mode]]: true,
            [module[size]]: true,
            [module[iconPosition]]: true,
            [module.center]: isCenter
          },
          className
        ),
      [mini, mode, size, iconPosition, className]
    )

    const borderRadiusStyle: React.CSSProperties = borderRadius
      ? {
          borderRadius: `${borderRadius}px`
        }
      : {}

    if (link?.length) {
      return (
        <Link
          className={buttonClasses}
          href={link}
          target={target}
          style={borderRadiusStyle}>
          {iconPosition === 'left' && icon}
          {label && <span>{label}</span>}
          {iconPosition === 'right' && icon}
        </Link>
      )
    }

    return (
      <button
        type={type}
        className={buttonClasses}
        style={borderRadiusStyle}
        {...rest}>
        {iconPosition === 'left' && icon}
        {label && <span>{label}</span>}
        {iconPosition === 'right' && icon}
      </button>
    )
  }
)
