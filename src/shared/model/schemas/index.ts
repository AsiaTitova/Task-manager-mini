import { z } from 'zod'

import { isValidDate } from 'shared/lib'

import { REGEX_DATE_FORMAT } from '../constans'
import { ErrorMessages } from '../constans'

export const idsRequiredSchema = z
  .number()
  .nullable()
  .refine(value => value !== null && !isNaN(value), {
    message: ErrorMessages.REQUIRED_FIELD
  })

export const idsOptionalSchema = z.number().nullable().optional()

export const stringRequiredSchema = z
  .string()
  .nonempty({ message: ErrorMessages.REQUIRED_FIELD })

export const stringOptionalSchema = z.string().optional()

export const booleanSchema = z.boolean()

export const dateRequiredSchema = z
  .string()
  .nonempty({ message: ErrorMessages.REQUIRED_FIELD })
  .regex(REGEX_DATE_FORMAT, {
    message: ErrorMessages.PERIOD_INVALID
  })
  .refine(
    value => {
      const year = value.split('.')[2]
      const yearNumber = parseInt(year, 10)
      return yearNumber >= 1900
    },
    {
      message: ErrorMessages.PERIOD_MIN
    }
  )
  .refine(isValidDate, {
    message: ErrorMessages.DATE_INVALID
  })
