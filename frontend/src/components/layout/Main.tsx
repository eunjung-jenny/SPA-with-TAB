import React from 'react'
import styled from 'styled-components'
import MENU_CONFIGS from '../../config/menu'
import { TabContextType } from '../../contexts/tab-context'
import { getTabTitle } from '../../utils/menu-tab'
import MyTabPane from '../antd/MyTabPane'
import MyTabs from '../antd/MyTabs'

type Props = {
  tabContext: TabContextType
  style?: React.CSSProperties
}

const Container = styled.div`
  &.main {
    padding: 2px;
    background-color: #f9f9e1;
  }
`

const Main: React.FC<Props> = (props: Props) => {
  const {
    tabContext: { tabs, tabHistory },
    style,
  } = props

  return (
    <Container className="main" style={style}>
      <MyTabs type="card" activeKey={tabHistory[tabHistory.length - 1]}>
        {tabs.map((tab) => {
          const Component = MENU_CONFIGS[tab.menu].component
          return (
            <MyTabPane tab={getTabTitle(tab.menu)} key={tab.id}>
              <Component />
            </MyTabPane>
          )
        })}
      </MyTabs>
    </Container>
  )
}

export default Main
