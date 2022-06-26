import { LOCAL_PROVIDER } from '@/config'
import { SendOutlined } from '@ant-design/icons'
import { parseEther } from '@ethersproject/units'
import { Button, Input, Tooltip } from 'antd'
import { Wallet } from 'eth-components/ant'
import { transactor } from 'eth-components/functions'
import { EthComponentsSettingsContext } from 'eth-components/models'
import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks'
import { utils } from 'ethers'
import { useContext, useState } from 'react'

export const Faucet = (props: {}) => {
  const ethComponentsSettings = useContext(EthComponentsSettingsContext)
  const [recipient, setRecipient] = useState('')
  const [localAdaptor] = useEthersAdaptorFromProviderOrSigners(LOCAL_PROVIDER)

  const onSubmit = () => {
    if (
      localAdaptor?.signer &&
      ethComponentsSettings &&
      utils.isAddress(recipient)
    ) {
      const tx = transactor(ethComponentsSettings, localAdaptor.signer)
      if (tx && recipient) {
        tx({ to: recipient, value: parseEther('0.1') })
      }
    }
  }

  return (
    <Input
      size="large"
      placeholder="local faucet"
      value={recipient}
      onChange={(e) => setRecipient(e.target.value)}
      suffix={
        <Tooltip title="Faucet: send local ether to an address!">
          <Button shape="circle" icon={<SendOutlined />} onClick={onSubmit} />
          {/* <Wallet/> */}
        </Tooltip>
      }
    />
  )
}
