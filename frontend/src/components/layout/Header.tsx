import React from 'react'
import MyPageHeader from '../antd/MyPageHeader'

const Header: React.FC = () => (
  <MyPageHeader
    title="SPA-W-TABS"
    extra={['유저정보', '로그인/로그아웃']}
    style={{ backgroundColor: 'burlywood' }}
  />
)

export default Header
