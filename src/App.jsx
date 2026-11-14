import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail, Search } from 'lucide-react';
import { articles, categories } from './data/articles.js';
import resumeData from './data/resumeData.json';
import certifications from './data/certification.js';
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
import CertificationCard from './components/CertificationCard.jsx';
import TechnicalWriting from './pages/TechnicalWriting.jsx';
import TaskManagerDocs from './pages/TaskManagerDocs.jsx';

function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro container"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{children && <p>{children}</p>}</section>;
}

function Home() {
  const featuredTitles = ['HNG Stage 1 Task Manager', 'Coveilla Scents', 'Portfolio Website'];
  const featured = featuredTitles.map((title) => resumeData.projects.find((project) => project.title === title)).filter(Boolean);
  return <>
    <Meta title="Technical Writer & Software Developer" description="Technical Writer, Software Developer, and Technical Content Specialist. Independent writing samples and practical software projects by Godscovenant Patrick Udofe." />
    <section className="hero container home-hero" aria-labelledby="home-title">
      <div className="home-hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" />TECHNICAL WRITER | SOFTWARE DEVELOPER</div>
        <h1 id="home-title">Technical Writer<br /><em>&amp; Software Developer</em></h1>
        <p className="hero-lede">I build practical web applications and explain how they work. My project experience spans React interfaces, Python/FastAPI services, REST APIs, and database-backed workflows; my independent writing samples turn technical behavior into clear documentation, tutorials, and B2B explainers.</p>
        <div className="hero-actions home-hero-actions">
          <Link className="button button-dark" to="/projects">Explore projects <ArrowRight size={16} /></Link>
          <Link className="button button-outline" to="/resume">View rÃ©sumÃ© <ArrowUpRight size={15} /></Link>
        </div>
        <Link className="home-hero-contact" to="/contact">Discuss technical writing or software roles <ArrowUpRight size={14} /></Link>
      </div>
      <div className="hero-art developer-hero-art" aria-hidden="true">
        <div className="art-frame">
          <span className="art-node node-one" /><span className="art-node node-two" /><span className="art-node node-three" />
          <div className="art-code-card"><span>&lt;/&gt;</span><i>Thoughtful<br />interfaces.<br />Useful systems.</i></div>
          <span className="art-caption">DESIGN Â· ENGINEERING Â· DELIVERY</span>
        </div>
        <span className="art-index">01 / SOFTWARE DEVELOPMENT</span>
      </div>
    </section>
    <section className="home-capabilities" aria-label="Technical strengths">
      <div className="container home-capabilities-grid">
        <article><span className="eyebrow">01 / TECHNICAL WRITING</span><h2>Docs for developers</h2><p>API references, tutorials, and technical explainers as independent samples.</p></article>
        <article><span className="eyebrow">02 / SOFTWARE</span><h2>Interfaces &amp; services</h2><p>Responsive React interfaces connected to APIs and persistent data.</p></article>
        <article><span className="eyebrow">03 / COMMUNICATION</span><h2>Code into clarity</h2><p>Trace a workflow through the stack and explain its behavior and limits.</p></article>
      </div>
    </section>
    <section className="home-writing-section container"><div className="home-writing-copy"><div className="eyebrow">INDEPENDENT TECHNICAL WRITING SAMPLES</div><h2>Documentation that starts<br />with understanding the <em>system.</em></h2><p>Explore an illustrative REST API reference, developer tutorials, software documentation examples, and my independent articles. These samples are self-directed, not commissioned client work.</p><Link className="text-link" to="/technical-writing">Explore technical writing samples <ArrowRight size={15} /></Link></div><div className="home-writing-index" aria-label="Writing sample types"><span>API documentation</span><span>Developer tutorials</span><span>Technical explainers</span><span>Software documentation</span></div></section>
    <section className="section container"><div className="section-heading"><div><div className="eyebrow">SELECTED SOFTWARE PROJECTS</div><h2>Software in <em>practice</em></h2></div><Link className="text-link" to="/projects">View all projects <ArrowRight size={16} /></Link></div><div className="article-grid">{featured.map((project) => <article className="article-card home-project-card" key={project.title}><div className="cover cover-technical">{project.image && <img className="cover-image" src={project.image} alt="" loading="lazy" />}<span className="cover-kicker">{project.category}</span>{!project.image && <span className="cover-glyph">&lt;/&gt;</span>}<span className="cover-name">{project.title}</span></div><div className="card-copy"><div className="eyebrow">{project.ownership}</div><h3>{project.title}</h3><p>{project.summary}</p><Link className="text-link" to="/projects">View project details <ArrowUpRight size={15} /></Link></div></article>)}</div></section>
    <section className="category-section"><div className="container"><div className="section-heading"><div><div className="eyebrow">TECHNICAL ARTICLES &amp; INSIGHTS</div><h2>Concepts made <em>clear</em></h2></div><Link className="text-link" to="/writing">Browse articles <ArrowRight size={16} /></Link></div><div className="article-grid">{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div></div></section>
    <section className="home-certification container" aria-labelledby="home-certification-title"><div className="section-heading"><div><div className="eyebrow">PROFESSIONAL DEVELOPMENT</div><h2 id="home-certification-title">Selected <em>certifications</em></h2></div></div><div className="home-certification-list">{certifications.map((certificate) => <CertificationCard compact key={certificate.id} certificate={certificate} />)}</div></section>
    <section className="home-cta container"><div><div className="eyebrow">LETâ€™S BUILD SOMETHING USEFUL</div><h2>Have a technical<br />project in <em>mind?</em></h2></div><div className="hero-actions"><Link className="button button-dark" to="/resume">View technical rÃ©sumÃ© <ArrowRight size={17} /></Link><Link className="button button-outline" to="/contact">Get in touch</Link></div></section>
  </>;
}

function About() {
  return <>
    <Meta title="About | Technical Writer & Software Developer" description="Godscovenant Patrick Udofe combines independent technical writing samples with practical software development across React, FastAPI, REST APIs, and database-backed workflows." />
    <PageIntro eyebrow="TECHNICAL WRITER | SOFTWARE DEVELOPER" title={<>Understanding code.<br /><em>Explaining what it does.</em></>}>
      My name is Godscovenant Patrick Udofe. I build practical software and write clear technical content, connecting source code, API behavior, and user workflows with explanations people can act on.
    </PageIntro>
    <section className="about-layout container"><ProfilePortrait /><div className="prose about-prose">
      <p className="lead">I combine technical writing with hands-on software development. My independent B2B technology articles and documentation samples explain APIs, software behavior, and technology concepts for developer and business audiences. The samples are self-directed and are not presented as commissioned work.</p>
      <p>Whether I'm building applications, exploring new technologies, or writing about emerging trends, I'm always looking for opportunities to learn, solve problems, and create meaningful work.</p>
      <h2>Frontend and backend development</h2>
      <p>I work with HTML, CSS, JavaScript, React, and Vite to build responsive interfaces. My project experience also includes Python, FastAPI, REST APIs, SQLite, PostgreSQL exploration, and connecting user-facing applications to backend services.</p>
      <p>Across independent products and team projects, I have worked on e-commerce, content platforms, task workflows, interface prototypes, and reusable portfolio experiences. The project catalogue distinguishes work I built independently from team-wide features and specific open-source contributions.</p>
      <h2>Learning through collaboration</h2>
      <p>Team and open-source work have helped me practice reading an existing codebase, making focused changes, and documenting what a contribution does. I continue to develop my skills through technical projects and structured learning, while being clear about what is implemented and what is still an exploration.</p>
      <h2>Education</h2>
      <p>I hold a B.A. in Philosophy from the University of Uyo (2021â€“2025). That academic background is part of my education; my current portfolio centers on software development and technical work.</p>
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
    <Meta title="Technical Articles & Insights" description="Six independent portfolio articles explaining SaaS, cloud computing, APIs, cybersecurity, artificial intelligence, and blockchain for business and technology readers." />
    <PageIntro eyebrow="TECHNICAL ARTICLES & INSIGHTS" title={<>Technology, made<br /><em>understandable.</em></>}>
      Beginner-friendly guides to software, cloud platforms, APIs, security, AI, and blockchainâ€”with diagrams and practical context.
    </PageIntro>
    <section className="container library"><div className="library-controls"><div className="filter-list" aria-label="Filter articles by category">{categories.map((item) => <button type="button" key={item} className={category === item ? 'filter active' : 'filter'} aria-pressed={category === item} onClick={() => selectCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={17} /><input aria-label="Search technical articles" placeholder="Search articlesâ€¦" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div><p className="result-count">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{category !== 'All articles' && ` in ${category}`}</p>{filtered.length ? <div className="article-grid">{filtered.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="empty-state"><h2>No articles found</h2><p>Try a different search or category.</p></div>}</section>
  </>;
}

function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFound />;
  const related = articles.filter((item) => item.slug !== article.slug).sort((left, right) => Number(right.category === article.category) - Number(left.category === article.category)).slice(0, 3);
  return <><Meta title={article.title} description={article.description} /><ReadingProgress /><article className="article-detail container"><div className="article-breadcrumb"><Link to="/writing">Technical Articles</Link><span>/</span><span>{article.category}</span></div><div className="article-head"><div className="eyebrow">{article.category}</div><h1>{article.title}</h1><p>{article.description}</p><div className="card-meta"><span>Godscovenant Patrick Udofe</span><span>{article.minutes} min read</span><span>Portfolio article</span></div>{article.tags?.length > 0 && <div className="article-tags" aria-label="Article tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</div><Cover type={article.cover} label={article.title} image={article.image} /><div className="article-body"><ArticleContent blocks={article.body} /></div><section className="related-section"><div className="eyebrow">KEEP READING</div><h2>Related <em>articles</em></h2><div className="article-grid">{related.map((item) => <ArticleCard article={item} key={item.slug} />)}</div></section><Link className="text-link" to="/writing">â† Back to technical articles</Link></article></>;
}

function Contact() {
  return <><Meta title="Contact" description="Contact Godscovenant Patrick Udofe about software projects and technical collaboration." /><PageIntro eyebrow="CONTACT" title={<>Letâ€™s talk about<br /><em>your next project.</em></>}>Iâ€™m open to thoughtful conversations about software, collaboration, and practical digital products.</PageIntro><section id="contact-details" className="container contact-layout"><div className="contact-aside"><div className="eyebrow">GET IN TOUCH</div><h2>Good work starts<br />with a <em>conversation.</em></h2><p>Reach me through email or verified profiles.</p><div className="contact-detail"><Mail size={18} /><span>Email<br /><a href={`mailto:${CONTACT_EMAIL}`}><small>{CONTACT_EMAIL}</small></a></span></div><div className="contact-detail"><span className="linkedin-mark">in</span><span>LinkedIn<br /><a href={SOCIAL_PROFILES.linkedin} target="_blank" rel="noopener noreferrer"><small>Visit my profile â†—</small></a></span></div><div className="contact-detail"><span className="linkedin-mark" aria-hidden="true">GH</span><span>GitHub<br /><a href={SOCIAL_PROFILES.github} target="_blank" rel="noopener noreferrer"><small>Visit my profile â†—</small></a></span></div></div><div><div className="eyebrow form-label">SEND A NOTE</div><ContactForm /></div></section></>;
}

function NotFound() {
  return <section className="not-found container"><span className="eyebrow">404 Â· PAGE NOT FOUND</span><h1>This page took<br />a <em>wrong turn.</em></h1><p>The page youâ€™re looking for may have moved, or may not exist.</p><Link className="button button-dark" to="/">Back to home <ArrowRight size={16} /></Link></section>;
}

export default function App() {
  return <><Navbar /><main className="route-transition"><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/writing" element={<TechnicalArticles />} /><Route path="/writing/:slug" element={<ArticleDetail />} /><Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact />} /><Route path="/technical-writing" element={<TechnicalWriting />} /><Route path="/b2b-technology" element={<Navigate to="/technical-writing" replace />} /><Route path="/projects/task-manager-docs" element={<TaskManagerDocs />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><BackToTop /><PortfolioAssistant /></>;
}
