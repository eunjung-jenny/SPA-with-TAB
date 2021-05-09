import { UserCategoryType } from '../contexts/user-context'

export enum MenuType {
  MemberManagement = 'MemberManagement',
  Board = 'Board',
  Article = 'Article',
  Test = 'Text',
  Happy = 'Happy',
}

export type MenuConfigType = {
  menuString: string
  allowed: UserCategoryType[]
  hidden?: boolean
}
