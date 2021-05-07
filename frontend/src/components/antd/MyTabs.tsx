import { Tabs, TabsProps } from 'antd'
import React from 'react'

type Props = TabsProps & {
  children: React.ReactNode
}

const MyTabs = (props: Props) => {
  const { children, ...rest } = props

  return <Tabs {...rest}>{children}</Tabs>
}

export default MyTabs
