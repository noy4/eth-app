import { TARGET_NETWORK_INFO } from '@/config'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { notification, PageHeader } from 'antd'
import { Account } from 'eth-components/ant'
import { TCreateEthersModalConnector } from 'eth-hooks/models'
import { FaucetHintButton } from '@/components'

export const MainPageHeader = ({
  ethPrice,
  provider,
  createLoginConnector,
}: {
  ethPrice: number
  provider?: StaticJsonRpcProvider
  createLoginConnector: TCreateEthersModalConnector
}) => {
  const onLoginError = () => {
    notification.info({ message: 'hey', description: 'yo' })
  }

  return (
    <>
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
          ensProvider={provider}
          createLoginConnector={createLoginConnector}
          loginOnError={onLoginError}
          hasContextConnect
          blockExplorer={TARGET_NETWORK_INFO.blockExplorer}
          price={ethPrice}
        />
        <FaucetHintButton />
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
    </>
  )
}
