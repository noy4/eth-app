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

  return {
    cacheProvider: true,
    theme: 'light',
    providerOptions,
  }
}
