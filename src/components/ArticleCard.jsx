import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3 } from 'lucide-react'

const coverGlyphs = { saas: 'S', cloud: '☁', api: '↗', security: '◈', ai: '✳', blockchain: '⬡', technical: '⌘' }

export function Cover({ type = 'technical', label, image }) {
  const title = label || type
  return (
    <div className={`cover cover-${type}${image ? ' cover-with-image' : ''}`} aria-label={`${title} ${image ? 'image' : 'designed cover'}`}>
      {image && <img className="cover-image" src={image} alt={`${title} editorial image`} loading="lazy" />}
      <span className="cover-kicker">TECHNICAL FIELD NOTES</span>
      {!image && <span className="cover-glyph">{coverGlyphs[type] || '✳'}</span>}
      <span className="cover-name">{title}</span>
    </div>
  )
}

export function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link to={`/writing/${article.slug}`} className="cover-link" aria-label={`Open ${article.title}`}>
        <Cover type={article.cover} label={article.title} image={article.image} />
      </Link>
      <div className="card-copy">
        <div className="eyebrow">{article.category}</div>
        <h3><Link to={`/writing/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.description}</p>
        <div className="card-meta">{article.date && <span>{article.date}</span>}<span><Clock3 size={14} />{article.minutes} min read</span></div>
        <div className="card-actions">
          <Link className="text-link" to={`/writing/${article.slug}`}>{article.status === 'soon' ? 'Preview article' : 'Read article'} <ArrowUpRight size={15} /></Link>
          {article.externalUrl && <a className="text-link" href={article.externalUrl} target="_blank" rel="noopener noreferrer">Read on Medium <ArrowUpRight size={15} /></a>}
        </div>
      </div>
    </article>
  )
}
