import {
  AuthorizedUserType,
  UserCategoryType,
  UserType,
} from '../contexts/user-context'

export const loginCompleted = (user: UserType): user is AuthorizedUserType => {
  if (!user.authorized) return false
  if (!user.isInside && !user.passTwoFactor) return false
  return true
}

export const userCategory = (user: AuthorizedUserType): UserCategoryType => {
  if (user.isInside) return UserCategoryType.Insider
  return UserCategoryType.Outsider
}
