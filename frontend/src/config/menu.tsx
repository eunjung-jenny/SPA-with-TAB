import { UserCategoryType } from '../contexts/user-context'
import { MenuConfigType, MenuType } from '../types/menu'

const MENU_CONFIGS: Record<MenuType, MenuConfigType> = {
  [MenuType.MemberManagement]: {
    menuString: '회원관리',
    allowed: [UserCategoryType.Insider],
  },
  [MenuType.Board]: {
    menuString: '게시판',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
  },
  [MenuType.Article]: {
    menuString: '게시글',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    hidden: false,
  },
  [MenuType.Test]: {
    menuString: '테스트',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    hidden: false,
  },
  [MenuType.Happy]: {
    menuString: '행복하자',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    hidden: false,
  },
}

export default MENU_CONFIGS
