export function assetPath(path) {
  if (!path) return path
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path

  const base = import.meta.env.BASE_URL
  return `${base}${String(path).replace(/^\/+/, '')}`
}
