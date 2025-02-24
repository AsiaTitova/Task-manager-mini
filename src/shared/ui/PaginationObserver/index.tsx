import type { FC } from 'react'
import { useEffect, useRef } from 'react'

interface IProps {
  actionHandle: (nextPage: number) => void
  page: number
  options?: IntersectionObserverInit
}

const PaginationObserver: FC<IProps> = ({
  actionHandle,
  page,
  options = {}
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const observerElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observerElement = observerElementRef.current
    if (observerElement) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          actionHandle(page + 1)
        }
      }, options)
      observerRef.current.observe(observerElement)
    }

    return (): void => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [actionHandle, options])

  return <div className="observer" ref={observerElementRef} />
}

export default PaginationObserver
