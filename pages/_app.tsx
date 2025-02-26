/* eslint-disable */
import 'src/_app/styles/index.scss'

import { ReactElement } from 'react'

import { AppProvider } from 'app/providers/AppProvider'
import type { AppProps } from 'next/app'
import { Header } from 'src/widgets'
import { ToastWrapper } from 'shared/ui'

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <AppProvider>
        <Header />
          <div className="Content">
            <Component {...pageProps} />
            <ToastWrapper />
          </div>
    </AppProvider>
  )
}

export default App
