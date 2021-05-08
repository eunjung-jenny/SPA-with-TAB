import React from 'react'
import TabModel, { TabModelType } from '../models/TabModel'
import { MenuType } from '../types/menu'

export type TabContextType = {
  tabs: TabModel[]
  tabHistory: string[]
  addTab: (menu: MenuType) => () => void
  updateTab: (menu: MenuType) => (tab: Partial<TabModelType>) => void
  currentTab: () => () => TabModelType | null
  removeTab: (id: string) => () => void
  setCurrentTab: (id: string) => () => void
}

const testTabId = 'test'
const testTab = new TabModel(MenuType.Board)

export const initialTabContextValue: TabContextType = {
  tabs: [testTab],
  tabHistory: [testTabId],
  addTab: () => () => {},
  updateTab: () => () => {},
  currentTab: () => () => null,
  removeTab: () => () => {},
  setCurrentTab: () => () => {},
}

const TabContext = React.createContext<TabContextType>(initialTabContextValue)

export default TabContext
