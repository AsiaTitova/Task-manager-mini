import dynamic from 'next/dynamic'
import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IProps {
  children: ReactNode
  target?: HTMLElement | null
}

const PortalComponent: FC<IProps> = ({ children, target }) => {
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setCurrentTarget(document.body)
  }, [target])

  if (!currentTarget) return null

  return createPortal(children, document.body)
}

export const Portal = dynamic(() => Promise.resolve(PortalComponent), {
  ssr: false
})
