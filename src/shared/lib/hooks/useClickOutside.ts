import type React from 'react'
import { useEffect } from 'react'

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !document
          .getElementById('ToastsWrapper')
          ?.contains(event.target as Node)
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, callback])
}
