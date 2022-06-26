import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { TNetworkInfo } from 'eth-hooks/models'
import { TNetworkNames } from '@/models'
import { NETWORKS } from '@/constants'

const targetNetwork: TNetworkNames = import.meta.env
  .VITE_APP_TARGET_NETWORK as TNetworkNames
export const TARGET_NETWORK_INFO: TNetworkInfo = NETWORKS[targetNetwork]

export const MAINNET_PROVIDER = new StaticJsonRpcProvider(
  import.meta.env.VITE_RPC_MAINNET
)
export const LOCAL_PROVIDER = new StaticJsonRpcProvider(NETWORKS.localhost.url)
