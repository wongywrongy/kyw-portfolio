export function Section({
  label,
  index,
  children,
}: {
  label: string
  index: number
  children: React.ReactNode
}) {
  return (
    <section className="fade-up mt-14" style={{ '--i': index } as React.CSSProperties}>
      <h2 className="mb-4 text-[13px] font-medium text-secondary">{label}</h2>
      {children}
    </section>
  )
}
