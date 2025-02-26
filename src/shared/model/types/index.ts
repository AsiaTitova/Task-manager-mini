export interface IOption {
  id: number
  title: string
}

export type ISort = 'asc' | 'desc'

export interface IPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}
