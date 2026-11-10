import { useEffect } from 'react'

export default function Meta({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Godscovenant Patrick Udofe`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = document.title
    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = description
  }, [title, description])
  return null
}
