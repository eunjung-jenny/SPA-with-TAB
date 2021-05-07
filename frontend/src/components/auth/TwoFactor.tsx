import React from 'react'
import { LoginType, UserContextType } from '../../contexts/user-context'
import MyButton from '../antd/MyButton'

type Props = UserContextType

const TwoFactor: React.FC<Props> = (props: Props) => {
  const { login } = props

  return (
    <MyButton onClick={login(LoginType.OUTSIDER_W_TF)}>
      Two Factor 인증 완료
    </MyButton>
  )
}

export default TwoFactor
