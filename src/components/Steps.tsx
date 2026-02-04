import React from 'react'

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return <div className="obsidian-mdx-steps">{children}</div>
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
        {title && <h3 className="obsidian-mdx-step-title">{title}</h3>}
        <div className="obsidian-mdx-step-body">{children}</div>
      </div>
    </div>
  )
}
