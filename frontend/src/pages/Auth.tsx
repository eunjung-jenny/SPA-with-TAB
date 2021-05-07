import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import MyButton from '../components/antd/MyButton'
import UserContext from '../contexts/user-context'

const Container = styled.div`
  ul {
    list-style: none;
    margin-top: 20px;
    li {
      margin-top: 10px;
    }
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
          <ul>
            <li>
              <MyButton onClick={context.login('INSIDER')}>
                내부자로 로그인
              </MyButton>
            </li>
            <li>
              <MyButton onClick={context.login('OUTSIDER_WO_TF')}>
                외부자로 로그인 (two factor x)
              </MyButton>
            </li>
            <li>
              <MyButton onClick={context.login('OUTSIDER_W_TF')}>
                외부자로 로그인 (two factor o)
              </MyButton>
            </li>
          </ul>
        </Container>
      )}
    </UserContext.Consumer>
  )
}

export default Auth
