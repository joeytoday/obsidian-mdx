import { ItemView, ViewStateResult } from 'obsidian'
import React from 'react'
import * as runtime from 'react/jsx-runtime'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import { evaluate } from '@mdx-js/mdx'
import { remarkCodeHike } from '@code-hike/mdx'
import { CH } from '@code-hike/mdx/components'
// @ts-ignore
import theme from 'shiki/themes/github-dark.json'
// @ts-ignore
import remarkGfm from 'remark-gfm'
import { Tabs, Tab, Callout, Aside, Cards, Card, Steps, Step, FileTree, Folder, File } from './components'

export const MDX_PREVIEW = 'mdx-preview'

export type MDXPreviewState = {
  data: string
  basename: string
}

// 预处理 MDX 内容
function preprocessMdxContent(content: string): string {
  let processed = content
  
  // 1. 移除 YAML front-matter (--- ... ---)
  processed = processed.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '')
  
  // 2. 移除 nextra/components 的导入
  processed = processed.replace(
    /import\s+\{[^}]*\}\s+from\s+['"]nextra\/components['"]\s*;?\s*\n?/g,
    ''
  )
  
  // 3. 移除 @astrojs/starlight/components 的导入
  processed = processed.replace(
    /import\s+\{[^}]*\}\s+from\s+['"]@astrojs\/starlight\/components['"]\s*;?\s*\n?/g,
    ''
  )
  
  // 4. 移除其他常见的组件库导入
  processed = processed.replace(
    /import\s+\{[^}]*\}\s+from\s+['"]nextra\/components\/[^'"]+['"]\s*;?\s*\n?/g,
    ''
  )
  
  // 5. 移除通用的 'nextra' 导入
  processed = processed.replace(
    /import\s+\{[^}]*\}\s+from\s+['"]nextra['"]\s*;?\s*\n?/g,
    ''
  )
  
  return processed
}

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="obsidian-mdx-error">
          <h3>⚠️ MDX 渲染错误</h3>
          <pre>{this.state.error?.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export class mdxPreview extends ItemView {
  root: any
  state: MDXPreviewState = {
    data: '',
    basename: '',
  }

  setState(state: MDXPreviewState, _result: ViewStateResult): Promise<void> {
    this.state = state
    return this.render()
  }

  getState() {
    return this.state
  }

  clear(): void {}

  getDisplayText(): string {
    return 'MDX Preview'
  }

  getViewType(): string {
    return MDX_PREVIEW
  }

  async render() {
    try {
      const fileContent = this.state.data
      const processedContent = preprocessMdxContent(fileContent)
      
      // @ts-ignore
      const { default: MDXContent } = await evaluate(processedContent, {
        ...runtime,
        remarkPlugins: [
          remarkGfm,  // 支持表格、删除线、任务列表等 GFM 特性
          [
            remarkCodeHike,
            {
              theme,
              autoImport: false,
            },
          ],
        ],
        development: false,
      })

      this.root = ReactDOM.createRoot(this.containerEl.children[1])
      this.root.render(
        <React.StrictMode>
          <ErrorBoundary>
            <div className="yuleicul-obsidian-mdx">
              <MDXContent 
                components={{ 
                  CH,
                  Tabs,
                  Tab,
                  Callout,
                  Aside,
                  Cards,
                  Card,
                  Steps,
                  Step,
                  FileTree,
                  Folder,
                  File,
                }} 
              />
            </div>
          </ErrorBoundary>
        </React.StrictMode>
      )
    } catch (error: any) {
      this.root = ReactDOM.createRoot(this.containerEl.children[1])
      this.root.render(
        <div className="obsidian-mdx-error">
          <h3>⚠️ MDX 编译错误</h3>
          <pre>{error?.message || String(error)}</pre>
        </div>
      )
    }
  }

  async onClose() {
    this.root?.unmount()
  }
}
