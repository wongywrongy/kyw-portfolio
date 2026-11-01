import { FlickerBand } from '@/components/flicker-band'

/** The dot field and flicker band behind every page. Goes first inside `.page`. */
export function Backdrop() {
  return (
    <>
      {/* Dots come first so the band paints over them where the two cross-fade. */}
      <div className="dots" aria-hidden="true" />
      <FlickerBand />
    </>
  )
}
