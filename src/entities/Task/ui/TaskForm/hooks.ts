import type React from 'react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import type {
  FieldValues,
  SubmitHandler,
  UseFormSetError
} from 'react-hook-form'

import { useClickOutside, useFormHandling } from 'shared/lib'
import { useModalStore } from 'shared/ui/ModalPortal'

import type { IHookForm, FormValues, ITaskData } from '../../model'
import { taskFormSchema } from '../../model'

export const useTaskForm = <T extends FormValues>(
  submitHandle: (body: ITaskData, setError: UseFormSetError<T>) => void,
  cancelHandler: () => void
): IHookForm<FormValues> => {
  const formRef = useRef<HTMLFormElement>(null)

  const { saveData, toggleShowModal, updateSaveData } = useModalStore()
  const [formData, setFormData] = useState<FormValues>(saveData as FormValues)

  const {
    formValues,
    register,
    handleSubmit,
    errors,
    setError,
    handleChange,
    setFormValues,
    setErrorText,
    setErrorTextType,
    clearErrors
  } = useFormHandling(taskFormSchema, formData)

  const initializeFormValues = (): void => {
    setFormData(saveData as FormValues)
  }

  const handleFieldNameChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    valueField: keyof FormValues,
    regex: RegExp
  ): void => {
    const value = evt.target.value
    if (regex.test(value) || value === '') {
      clearErrors()
      handleChange(valueField)
      const data = {
        ...formData,
        [valueField]: value
      }
      setFormData(data)
      setFormValues(data)
      updateSaveData(data)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const editData = saveData as ITaskData
    const obj: ITaskData = {
      id: (editData?.id as number) || undefined,
      title: data.title.trim()
    }
    submitHandle(obj, setError)
  }

  const onCancel = (): void => {
    toggleShowModal(false, formData)
    cancelHandler()
  }

  useEffect(() => {
    initializeFormValues()
  }, [])

  useClickOutside(formRef, () => onCancel())

  return {
    formValues,
    setFormValues,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    setError,
    handleChange,
    setErrorText,
    setErrorTextType,
    handleFieldNameChange,
    onCancel,
    formRef
  }
}
