import React from 'react'
import styled from 'styled-components'
import Nav from '../components/layout/Nav'

const Container = styled.div`
  &.home {
    display: flex;
    min-height: 100vh;
  }
`

const Home: React.FC = () => {
  return (
    <Container className="home">
      <Nav
        navStyle={{ maxWidth: '250px' }}
        menuStyle={{ minHeight: '100vh' }}
      />
      <div
        style={{ width: '100%', padding: '10px', backgroundColor: '#f9f9e1' }}
      >
        화면
      </div>
    </Container>
  )
}

export default Home
