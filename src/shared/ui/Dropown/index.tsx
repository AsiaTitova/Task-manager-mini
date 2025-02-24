import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import { useState, useEffect } from 'react'
import React, { memo } from 'react'

import { Cat, Search } from 'shared/assets/icons'
import { Input } from 'shared/ui/Input'

import type { IOption } from '../../model'

import module from './Dropdown.module.scss'

export type DropdownSize = 'lg' | 'md' | 'sm' | 'xs'

interface IProps {
  id: string | number
  className?: string
  size?: DropdownSize
  isSearch?: boolean
  isSearchIsFront?: boolean
  list: IOption[]
  currentValue?: IOption | null
  setValueHandle: (value: IOption) => void
}

export const Dropdown: FC<IProps> = memo(
  ({
    id,
    className,
    size = 'lg',
    isSearch = false,
    isSearchIsFront = false,
    list,
    setValueHandle,
    currentValue
  }) => {
    const [filteredList, setFilteredList] = useState<IOption[]>(list)

    const filterList = (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const value = evt.target.value.toLowerCase()
      const data = list.filter(item =>
        item?.title?.toLowerCase().startsWith(value)
      )
      setFilteredList(data)
    }

    useEffect(() => {
      setFilteredList(list)
    }, [list])

    const getContent = (data: IOption[]): ReactNode => {
      switch (data?.length) {
        case 0:
          return (
            <li className={module.Dropdown_empty}>
              <Cat />
              <span>Нет данных</span>
            </li>
          )
        default:
          return data.map((item: IOption, index: number) => (
            <li
              className={classNames(module.Dropdown_item, {
                [module.active]: currentValue?.id === item.id
              })}
              key={index}
              onClick={() => setValueHandle(item)}>
              {item.title}
            </li>
          ))
      }
    }

    const dropdownClasses = classNames(
      module.Dropdown,
      {
        [module[size]]: true
      },
      className
    )

    return (
      <div className={dropdownClasses}>
        {isSearch && (
          <Input
            id={id}
            className={module.Dropdown_search}
            onChange={evt => filterList(evt)}
            placeholder="Найти по названию"
            icon={<Search />}
            size="sm"
          />
        )}
        <ul className={module.Dropdown_list}>
          {isSearchIsFront ? getContent(filteredList) : getContent(list)}
        </ul>
      </div>
    )
  }
)
