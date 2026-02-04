import React from 'react'

interface CardsProps {
  children: React.ReactNode
}

export function Cards({ children }: CardsProps) {
  return <div className="obsidian-mdx-cards">{children}</div>
}

interface CardProps {
  title?: string
  icon?: React.ReactNode
  href?: string
  children: React.ReactNode
}

export function Card({ title, icon, href, children }: CardProps) {
  const content = (
    <>
      {icon && <span className="obsidian-mdx-card-icon">{icon}</span>}
      {title && <h3 className="obsidian-mdx-card-title">{title}</h3>}
      <div className="obsidian-mdx-card-content">{children}</div>
    </>
  )
  
  if (href) {
    return (
      <a href={href} className="obsidian-mdx-card obsidian-mdx-card-link">
        {content}
      </a>
    )
  }
  
  return <div className="obsidian-mdx-card">{content}</div>
}

// To support Nextra syntax: <Cards.Card>
Cards.Card = Card
