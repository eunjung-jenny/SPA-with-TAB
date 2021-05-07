import { AuthorizedUserType, UserType } from '../contexts/user-context'

export const loginCompleted = (user: UserType): user is AuthorizedUserType => {
  if (!user.authorized) return false
  if (!user.isInside && !user.passTwoFactor) return false
  return true
}
