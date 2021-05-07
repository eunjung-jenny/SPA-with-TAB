import TabContent from '../components/tab-content/TabContent'
import { UserCategoryType } from '../contexts/user-context'
import { MenuConfigType, MenuType } from '../types/menu'

const MENU_CONFIGS: Record<MenuType, MenuConfigType> = {
  [MenuType.MemberManagement]: {
    menuString: '회원관리',
    allowed: [UserCategoryType.Insider],
    component: TabContent,
  },
  [MenuType.Board]: {
    menuString: '게시판',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    component: TabContent,
  },
  [MenuType.Article]: {
    menuString: '게시글',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    hidden: true,
    component: TabContent,
  },
}

export default MENU_CONFIGS
