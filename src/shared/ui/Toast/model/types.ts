export interface IToast<T> {
  id: number | string
  data: T | null
  label: string
  cancelLabel?: string
  cancelHandle?: () => void
  successHandle?: () => void
}
