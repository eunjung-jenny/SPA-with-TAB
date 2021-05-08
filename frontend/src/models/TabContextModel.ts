import { MenuType } from '../types/menu'
import { lastOfArr } from '../utils/common'
import TabModel from './TabModel'

type TabContextModelType = {
  tabs: TabModel[]
  setTabs: React.Dispatch<React.SetStateAction<TabModel[]>>
  tabHistory: string[]
  setTabHistory: React.Dispatch<React.SetStateAction<string[]>>
}

export default class TabContextModel {
  private data: TabContextModelType

  constructor(params: TabContextModelType) {
    this.data = { ...params }
  }

  get info(): TabContextModelType {
    return this.data
  }

  get getCurrentTab(): TabModel {
    const {
      data: { tabs },
    } = this
    return tabs[tabs.length - 1]
  }

  addTab(menu: MenuType): void {
    // TODO: 예외 - 존재하지 않는 메뉴
    const newTab = new TabModel(menu)
    this.updateTabs([...this.data.tabs, newTab])
    this.updateTabHistory(newTab.info.id)
  }

  removeTab(id: string): void {
    // TODO: 예외 - 없는 id
    this.updateTabs(this.data.tabs.filter((tab) => tab.info.id !== id))
  }

  setCurrentTab(id: string): void {
    // TODO: 예외 - 없는 id
    if (lastOfArr(this.data.tabHistory) !== id) {
      this.updateTabHistory(id)
    }
  }

  private updateTabs(updatedTabs: TabModel[]) {
    this.data.tabs = updatedTabs
    this.data.setTabs(updatedTabs)
  }

  private updateTabHistory(id: string) {
    const updatedTabHistory = [...this.data.tabHistory, id]
    this.data.tabHistory = updatedTabHistory
    this.data.setTabHistory(updatedTabHistory)
  }
}
