import { useEffect, useMemo, useState } from 'react'
import { Shuffle } from 'lucide-react'
import { loadTemplates, normalizePath, templateTarget } from './templates'

function pathFromWindow(initialPath) {
  if (typeof window === 'undefined') return normalizePath(initialPath || '/')
  return normalizePath(window.location.pathname)
}

export default function App({ initialPath = '/', prerender = false }) {
  const [path, setPath] = useState(pathFromWindow(initialPath))
  const [templates, setTemplates] = useState(() => loadTemplates())
  const [activeIndex, setActiveIndex] = useState(3)
  const [preloadRest, setPreloadRest] = useState(false)
  const activeTemplate = templates[activeIndex]
  const activeUrl = useMemo(() => templateTarget(activeTemplate, path), [activeTemplate, path])
  const templateUrls = useMemo(
    () => templates.map((template) => templateTarget(template, path)),
    [templates, path]
  )

  useEffect(() => {
    if (prerender) return
    const loadedTemplates = loadTemplates()
    setTemplates(loadedTemplates)
    const portfolio4Index = loadedTemplates.findIndex((template) => template.id === 'portfolio-4')
    setActiveIndex(portfolio4Index >= 0 ? portfolio4Index : 0)
    const preloadTimer = window.setTimeout(() => setPreloadRest(true), 1200)
    const syncPath = () => setPath(pathFromWindow('/'))
    window.addEventListener('popstate', syncPath)
    return () => {
      window.clearTimeout(preloadTimer)
      window.removeEventListener('popstate', syncPath)
    }
  }, [prerender])

  const randomTemplate = () => {
    if (templates.length < 2) return
    let next = activeIndex
    while (next === activeIndex) next = Math.floor(Math.random() * templates.length)
    setActiveIndex(next)
  }

  return (
    <div className="site-frame">
      {activeUrl ? (
        <div className="iframe-stack">
          {templates.map((template, index) => {
            const url = templateUrls[index]
            const shouldMount = index === activeIndex || preloadRest
            if (!url) return null
            if (!shouldMount) return null
            return (
              <iframe
                key={template.id}
                className={`template-frame ${index === activeIndex ? 'is-active' : ''}`}
                title={`HexTorq ${template.name}`}
                src={url}
                loading="eager"
              />
            )
          })}
        </div>
      ) : (
        <div className="fallback">
          <h1>HEXTORQ</h1>
        </div>
      )}

      <button
        className="random-switch"
        type="button"
        onClick={randomTemplate}
        aria-label="Change portfolio UI"
        title={`Current UI: ${activeTemplate?.name || 'Portfolio 4'}`}
      >
        <Shuffle size={13} />
        <span>UI</span>
      </button>
    </div>
  )
}
