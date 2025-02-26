import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

import { ErrorsCode } from '../model'

import { BASE_URL_API } from './index'

type IMethod = 'get' | 'post' | 'put' | 'delete'

export const $api = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    Accept: 'application/json',
    ['Access-Control-Allow-Origin']: '*',
    ['Content-Type']: 'application/json'
  }
})

export const fetchGet = (route: string): Promise<AxiosResponse<void>> => {
  return fetchData(route, 'get')
}

export const fetchDelete = (route: string): Promise<AxiosResponse<void>> => {
  return fetchData(route, 'delete')
}

export const fetchPost = <T>(
  route: string,
  data: T
): Promise<AxiosResponse<void>> => {
  return fetchData(route, 'post', data)
}

export const fetchPut = <T>(
  route: string,
  data: T
): Promise<AxiosResponse<void>> => {
  return fetchData(route, 'put', data)
}

const fetchData = async <T, U>(
  route: string,
  method: IMethod,
  data?: T,
  params?: U
): Promise<AxiosResponse<void>> => {
  const requestConfig = {
    method,
    url: route,
    data,
    params
  }

  try {
    return await $api(requestConfig)
  } catch (error) {
    const axiosError = error as AxiosError<void>

    if (axiosError.response) {
      if (axiosError.response.status === ErrorsCode.SERVER) {
        return handle500Error(axiosError)
      }
      if (
        axiosError.response.status === ErrorsCode.ERROR_VALIDATION ||
        axiosError.response.status === ErrorsCode.FORBIDDEN ||
        axiosError.response.status === ErrorsCode.NOT_FOUND ||
        axiosError.response.status === ErrorsCode.BAD_REQUEST
      ) {
        return handle422Error(axiosError)
      }
    }

    throw error
  }
}

const handle422Error = async (
  error: AxiosError<void>
): Promise<AxiosResponse<void>> => {
  if (
    error.response &&
    (error.response.status === ErrorsCode.ERROR_VALIDATION ||
      error.response.status === ErrorsCode.BAD_REQUEST ||
      error.response.status === ErrorsCode.FORBIDDEN ||
      error.response.status === ErrorsCode.NOT_FOUND)
  ) {
    throw error.response
  }
  throw error
}

const handle500Error = async (
  error: AxiosError<void>
): Promise<AxiosResponse<void>> => {
  if (error.response && error.response.status === ErrorsCode.SERVER) {
    throw error
  }
  throw error
}
