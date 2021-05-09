import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  &.tab-content {
  }
`

type Props = {
  children: React.ReactNode
}

const TabContent: React.FC<Props> = (props: Props) => {
  const { children } = props

  return <Container className="tab-content">{children}</Container>
}

export default TabContent
