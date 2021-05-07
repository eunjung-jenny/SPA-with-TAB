import React from 'react'
import { MenuType } from '../types/menu'

export type TabType = {
  id: string
  menu: MenuType
  url: string
  isEditing?: boolean
  error?: boolean
}

export type TabContextType = {
  tabs: TabType[]
  tabHistory: string[]
  addTab: (menu: MenuType) => () => void
  updateTab: (menu: MenuType) => (tab: Partial<TabType>) => void
  currentTab: () => () => TabType | null
  removeTab: (id: string) => () => void
  setCurrentTab: (id: string) => () => void
}

const testTabId = 'test'
const testTab = {
  id: testTabId,
  menu: MenuType.Board,
  url: `/${MenuType.Board}`,
}

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
