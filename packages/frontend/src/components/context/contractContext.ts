import { contractConfig, TAppConnectorList } from '@/config'
import { contractsContextFactory } from 'eth-hooks/context'
import { TTypedContract } from 'eth-hooks/models'

export const {
  ContractsAppContext,
  useAppContractsActions,
  useAppContracts,
  useLoadAppContracts,
  useConnectAppContracts,
} = contractsContextFactory<
  keyof TAppConnectorList,
  TAppConnectorList,
  TTypedContract<keyof TAppConnectorList, TAppConnectorList>
>(contractConfig)
