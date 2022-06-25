import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { EthersAppContext } from 'eth-hooks/context'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { BrowserRouter } from 'react-router-dom'
import { ContractsAppContext } from './components/context'

const themes = {
  dark: './ant-dark-theme.css',
  light: './ant-light-theme.css',
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContractsAppContext>
      <EthersAppContext>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeSwitcherProvider>
      </EthersAppContext>
    </ContractsAppContext>
  </React.StrictMode>
)
