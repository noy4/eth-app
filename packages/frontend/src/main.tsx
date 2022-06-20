import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { EthersAppContext } from 'eth-hooks/context'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'

const themes = {
  dark: './ant-dark-theme.css',
  light: './ant-light-theme.css',
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EthersAppContext>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
        <App />
      </ThemeSwitcherProvider>
    </EthersAppContext>
  </React.StrictMode>
)
