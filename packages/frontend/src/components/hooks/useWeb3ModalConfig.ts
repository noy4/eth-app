import { getWeb3Config } from '@/config'
import { useEffect, useState } from 'react'
import invariant from 'ts-invariant'
import { ICoreOptions } from 'web3modal'

export const useWeb3ModalConfig = () => {
  const [web3Config, setWeb3Config] = useState<Partial<ICoreOptions>>()

  useEffect(() => {
    getWeb3Config()
      .then(setWeb3Config)
      .catch((e) => invariant.error('Failed to load web3modal config', e))
  }, [])

  return web3Config
}
