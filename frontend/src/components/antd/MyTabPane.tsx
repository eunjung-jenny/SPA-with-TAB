import { TabPaneProps, Tabs } from 'antd'
import React from 'react'

type Props = TabPaneProps & {
  children: React.ReactNode
}

const MyTabs = (props: Props) => {
  const { children, ...rest } = props

  return <Tabs.TabPane {...rest}>{children}</Tabs.TabPane>
}

export default MyTabs
