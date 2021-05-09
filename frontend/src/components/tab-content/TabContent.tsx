import React from 'react'
import styled from 'styled-components'
import { TabContext, TabContextConsumer } from '../../contexts/tab-context'
import { MenuType } from '../../types/menu'
import ArticleTab from './ArticleTab'
import BoardTab from './BoardTab'
import MemberManagementTab from './MemberManagementTab'

const Container = styled.div`
  &.tab-content {
  }
`

const TabContent: React.FC = () => {
  const [path, setPath] = React.useState(
    React.useContext(TabContext).currentTab?.info.url ?? 'error',
  )
  const [isActivated, setIsActivated] = React.useState(true)

  React.useEffect(() => {
    setIsActivated(window.location.pathname.substr(1) === path)
  }, [window.location.pathname])

  if (!isActivated) return null

  // TODO: 어디에 넣어야 하는지 고민
  const getContent = (menu: MenuType | undefined) => {
    if (!menu) return null

    switch (menu) {
      case MenuType.MemberManagement: {
        return <MemberManagementTab />
      }
      case MenuType.Board: {
        return <BoardTab />
      }
      case MenuType.Article: {
        return <ArticleTab />
      }
      default: {
        return <div>error</div>
      }
    }
  }

  return (
    <TabContextConsumer>
      {(context) => (
        <Container className="tab-content">
          {getContent(context.currentTab?.info.menu)}
        </Container>
      )}
    </TabContextConsumer>
  )
}

export default TabContent
