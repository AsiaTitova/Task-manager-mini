import { fetchDelete, fetchGet, fetchPost, fetchPut } from 'shared/api'

import type { ITaskData } from '../model'

export const fetchTasks = async (): Promise<void> => {
  const response = await fetchGet('/tasks')
  return response.data
}

export const fetchCreateTask = async (body: ITaskData): Promise<void> => {
  try {
    const response = await fetchPost('/tasks', body)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchEditTask = async (
  id: number,
  body: ITaskData
): Promise<void> => {
  try {
    const response = await fetchPut(`/tasks/${id}`, body)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchDeleteTask = async (id: number): Promise<void> => {
  try {
    const response = await fetchDelete(`/tasks/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
