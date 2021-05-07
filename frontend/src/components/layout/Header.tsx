import React from 'react'
import { UserContextType } from '../../contexts/user-context'
import MyPageHeader from '../antd/MyPageHeader'

type Props = UserContextType

const Header: React.FC<Props> = (props: Props) => {
  const { user } = props
  const userInfo = () => {
    if (!user.authorized) return ''
    if (user.isInside) return '내부자'
    return '외부자'
  }

  const userAction = user.authorized ? '로그아웃' : '로그인이 필요합니다'

  return (
    <MyPageHeader
      title="SPA-W-TABS"
      extra={[userInfo(), userAction]}
      style={{ backgroundColor: 'burlywood' }}
    />
  )
}

export default Header
