import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Login from '../components/auth/Login'
import TwoFactor from '../components/auth/TwoFactor'
import UserContext from '../contexts/user-context'

const Container = styled.div`
  &.auth {
    padding: 20px;
  }
`

const Auth: React.FC = () => {
  const history = useHistory()

  useEffect(() => {
    history.push('/login')
  }, [])

  return (
    <UserContext.Consumer>
      {(context) => (
        <Container className="auth">
          {context.user.authorized ? (
            <TwoFactor {...context} />
          ) : (
            <Login {...context} />
          )}
        </Container>
      )}
    </UserContext.Consumer>
  )
}

export default Auth
