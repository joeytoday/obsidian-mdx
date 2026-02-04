import React from 'react'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <table className={`obsidian-mdx-table ${className}`.trim()} {...props}>
      {children}
    </table>
  )
}

interface TableTrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export function Tr({ children, className = '', ...props }: TableTrProps) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  )
}

interface TableThProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export function Th({ children, className = '', ...props }: TableThProps) {
  return (
    <th className={className} {...props}>
      {children}
    </th>
  )
}

interface TableTdProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export function Td({ children, className = '', ...props }: TableTdProps) {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  )
}

// To support Nextra syntax: <Table.Tr>, <Table.Th>, <Table.Td>
Table.Tr = Tr
Table.Th = Th
Table.Td = Td
