import type { FC } from 'react'
import type { Path, UseFormSetError } from 'react-hook-form'

import { generateRandomString, useModalCancel } from 'shared/lib'
import { useModalStore } from 'shared/ui/ModalPortal'
import { usePortalToastStore } from 'shared/ui/Toast'

import type { FormValues, ITaskData } from 'entities/Task'
import { TaskForm, useTasksStore } from 'entities/Task'

export const TaskAdd: FC = () => {
  const { createTask } = useTasksStore()
  const { pushToast } = usePortalToastStore()
  const { toggleShowConfirmModal, updateSaveData, toggleShowModal } =
    useModalStore()
  const { cancel } = useModalCancel(
    'Прервать добавление задачи?',
    'Если прервать добавление, все внесённые данные будут удалены'
  )

  const create = <T extends FormValues>(
    body: ITaskData,
    setError: UseFormSetError<T>
  ): void => {
    createTask(body)
      .then(() => {
        pushToast({
          id: generateRandomString(5),
          data: null,
          label: 'Задача создана',
          cancelLabel: 'Отлично!',
          cancelHandle: () => {},
          successHandle: () => {}
        })
        toggleShowModal(false, null)
        toggleShowConfirmModal(false, null, false)
        updateSaveData(null)
      })
      .catch(error => {
        setErrors(error.data.errors, setError)
      })
  }

  const setErrors = <T extends FormValues>(
    errors: { [key: string]: string[] },
    setError: UseFormSetError<T>
  ): void => {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const messages = errors[field]
        const typedField = field as keyof T
        if (messages.length > 1) {
          const additionalMessages = messages.join(', ')
          setError(typedField as Path<T>, { message: additionalMessages })
        } else {
          setError(typedField as Path<T>, { message: messages[0] })
        }
      }
    }
  }

  return (
    <>
      <TaskForm
        title="Добавление задачи"
        desc="Заполните все поля, чтобы добавить новую задачу"
        successButtonLabel="Добавить"
        submitHandler={create}
        cancelHandler={cancel}
      />
    </>
  )
}
