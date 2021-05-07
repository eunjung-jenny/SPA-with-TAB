import MENU_CONFIGS from '../config/menu'
import { MenuType } from '../types/menu'

export const getTabTitle = (menu: MenuType): string => {
  return MENU_CONFIGS[menu].menuString
}
