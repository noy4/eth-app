import { LOCAL_PROVIDER } from '@/config'
import { parseEther } from '@ethersproject/units'
import { Button } from 'antd'
import { transactor } from 'eth-components/functions'
import { EthComponentsSettingsContext } from 'eth-components/models'
import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks'
import { useEthersAppContext } from 'eth-hooks/context'
import { useContext, useState } from 'react'

export const FaucetHintButton = () => {
  const ethComponentSettings = useContext(EthComponentsSettingsContext)
  const ethersAppContext = useEthersAppContext()
  const [localAdaptor] = useEthersAdaptorFromProviderOrSigners(LOCAL_PROVIDER)

  const [faucetClicked, setFaucetClicked] = useState(false)

  const faucetTx = transactor(
    ethComponentSettings,
    localAdaptor?.signer,
    undefined,
    undefined,
    true
  )

  return (
    <>
      <div style={{ paddingTop: 10, paddingLeft: 10 }}>
        <Button
          type="primary"
          onClick={(): void => {
            if (faucetTx && ethersAppContext?.account != null) {
              faucetTx({
                to: ethersAppContext?.account,
                value: parseEther('0.01').toHexString(),
              })
                .then(() => setFaucetClicked(true))
                .catch(() => setFaucetClicked(false))
            }
          }}
        >
          💰 Grab funds from the faucet ⛽️
        </Button>
      </div>
    </>
  )
}
