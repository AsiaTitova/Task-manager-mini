import type { SetState } from 'zustand'
import { create } from 'zustand'

interface TableState {
  isTablePaginationLoader: boolean
  setIsTablePaginationLoader: (value: boolean) => void
}

export const useTableStore = create<TableState>(
  (set: SetState<TableState>) => ({
    isTablePaginationLoader: false,
    setIsTablePaginationLoader: (value: boolean): void => {
      set({ isTablePaginationLoader: value })
    }
  })
)
