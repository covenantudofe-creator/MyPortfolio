import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUp } from 'lucide-react';
import { CONTACT_EMAIL, SOCIAL_PROFILES } from '../data/contact.js';

const links = [['Home', '/'], ['About', '/about'], ['Projects', '/projects'], ['Technical Articles', '/writing'], ['Resume', '/resume'], ['Contact', '/contact']];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); updateSeo(location.pathname); }, [location.pathname]);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('theme', dark ? 'dark' : 'light'); }, [dark]);
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation"><Link className="brand" to="/"><span className="brand-mark">G</span><span>Godscovenant Udofe<small>Software Developer</small></span></Link><button type="button" className="icon-button mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button><div className={`nav-links ${open ? 'is-open' : ''}`}>{links.map(([name, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{name}</NavLink>)}<button type="button" className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div></nav></header>;
}

function updateSeo(path) {
  const labels = {'/': 'Software Developer | Godscovenant Patrick Udofe', '/about': 'About the Developer | Godscovenant Udofe', '/projects': 'Software Projects | Godscovenant Udofe', '/writing': 'Technical Articles & Insights | Godscovenant Udofe', '/resume': 'Software Developer Résumé | Godscovenant Udofe', '/contact': 'Contact | Godscovenant Udofe'};
  const descriptions = {'/': 'Software development portfolio featuring practical web products, collaborative projects, engineering contributions, and technical articles.', '/about': 'Software development journey, frontend and backend interests, collaborative projects, and technical education.', '/projects': 'Independent software products, team projects, prototypes, and verified engineering contributions.', '/writing': 'Six practical guides explaining SaaS, cloud computing, APIs, cybersecurity, artificial intelligence, and blockchain.', '/resume': 'Technical skills, software projects, contributions, education, and learning.', '/contact': 'Contact Godscovenant Patrick Udofe about software projects and technical collaboration.'};
  const title = labels[path] || 'Software Developer Portfolio | Godscovenant Udofe';
  const description = descriptions[path] || descriptions['/'];
  document.title = title;
  for (const [selector, value] of [['meta[name="description"]', description], ['meta[property="og:title"]', title], ['meta[property="og:description"]', description]]) document.querySelector(selector)?.setAttribute('content', value);
}

export function Footer() {
  return <footer className="footer">
    <div className="container">
      <section className="footer-cta" aria-labelledby="footer-cta-title">
        <div className="footer-cta-copy">
          <p className="eyebrow">SOFTWARE DEVELOPER · FRONTEND &amp; BACKEND</p>
          <h2 id="footer-cta-title">Let’s build something useful.</h2>
          <p>Have a project in mind? I’d be glad to hear about it.</p>
        </div>
        <a className="button button-dark footer-cta-button" href={`mailto:${CONTACT_EMAIL}`}>Contact me <span aria-hidden="true">↗</span></a>
      </section>
      <div className="footer-bottom">
        <div className="footer-signature"><Link className="footer-brand" to="/">Godscovenant Patrick Udofe</Link><span>Software Developer</span></div>
        <nav className="footer-navigation" aria-label="Footer navigation"><Link to="/projects">Projects</Link><Link to="/writing">Technical Articles</Link><Link to="/resume">Resume</Link></nav>
        <nav className="footer-social" aria-label="Contact and social links"><a href={`mailto:${CONTACT_EMAIL}`}>Email</a><a href={SOCIAL_PROFILES.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href={SOCIAL_PROFILES.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></nav>
        <span className="footer-copyright">© {new Date().getFullYear()} · Software development portfolio</span>
      </div>
    </div>
  </footer>;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > 450); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []);
  return show ? <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button> : null;
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const fn = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max * 100 : 0); }; window.addEventListener('scroll', fn); fn(); return () => window.removeEventListener('scroll', fn); }, []);
  return <div className="reading-progress" style={{ width: `${progress}%` }} />;
}
