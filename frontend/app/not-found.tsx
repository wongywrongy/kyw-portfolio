import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Not found' }

export default function NotFound() {
  return (
    <div className="fade-up mx-auto max-w-[640px] px-6 pb-24 pt-16 md:pt-24">
      <h1 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[34px]">Not found</h1>
      <p className="mt-3 text-text-2">There’s nothing at this address.</p>
      <p className="mt-6">
        <Link href="/" className="link">
          ← Back home
        </Link>
      </p>
    </div>
  )
}
