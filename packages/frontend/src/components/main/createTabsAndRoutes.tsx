import { Menu } from 'antd'
import { ReactElement } from 'react'
import { Link, Route } from 'react-router-dom'

type TContractPage = {
  name: string
  content: JSX.Element
}

export type TContractPageList = {
  mainPage: TContractPage
  pages: TContractPage[]
}

const getPath = (n: string): string => {
  return n.replaceAll(' ', '-').toLowerCase()
}

export const createTabsAndRoutes = (
  pageList: TContractPageList,
  route: string,
  setRoute: (route: string) => void
): { tabMenu: ReactElement; routeContent: ReactElement } => {
  const tabMenu = (
    <Menu
      style={{
        textAlign: 'center',
      }}
      selectedKeys={[route]}
      mode="horizontal"
    >
      <Menu.Item key="/">
        <Link
          onClick={(): void => {
            setRoute('/')
          }}
          to="/"
        >
          {pageList.mainPage.name}
        </Link>
      </Menu.Item>
      {pageList.pages.map(({ name }) => (
        <Menu.Item key={name}>
          <Link
            onClick={(): void => {
              setRoute(getPath(name))
            }}
            to={getPath(name)}
          >
            {name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  const routeContent = (
    <>
      <Route key={'main'} path={'/'} element={pageList.mainPage.content} />
      {pageList.pages.map(({ name, content }) => (
        <Route key={name} path={'/' + getPath(name)} element={content} />
      ))}
    </>
  )

  return { tabMenu: tabMenu, routeContent }
}
