import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Not found' }

export default function NotFound() {
  return (
    <div className="fade-up">
      <h1 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[34px]">Not found</h1>
      <p className="mt-3 text-secondary">There’s nothing at this address.</p>
      <p className="mt-6">
        <Link href="/" className="link">
          ← Back home
        </Link>
      </p>
    </div>
  )
}
