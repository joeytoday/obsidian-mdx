import React from 'react'

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  const childArray = React.Children.toArray(children)
  
  // Group children by h3 headings
  const groupedSteps: React.ReactNode[][] = []
  let currentGroup: React.ReactNode[] = []
  
  childArray.forEach((child) => {
    // If it's an explicit Step component, treat as independent step
    if (React.isValidElement(child) && (child.type === Step || (child.type as any)?.name === 'Step')) {
      if (currentGroup.length > 0) {
        groupedSteps.push(currentGroup)
        currentGroup = []
      }
      groupedSteps.push([child])
      return
    }
    
    // Check if it's an h3 element
    const isH3 = React.isValidElement(child) && 
                 (child.type === 'h3' || 
                  (typeof child.type === 'string' && child.type === 'h3'))
    
    if (isH3) {
      // When encountering new h3, save previous group and start new group
      if (currentGroup.length > 0) {
        groupedSteps.push(currentGroup)
      }
      currentGroup = [child]
    } else if (currentGroup.length > 0) {
      // If there's already an h3, add content to current group
      currentGroup.push(child)
    }
    // Otherwise ignore (content before h3)
  })
  
  // Add the last group
  if (currentGroup.length > 0) {
    groupedSteps.push(currentGroup)
  }
  
  return (
    <div className="obsidian-mdx-steps">
      {groupedSteps.map((group, index) => {
        // If group contains only one Step component, render directly
        if (group.length === 1 && 
            React.isValidElement(group[0]) && 
            (group[0].type === Step || (group[0].type as any)?.name === 'Step')) {
          return <React.Fragment key={index}>{group[0]}</React.Fragment>
        }
        
        // Otherwise wrap as step
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

// To support Nextra syntax: <Steps.Step>
Steps.Step = Step
