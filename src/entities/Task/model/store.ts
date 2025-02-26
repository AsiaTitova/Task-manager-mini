import { create } from 'zustand'

import {
  fetchTasks,
  fetchCreateTask,
  fetchEditTask,
  fetchDeleteTask
} from '../api'

import type { ITask, ITaskData } from './types'

interface IState {
  tasks: ITask[]
  isEdit: boolean
}

interface IAction {
  setIsEdit: (value: boolean) => void
  getTasks: () => Promise<void>
  setTasks: (value: ITask[]) => void
  createTask: (body: ITaskData) => Promise<void>
  editTask: (id: number, body: ITaskData) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}

export const useTasksStore = create<IState & IAction>((set, getState) => ({
  tasks: [],
  isEdit: false,
  setIsEdit: (value: boolean): void => {
    set({ isEdit: value })
  },
  setTasks: (value: ITask[]): void => {
    set({ tasks: value })
  },
  getTasks: async (): Promise<void> => {
    const resp = await fetchTasks()
    const response = resp as never as ITask[]
    if (response) {
      set({
        tasks: response
      })
    }
  },
  createTask: async (body: ITaskData): Promise<void> => {
    try {
      const resp = await fetchCreateTask(body)
      const response = resp as never as ITask
      if (response) {
        const state = getState()
        set({
          tasks: [response].concat(state.tasks)
        })
      }
    } catch (error) {
      throw error
    }
  },
  editTask: async (id: number, body: ITaskData): Promise<void> => {
    try {
      const resp = await fetchEditTask(id, body)
      const response = resp as never as ITask
      if (response) {
        const state = getState()
        set({
          tasks: state.tasks.map(item => (item.id === id ? response : item))
        })
      }
    } catch (error) {
      throw error
    }
  },
  deleteTask: async (id: number): Promise<void> => {
    const resp = await fetchDeleteTask(id)
    const response = resp as never as boolean
    if (response) {
      const state = getState()
      set({
        tasks: state.tasks.filter(item => item.id !== id)
      })
    }
  }
}))
