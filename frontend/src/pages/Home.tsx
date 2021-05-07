import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Nav from '../components/layout/Nav'
import { AuthorizedUserType } from '../contexts/user-context'

const Container = styled.div`
  &.home {
    display: flex;
    min-height: 100vh;
  }
`

type Props = {
  user: AuthorizedUserType
}

const Home: React.FC<Props> = (props: Props) => {
  const history = useHistory()

  const { user } = props

  React.useEffect(() => {
    history.push('/')
  }, [])

  return (
    <Container className="home">
      <Nav
        user={user}
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
