import React, { createContext, useContext, useState, useEffect } from 'react'

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProps {
  items?: string[]
  defaultValue?: string
  defaultIndex?: number | string
  storageKey?: string
  children: React.ReactNode
  className?: string
  tabClassName?: string | ((bag: { selected: boolean }) => string)
  onChange?: (index: number) => void
  selectedIndex?: number
}

export function Tabs({ 
  items, 
  defaultValue, 
  defaultIndex, 
  storageKey,
  className,
  tabClassName,
  onChange,
  selectedIndex: controlledIndex,
  children 
}: TabsProps) {
  // 确定初始激活的 tab
  const getInitialTab = (): string => {
    // 如果有 storageKey，尝试从 localStorage 读取
    if (storageKey && typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored && items?.includes(stored)) {
        return stored
      }
    }
    
    // 处理 defaultIndex
    if (defaultIndex !== undefined && items) {
      const index = typeof defaultIndex === 'string' ? parseInt(defaultIndex, 10) : defaultIndex
      if (index >= 0 && index < items.length) {
        return items[index]
      }
    }
    
    // 使用 defaultValue
    if (defaultValue) {
      return defaultValue
    }
    
    // 默认使用第一个 item
    return items?.[0] || ''
  }
  
  const [activeTab, setActiveTab] = useState(getInitialTab())
  
  // 支持受控模式
  useEffect(() => {
    if (controlledIndex !== undefined && items) {
      setActiveTab(items[controlledIndex] || '')
    }
  }, [controlledIndex, items])
  
  // 处理 tab 切换
  const handleTabChange = (item: string, index: number) => {
    setActiveTab(item)
    
    // 保存到 localStorage
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, item)
    }
    
    // 触发 onChange 回调
    if (onChange) {
      onChange(index)
    }
  }
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`obsidian-mdx-tabs ${className || ''}`.trim()}>
        {items && (
          <div className="obsidian-mdx-tabs-list">
            {items.map((item, index) => {
              const isActive = activeTab === item
              const computedTabClassName = typeof tabClassName === 'function' 
                ? tabClassName({ selected: isActive }) 
                : tabClassName
              
              return (
                <button
                  key={item}
                  className={`obsidian-mdx-tab ${isActive ? 'obsidian-mdx-tab-active' : ''} ${computedTabClassName || ''}`.trim()}
                  onClick={() => handleTabChange(item, index)}
                >
                  {item}
                </button>
              )
            })}
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

// 为了支持 Nextra 语法: <Tabs.Tab>
Tabs.Tab = Tab
