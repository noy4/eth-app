import { NETWORKS } from '@/constants'
import { ICoreOptions, IProviderOptions } from 'web3modal'

export const getWeb3Config = async (): Promise<Partial<ICoreOptions>> => {
  const providerOptions: IProviderOptions = {}
  const infuraId = import.meta.env.VITE_RPC_MAINNET_INFURA

  try {
    const WalletConnectProvider = (
      await import('@walletconnect/ethereum-provider')
    ).default
    const walletConnectEthereum = {
      package: WalletConnectProvider,
      options: {
        infuraId,
      },
    }
    providerOptions['walletconnect'] = walletConnectEthereum
  } catch (error) {
    console.log('Failed to load Wallet Connect:', error)
  }

  try {
    const { ConnectToStaticJsonRpcProvider } = await import('eth-hooks/context')
    const { StaticJsonRpcProvider } = await import('@ethersproject/providers')
    const localhostStaticConnector = {
      display: {
        logo: 'https://avatars.githubusercontent.com/u/56928858?s=200&v=4',
        name: 'BurnerWallet',
        description: '🔥 Connect to localhost with a burner wallet 🔥',
      },
      package: StaticJsonRpcProvider,
      connector: ConnectToStaticJsonRpcProvider,
      options: {
        chainId: NETWORKS.localhost.chainId,
        rpc: {
          [NETWORKS.localhost.chainId]: NETWORKS.localhost.url,
        },
      },
    }
    providerOptions['custom-localhost'] = localhostStaticConnector
  } catch (e) {
    console.log('Failed to load burner wallet:', e)
  }

  return {
    cacheProvider: true,
    theme: 'light',
    providerOptions,
  }
}
