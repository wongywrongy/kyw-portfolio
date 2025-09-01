import { ReactNode } from 'react'
import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

interface CalloutProps {
  children: ReactNode
  variant?: 'info' | 'warn' | 'tip'
}

export default function Callout({ children, variant = 'info' }: CalloutProps) {
  const variants = {
    info: {
      icon: Info,
      className: 'border-c3/30 bg-c3/10',
      iconColor: 'text-c3',
    },
    warn: {
      icon: AlertTriangle,
      className: 'border-yellow-500/30 bg-yellow-500/10',
      iconColor: 'text-yellow-500',
    },
    tip: {
      icon: Lightbulb,
      className: 'border-green-500/30 bg-green-500/10',
      iconColor: 'text-green-500',
    },
  }

  const { icon: Icon, className, iconColor } = variants[variant]

  return (
    <div className={`border rounded-2xl p-4 my-6 ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
        <div className="text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
