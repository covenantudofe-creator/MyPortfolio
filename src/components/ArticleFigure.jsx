import { useState } from 'react'

export default function ArticleFigure({ block }) {
  const [available, setAvailable] = useState(true)

  return (
    <figure className="article-image-figure">
      {available ? (
        <img src={block.src} alt={block.alt} loading="lazy" onError={() => setAvailable(false)} />
      ) : (
        <div className="article-image-fallback" role="img" aria-label={`${block.alt}. Image unavailable.`}>
          <span>IMAGE UNAVAILABLE</span>
        </div>
      )}
      <figcaption>{block.caption}</figcaption>
    </figure>
  )
}
