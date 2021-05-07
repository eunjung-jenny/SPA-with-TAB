import { Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import MyMenu from '../antd/MyMenu'

const { Item } = Menu

const Container = styled.div`
  &.nav {
  }
`

type Props = {
  navStyle?: React.CSSProperties
  menuStyle?: React.CSSProperties
}

const Nav = (props: Props) => {
  const { navStyle, menuStyle } = props

  return (
    <Container className="nav" style={navStyle}>
      <MyMenu
        defaultSelectedKeys={[]}
        defaultOpenKeys={[]}
        mode="inline"
        style={menuStyle}
      >
        <Item key="1">Option 1</Item>
        <Item key="2">Option 2</Item>
        <Item key="3">Option 3</Item>
      </MyMenu>
    </Container>
  )
}

export default Nav
