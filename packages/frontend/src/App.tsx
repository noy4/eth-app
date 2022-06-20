import { PageHeader } from 'antd'
import { Account } from 'eth-components/ant'
import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks'
import { useDexEthPrice } from 'eth-hooks/dapps'
import { MAINNET_PROVIDER, TARGET_NETWORK_INFO } from './config/app.config'
import { useEthersAppContext } from 'eth-hooks/context'
import { useCreateLoginConnector, useWeb3ModalConfig } from './components/hooks'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (!ethersAppContext.active) {
      const connector = createLoginConnector()
      if (connector) ethersAppContext.activate(connector)
    }
  }, [])

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
    </div>
  )
}

export default App
