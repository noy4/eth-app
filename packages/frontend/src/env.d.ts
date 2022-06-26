/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RPC_MAINNET: string
  readonly VITE_APP_TARGET_NETWORK: string
  readonly VITE_RPC_MAINNET_INFURA: string
  readonly VITE_KEY_BLOCKNATIVE_DAPPID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
