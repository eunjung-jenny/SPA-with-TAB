import React from 'react'
import styled from 'styled-components'
import { TabContext, TabContextConsumer } from '../../contexts/tab-context'
import MyTabPane from '../antd/MyTabPane'
import MyTabs from '../antd/MyTabs'
import TabContent from '../tab-content/TabContent'
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

  const tabContextValue = React.useContext(TabContext)

  const handlePopState = (e: PopStateEvent) => {
    // TODO: 로그인까지 뒤로가기 하는 경우는?
    const url = window.location.pathname.substr(1)
    tabContextValue.handlePopState(url, e.state.state.idx)
  }

  React.useEffect(() => {
    window.addEventListener('popstate', handlePopState)
  }, [])

  return (
    <TabContextConsumer>
      {(context) => {
        return (
          <Container className="main" style={style}>
            <MyTabs
              type="card"
              activeKey={context.currentTab?.info.id}
              onChange={(activeKey) => context.handleTabTitleClick(activeKey)}
            >
              {context.tabs.map((tab) => {
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
                    <TabContent tab={tab} />
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
