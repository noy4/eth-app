import { Button } from 'antd'
import { TGasStationSpeed, useGasPrice } from 'eth-hooks'
import { TNetworkInfo } from 'eth-hooks/models'

export const GasGauge = (props: {
  chainId?: number
  speed: TGasStationSpeed
  currentNetworkInfo: TNetworkInfo
}) => {
  const [gasPrice] = useGasPrice(
    props.chainId,
    props.speed,
    props.currentNetworkInfo
  )
  return (
    <Button
      size="large"
      shape="round"
      onClick={() => open('https://ethgasstation.info/')}
    >
      <span style={{ marginRight: 8 }}>⛽️</span>
      {gasPrice ?? '?'}
    </Button>
  )
}
