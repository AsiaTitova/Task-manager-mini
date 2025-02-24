import classNames from 'classnames'
import { ru } from 'date-fns/locale'
import moment from 'moment'
import type { FC, ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

//eslint-disable-next-line
import 'react-datepicker/dist/react-datepicker.css'
import { ArrowLeft, ArrowRight, Calendar } from 'shared/assets/icons'
import { datePickerFormatting } from 'shared/lib'
import type { IOption } from 'shared/model'

import module from './DatePicker.module.scss'
import { DatePickerHeader } from './DatePickerHeader'

export type CalendarHelperTextType = 'default' | 'error' | 'success' | 'warning'

interface IProps {
  id: string
  label?: string | ReactNode
  value: string | null
  selected?: Date | undefined
  className?: string
  placeholder?: string
  disabled?: boolean
  helpText?: string | undefined
  helpTextType?: CalendarHelperTextType
  borderRound?: boolean
  onChange: (date: string) => void
  maxDate?: Date | null
  minDate?: Date | null
  yearsList?: IOption[]
  isDisabledScroll?: boolean
}

export const CalendarPicker: FC<IProps> = ({
  className,
  id,
  label,
  value,
  placeholder = 'Выберите дату',
  disabled = false,
  helpText,
  helpTextType = 'default',
  onChange,
  selected = undefined,
  maxDate = undefined,
  minDate = undefined,
  isDisabledScroll = false,
  yearsList
}) => {
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    if (value?.length) {
      setDate(new Date(datePickerFormatting(value)))
    } else {
      setDate(null)
    }
  }, [value])

  const calendarClasses = classNames(
    module.CalendarPicker,
    {
      [module.disabled]: disabled,
      [module[helpTextType]]: helpTextType,
      [module.showHelpText]: helpText ? helpText?.length > 0 : false
    },
    className
  )

  return (
    <div className={calendarClasses}>
      {label && (
        <label htmlFor={id} className={module.CalendarPicker_label}>
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        showIcon
        toggleCalendarOnIconClick
        locale={ru}
        dateFormat="dd.MM.yyyy"
        icon={<Calendar />}
        selected={date}
        openToDate={selected}
        onChange={(date: Date | null) =>
          onChange(date ? moment(date).format('DD.MM.YYYY') : '')
        }
        onKeyDown={evt => evt.preventDefault()}
        disabled={disabled}
        placeholderText={placeholder}
        calendarClassName={module.CalendarPicker_picker}
        popperClassName={`${module.CalendarPicker_popper} no-triangle`}
        maxDate={maxDate || undefined}
        minDate={minDate || undefined}
        previousMonthButtonLabel={<ArrowLeft />}
        nextMonthButtonLabel={<ArrowRight />}
        renderCustomHeader={props => (
          <DatePickerHeader
            {...props}
            yearsList={yearsList}
            isDisabledScroll={isDisabledScroll}
          />
        )}
        autoComplete="off"
        isClearable={true}
      />
      <p className={module.CalendarPicker_helpText}>
        {helpText && <span>{helpText}</span>}
      </p>
    </div>
  )
}
