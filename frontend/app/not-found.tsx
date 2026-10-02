import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Not found' }

export default function NotFound() {
  return (
    <div className="fade-up">
      <h1 className="font-serif text-[40px] italic leading-[1.1]">Not found</h1>
      <p className="mt-3 text-secondary">There’s nothing at this address.</p>
      <p className="mt-6">
        <Link href="/" className="link">
          ← Back home
        </Link>
      </p>
    </div>
  )
}
