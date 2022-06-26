import { Col, Divider, Row } from 'antd'
import { ContractFunction } from 'ethers'
import { FunctionFragment } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import invariant from 'ts-invariant'
import { tryToDisplay } from './displayUtils'

export const DisplayVariable = (props: {
  contractFunction?: ContractFunction
  functionInfo: FunctionFragment
}) => {
  const [variable, setVariable] = useState('')
  const refresh = async () => {
    try {
      if (props.contractFunction) {
        const contractReturnValue = await props.contractFunction()
        setVariable(contractReturnValue)
      }
    } catch (e: any) {
      invariant.log(e?.message)
    }
  }

  useEffect(() => {
    refresh()
  }, [props.contractFunction])

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
          {props.functionInfo.name}
        </Col>
        <Col span={14}>{tryToDisplay(variable)}</Col>
        <Col onClick={refresh}>🔄</Col>
      </Row>
      <Divider />
    </>
  )
}
