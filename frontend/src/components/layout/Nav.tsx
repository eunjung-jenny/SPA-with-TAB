import { Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import MENU_CONFIGS from '../../config/menu'
import { TabContextType } from '../../contexts/tab-context'
import { AuthorizedUserType } from '../../contexts/user-context'
import { userCategory } from '../../utils/auth'
import { lastOfArr } from '../../utils/common'
import MyMenu from '../antd/MyMenu'

const { Item } = Menu

const Container = styled.div`
  &.nav {
  }
`

type Props = {
  user: AuthorizedUserType
  tabContext: TabContextType
  navStyle?: React.CSSProperties
  menuStyle?: React.CSSProperties
}

const Nav = (props: Props) => {
  const { user, tabContext, navStyle, menuStyle } = props

  return (
    <Container className="nav" style={navStyle}>
      <MyMenu
        selectedKeys={[lastOfArr(tabContext.tabs).info.menu]}
        mode="inline"
        style={menuStyle}
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
}

export default Nav
