import type React from 'react'
import type { RefObject } from 'react'
import type { useForm, UseFormRegister, UseFormSetError } from 'react-hook-form'

import type { InputHelperTextType } from 'shared/ui/Input'

import type { FormValues } from '../model'

export interface ITask {
  id: number
  title: string
}

export interface ITaskData {
  id?: number
  title: string
}

export interface IHookForm<T extends FormValues> {
  formValues: T
  setFormValues: (value: T) => void
  register: UseFormRegister<T>
  handleSubmit: () => void
  errors: ReturnType<typeof useForm>['formState']['errors']
  setError: UseFormSetError<T>
  handleChange: (
    field: keyof T,
    trim?: boolean
  ) => (evt: React.ChangeEvent<HTMLInputElement>) => void
  setErrorText: (
    text: ReturnType<typeof useForm>['formState']['errors'],
    key: string
  ) => string
  setErrorTextType: (
    text: ReturnType<typeof useForm>['formState']['errors'],
    key: string
  ) => InputHelperTextType
  handleFieldNameChange: (
    evt: React.ChangeEvent<HTMLInputElement>,
    valueField: keyof FormValues,
    regex: RegExp
  ) => void
  onCancel: () => void
  formRef: RefObject<HTMLFormElement>
}
