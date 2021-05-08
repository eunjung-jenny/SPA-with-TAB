import { Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import MENU_CONFIGS from '../../config/menu'
import { AuthorizedUserType } from '../../contexts/user-context'
import TabContextModel from '../../models/TabContextModel'
import { MenuType } from '../../types/menu'
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
  tabContext: TabContextModel
  navStyle?: React.CSSProperties
  menuStyle?: React.CSSProperties
}

const Nav = (props: Props) => {
  const { user, tabContext, navStyle, menuStyle } = props

  const handleMenuClick = (menu: MenuType) => {
    tabContext.addTab(menu)
  }

  return (
    <Container className="nav" style={navStyle}>
      <MyMenu
        selectedKeys={[lastOfArr(tabContext.info.tabs)?.info.menu]}
        mode="inline"
        style={menuStyle}
        onClick={({ key }) => handleMenuClick(key as MenuType)}
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
