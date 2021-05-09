import React from 'react'
import styled from 'styled-components'
import TabModel from '../../models/TabModel'
import { MenuType } from '../../types/menu'
import ArticleTab from './ArticleTab'
import BoardTab from './BoardTab'
import MemberManagementTab from './MemberManagementTab'

const Container = styled.div`
  &.tab-content {
  }
`

type Props = {
  tab: TabModel
}

const TabContent: React.FC<Props> = (props: Props) => {
  const { tab } = props

  const [thisTab, setThisTab] = React.useState(tab)

  const [isActivated, setIsActivated] = React.useState(true)

  React.useEffect(() => {
    setIsActivated(window.location.pathname.substr(1) === thisTab.info.url)
  }, [window.location.pathname])

  if (!isActivated) return null

  console.log(`${thisTab.tabTitleString} 탭 컨텐츠 렌더링`)

  // TODO: 어디에 넣어야 하는지 고민
  const getContent = (menu: MenuType) => {
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
    <Container className="tab-content">
      {getContent(thisTab.info.menu)}
    </Container>
  )
}

export default TabContent
