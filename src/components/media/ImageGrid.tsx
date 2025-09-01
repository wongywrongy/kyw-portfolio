import { ReactNode } from 'react'

interface ImageGridProps {
  children: ReactNode
  cols?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

export default function ImageGrid({ children, cols = 2, gap = 'md' }: ImageGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  return (
    <div className={`grid ${gridCols[cols]} ${gapClasses[gap]} my-8`}>
      {children}
    </div>
  )
}
