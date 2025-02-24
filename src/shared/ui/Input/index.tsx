import classNames from 'classnames'
import type { InputHTMLAttributes, FC, ReactNode, ForwardedRef } from 'react'
import { useState } from 'react'
import React, { useCallback, forwardRef } from 'react'

import { Close } from 'shared/assets/icons'

import module from './Input.module.scss'

export type InputHelperTextType = 'default' | 'error' | 'success' | 'warning'
export type InputSize = 'lg' | 'md' | 'sm'

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
  id: string | number
  label?: string | ReactNode
  type?: string
  value?: string
  className?: string
  size?: InputSize
  helpText?: string | undefined
  helpTextType?: InputHelperTextType
  disabled?: boolean
  icon?: ReactNode
  customPlaceholder?: ReactNode
  borderRound?: boolean
  showReset?: boolean
  onResetValue?: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  (props: IProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      id,
      label,
      value,
      type = 'text',
      disabled = false,
      helpText,
      helpTextType = 'default',
      icon,
      size = 'lg',
      customPlaceholder,
      borderRound = false,
      showReset = false,
      onChange,
      onResetValue,
      placeholder,
      minLength,
      maxLength,
      ...rest
    } = props

    const [showCustomPlaceholder, setShowCustomPlaceholder] = useState(
      !value?.length
    )

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event)
        setShowCustomPlaceholder(!event.target.value.length)
      },
      [onChange]
    )

    const handleResetValue = useCallback((): void => {
      if (onResetValue) {
        onResetValue()
      }
    }, [onResetValue])

    const handleFocus = (): void => {
      const input: HTMLElement | null = document.getElementById(String(id))
      if (input && input instanceof HTMLInputElement) {
        input.focus()
      }
    }

    const inputClasses = classNames(
      module.Input,
      {
        [module[size]]: true,
        [module.icon]: icon,
        [module.disabled]: disabled,
        [module[helpTextType]]: helpTextType,
        [module.round]: borderRound,
        [module.noReset]: !showReset,
        [module.showHelpText]: helpText ? helpText?.length > 0 : false
      },
      className
    )

    return (
      <div className={inputClasses}>
        {label && (
          <label htmlFor={String(id)} className={module.Input_label}>
            {label}
          </label>
        )}
        <div className={module.Input_wrap}>
          {icon && <span className={module.Input_icon}>{icon}</span>}
          <input
            className={module.Input_input}
            id={String(id)}
            type={type}
            ref={ref}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            {...rest}
          />
          {customPlaceholder && showCustomPlaceholder && (
            <p className={module.Input_customPlaceholder} onClick={handleFocus}>
              {customPlaceholder}
            </p>
          )}
          {showReset && value && value?.length > 0 && (
            <button
              type="button"
              className={module.Input_reset}
              onClick={handleResetValue}>
              <Close />
            </button>
          )}
        </div>
        {helpText && (
          <p className={module.Input_helpText}>
            <span>{helpText}</span>
          </p>
        )}
      </div>
    )
  }
)
