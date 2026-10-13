import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Not found' }

export default function NotFound() {
  return (
    <div className="page">
      <div className="stack">
        <section className="tile fade-up" style={{ padding: 28 }}>
          <h1 className="page-title">Not found</h1>
          <p className="page-sub">There’s nothing at this address.</p>
          <p style={{ marginTop: 20 }}>
            <Link href="/" className="pill pill-primary">
              Back home
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}
