import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { EthersAppContext } from 'eth-hooks/context'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { BrowserRouter } from 'react-router-dom'
import { ContractsAppContext } from './components/context'
import {
  EthComponentsSettingsContext,
  IEthComponentsSettings,
} from 'eth-components/models'

const ethComponentsSettings: IEthComponentsSettings = {
  apiKeys: {
    BlocknativeDappId: import.meta.env.VITE_KEY_BLOCKNATIVE_DAPPID,
  },
}

const themes = {
  dark: './ant-dark-theme.css',
  light: './ant-light-theme.css',
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EthComponentsSettingsContext.Provider value={ethComponentsSettings}>
      <ContractsAppContext>
        <EthersAppContext>
          <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeSwitcherProvider>
        </EthersAppContext>
      </ContractsAppContext>
    </EthComponentsSettingsContext.Provider>
  </React.StrictMode>
)
