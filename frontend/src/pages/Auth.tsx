import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import MyButton from '../components/antd/MyButton'

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
    <Container className="auth">
      <ul>
        <li>
          <MyButton>내부자로 로그인</MyButton>
        </li>
        <li>
          <MyButton>외부자로 로그인 (two factor x)</MyButton>
        </li>
        <li>
          <MyButton>외부자로 로그인 (two factor o)</MyButton>
        </li>
      </ul>
    </Container>
  )
}

export default Auth
