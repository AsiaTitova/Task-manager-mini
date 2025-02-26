import type { FC } from 'react'
import type { Path, UseFormSetError } from 'react-hook-form'

import { useModalCancel } from 'shared/lib'
import { useModalStore } from 'shared/ui/ModalPortal'
import { usePortalToastStore } from 'shared/ui/Toast'

import type { FormValues, ITaskData } from 'entities/Task'
import { TaskForm, useTasksStore } from 'entities/Task'

export const TaskEdit: FC = () => {
  const { editTask } = useTasksStore()
  const { pushToast } = usePortalToastStore()
  const { toggleShowConfirmModal, updateSaveData, toggleShowModal } =
    useModalStore()
  const { cancel } = useModalCancel(
    'Прервать редактирование?',
    'Если прервать редактирование, все внесённые данные будут удалены',
    'Вернуться к редактированию'
  )

  const edit = <T extends FormValues>(
    body: ITaskData,
    setError: UseFormSetError<T>
  ): void => {
    if (body && body.id) {
      editTask(body?.id, body)
        .then(() => {
          pushToast({
            id: Number(body?.id),
            data: null,
            label: 'Задача изменена',
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
        title="Редактирование задачи"
        successButtonLabel="Сохранить"
        isEdit={true}
        submitHandler={edit}
        cancelHandler={cancel}
      />
    </>
  )
}
