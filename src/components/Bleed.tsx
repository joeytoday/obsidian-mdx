import React from 'react'

interface BleedProps {
  full?: boolean
  children: React.ReactNode
  className?: string
}

export function Bleed({ full = false, children, className = '', ...props }: BleedProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={`obsidian-mdx-bleed ${full ? 'obsidian-mdx-bleed-full' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
