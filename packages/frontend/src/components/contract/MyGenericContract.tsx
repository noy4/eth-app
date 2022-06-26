import { FunctionFragment } from '@ethersproject/abi'
import { Card, Typography } from 'antd'
import { Account } from 'eth-components/ant'
import { useContractExistsAtAddress } from 'eth-hooks'
import { useEthersAppContext } from 'eth-hooks/context'
import { TEthersAdaptor } from 'eth-hooks/models'
import { BaseContract, ContractFunction } from 'ethers'
import { DisplayVariable } from './DisplayVariable'
import { FunctionForm } from './FunctionForm'

const { Text } = Typography

const isQueryable = (fn: FunctionFragment) =>
  (fn.stateMutability === 'view' || fn.stateMutability === 'pure') &&
  fn.inputs.length === 0

type TGenericContract<GContract> = {
  contractName: string
  contract?: GContract
  mainnetAdapter?: TEthersAdaptor
  blockExplorer: string
  tokenPrice?: number
}

export const MyGenericContract = <GContract extends BaseContract>(
  props: TGenericContract<GContract>
) => {
  const ethersAppContext = useEthersAppContext()
  const [isContractDeployed, updateIsContractDeployed] =
    useContractExistsAtAddress(props.contract)
  const contractFunctions = props.contract
    ? Object.values(props.contract.interface.functions)
    : []

  const contractContent = contractFunctions.map((fn, index) => {
    const contractFn: ContractFunction =
      fn.stateMutability === 'view' ||
      fn.stateMutability === 'pure' ||
      ethersAppContext.signer == null
        ? props.contract?.functions[fn.name]
        : props.contract?.connect(ethersAppContext.signer)?.[fn.name]

    if (isQueryable(fn)) {
      return (
        <DisplayVariable
          key={index}
          contractFunction={contractFn}
          functionInfo={fn}
        />
      )
    }

    return (
      <FunctionForm
        key={index}
        contractFunction={contractFn}
        functionFragment={fn}
      />
    )
  })

  return (
    <div style={{ margin: 'auto', width: '70vw' }}>
      <Card
        title={
          <>
            <Text style={{ fontSize: 24 }}>{props.contractName}</Text>
            <div style={{ float: 'right' }}>
              <Account
                ensProvider={props.mainnetAdapter?.provider}
                hasContextConnect={false}
                blockExplorer={props.blockExplorer}
                price={props.tokenPrice ?? 0}
                address={props.contract?.address}
                signer={props.contract?.signer}
              />
            </div>
          </>
        }
      >
        {isContractDeployed ? contractContent : 'Loading'}
      </Card>
    </div>
  )
}
