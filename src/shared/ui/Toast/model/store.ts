import { create } from 'zustand'

import type { IToast } from './types'

interface IToastStore<T> {
  toasts: IToast<T>[]
  pushToast: (toast: IToast<T>) => void
  deleteToast: (id: number | string) => void
  reset: () => void
}

export const usePortalToastStore = create<IToastStore<unknown>>(set => ({
  toasts: [],
  pushToast: (toast): void => {
    set((state: IToastStore<unknown>) => {
      const arr = state.toasts
      return {
        toasts: [...arr, toast]
      }
    })
  },
  deleteToast: (id): void => {
    set(state => ({
      toasts: state.toasts.filter(item => item.id !== id)
    }))
  },
  reset: (): void => {
    set(() => ({
      toasts: []
    }))
  }
}))
