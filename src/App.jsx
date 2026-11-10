import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail, Search } from 'lucide-react';
import { articles, categories } from './data/articles.js';
import resumeData from './data/resumeData.json';
import { Navbar, Footer, BackToTop, ReadingProgress } from './components/Shell.jsx';
import { ArticleCard, Cover } from './components/ArticleCard.jsx';
import ArticleContent from './components/ArticleContent.jsx';
import ContactForm from './components/ContactForm.jsx';
import { CONTACT_EMAIL, SOCIAL_PROFILES } from './data/contact.js';
import Meta from './components/Meta.jsx';
import PortfolioAssistant from './components/PortfolioAssistant.jsx';
import Resume from './pages/Resume.jsx';
import Projects from './pages/Projects.jsx';
import ProfilePortrait from './components/ProfilePortrait.jsx';

function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro container"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{children && <p>{children}</p>}</section>;
}

function Home() {
  const featured = resumeData.projects
    .filter((project) => project.catalogueGroup !== 'Portfolio Projects' && project.title !== 'Coveilla Blog')
    .slice(0, 3);
  return <>
    <Meta title="Software Developer | Frontend & Backend Development" description="Software development portfolio of Godscovenant Patrick Udofe, featuring practical web products, collaborative projects, engineering contributions, and technical articles." />
    <section className="hero container">
      <div className="hero-text"><div className="eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPMENT · FRONTEND · BACKEND</div>
        <h1>Software Developer<br /><em>Frontend &amp; Backend Development</em></h1>
        <p className="hero-lede">I build practical digital products and responsive web applications, combining thoughtful user experiences with functional engineering. My work spans frontend development, backend systems, API integration, databases, and collaborative software projects.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/projects">Explore projects <ArrowRight size={17} /></Link><Link className="button button-outline" to="/resume">View résumé</Link></div>
        <div className="hero-note"><span className="note-dot" /> Independent products. Team contributions. Continuous learning.</div>
      </div>
      <div className="hero-art developer-hero-art" aria-label="Software development illustration"><div className="art-frame"><div className="art-sun" /><div className="art-arch" /><div className="art-code-card"><span>&lt;/&gt;</span><i>Build<br />· test<br />· improve</i></div><div className="art-node node-one" /><div className="art-node node-two" /><div className="art-node node-three" /><span className="art-caption">SOFTWARE · SYSTEMS · PEOPLE</span></div><span className="art-index">01 / 04</span></div>
      <a href="#intro" className="scroll-cue">SCROLL TO EXPLORE <ArrowRight size={15} /></a>
    </section>
    <section id="intro" className="intro-section"><div className="container intro-grid">
      <div className="intro-heading"><div className="eyebrow">A PRACTICAL ENGINEERING MINDSET</div><h2>From idea<br />to <em>useful software.</em></h2><p className="large-copy">I enjoy taking an idea from a user-facing interface through the data and service logic that supports it.</p></div>
      <div className="intro-detail"><p>My projects include responsive web applications, APIs, database-backed workflows, and contributions to team software.</p><p>I am an early-career developer who keeps learning through hands-on projects, collaboration, and careful problem-solving.</p><Link to="/about" className="button button-outline intro-about-link">About my technology journey <ArrowUpRight size={15} /></Link></div>
    </div></section>
    <section className="section container"><div className="section-heading"><div><div className="eyebrow">SELECTED PROJECTS</div><h2>Software in <em>practice</em></h2></div><Link className="text-link" to="/projects">View all projects <ArrowRight size={16} /></Link></div><div className="article-grid">{featured.map((project) => <article className="article-card home-project-card" key={project.title}><div className="cover cover-technical">{project.image && <img className="cover-image" src={project.image} alt="" loading="lazy" />}<span className="cover-kicker">{project.category}</span>{!project.image && <span className="cover-glyph">&lt;/&gt;</span>}<span className="cover-name">{project.title}</span></div><div className="card-copy"><div className="eyebrow">{project.ownership}</div><h3>{project.title}</h3><p>{project.summary}</p><Link className="text-link" to="/projects">View project details <ArrowUpRight size={15} /></Link></div></article>)}</div></section>
    <section className="category-section"><div className="container"><div className="section-heading"><div><div className="eyebrow">TECHNICAL ARTICLES &amp; INSIGHTS</div><h2>Concepts made <em>clear</em></h2></div><Link className="text-link" to="/writing">Browse articles <ArrowRight size={16} /></Link></div><div className="article-grid">{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div></div></section>
    <section className="home-cta container"><div><div className="eyebrow">LET’S BUILD SOMETHING USEFUL</div><h2>Have a technical<br />project in <em>mind?</em></h2></div><div className="hero-actions"><Link className="button button-dark" to="/resume">View technical résumé <ArrowRight size={17} /></Link><Link className="button button-outline" to="/contact">Get in touch</Link></div></section>
  </>;
}

function About() {
  return <>
    <Meta title="About the Developer" description="Learn about Godscovenant Patrick Udofe’s software development journey, frontend and backend interests, collaborative projects, and technical education." />
    <PageIntro eyebrow="ABOUT THE DEVELOPER" title={<>Building with<br /><em>curiosity and care.</em></>}>
      I am an early-career software developer interested in practical applications, clear interfaces, backend systems, and solving real workflow problems.
    </PageIntro>
    <section className="about-layout container"><ProfilePortrait /><div className="prose about-prose">
      <p className="lead">I’m Godscovenant Patrick Udofe. My technology journey is shaped by hands-on projects, collaborative development, and a steady interest in how software can make everyday tasks clearer and more useful.</p>
      <h2>Frontend and backend development</h2>
      <p>I work with HTML, CSS, JavaScript, React, and Vite to build responsive interfaces. My project experience also includes Python, FastAPI, REST APIs, SQLite, PostgreSQL exploration, and connecting user-facing applications to backend services.</p>
      <p>Across independent products and team projects, I have worked on e-commerce, content platforms, task workflows, interface prototypes, and reusable portfolio experiences. The project catalogue distinguishes work I built independently from team-wide features and specific open-source contributions.</p>
      <h2>Learning through collaboration</h2>
      <p>Team and open-source work have helped me practice reading an existing codebase, making focused changes, and documenting what a contribution does. I continue to develop my skills through technical projects and structured learning, while being clear about what is implemented and what is still an exploration.</p>
      <h2>Education</h2>
      <p>I hold a B.A. in Philosophy from the University of Uyo (2021–2025). That academic background is part of my education; my current portfolio centers on software development and technical work.</p>
      <Link className="text-link" to="/projects">Explore my projects <ArrowUpRight size={15} /></Link>
    </div></section>
  </>;
}

function TechnicalArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = categories.includes(searchParams.get('category')) ? searchParams.get('category') : 'All articles';
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const requested = searchParams.get('category');
    setCategory(categories.includes(requested) ? requested : 'All articles');
  }, [searchParams]);
  const filtered = useMemo(() => articles.filter((article) => (category === 'All articles' || article.category === category)
    && [article.title, article.description, article.category, ...(article.tags || [])].join(' ').toLowerCase().includes(query.trim().toLowerCase())), [category, query]);
  function selectCategory(next) {
    setCategory(next);
    const params = new URLSearchParams(searchParams);
    if (next === 'All articles') params.delete('category'); else params.set('category', next);
    setSearchParams(params, { replace: true });
  }
  return <>
    <Meta title="Technical Articles & Insights" description="Six practical guides explaining SaaS, cloud computing, APIs, cybersecurity, artificial intelligence, and blockchain for business and technology readers." />
    <PageIntro eyebrow="TECHNICAL ARTICLES & INSIGHTS" title={<>Technology, made<br /><em>understandable.</em></>}>
      Beginner-friendly guides to software, cloud platforms, APIs, security, AI, and blockchain—with diagrams and practical context.
    </PageIntro>
    <section className="container library"><div className="library-controls"><div className="filter-list" aria-label="Filter articles by category">{categories.map((item) => <button type="button" key={item} className={category === item ? 'filter active' : 'filter'} aria-pressed={category === item} onClick={() => selectCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={17} /><input aria-label="Search technical articles" placeholder="Search articles…" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div><p className="result-count">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{category !== 'All articles' && ` in ${category}`}</p>{filtered.length ? <div className="article-grid">{filtered.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="empty-state"><h2>No articles found</h2><p>Try a different search or category.</p></div>}</section>
  </>;
}

function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFound />;
  const related = articles.filter((item) => item.slug !== article.slug).sort((left, right) => Number(right.category === article.category) - Number(left.category === article.category)).slice(0, 3);
  return <><Meta title={article.title} description={article.description} /><ReadingProgress /><article className="article-detail container"><div className="article-breadcrumb"><Link to="/writing">Technical Articles</Link><span>/</span><span>{article.category}</span></div><div className="article-head"><div className="eyebrow">{article.category}</div><h1>{article.title}</h1><p>{article.description}</p><div className="card-meta"><span>Godscovenant Patrick Udofe</span><span>{article.minutes} min read</span><span>Portfolio article</span></div>{article.tags?.length > 0 && <div className="article-tags" aria-label="Article tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</div><Cover type={article.cover} label={article.title} image={article.image} /><div className="article-body"><ArticleContent blocks={article.body} /></div><section className="related-section"><div className="eyebrow">KEEP READING</div><h2>Related <em>articles</em></h2><div className="article-grid">{related.map((item) => <ArticleCard article={item} key={item.slug} />)}</div></section><Link className="text-link" to="/writing">← Back to technical articles</Link></article></>;
}

function Contact() {
  return <><Meta title="Contact" description="Contact Godscovenant Patrick Udofe about software projects and technical collaboration." /><PageIntro eyebrow="CONTACT" title={<>Let’s talk about<br /><em>your next project.</em></>}>I’m open to thoughtful conversations about software, collaboration, and practical digital products.</PageIntro><section id="contact-details" className="container contact-layout"><div className="contact-aside"><div className="eyebrow">GET IN TOUCH</div><h2>Good work starts<br />with a <em>conversation.</em></h2><p>Reach me through email or verified profiles.</p><div className="contact-detail"><Mail size={18} /><span>Email<br /><a href={`mailto:${CONTACT_EMAIL}`}><small>{CONTACT_EMAIL}</small></a></span></div><div className="contact-detail"><span className="linkedin-mark">in</span><span>LinkedIn<br /><a href={SOCIAL_PROFILES.linkedin} target="_blank" rel="noopener noreferrer"><small>Visit my profile ↗</small></a></span></div><div className="contact-detail"><span className="linkedin-mark" aria-hidden="true">GH</span><span>GitHub<br /><a href={SOCIAL_PROFILES.github} target="_blank" rel="noopener noreferrer"><small>Visit my profile ↗</small></a></span></div></div><div><div className="eyebrow form-label">SEND A NOTE</div><ContactForm /></div></section></>;
}

function NotFound() {
  return <section className="not-found container"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>This page took<br />a <em>wrong turn.</em></h1><p>The page you’re looking for may have moved, or may not exist.</p><Link className="button button-dark" to="/">Back to home <ArrowRight size={16} /></Link></section>;
}

export default function App() {
  return <><Navbar /><main className="route-transition"><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/writing" element={<TechnicalArticles />} /><Route path="/writing/:slug" element={<ArticleDetail />} /><Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact />} /><Route path="/technical-writing" element={<Navigate to="/writing" replace />} /><Route path="/b2b-technology" element={<Navigate to="/writing" replace />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><BackToTop /><PortfolioAssistant /></>;
}
