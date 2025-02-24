import {
  InterruptingProcessesModal,
  useModalStore
} from 'shared/ui/ModalPortal'

interface UseModalCancelReturn {
  cancel: (prevModalMode?: string) => void
}

export const useModalCancel = (
  title: string,
  description: string,
  cancelInterruptingProcessesLabel?: string,
  successInterruptingProcessesLabel?: string,
  successInterruptingProcessesHandler?: () => void
): UseModalCancelReturn => {
  const {
    toggleShowConfirmModal,
    updateSaveData,
    saveData,
    toggleShowModal,
    modalMode,
    setModalMode
  } = useModalStore()

  const cancel = (prevModalMode?: string): void => {
    toggleShowConfirmModal(
      true,
      <InterruptingProcessesModal
        title={title}
        description={description}
        prevModalMode={prevModalMode}
        cancelInterruptingProcessesLabel={cancelInterruptingProcessesLabel}
        successInterruptingProcessesLabel={successInterruptingProcessesLabel}
        cancelInterruptingProcesses={cancelInterruptingProcesses}
        successInterruptingProcesses={successInterruptingProcesses}
      />
    )
  }

  const cancelInterruptingProcesses = (): void => {
    toggleShowConfirmModal(false, null, false)
    toggleShowModal(true, saveData, modalMode)
  }

  const successInterruptingProcesses = (prevModalMode?: string): void => {
    if (successInterruptingProcessesHandler) {
      successInterruptingProcessesHandler()
    } else {
      if (prevModalMode) {
        toggleShowModal(true, saveData, prevModalMode)
        setModalMode(prevModalMode)
        toggleShowConfirmModal(false, null, false)
      } else {
        toggleShowConfirmModal(false, null, false)
        updateSaveData(null)
        setModalMode(prevModalMode ? prevModalMode : '')
      }
    }
  }

  return {
    cancel
  }
}
