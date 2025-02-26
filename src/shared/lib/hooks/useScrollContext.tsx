import type { RefObject } from 'react'
import React, { createContext, useContext, useRef } from 'react'

const ScrollContext =
  createContext<React.RefObject<HTMLTableSectionElement> | null>(null)

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const listRef = useRef<HTMLTableSectionElement>(null)

  return (
    <ScrollContext.Provider value={listRef}>{children}</ScrollContext.Provider>
  )
}

export const useScrollContext = (): RefObject<HTMLTableSectionElement> => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider')
  }
  return context
}
