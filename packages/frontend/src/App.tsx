import { PageHeader } from 'antd'
import { Account, GenericContract } from 'eth-components/ant'
import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks'
import { useEthersAppContext } from 'eth-hooks/context'
import { useDexEthPrice } from 'eth-hooks/dapps'
import { asEthersAdaptor } from 'eth-hooks/functions'
import { useEffect, useState } from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Routes } from 'react-router-dom'
import {
  useAppContracts,
  useConnectAppContracts,
  useLoadAppContracts,
} from './components/context'
import { useCreateLoginConnector, useWeb3ModalConfig } from './components/hooks'
import {
  createTabsAndRoutes,
  MainPageHeader,
  TContractPageList,
} from './components/main'
import { MAINNET_PROVIDER, TARGET_NETWORK_INFO } from './config/app.config'

function App() {
  const ethersAppContext = useEthersAppContext()
  const [mainnetAdaptor] =
    useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER)
  const [ethPrice] = useDexEthPrice(
    mainnetAdaptor?.provider,
    ethersAppContext.chainId !== 1 ? TARGET_NETWORK_INFO : undefined
  )
  const web3Config = useWeb3ModalConfig()
  const { currentTheme } = useThemeSwitcher()
  const createLoginConnector = useCreateLoginConnector(web3Config, currentTheme)

  const [route, setRoute] = useState('')

  useEffect(() => {
    if (!ethersAppContext.active) {
      const connector = createLoginConnector()
      if (connector) ethersAppContext.activate(connector)
    }
  }, [])

  useLoadAppContracts()
  useConnectAppContracts(asEthersAdaptor(ethersAppContext))
  const greeter = useAppContracts('Greeter', ethersAppContext.chainId)

  const pageList: TContractPageList = {
    mainPage: {
      name: 'Greeter',
      content: (
        <GenericContract
          contractName="Greeter"
          contract={greeter}
          mainnetAdaptor={mainnetAdaptor}
          blockExplorer={TARGET_NETWORK_INFO.blockExplorer}
        />
      ),
    },
    pages: [],
  }
  const { routeContent: tabContents, tabMenu } = createTabsAndRoutes(
    pageList,
    route,
    setRoute
  )

  return (
    <div>
      <MainPageHeader
        ethPrice={ethPrice}
        provider={mainnetAdaptor?.provider}
        createLoginConnector={createLoginConnector}
      />

      {tabMenu}
      <Routes>{tabContents}</Routes>
    </div>
  )
}

export default App
