import React from 'react'

interface FileTreeProps {
  children: React.ReactNode
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="obsidian-mdx-filetree">
      <div className="obsidian-mdx-filetree-content">{children}</div>
    </div>
  )
}

interface FolderProps {
  name: string
  children?: React.ReactNode
  defaultOpen?: boolean
}

export function Folder({ name, children, defaultOpen = false }: FolderProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  
  return (
    <div className="obsidian-mdx-filetree-folder">
      <button 
        className={`obsidian-mdx-filetree-folder-name ${isOpen ? 'obsidian-mdx-filetree-folder-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="obsidian-mdx-filetree-icon">
          {isOpen ? '📂' : '📁'}
        </span>
        <span>{name}</span>
      </button>
      {isOpen && children && (
        <div className="obsidian-mdx-filetree-children">{children}</div>
      )}
    </div>
  )
}

interface FileProps {
  name: string
}

export function File({ name }: FileProps) {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const iconMap: Record<string, string> = {
      js: '📄',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      json: '📋',
      md: '📝',
      mdx: '📝',
      css: '🎨',
      html: '🌐',
      py: '🐍',
      java: '☕',
      go: '🐹',
      rs: '🦀',
      png: '🖼️',
      jpg: '🖼️',
      gif: '🖼️',
      svg: '🎨',
    }
    return iconMap[ext || ''] || '📄'
  }
  
  return (
    <div className="obsidian-mdx-filetree-file">
      <span className="obsidian-mdx-filetree-icon">{getFileIcon(name)}</span>
      <span>{name}</span>
    </div>
  )
}

// To support Nextra syntax: <FileTree.Folder>, <FileTree.File>
FileTree.Folder = Folder
FileTree.File = File
