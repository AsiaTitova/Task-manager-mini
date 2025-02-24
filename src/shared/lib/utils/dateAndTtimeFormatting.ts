import moment from 'moment'

import 'moment/locale/ru'
import type { IOption } from 'shared/model'

export const dateFormatting = (date: string): string => {
  return moment(date, 'DD.MM.YYYY').locale('ru').format('DD MMMM YYYY')
}

export const dateShortFormatting = (date: string): string => {
  return moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY')
}

export const datePickerFormatting = (date: string): string => {
  return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD')
}

export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true
  const [day, month, year] = dateString.split('.').map(Number)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

export const generateYearsList = (addYearsCount = 0): IOption[] => {
  const currentYear = new Date().getFullYear()
  const years: IOption[] = []
  for (let i = currentYear + addYearsCount; i >= 1900; i--) {
    years.push({
      id: i,
      title: i.toString()
    })
  }
  return years
}

export const setYear = (newYear: number | string): string => {
  const today = new Date()
  today.setFullYear(Number(newYear))
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const adjustDate = (
  year: number | string,
  steps: number,
  direction: 'min' | 'max'
): string => {
  let adjustedYear: number

  if (direction === 'max') {
    adjustedYear = Number(year) + steps
    // Возвращаем конец года (31 декабря)
    return `${adjustedYear}-12-31`
  } else if (direction === 'min') {
    adjustedYear = Number(year) - steps
    // Возвращаем начало года (1 января)
    return `${adjustedYear}-01-01`
  }
  return ''
}
