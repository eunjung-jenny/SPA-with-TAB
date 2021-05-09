import ArticleTab from '../components/tab-content/ArticleTab'
import BoardTab from '../components/tab-content/BoardTab'
import MemberManagementTab from '../components/tab-content/MemberManagementTab'
import { UserCategoryType } from '../contexts/user-context'
import { MenuConfigType, MenuType } from '../types/menu'

const MENU_CONFIGS: Record<MenuType, MenuConfigType> = {
  [MenuType.MemberManagement]: {
    menuString: '회원관리',
    allowed: [UserCategoryType.Insider],
    component: MemberManagementTab,
  },
  [MenuType.Board]: {
    menuString: '게시판',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    component: BoardTab,
  },
  [MenuType.Article]: {
    menuString: '게시글',
    allowed: [UserCategoryType.Insider, UserCategoryType.Outsider],
    hidden: true,
    component: ArticleTab,
  },
}

export default MENU_CONFIGS
