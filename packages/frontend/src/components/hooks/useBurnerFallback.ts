import { LOCAL_PROVIDER } from '@/config'
import { NETWORKS } from '@/constants'
import {
  useBurnerSigner,
  useEthersAdaptorFromProviderOrSigners,
} from 'eth-hooks'
import { useEthersAppContext } from 'eth-hooks/context'
import { useEffect } from 'react'

export const useBurnerFallback = () => {
  const ethersAppContext = useEthersAppContext()
  const [localAdaptor] = useEthersAdaptorFromProviderOrSigners(LOCAL_PROVIDER)
  const burnerFallback = useBurnerSigner(localAdaptor?.provider)
  const localAddress = localAdaptor?.signer

  useEffect(() => {
    if (
      burnerFallback.signer &&
      burnerFallback.account !== ethersAppContext.account &&
      ethersAppContext.chainId === NETWORKS.localhost.chainId &&
      ethersAppContext.provider?.connection?.url === NETWORKS.localhost.url &&
      ethersAppContext.changeSigner &&
      localAddress != null
    ) {
      ethersAppContext.changeSigner(burnerFallback.signer)
    }
  }, [
    ethersAppContext.account,
    localAddress,
    ethersAppContext.changeSigner,
    burnerFallback.signer,
    burnerFallback.account,
  ])
}
