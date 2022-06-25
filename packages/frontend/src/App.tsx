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
import { createTabsAndRoutes, TContractPageList } from './components/main'
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
        // <>a</>
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
      <PageHeader title="🏠 Eth App" subTitle="Let's rebuild scafold-eth" />
      <div
        style={{
          position: 'fixed',
          textAlign: 'right',
          right: 0,
          top: 0,
          padding: 10,
          zIndex: 1,
        }}
      >
        <Account
          ensProvider={mainnetAdaptor?.provider}
          createLoginConnector={createLoginConnector}
          hasContextConnect
          blockExplorer={TARGET_NETWORK_INFO.blockExplorer}
          price={ethPrice}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 16,
          top: 84,
          padding: 10,
          color: TARGET_NETWORK_INFO.color,
        }}
      >
        {TARGET_NETWORK_INFO.name}
      </div>

      {tabMenu}
      <Routes>{tabContents}</Routes>
    </div>
  )
}

export default App
