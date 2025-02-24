import classNames from 'classnames'
import type {
  TextareaHTMLAttributes,
  ForwardedRef,
  ForwardRefExoticComponent
} from 'react'
import React, { useCallback, forwardRef } from 'react'

import { Close } from 'shared/assets/icons'

import module from './Textarea.module.scss'

export type TextareaHelperTextType = 'default' | 'error' | 'success' | 'warning'
export type TextareaSize = 'lg' | 'md' | 'sm'

interface IProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'size'> {
  id: string | number
  label?: string
  value?: string
  className?: string
  size?: TextareaSize
  helpText?: string | undefined
  helpTextType?: TextareaHelperTextType
  disabled?: boolean
  borderRound?: boolean
  showReset?: boolean
  onResetValue?: () => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: ForwardRefExoticComponent<
  IProps & React.RefAttributes<HTMLTextAreaElement>
> = forwardRef((props: IProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const {
    className,
    id,
    label,
    value,
    disabled = false,
    helpText,
    helpTextType = 'default',
    size = 'lg',
    borderRound = false,
    showReset = false,
    onChange,
    onResetValue,
    ...rest
  } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
      onChange(event)
    },
    [onChange]
  )

  const handleResetValue = useCallback((): void => {
    if (onResetValue) {
      onResetValue()
    }
  }, [onResetValue])

  const textareaClasses = classNames(
    module.Textarea,
    {
      [module[size]]: true,
      [module.disabled]: disabled,
      [module[helpTextType]]: helpTextType,
      [module.round]: borderRound,
      [module.noReset]: !showReset,
      [module.showHelpText]: helpText ? helpText.length > 0 : false
    },
    className
  )

  return (
    <div className={textareaClasses}>
      {label && (
        <label htmlFor={String(id)} className={module.Textarea_label}>
          {label}
        </label>
      )}
      <div className={module.Textarea_wrap}>
        <textarea
          className={module.Textarea_input}
          id={String(id)}
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        {showReset && value && value.length > 0 && (
          <button
            type="button"
            className={module.Textarea_reset}
            onClick={handleResetValue}>
            <Close />
          </button>
        )}
      </div>
      <p className={module.Textarea_helpText}>
        {helpText && <span>{helpText}</span>}
      </p>
    </div>
  )
})
