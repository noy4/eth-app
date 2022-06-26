import { FunctionFragment } from '@ethersproject/abi'
import { Row, Col, Divider, Input, Button } from 'antd'
import { transactor } from 'eth-components/functions'
import { EthComponentsSettingsContext } from 'eth-components/models'
import { useEthersAppContext } from 'eth-hooks/context'
import { ContractFunction, utils } from 'ethers'
import { useContext, useState } from 'react'
import { tryToDisplay } from './displayUtils'

const getFunctionInputKey = (
  functionFragment: FunctionFragment,
  input: utils.ParamType,
  inputIndex: number
) => {
  const name = input.name ? input.name : `input_${inputIndex}`
  return functionFragment.name + '_' + name + '_' + input.type
}

export const FunctionForm = (props: {
  contractFunction: ContractFunction
  functionFragment: FunctionFragment
}) => {
  const ethComponentsSettings = useContext(EthComponentsSettingsContext)
  const ethersAppContext = useEthersAppContext()
  const [form, setForm] = useState<Record<string, any>>({})
  const [txRes, setTxRes] = useState<any>()
  const inputs = props.functionFragment.inputs.map((input, inputIndex) => {
    const key = getFunctionInputKey(props.functionFragment, input, inputIndex)

    return (
      <div key={key} style={{ margin: 2 }}>
        <Input
          size="large"
          placeholder={input.type + ' ' + input.name}
          value={form[key]}
          name={key}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }}
        />
      </div>
    )
  })

  const onSubmit = async () => {
    const args = props.functionFragment.inputs.map((input, inputIndex) => {
      const key = getFunctionInputKey(props.functionFragment, input, inputIndex)
      return form[key]
    })

    let _txRes
    const tx = transactor(ethComponentsSettings, ethersAppContext.signer)
    if (tx && ethersAppContext.chainId != null) {
      const __txRes = await tx(props.contractFunction(...args))
      _txRes = tryToDisplay(__txRes)
    }

    setTxRes(_txRes)
  }

  inputs.push(
    <Input
      value={txRes}
      disabled
      bordered={false}
      suffix={<Button onClick={onSubmit}>Send</Button>}
    />
  )

  return (
    <>
      <Row>
        <Col
          span={8}
          style={{
            textAlign: 'right',
            opacity: 0.3,
            paddingRight: 6,
            fontSize: 24,
          }}
        >
          {props.functionFragment.name}
        </Col>
        <Col span={16}>{inputs}</Col>
      </Row>
      <Divider />
    </>
  )
}
