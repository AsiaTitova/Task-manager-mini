import React from 'react'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import { ArrowLeft, ArrowRight } from 'shared/assets/icons'
import type { IOption } from 'shared/model'
import { SelectCalendar } from 'shared/ui/SelectCalendar'

import module from './DatePicker.module.scss'

interface CustomDatePickerHeaderProps extends ReactDatePickerCustomHeaderProps {
  yearsList?: IOption[]
  isDisabledScroll?: boolean
}

export const DatePickerHeader = ({
  date,
  changeYear,
  decreaseMonth,
  increaseMonth,
  monthDate,
  yearsList,
  isDisabledScroll = false
}: CustomDatePickerHeaderProps): JSX.Element => {
  const monthName = date.toLocaleString('ru-RU', { month: 'long' })
  const currentMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)
  const year = date.getFullYear()
  const defaultYear = {
    id: year.toString(),
    name: year.toString()
  }

  const setCurrentYear = (e: IOption): void => {
    const newYear = Number(e.id)
    changeYear(new Date(newYear, monthDate.getMonth()).getFullYear())
  }

  return (
    <div
      className={module.CalendarPicker_row}
      onClick={evt => evt.preventDefault()}>
      <button className={module.CalendarPicker_arrow} onClick={decreaseMonth}>
        <ArrowLeft />
      </button>
      <div className={module.CalendarPicker_wrap}>
        <span className={module.CalendarPicker_month}>{currentMonth}</span>
        <SelectCalendar
          id="CalendarYears"
          isCalendarPicker={true}
          defaultValue={defaultYear}
          customList={yearsList}
          isDisabledScroll={isDisabledScroll}
          onChangeChecked={(value: IOption) => setCurrentYear(value)}
        />
      </div>
      <button className={module.CalendarPicker_arrow} onClick={increaseMonth}>
        <ArrowRight />
      </button>
    </div>
  )
}
