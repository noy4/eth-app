import { Switch } from 'antd'
import { useEffect } from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'

export const ThemeSwitcher = () => {
  const { currentTheme, switcher } = useThemeSwitcher()

  const toggleTheme = (isChecked: boolean) => {
    switcher({ theme: isChecked ? 'dark' : 'light' })
    localStorage.setItem('theme', isChecked ? 'dark' : 'light')
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme) switcher({ theme })
  }, [])

  return (
    <div style={{ position: 'fixed', right: 10, bottom: 10 }}>
      <span style={{ padding: 8 }}>
        {currentTheme === 'light' ? '☀️' : '🌙'}
      </span>
      <Switch checked={currentTheme === 'dark'} onChange={toggleTheme} />
    </div>
  )
}
