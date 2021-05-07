import React from 'react'
import styled from 'styled-components'
import { TabContextType } from '../../contexts/tab-context'

type Props = {
  tabContext: TabContextType
  style?: React.CSSProperties
}

const Container = styled.div`
  &.main {
    padding: 10px;
    background-color: #f9f9e1;
  }
`

const Main: React.FC<Props> = (props: Props) => {
  const { tabContext, style } = props

  return (
    <Container className="main" style={style}>
      메인
    </Container>
  )
}

export default Main
