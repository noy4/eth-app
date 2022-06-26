import { Greeter__factory } from '@/generated/typechain-types'
import { createConnectorForHardhatContract } from 'eth-hooks/context'
import hardhatContracts from '@/generated/hardhatContracts.json'
import invariant from 'ts-invariant'

export const contractConfig = () => {
  try {
    const result = {
      Greeter: createConnectorForHardhatContract(
        'Greeter',
        Greeter__factory,
        hardhatContracts
      ),
    } as const

    return result
  } catch (e) {
    invariant.error('Failed to load contracts', e)
  }
  return undefined
}

export type TAppConnectorList = NonNullable<ReturnType<typeof contractConfig>>
