import React from 'react'
import { useHistory } from 'react-router-dom'
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
  handlePopState: (url: string) => (e: PopStateEvent) => void
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
  handlePopState: (url: string) => (e: PopStateEvent) => {},
})

const TabContextProvider = (props: TabContextProviderProps) => {
  const { children } = props

  const history = useHistory()

  const [tabs, setTabs] = React.useState<TabModel[]>([])
  const [tabHistory, setTabHistory] = React.useState<string[]>([])
  const [currentTab, setCurrentTab] = React.useState<TabModel | null>(null)

  const tabsRef = React.useRef(tabs)

  const updateTabs = (updatedTabs: TabModel[]) => {
    tabsRef.current = updatedTabs
    setTabs(updatedTabs)
  }

  const activateTab = (id: string | undefined) => {
    if (!id) {
      setCurrentTab(null)
      return
    }

    // TODO: 예외 - 존재하지 않는 탭
    const selectedTab = tabsRef.current.find((tab) => tab.info.id === id)
    if (!selectedTab) return

    setCurrentTab(selectedTab)
  }

  const addHistory = (id: string | undefined) => {
    const addTabHistory = (id: string | undefined) => {
      if (!id) return
      if (lastOfArr(tabHistory) === id) return
      setTabHistory([...tabHistory, id])
    }

    const addWindowHistory = (id: string | undefined) => {
      const tab = tabsRef.current.find((tab) => tab.info.id === id)
      history.push(tab ? tab.info.url : '', { idx: tabHistory.length })
    }

    addTabHistory(id)
    addWindowHistory(id)

    activateTab(id)
  }

  const handlePopState = (url: string) => (e: PopStateEvent) => {
    const tab = tabsRef.current.find((tab) => tab.info.url === url)
    activateTab(tab?.info.id)
  }

  const addTab = (newTabParam: TabModelParams) => {
    const menu = newTabParam.url.split('/')[0]
    if (!Object.keys(MENU_CONFIGS).includes(menu)) return // TODO: 경고 - 존재하지 않는 메뉴

    let tab = tabsRef.current.find((tab) => tab.info.url === newTabParam.url)

    if (!tab) {
      tab = new TabModel(newTabParam)
      updateTabs([...tabsRef.current, tab])
    }

    addHistory(tab.info.id)
  }

  const removeTab = (id: string) => () => {
    const getPreviousTabId = (removedTabId: string) => {
      const previousTabId = tabHistory
        .filter((id) => id !== removedTabId)
        .reverse()
        .find((id) => {
          const tab = tabsRef.current.find((tab) => tab.info.id === id)
          return tab
        })

      return previousTabId
    }

    updateTabs(tabsRef.current.filter((tab) => tab.info.id !== id))
    const previousTabId = getPreviousTabId(id)
    addHistory(previousTabId)
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
        handlePopState,
      }}
    >
      {children}
    </TabContext.Provider>
  )
}

const TabContextConsumer = TabContext.Consumer

export { TabContext, TabContextProvider, TabContextConsumer }
