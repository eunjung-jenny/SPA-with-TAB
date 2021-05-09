import React from 'react'
import MENU_CONFIGS from '../config/menu'
import TabModel, { TabModelParams } from '../models/TabModel'
import { lastOfArr } from '../utils/common'

type TabContextProps = {
  tabs: TabModel[]
  tabHistory: string[]
  currentTab: TabModel | null

  addTab: (newTabParam: TabModelParams) => void
  removeTab: (id: string) => () => void
  activateTab: (id: string) => void
}

type TabContextProviderProps = {
  children: React.ReactNode
}

const TabContext = React.createContext<TabContextProps>({
  tabs: [],
  tabHistory: [],
  currentTab: null,

  addTab: (newTabParam: TabModelParams) => {},
  removeTab: (id: string) => () => {},
  activateTab: (id: string) => {},
})

const TabContextProvider = (props: TabContextProviderProps) => {
  const { children } = props

  const [tabs, setTabs] = React.useState<TabModel[]>([])
  const [tabHistory, setTabHistory] = React.useState<string[]>([])
  const [currentTab, setCurrentTab] = React.useState<TabModel | null>(null)

  const tabsRef = React.useRef(tabs)

  const updateTabs = (updatedTabs: TabModel[]) => {
    tabsRef.current = updatedTabs
    setTabs(updatedTabs)
  }

  const addTabHistory = (id: string) => {
    if (lastOfArr(tabHistory) === id) return
    setTabHistory([...tabHistory, id])
  }

  const activateTab = (id: string) => {
    // TODO: 예외 - 존재하지 않는 탭
    const selectedTab = tabsRef.current.find((tab) => tab.info.id === id)
    if (!selectedTab) return

    addTabHistory(id)
    setCurrentTab(selectedTab)
  }

  const addTab = (newTabParam: TabModelParams) => {
    const menu = newTabParam.url.split('/')[0]
    if (!Object.keys(MENU_CONFIGS).includes(menu)) return // TODO: 경고 - 존재하지 않는 메뉴

    const existingTab = tabsRef.current.find(
      (tab) => tab.info.url === newTabParam.url,
    )

    if (existingTab) {
      activateTab(existingTab.info.id)
    } else {
      const newTab = new TabModel(newTabParam)
      updateTabs([...tabsRef.current, newTab])
      activateTab(newTab.info.id)
    }
  }

  const removeTab = (id: string) => () => {
    updateTabs(tabsRef.current.filter((tab) => tab.info.id !== id))
  }

  return (
    <TabContext.Provider
      value={{
        tabs: tabsRef.current,
        tabHistory,
        currentTab,
        addTab,
        removeTab,
        activateTab,
      }}
    >
      {children}
    </TabContext.Provider>
  )
}

const TabContextConsumer = TabContext.Consumer

export { TabContext, TabContextProvider, TabContextConsumer }