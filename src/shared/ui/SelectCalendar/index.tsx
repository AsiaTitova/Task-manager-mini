import classNames from 'classnames'
import type { InputHTMLAttributes, FC } from 'react'
import React, { memo, useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ArrowDown } from 'shared/assets/icons'
import { useClickOutside } from 'shared/lib'
import { Button } from 'shared/ui/Button'

import type { IOption } from '../../model'

import module from './SelectCalendar.module.scss'

interface IProps
  extends Omit<
    Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>,
    'defaultValue'
  > {
  id: string | number
  className?: string
  isCalendarPicker?: boolean
  isDisabledScroll?: boolean
  customList?: IOption[]
  defaultValue?: IOption
  onChangeChecked: (value: IOption) => void
}

const defaultYear: IOption = {
  id: new Date().getFullYear(),
  title: new Date().getFullYear().toString()
}

export const SelectCalendar: FC<IProps> = memo(props => {
  const {
    className,
    customList,
    defaultValue,
    onChangeChecked,
    isCalendarPicker = false,
    isDisabledScroll = false
  } = props

  const [isShowList, setIsShowList] = useState(false)
  const [value, setValue] = useState<IOption>(defaultValue || defaultYear)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const selectRef = useRef<HTMLDivElement>(null)
  const calendarListRef = useRef<HTMLUListElement>(null)

  useClickOutside(selectRef, () => setIsShowList(false))

  const generateYearOptions = (): IOption[] => {
    const currentYear = new Date().getFullYear()
    const years: IOption[] = []
    for (let i = currentYear + 5; i >= 1900; i--) {
      years.push({
        id: i,
        title: i.toString()
      })
    }
    return years
  }

  const setList = (): IOption[] => {
    switch (customList && customList?.length > 0) {
      case true:
        return customList as IOption[]
      default:
        return generateYearOptions()
    }
  }

  const toggleShowList = (showList: boolean): void => {
    setIsShowList(showList)
    if (showList) {
      const selectedIndex = customList
        ? customList.findIndex((item: IOption) => item.id === value.id)
        : generateYearOptions().findIndex(
            (item: IOption) => item.id === value.id
          )
      setActiveIndex(selectedIndex)
    }
  }

  const setValueHandle = (value: IOption): void => {
    setValue(value)
    onChangeChecked(value)
    toggleShowList(false)
  }

  const checkActiveClass = (id: string | number): boolean => {
    return value.id === id
  }

  useEffect(() => {
    if (
      isShowList &&
      activeIndex !== null &&
      calendarListRef.current &&
      !isDisabledScroll
    ) {
      const activeItem = calendarListRef.current.children[
        activeIndex
      ] as HTMLElement
      // Прокрутка к элементу
      activeItem?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [isShowList, activeIndex])

  useEffect(() => {
    if (defaultValue) setValue(defaultValue)
  }, [defaultValue])

  const selectClasses = classNames(
    module.SelectCalendar,
    {
      [module.open]: isShowList,
      [module.custom]: !!customList,
      [module.calendar]: isCalendarPicker
    },
    className
  )

  const arrowClasses = classNames(module.SelectCalendar_arrow, {
    [module.rotate]: isShowList
  })

  const buttonCurrentClasses = classNames(
    module.SelectCalendar_item,
    module.SelectCalendar_buttonCurrent
  )

  return (
    <div className={selectClasses} ref={selectRef}>
      <div
        className={module.SelectCalendar_wrap}
        onClick={() => toggleShowList(!isShowList)}>
        {value && <p className={module.SelectCalendar_value}>{value.title}</p>}
        <button type="button" className={arrowClasses}>
          <ArrowDown />
        </button>
      </div>
      <CSSTransition
        in={isShowList}
        timeout={300}
        classNames="change"
        unmountOnExit>
        {generateYearOptions()?.length && (
          <div className={module.SelectCalendar_container}>
            {!customList && (
              <button
                type="button"
                className={buttonCurrentClasses}
                onClick={() => setValueHandle(defaultYear)}>
                Текущий
              </button>
            )}
            <ul className={module.SelectCalendar_list} ref={calendarListRef}>
              {setList().map((item: IOption, index: number) => (
                <li className={module.SelectCalendar_item} key={index}>
                  <Button
                    className={module.SelectCalendar_button}
                    size="sm"
                    label={item.title}
                    mode={
                      item?.id && checkActiveClass(item.id)
                        ? 'secondary'
                        : 'clear'
                    }
                    onClick={() => setValueHandle(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </CSSTransition>
    </div>
  )
})
