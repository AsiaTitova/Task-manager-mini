/* eslint-disable */
import 'src/_app/styles/index.scss'

import { ReactElement } from 'react'

import { AppProvider } from 'app/providers/AppProvider'
import type { AppProps } from 'next/app'
import {Header} from "src/wigets";

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <AppProvider>
        <Header />
          <div className="Content">
            <Component {...pageProps} />
          </div>
    </AppProvider>
  )
}

export default App
