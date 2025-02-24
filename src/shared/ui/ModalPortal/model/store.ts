import type { ReactNode } from 'react'
import { create } from 'zustand'

interface IState<T> {
  isOpen: boolean
  modalMode: string
  prevModalMode: string
  children: ReactNode
  isNotesTypeConfirmModal: boolean
  saveData: T | null
  isStartAnimation: boolean
  isOpenConfirmModal: boolean
  childrenConfirmModal: ReactNode
  isTariffOver: boolean
}

interface IAction<T> {
  toggleShowModal: (value: boolean, data: T | null, mode?: string) => void
  returnShowModal: () => void
  confirmModalHandle: () => void
  setConfirmModalHandle: (callback: () => void) => void
  toggleShowConfirmModal: (
    value: boolean,
    modal: ReactNode | null,
    notes?: boolean
  ) => void
  updateSaveData: (data: T) => void
  setModalMode: (value: string) => void
  resetIsTariffOver: () => void
}

export const useModalStore = create<IState<unknown> & IAction<unknown>>(
  set => ({
    isOpen: false,
    modalMode: '',
    prevModalMode: '',
    isOpenConfirmModal: false,
    isStartAnimation: false,
    children: null,
    childrenConfirmModal: null,
    saveData: null,
    isNotesTypeConfirmModal: false,
    isTariffOver: false,
    confirmModalHandle: (): void => {},
    setConfirmModalHandle: (callback: () => void): void => {
      set({ confirmModalHandle: callback })
    },
    returnShowModal: (): void => {
      set({
        isOpen: true
      })
      setTimeout(
        () =>
          set({
            isStartAnimation: true
          }),
        300
      )
    },
    toggleShowModal: (
      value: boolean,
      data: unknown,
      mode: string = ''
    ): void => {
      if (value) {
        set({
          prevModalMode: useModalStore.getState().modalMode
        })
        set({
          isOpen: value,
          saveData: data,
          modalMode: mode
        })
        setTimeout(
          () =>
            set({
              isStartAnimation: value
            }),
          500
        )
      } else {
        set({
          isStartAnimation: value
        })
        setTimeout(() => {
          set({
            prevModalMode: useModalStore.getState().modalMode
          })
          set({
            isOpen: value,
            saveData: data,
            modalMode: mode
          })
        }, 500)
      }
    },
    updateSaveData: (data: unknown): void => {
      set({ saveData: data })
    },
    setModalMode: (value: string): void => {
      set({
        prevModalMode: useModalStore.getState().modalMode
      })
      set({ modalMode: value })
    },
    toggleShowConfirmModal: (
      value: boolean,
      modal: ReactNode | null,
      notes: boolean = false
    ): void => {
      set({
        isOpenConfirmModal: value,
        childrenConfirmModal: modal,
        isNotesTypeConfirmModal: notes
      })
    },
    resetIsTariffOver: (): void => {
      set({
        isTariffOver: false
      })
    }
  })
)
