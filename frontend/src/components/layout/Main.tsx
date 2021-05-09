import React from 'react'
import styled from 'styled-components'
import MENU_CONFIGS from '../../config/menu'
import { TabContextConsumer } from '../../contexts/tab-context'
import MyTabPane from '../antd/MyTabPane'
import MyTabs from '../antd/MyTabs'
import TabTitle from '../TabTitle'

type Props = {
  style?: React.CSSProperties
}

const Container = styled.div`
  &.main {
    padding: 2px;
    background-color: #f8feff;
  }
`

const Main: React.FC<Props> = (props: Props) => {
  const { style } = props

  return (
    <TabContextConsumer>
      {(context) => {
        return (
          <Container className="main" style={style}>
            <MyTabs
              type="card"
              activeKey={context.currentTab?.info.id}
              onChange={(activeKey) => context.activateTab(activeKey)}
            >
              {context.tabs.map((tab) => {
                const Component = MENU_CONFIGS[tab.info.menu].component
                return (
                  <MyTabPane
                    tab={
                      <TabTitle
                        tab={tab}
                        onClose={(id: string) => context.removeTab(id)}
                      />
                    }
                    key={tab.info.id}
                  >
                    <Component />
                  </MyTabPane>
                )
              })}
            </MyTabs>
          </Container>
        )
      }}
    </TabContextConsumer>
  )
}

export default Main
