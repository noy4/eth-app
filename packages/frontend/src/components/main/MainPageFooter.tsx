import { TARGET_NETWORK_INFO } from '@/config'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Row, Col, Button } from 'antd'
import { useEthersAppContext } from 'eth-hooks/context'
import { Faucet } from '../Faucet'
import { GasGauge } from '../GasGauge'
import { ThemeSwitcher } from '../ThemeSwitcher'

export const MainPageFooter = (props: { ethPrice: number }) => {
  const ethersAppContext = useEthersAppContext()

  return (
    <div>
      <div style={{ position: 'fixed', left: 0, bottom: 20, padding: 10 }}>
        <Row gutter={4}>
          <Col>
            <Button size="large" shape="round">
              ETH: <DollarCircleOutlined />
              {props.ethPrice.toFixed(2)}
            </Button>
          </Col>
          <Col>
            <GasGauge
              chainId={TARGET_NETWORK_INFO.chainId}
              currentNetworkInfo={TARGET_NETWORK_INFO}
              speed="average"
            />
          </Col>
        </Row>
        <Faucet />
      </div>
      <ThemeSwitcher />
    </div>
  )
}
