import { FunctionFragment } from '@ethersproject/abi'
import { Row, Col } from 'antd'
import { ContractFunction } from 'ethers'

export const FunctionForm = (props: {
  contractFunction: ContractFunction
  functionFragment: FunctionFragment
}) => {
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
        <Col span={16}></Col>
      </Row>
    </>
  )
}
