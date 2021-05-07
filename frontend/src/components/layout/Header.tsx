import React from 'react'
import { UserContextType } from '../../contexts/user-context'
import { loginCompleted } from '../../utils/auth'
import MyButton from '../antd/MyButton'
import MyPageHeader from '../antd/MyPageHeader'

type Props = UserContextType

const Header: React.FC<Props> = (props: Props) => {
  const { user, logout } = props
  const userInfo = () => {
    if (!loginCompleted(user)) return ''
    if (user.isInside) return '내부자'
    return '외부자'
  }

  const userAction = loginCompleted(user) ? (
    <MyButton style={{ marginLeft: '10px' }} onClick={logout}>
      로그아웃
    </MyButton>
  ) : (
    '로그인이 필요합니다'
  )

  return (
    <MyPageHeader
      title="SPA-W-TABS"
      extra={[userInfo(), userAction]}
      style={{ backgroundColor: 'burlywood' }}
    />
  )
}

export default Header
