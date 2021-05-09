import React from 'react'
import styled from 'styled-components'
import MENU_CONFIGS from '../../config/menu'
import TabContextModel from '../../models/TabContextModel'
import MyTabPane from '../antd/MyTabPane'
import MyTabs from '../antd/MyTabs'
import TabTitle from '../TabTitle'

type Props = {
  tabContext: TabContextModel
  style?: React.CSSProperties
}

const Container = styled.div`
  &.main {
    padding: 2px;
    background-color: #f8feff;
  }
`

const Main: React.FC<Props> = (props: Props) => {
  const { tabContext, style } = props
  const { tabs, tabHistory } = tabContext.info

  const handleTabClose = (id: string) => () => {
    tabContext.removeTab(id)
  }

  return (
    <Container className="main" style={style}>
      <MyTabs
        type="card"
        activeKey={tabHistory[tabHistory.length - 1]}
        onChange={(activeKey) => tabContext.setCurrentTab(activeKey)}
      >
        {tabs.map((tab) => {
          const Component = MENU_CONFIGS[tab.info.menu].component
          return (
            <MyTabPane
              tab={<TabTitle tab={tab} onClose={handleTabClose} />}
              key={tab.info.id}
            >
              <Component />
            </MyTabPane>
          )
        })}
      </MyTabs>
    </Container>
  )
}

export default Main
