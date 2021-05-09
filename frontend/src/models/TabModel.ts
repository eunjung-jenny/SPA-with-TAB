import { v4 as uuid } from 'uuid'
import MENU_CONFIGS from '../config/menu'
import { MenuType } from '../types/menu'

export type TabModelParams = {
  menu: MenuType
} & Partial<Omit<TabModelType, 'menu'>>

export type TabModelType = {
  id: string
  menu: MenuType
  url: string
  isEditing?: boolean
  error?: boolean
}

export default class TabModel {
  private data: TabModelType

  constructor(params: TabModelParams) {
    this.data = {
      id: params.id ?? uuid(),
      menu: params.menu,
      url: params.url ?? params.menu,
      isEditing: params.isEditing ?? false,
      error: params.error ?? false,
    }
  }

  get info(): TabModelType {
    return this.data
  }

  get tabTitleString(): string {
    return MENU_CONFIGS[this.data.menu].menuString
  }

  updateTab(params: Partial<Omit<TabModelType, 'id' | 'menu'>>): void {
    this.data = { ...this.data, ...params }
  }
}
