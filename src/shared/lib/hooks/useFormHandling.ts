import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useState, useEffect } from 'react'
import type {
  FieldValues,
  DefaultValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
  UseFormReset
} from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { ZodType, ZodTypeDef } from 'zod'

import type { InputHelperTextType } from 'shared/ui/Input'

type FormValues = Record<string, unknown> // Общий тип для разных наборов полей

interface UseFormHandlingReturn<T extends FormValues> {
  formValues: T
  setFormValues: (value: T) => void
  register: UseFormRegister<T>
  handleSubmit: ReturnType<typeof useForm>['handleSubmit']
  setValue: UseFormSetValue<T>
  setError: UseFormSetError<T>
  clearErrors: UseFormClearErrors<T>
  errors: ReturnType<typeof useForm>['formState']['errors']
  reset: UseFormReset<T>
  isCheckboxError: boolean
  onSubmit: (data: FormValues) => void
  handleChange: (
    field: keyof T,
    trim?: boolean
  ) => (evt: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (value: string | boolean, field: keyof T) => void
  handleResetValue: (field: keyof T) => void
  setErrorText: (
    text: ReturnType<typeof useForm>['formState']['errors'],
    key: string
  ) => string
  setErrorTextType: (
    text: ReturnType<typeof useForm>['formState']['errors'],
    key: string
  ) => InputHelperTextType
}

export const useFormHandling = <T extends FormValues>(
  schema: ZodType<T, ZodTypeDef>,
  defaultValues: T
): UseFormHandlingReturn<T> => {
  const [formValues, setFormValues] = useState<T>(defaultValues)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })

  const onSubmit = (data: FieldValues): void => {
    if (data) return
  }

  const handleChange =
    (field: keyof T) =>
    (evt: React.ChangeEvent<HTMLInputElement>): void => {
      handleResetValue(field)
      setFormValues({
        ...formValues,
        [field]: evt.target.value
      })
    }

  const handleSelectChange = (
    value: string | boolean,
    field: keyof T
  ): void => {
    handleResetValue(field)
    setFormValues({
      ...formValues,
      [field]: value
    })
  }

  const handleResetValue = (field: keyof T): void => {
    setFormValues({
      ...formValues,
      [field]: ''
    })
    clearErrors(field as Path<T>)
  }

  const setErrorText = (
    errors: ReturnType<typeof useForm>['formState']['errors'],
    key: string
  ): string => {
    const text =
      typeof errors[key] === 'object' && errors[key]?.message
        ? String(errors[key]?.message)
        : String(errors[key] ?? '')
    return text && text !== 'Required'
      ? (text as string)
      : text === 'Required'
        ? 'Необходимо заполнить все обязательные поля'
        : ''
  }

  const setErrorTextType = (
    errors: ReturnType<typeof useForm>['formState']['errors'],
    key: string
  ): InputHelperTextType => {
    return setErrorText(errors, key) ? 'error' : 'default'
  }

  const getCheckboxError = (): boolean => {
    if (typeof errors['agreement']?.type === 'string') {
      return true
    }

    return false
  }

  useEffect(() => {
    if (formValues) {
      ;(Object.keys(formValues) as Array<keyof T>).forEach(field => {
        setValue(field as Path<T>, formValues[field] as PathValue<T, Path<T>>)
      })
    }
  }, [formValues, setValue])

  return {
    formValues,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    errors,
    reset,
    onSubmit,
    handleChange,
    handleSelectChange,
    handleResetValue,
    setErrorText,
    setErrorTextType,
    setFormValues,
    isCheckboxError: getCheckboxError()
  }
}
