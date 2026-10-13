/**
 * The page background: five wide washes of light that drift slowly, a vignette
 * for depth and film grain on top so the gradients never band. Fixed behind
 * everything; the glass tiles blur it.
 */
export function Chrome() {
  return (
    <div className="chrome" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="orb orb-5" />
      <div className="vignette" />
      <svg className="grain">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
