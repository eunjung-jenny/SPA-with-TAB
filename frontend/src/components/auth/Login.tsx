import React from 'react'
import styled from 'styled-components'
import { LoginType, UserContextType } from '../../contexts/user-context'
import MyButton from '../antd/MyButton'

const Container = styled.ul`
  &.login {
    list-style: none;

    li {
      margin-top: 10px;
    }
  }
`

type Props = UserContextType

const Login: React.FC<Props> = (props: Props) => {
  const { login } = props

  return (
    <Container className="login">
      <li>
        <MyButton onClick={login(LoginType.INSIDER)}>내부자로 로그인</MyButton>
      </li>
      <li>
        <MyButton onClick={login(LoginType.OUTSIDER_WO_TF)}>
          외부자로 로그인 (two factor x)
        </MyButton>
      </li>
      <li>
        <MyButton onClick={login(LoginType.OUTSIDER_W_TF)}>
          외부자로 로그인 (two factor o)
        </MyButton>
      </li>
    </Container>
  )
}

export default Login
