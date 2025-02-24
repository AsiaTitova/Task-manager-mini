import classNames from 'classnames'
import type { InputHTMLAttributes, FC, ReactElement } from 'react'
import React, { memo, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ArrowDown, Cross } from 'shared/assets/icons'
import { useClickOutside } from 'shared/lib'
import { Dropdown } from 'shared/ui/Dropown'
import { Tag } from 'shared/ui/Tag'

import type { IOption } from '../../model'

import module from './Select.module.scss'

interface IProps
  extends Omit<Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>, 'list'> {
  id: string | number
  className?: string
  label: string
  disabled?: boolean
  placeholder: string
  list: IOption[]
  currentValue: IOption[] | null
  onChangeChecked: (value: IOption[] | null) => void
  error?: string
  isSearch?: boolean
  isSearchIsFront?: boolean
  children?: ReactElement<{
    setValueHandle: (value: IOption | null) => void
  }>
}

export const MultiSelect: FC<IProps> = memo(props => {
  const {
    id,
    className,
    label,
    currentValue,
    placeholder,
    disabled = false,
    list,
    error = '',
    onChangeChecked,
    isSearch = false,
    isSearchIsFront = false,
    children
  } = props

  const [isShowList, setIsShowList] = useState(false)
  const [values, setValues] = useState<IOption[]>(currentValue || [])

  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => toggleShowList(false))

  const toggleShowList = (value: boolean): void => {
    setIsShowList(value)
  }

  const handleValueChange = (value: IOption | null): void => {
    if (value) {
      if (!values.some(v => v.id === value.id)) {
        const newValues = [...values, value]
        setValues(newValues)
        onChangeChecked(newValues)
      } else {
        const newValues = values.filter(v => v.id !== value.id)
        setValues(newValues)
        onChangeChecked(newValues)
      }
    }
  }

  const resetValue = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.stopPropagation()
    setValues([])
    onChangeChecked(null)
  }

  const removeTag = (id: string | number): void => {
    const newValues = values.filter(v => v.id !== id)
    setValues(newValues)
    onChangeChecked(newValues)
  }

  const filteredList = (): IOption[] => {
    return list.filter(item => !values.some(v => v.id === item.id))
  }

  useEffect(() => {
    setValues(currentValue || [])
  }, [currentValue])

  const selectClasses = classNames(
    module.Select,
    {
      [module.disabled]: disabled,
      [module.error]: error?.length,
      [module.showHelpText]: error.length > 0
    },
    className
  )

  const arrowClasses = classNames(module.Select_arrow, {
    [module.rotate]: isShowList && !values?.length
  })

  return (
    <div className={selectClasses} ref={selectRef}>
      {label && <h4 className={module.Select_label}>{label}</h4>}
      <div
        className={`${module.Select_wrap} ${isShowList ? module.open : ''}`}
        onClick={() => toggleShowList(!isShowList)}>
        {values.length > 0 ? (
          <div className={module.Select_tags}>
            {values.map(value => (
              <Tag
                key={value.id}
                id={value.id}
                label={value.title}
                removeHandler={removeTag}
              />
            ))}
          </div>
        ) : (
          <p className={module.Select_placeholder}>{placeholder}</p>
        )}
        <button
          type="button"
          className={arrowClasses}
          onClick={evt => resetValue(evt)}>
          {values?.length ? <Cross /> : <ArrowDown />}
        </button>
      </div>
      {error && <p className={module.Select_helpText}>{error}</p>}
      <CSSTransition
        in={isShowList}
        timeout={300}
        classNames="change"
        unmountOnExit>
        {children
          ? React.isValidElement(children)
            ? React.cloneElement(children, {
                setValueHandle: handleValueChange
              })
            : children
          : list && (
              <Dropdown
                id={id}
                list={filteredList()}
                isSearch={isSearch}
                isSearchIsFront={isSearchIsFront}
                setValueHandle={handleValueChange}
              />
            )}
      </CSSTransition>
    </div>
  )
})
