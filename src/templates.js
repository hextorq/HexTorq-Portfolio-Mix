export const routes = [
  { path: '/', label: 'Home' },
  { path: '/about/', label: 'About' },
  { path: '/services/', label: 'Services' },
  { path: '/products/', label: 'Products' },
  { path: '/projects/', label: 'Projects' },
  { path: '/process/', label: 'Process' },
  { path: '/contact/', label: 'Contact' },
]

export const defaultTemplates = [
  {
    id: 'portfolio-1',
    name: 'Portfolio 1',
    url: 'https://portfolio-1.hextorq.tech',
    hash: {
      '/': 'top',
      '/about/': 'story',
      '/services/': 'services',
      '/products/': 'products',
      '/projects/': 'projects',
      '/process/': 'process',
      '/contact/': 'contact',
    },
  },
  {
    id: 'portfolio-2',
    name: 'Portfolio 2',
    url: 'https://portfolio-2.hextorq.tech',
    hash: {
      '/': 'hero',
      '/about/': 'about',
      '/services/': 'services',
      '/products/': 'products',
      '/projects/': 'services',
      '/process/': 'services',
      '/contact/': 'contact',
    },
  },
  {
    id: 'portfolio-3',
    name: 'Portfolio 3',
    url: 'https://portfolio-3.hextorq.tech',
    hash: {
      '/': 'top',
      '/about/': 'pillars',
      '/services/': 'digital',
      '/products/': 'portfolio',
      '/projects/': 'education',
      '/process/': 'process',
      '/contact/': 'cta',
    },
  },
  {
    id: 'portfolio-4',
    name: 'Portfolio 4',
    url: 'https://portfolio-4.hextorq.tech',
    hash: {
      '/': 'top',
      '/about/': 'story',
      '/services/': 'services',
      '/products/': 'products',
      '/projects/': 'projects',
      '/process/': 'process',
      '/contact/': 'contact',
    },
  },
]

export function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

export function loadTemplates() {
  const envUrls = (import.meta.env.VITE_TEMPLATE_URLS || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean)

  const urls = envUrls
  return defaultTemplates.map((template, index) => ({
    ...template,
    url: urls[index] || template.url,
  }))
}

export function templateTarget(template, path) {
  if (!template?.url) return ''
  const canonicalPath = normalizePath(path)
  const hash = template.hash[canonicalPath] || template.hash['/'] || ''
  return `${template.url}${canonicalPath}${hash ? `#${hash}` : ''}`
}
