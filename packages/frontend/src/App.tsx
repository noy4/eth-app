import { PageHeader } from 'antd'
import { Account } from 'eth-components/ant'
import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks'
import { useDexEthPrice } from 'eth-hooks/dapps'
import { MAINNET_PROVIDER, TARGET_NETWORK_INFO } from './config/app.config'
import { useEthersAppContext } from 'eth-hooks/context'

function App() {
  const ethersAppContext = useEthersAppContext()
  const [mainnetAdaptor] =
    useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER)
  const [ethPrice] = useDexEthPrice(
    mainnetAdaptor?.provider,
    ethersAppContext.chainId !== 1 ? TARGET_NETWORK_INFO : undefined
  )

  return (
    <div>
      <PageHeader title="🏠 Eth App" subTitle="Let's rebuild scafold-eth" />
      <div
        style={{
          // position: 'fixed',
          // textAlign: 'right',
          // right: 0,
          // top: 0,
          // padding: 10,
          // zIndex: 1,
          height: 40,
        }}
      >
        <Account
          hasContextConnect={false}
          ensProvider={mainnetAdaptor?.provider}
          blockExplorer={TARGET_NETWORK_INFO.blockExplorer}
          price={ethPrice}
        />
      </div>
    </div>
  )
}

export default App
