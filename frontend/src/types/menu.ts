import { UserCategoryType } from '../contexts/user-context'

export enum MenuType {
  MemberManagement = 'MemberManagement',
  Board = 'Board',
  Article = 'Article',
}

export type MenuConfigType = {
  menuString: string
  allowed: UserCategoryType[]
  hidden?: boolean
  component: React.FC<any>
}
