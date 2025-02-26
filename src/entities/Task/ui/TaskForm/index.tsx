import classNames from 'classnames'
import type { FC } from 'react'
import React from 'react'
import type { UseFormSetError } from 'react-hook-form'

import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'

import { REGEX_TITLE } from '../../constants'
import type { FormValues, ITaskData } from '../../model'

import { useTaskForm } from './hooks'
import module from './TaskForm.module.scss'

interface IProps {
  isEdit?: boolean
  title: string
  desc?: string
  successButtonLabel: string
  submitHandler: <T extends FormValues>(
    body: ITaskData,
    setError: UseFormSetError<T>
  ) => void
  cancelHandler: () => void
}

export const TaskForm: FC<IProps> = ({
  title,
  desc,
  successButtonLabel,
  submitHandler,
  cancelHandler,
  isEdit = false
}) => {
  const {
    formValues,
    register,
    errors,
    setErrorText,
    setErrorTextType,
    handleFieldNameChange,
    handleSubmit,
    onCancel,
    formRef
  } = useTaskForm(submitHandler, cancelHandler)

  const classNamesTaskTitle = classNames(module.TaskForm_title, {
    [module.edit]: isEdit
  })

  return (
    <form className={module.TaskForm} onSubmit={handleSubmit} ref={formRef}>
      <h2 className={classNamesTaskTitle}>{title}</h2>
      {desc && <p className={module.TaskForm_desc}>{desc}</p>}
      <div className={module.TaskForm_wrap}>
        <Input
          id="title"
          {...register('title')}
          label="Название задачи"
          placeholder="Введите название"
          maxLength={100}
          autoComplete="off"
          borderRound={true}
          value={formValues?.title || ''}
          helpText={setErrorText(errors, 'title')}
          helpTextType={setErrorTextType(errors, 'title')}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            handleFieldNameChange(evt, 'title' as keyof FormValues, REGEX_TITLE)
          }
        />
      </div>
      <div className={module.TaskForm_bottom}>
        <Button
          className={module.TaskForm_button}
          mode="secondary"
          label="Отменить"
          onClick={onCancel}
        />
        <Button
          type="submit"
          className={module.TaskForm_button}
          label={successButtonLabel}
        />
      </div>
    </form>
  )
}
