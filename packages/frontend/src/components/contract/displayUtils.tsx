import { TransactionResponse } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'

export const tryToDisplay = (
  thing?:
    | string
    | number
    | BigNumber
    | Record<string, any>
    | TransactionResponse
) => {
  if (thing == null) return

  let content = thing
  if (
    Array.isArray(content) &&
    content.length === 1 &&
    (typeof content[0] === 'string' ||
      typeof content[0] === 'number' ||
      BigNumber.isBigNumber(content[0]))
  ) {
    content = content[0]
  }

  if (BigNumber.isBigNumber(content)) {
    try {
      return content.toNumber()
    } catch (e) {
      return '≒' + formatEther(content)
    }
    // }else if(typeof content ==='string'&&content.indexOf('0x')===0&&content.length===42){
    //   return <Address address={content}/>
  } else {
    return JSON.stringify(content)
  }
}
