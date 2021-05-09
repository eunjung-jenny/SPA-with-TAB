import { Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import MENU_CONFIGS from '../../config/menu'
import { TabContextConsumer } from '../../contexts/tab-context'
import { AuthorizedUserType } from '../../contexts/user-context'
import { userCategory } from '../../utils/auth'
import MyMenu from '../antd/MyMenu'

const { Item } = Menu

const Container = styled.div`
  &.nav {
  }
`

type Props = {
  user: AuthorizedUserType
  navStyle?: React.CSSProperties
  menuStyle?: React.CSSProperties
}

const Nav = (props: Props) => {
  const { user, navStyle, menuStyle } = props

  return (
    <TabContextConsumer>
      {(context) => {
        return (
          <Container className="nav" style={navStyle}>
            <MyMenu
              selectedKeys={
                context.currentTab ? [context.currentTab.info.menu] : []
              }
              mode="inline"
              style={menuStyle}
              onClick={({ key }) => {
                context.addTab({ url: key as string })
              }}
            >
              {Object.entries(MENU_CONFIGS)
                .filter(([menu, menuConfig]) => {
                  return (
                    menuConfig.allowed.includes(userCategory(user)) &&
                    !menuConfig.hidden
                  )
                })
                .map(([menu, menuConfig]) => (
                  <Item key={menu}>{menuConfig.menuString}</Item>
                ))}
            </MyMenu>
          </Container>
        )
      }}
    </TabContextConsumer>
  )
}

export default Nav
