import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  &.tab-content {
  }
`

const TabContent: React.FC = () => {
  return <Container className="tab-content">탭 내용</Container>
}

export default TabContent
