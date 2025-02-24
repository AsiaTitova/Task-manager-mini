import classNames from 'classnames'
import type { InputHTMLAttributes, FC } from 'react'
import { useEffect, useState, useRef, forwardRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ArrowDown, Cross } from 'shared/assets/icons'
import { useClickOutside } from 'shared/lib'
import { Dropdown } from 'shared/ui/Dropown'

import type { IOption } from '../../model'

import module from './Select.module.scss'

export type SelectSize = 'lg' | 'md' | 'sm'

interface IProps
  extends Omit<
    Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'>,
    'list'
  > {
  id: string | number
  className?: string
  label?: string
  disabled?: boolean
  placeholder: string
  list: IOption[]
  currentValue: IOption | null
  onChangeChecked: (value: IOption | null) => void
  error?: string
  isSearch?: boolean
  isSearchIsFront?: boolean
  size?: SelectSize
}

export const Select: FC<IProps> = forwardRef((props: IProps, ref) => {
  const {
    id,
    className,
    label = '',
    currentValue,
    placeholder,
    disabled = false,
    list,
    error = '',
    onChangeChecked,
    isSearch = false,
    isSearchIsFront = false,
    size = 'lg'
  } = props

  const [isShowList, setIsShowList] = useState(false)
  const [value, setValue] = useState<IOption | null>(currentValue || null)

  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => setIsShowList(false))

  const toggleShowList = (value: boolean): void => {
    setIsShowList(disabled ? false : value)
  }

  const setValueHandle = (value: IOption | null): void => {
    setValue(value)
    onChangeChecked(value)
    toggleShowList(false)
  }

  const resetValue = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    if (value && !disabled) {
      evt.stopPropagation()
      setValueHandle(null)
    }
  }

  useEffect(() => {
    setValue(currentValue)
  }, [currentValue])

  const selectClasses = classNames(
    module.Select,
    {
      [module[size]]: true,
      [module.disabled]: disabled,
      [module.error]: error?.length,
      [module.showHelpText]: error ? error?.length > 0 : false
    },
    className
  )

  const arrowClasses = classNames(module.Select_arrow, {
    [module.rotate]: isShowList && !value
  })

  return (
    <div className={selectClasses} ref={selectRef || ref}>
      {label && <h4 className={module.Select_label}>{label}</h4>}
      <div
        className={`${module.Select_wrap} open ${isShowList ? module.open : ''}`}
        onClick={() => toggleShowList(!isShowList)}>
        {value ? (
          <p className={module.Select_value}>{value?.title}</p>
        ) : (
          <p className={module.Select_placeholder}>{placeholder}</p>
        )}
        <button
          type="button"
          className={arrowClasses}
          onClick={evt => resetValue(evt)}>
          {value ? <Cross /> : <ArrowDown />}
        </button>
      </div>
      {error && error.length > 0 && (
        <p className={module.Select_helpText}>{error}</p>
      )}
      <CSSTransition
        in={isShowList}
        timeout={300}
        classNames="change"
        unmountOnExit>
        {list && (
          <Dropdown
            className={module.Select_list}
            id={id}
            list={list}
            currentValue={currentValue}
            isSearch={isSearch}
            isSearchIsFront={isSearchIsFront}
            setValueHandle={setValueHandle}
            size={size}
          />
        )}
      </CSSTransition>
    </div>
  )
})

Select.displayName = 'Select'
