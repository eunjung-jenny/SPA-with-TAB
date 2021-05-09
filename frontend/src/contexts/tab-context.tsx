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
  handleTabTitleClick: (id: string) => void
  handlePopState: (url: string, idx: number) => void
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
  handleTabTitleClick: (id: string) => {},
  handlePopState: (url: string, idx: number) => {},
})

const TabContextProvider = (props: TabContextProviderProps) => {
  const { children } = props

  const history = useHistory()

  const [tabs, setTabs] = React.useState<TabModel[]>([])
  const [tabHistory, setTabHistory] = React.useState<string[]>([])
  const [currentTab, setCurrentTab] = React.useState<TabModel | null>(null)
  const [currentTabHistoryIdx, setCurrentTabHistoryIdx] = React.useState<
    number | undefined
  >(undefined)

  const tabsRef = React.useRef(tabs)
  const tabHistoryRef = React.useRef(tabHistory)
  const currentTabRef = React.useRef(currentTab)
  const currentTabHistoryIdxRef = React.useRef(currentTabHistoryIdx)

  const updateTabs = (updatedTabs: TabModel[]) => {
    tabsRef.current = updatedTabs
    setTabs(updatedTabs)
  }
  const updateTabHistory = (updatedTabHistory: string[]) => {
    tabHistoryRef.current = updatedTabHistory
    setTabHistory(updatedTabHistory)
  }
  const updateCurrentTab = (tab: TabModel | null) => {
    currentTabRef.current = tab
    setCurrentTab(tab)
  }
  const updateCurrentTabHistoryIdx = (idx: number | undefined) => {
    currentTabHistoryIdxRef.current = idx
    setCurrentTabHistoryIdx(idx)
  }

  const activateTab = (id: string | undefined) => {
    if (!id) {
      updateCurrentTab(null)
      return
    }

    // TODO: 예외 - 존재하지 않는 탭
    const selectedTab = tabsRef.current.find((tab) => tab.info.id === id)
    if (!selectedTab) return

    updateCurrentTab(selectedTab)
  }

  const addHistory = (id: string | undefined) => {
    const addTabHistory = (id: string | undefined) => {
      if (!id) return
      if (lastOfArr(tabHistoryRef.current) === id) return
      updateTabHistory([...tabHistoryRef.current, id])
    }

    const addWindowHistory = (id: string | undefined) => {
      const tab = tabsRef.current.find((tab) => tab.info.id === id)
      history.push(tab ? tab.info.url : '', {
        idx: tabHistoryRef.current.length - 1,
      })
    }

    addTabHistory(id)
    addWindowHistory(id)
    updateCurrentTabHistoryIdx(tabHistoryRef.current.length - 1)

    activateTab(id)
  }

  const handlePopState = (url: string, idx: number) => {
    if (
      typeof currentTabHistoryIdxRef.current === 'number' &&
      typeof idx === 'number'
    ) {
      const tab = tabsRef.current.find(
        (tab) =>
          tab.info.id === tabHistoryRef.current[idx] &&
          tab.info.url !== currentTabRef.current?.info.url,
      )
      if (tab) {
        activateTab(tab.info.id)
        updateCurrentTabHistoryIdx(idx)
      } else if (idx < currentTabHistoryIdxRef.current) {
        window.history.back()
      } else if (idx > currentTabHistoryIdxRef.current) {
        window.history.forward()
      } else {
        console.log('이 케이스는 존재하지 않습니다.')
      }
    }
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

  const removeTab = (removedId: string) => () => {
    const getPreviousTab = () => {
      let previousTab: TabModel | undefined

      tabHistory
        .filter((id) => id !== removedId)
        .reverse()
        .find((id) => {
          const tab = tabsRef.current.find((tab) => tab.info.id === id)
          previousTab = tab
          return tab
        })

      return previousTab
    }

    updateTabs(tabsRef.current.filter((tab) => tab.info.id !== removedId))
    const previousTab = getPreviousTab()
    addHistory(previousTab?.info.id)
  }

  const handleTabTitleClick = (id: string) => {
    activateTab(id)
    addHistory(id)
  }

  return (
    <TabContext.Provider
      value={{
        tabs: tabsRef.current,
        tabHistory: tabHistoryRef.current,
        currentTab: currentTabRef.current,
        addTab,
        removeTab,
        // activateTab,
        handleTabTitleClick,
        handlePopState,
      }}
    >
      {children}
    </TabContext.Provider>
  )
}

const TabContextConsumer = TabContext.Consumer

export { TabContext, TabContextProvider, TabContextConsumer }
