import React from 'react'

export enum LoginType {
  INSIDER = 'INSIDER',
  OUTSIDER_W_TF = 'OUTSIDER_W_TF',
  OUTSIDER_WO_TF = 'OUTSIDER_WO_TF',
}

export enum UserCategoryType {
  Insider = 'Insider',
  Outsider = 'Outsider',
}

export type UserContextType = {
  user: UserType
  login: (loginType: LoginType) => () => void
  logout: () => void
}

export type UserType = UnauthorizedUserType | AuthorizedUserType

export type UnauthorizedUserType = {
  authorized: false
}

export type AuthorizedUserType = {
  authorized: true
} & (InsideUserType | OutsideUserType)

export type InsideUserType = {
  isInside: true
}

export type OutsideUserType = {
  isInside: false
  passTwoFactor: boolean
}

export const initialUserContextValue: UserContextType = {
  user: { authorized: false },
  login: () => () => {},
  logout: () => {},
}

const UserContext = React.createContext<UserContextType>(
  initialUserContextValue,
)

export default UserContext
