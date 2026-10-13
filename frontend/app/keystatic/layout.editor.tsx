import KeystaticApp from './keystatic'

// `.editor-root` hides the site's background and theme toggle (globals.css).
export default function KeystaticLayout() {
  return (
    <div className="editor-root">
      <KeystaticApp />
    </div>
  )
}
