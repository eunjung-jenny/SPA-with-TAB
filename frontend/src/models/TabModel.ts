import { v4 as uuid } from 'uuid'
import { MenuType } from '../types/menu'

export type TabModelType = {
  id: string
  menu: MenuType
  url: string
  isEditing?: boolean
  error?: boolean
}

export default class TabModel {
  public readonly data: TabModelType

  constructor(menu: MenuType) {
    this.data = {
      id: uuid(),
      menu,
      url: menu,
      isEditing: false,
      error: false,
    }
  }
}
