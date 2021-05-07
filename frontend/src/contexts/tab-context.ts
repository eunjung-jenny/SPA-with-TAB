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

export const initialTabContextValue: TabContextType = {
  tabs: [],
  tabHistory: [],
  addTab: () => () => {},
  updateTab: () => () => {},
  currentTab: () => () => null,
  removeTab: () => () => {},
  setCurrentTab: () => () => {},
}

const TabContext = React.createContext<TabContextType>(initialTabContextValue)

export default TabContext
