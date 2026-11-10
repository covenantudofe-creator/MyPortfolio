import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles.js'
import ArticleCard from '../components/ArticleCard.jsx'
import Meta from '../components/Meta.jsx'

export default function TechnicalWriting() {
  const samples = articles.filter((article) => article.category === 'Technical Writing')
  return <><Meta title="Technical Writing" description="Technical tutorials, API documentation, programming guides and clear software explanations by Godscovenant Patrick Udofe." /><section className="page-hero container"><p className="eyebrow"><span className="eyebrow-line" /> TECHNICAL WRITING</p><h1>Clarity for the <em>curious.</em></h1><p className="page-deck">Technical ideas deserve careful explanation. This space is for documentation, tutorials and guides created with both accuracy and the reader in mind.</p></section><section className="container section technical-intro"><div className="technical-note"><FileText size={23} /><div><h2>Built on accuracy, never assumption.</h2><p>Documentation samples will be added as they are developed. No product-specific documentation is represented as prior client work.</p></div></div><div className="technical-topics">{['Technical tutorials', 'API documentation', 'Programming guides', 'Software documentation', 'Technical explanations'].map((topic, index) => <span key={topic}><small>0{index + 1}</small>{topic}</span>)}</div><h2 className="subsection-title">In the works</h2><div className="article-grid">{samples.map((article) => <ArticleCard key={article.slug} article={article} />)}</div><p className="section-link"><Link className="text-link" to="/writing">Explore all writing <ArrowRight size={15} /></Link></p></section></>
}
