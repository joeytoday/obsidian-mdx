import React, { createContext, useContext, useState } from 'react'

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProps {
  items?: string[]
  defaultValue?: string
  children: React.ReactNode
}

export function Tabs({ items, defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || '')
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="obsidian-mdx-tabs">
        {items && (
          <div className="obsidian-mdx-tabs-list">
            {items.map((item) => (
              <button
                key={item}
                className={`obsidian-mdx-tab ${activeTab === item ? 'obsidian-mdx-tab-active' : ''}`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <div className="obsidian-mdx-tabs-content">{children}</div>
      </div>
    </TabsContext.Provider>
  )
}

interface TabProps {
  value: string
  children: React.ReactNode
}

export function Tab({ value, children }: TabProps) {
  const context = useContext(TabsContext)
  
  if (!context) {
    return null
  }
  
  if (context.activeTab !== value) {
    return null
  }
  
  return <div className="obsidian-mdx-tab-panel">{children}</div>
}
