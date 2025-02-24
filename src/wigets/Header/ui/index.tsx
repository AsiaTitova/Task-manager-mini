import type { FC } from 'react'

import { Logo } from 'shared/ui'

import module from './Header.module.scss'

export const Header: FC = () => {
  return (
    <header className={module.Header}>
      <div className={module.Header_wrap}>
        <div className={module.Header_logo}>
          <Logo />
        </div>
      </div>
    </header>
  )
}
