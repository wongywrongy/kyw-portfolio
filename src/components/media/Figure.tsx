import { ReactNode } from 'react'

interface FigureProps {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
  maxWidth?: string
}

export default function Figure({ children, align = 'center', maxWidth }: FigureProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <figure 
      className={`my-6 ${alignClasses[align]}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </figure>
  )
}
