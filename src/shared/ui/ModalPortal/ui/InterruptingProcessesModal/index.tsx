import classNames from 'classnames'
import type { FC } from 'react'
import { useRef } from 'react'

import { useClickOutside } from 'shared/lib'
import { Button } from 'shared/ui/Button'

import module from './InterruptingProcessesModal.module.scss'

interface IProps {
  title: string
  description: string
  prevModalMode?: string
  extraInfo?: string
  cancelInterruptingProcessesLabel?: string
  successInterruptingProcessesLabel?: string
  cancelInterruptingProcesses?: () => void
  successInterruptingProcesses: (prevModalMode?: string) => void
}

export const InterruptingProcessesModal: FC<IProps> = ({
  title,
  description,
  prevModalMode,
  cancelInterruptingProcessesLabel = 'Вернуться к добавлению',
  successInterruptingProcessesLabel = 'Прервать',
  cancelInterruptingProcesses,
  successInterruptingProcesses,
  extraInfo
}) => {
  const interruptingProcessesRef = useRef<HTMLDivElement>(null)
  const successButtonClasses = classNames(
    module.InterruptingProcessesModal_button,
    {
      [module.InterruptingProcessesModal_full]:
        !!cancelInterruptingProcesses === false
    }
  )
  useClickOutside(interruptingProcessesRef, () =>
    cancelInterruptingProcesses
      ? cancelInterruptingProcesses()
      : successInterruptingProcesses()
  )
  return (
    <div
      className={module.InterruptingProcessesModal}
      ref={interruptingProcessesRef}>
      <h2>{title}</h2>
      <div className={module.InterruptingProcessesModal_desc}>
        <p>{description}</p>
        {extraInfo && <p>{extraInfo}</p>}
      </div>
      <div className={module.InterruptingProcessesModal_bottom}>
        {cancelInterruptingProcesses && (
          <Button
            className={module.InterruptingProcessesModal_button}
            mode="secondary"
            label={cancelInterruptingProcessesLabel}
            onClick={() => cancelInterruptingProcesses()}
          />
        )}
        <Button
          className={successButtonClasses}
          label={successInterruptingProcessesLabel}
          onClick={() => successInterruptingProcesses(prevModalMode)}
        />
      </div>
    </div>
  )
}
