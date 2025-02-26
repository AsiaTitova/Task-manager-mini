import type { FC } from 'react'

import { Tasks } from 'src/widgets'

export const Main: FC = () => {
  return (
    <>
      <h1 className="visually-hidden">Список задач</h1>
      <Tasks />
    </>
  )
}
