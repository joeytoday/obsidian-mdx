import React from 'react'

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'default' | 'important'

interface CalloutProps {
  type?: CalloutType
  emoji?: string
  title?: string
  children: React.ReactNode
}

// Nextra-style default icons
const typeToEmoji: Record<CalloutType, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '🚨',
  success: '✅',
  default: '💡',
  important: '❗',
}

// Nextra-style titles (if not provided)
const typeToTitle: Record<CalloutType, string | undefined> = {
  info: undefined,
  warning: undefined,
  error: undefined,
  success: undefined,
  default: undefined,
  important: undefined,
}

export function Callout({ type = 'default', emoji, title, children }: CalloutProps) {
  const displayEmoji = emoji || typeToEmoji[type]
  const displayTitle = title !== undefined ? title : typeToTitle[type]
  
  return (
    <div className={`obsidian-mdx-callout obsidian-mdx-callout-${type}`}>
      <span className="obsidian-mdx-callout-emoji">{displayEmoji}</span>
      <div className="obsidian-mdx-callout-content">
        {displayTitle ? (
          <>
            <span className="obsidian-mdx-callout-title">{displayTitle}: </span>
            {children}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

// Astro-style alias
export function Aside({
  type = 'note',
  title,
  children
}: {
  type?: 'note' | 'tip' | 'caution' | 'danger'
  title?: string
  children: React.ReactNode
}) {
  const typeMap: Record<string, { calloutType: CalloutType; defaultTitle: string }> = {
    note: { calloutType: 'info', defaultTitle: 'Note' },
    tip: { calloutType: 'success', defaultTitle: 'Tip' },
    caution: { calloutType: 'warning', defaultTitle: 'Caution' },
    danger: { calloutType: 'error', defaultTitle: 'Danger' },
  }
  
  const mapping = typeMap[type] || { calloutType: 'default', defaultTitle: '' }
  const finalTitle = title !== undefined ? title : mapping.defaultTitle
  
  return (
    <Callout type={mapping.calloutType} title={finalTitle}>
      {children}
    </Callout>
  )
}
