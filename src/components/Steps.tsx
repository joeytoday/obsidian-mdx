import React from 'react'

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  const childArray = React.Children.toArray(children)
  
  // 将 children 按 h3 分组
  const groupedSteps: React.ReactNode[][] = []
  let currentGroup: React.ReactNode[] = []
  
  childArray.forEach((child) => {
    // 如果是显式的 Step 组件,作为独立的 step
    if (React.isValidElement(child) && (child.type === Step || (child.type as any)?.name === 'Step')) {
      if (currentGroup.length > 0) {
        groupedSteps.push(currentGroup)
        currentGroup = []
      }
      groupedSteps.push([child])
      return
    }
    
    // 检查是否是 h3 元素
    const isH3 = React.isValidElement(child) && 
                 (child.type === 'h3' || 
                  (typeof child.type === 'string' && child.type === 'h3'))
    
    if (isH3) {
      // 遇到新的 h3,保存之前的组并开始新组
      if (currentGroup.length > 0) {
        groupedSteps.push(currentGroup)
      }
      currentGroup = [child]
    } else if (currentGroup.length > 0) {
      // 如果已经有 h3,将内容添加到当前组
      currentGroup.push(child)
    }
    // 否则忽略(h3 之前的内容)
  })
  
  // 添加最后一组
  if (currentGroup.length > 0) {
    groupedSteps.push(currentGroup)
  }
  
  return (
    <div className="obsidian-mdx-steps">
      {groupedSteps.map((group, index) => {
        // 如果组中只有一个 Step 组件,直接渲染
        if (group.length === 1 && 
            React.isValidElement(group[0]) && 
            (group[0].type === Step || (group[0].type as any)?.name === 'Step')) {
          return <React.Fragment key={index}>{group[0]}</React.Fragment>
        }
        
        // 否则包装成 step
        return (
          <div key={index} className="obsidian-mdx-step">
            <div className="obsidian-mdx-step-marker"></div>
            <div className="obsidian-mdx-step-content">
              <div className="obsidian-mdx-step-body">{group}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface StepProps {
  title?: string
  children: React.ReactNode
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="obsidian-mdx-step">
      <div className="obsidian-mdx-step-marker"></div>
      <div className="obsidian-mdx-step-content">
        <div className="obsidian-mdx-step-body">{children}</div>
      </div>
    </div>
  )
}

// 为了支持 Nextra 语法: <Steps.Step>
Steps.Step = Step
