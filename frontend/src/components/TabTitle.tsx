import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import TabModel from '../models/TabModel'
import MyButton from './antd/MyButton'

const Container = styled.div`
  &.tab-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

type Props = {
  tab: TabModel
  onClose: (id: string) => () => void
}

const TabTitle: React.FC<Props> = (props: Props) => {
  const { tab, onClose } = props
  return (
    <Container className="tab-title">
      <span>{tab.tabTitleString}</span>
      <MyButton
        icon={<CloseOutlined style={{ margin: 0 }} />}
        onClick={onClose(tab.info.id)}
        type="ghost"
        style={{ border: 'none', margin: 0, textAlign: 'end' }}
      />
    </Container>
  )
}

export default TabTitle
