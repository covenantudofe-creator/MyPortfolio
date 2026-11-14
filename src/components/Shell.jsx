import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUp } from 'lucide-react';
import { CONTACT_EMAIL, SOCIAL_PROFILES } from '../data/contact.js';

const links = [['Home', '/'], ['About', '/about'], ['Projects', '/projects'], ['Technical Writing', '/technical-writing'], ['Articles', '/writing'], ['Résumé', '/resume'], ['Contact', '/contact']];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('theme', dark ? 'dark' : 'light'); }, [dark]);
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation"><Link className="brand" to="/"><span className="brand-mark">G</span><span>Godscovenant Udofe<small>Technical Writer | Software Developer</small></span></Link><button type="button" className="icon-button mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button><div id="primary-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>{links.map(([name, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{name}</NavLink>)}<button type="button" className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div></nav></header>;
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
        <div className="footer-signature"><Link className="footer-brand" to="/">Godscovenant Patrick Udofe</Link><span>Technical Writer | Software Developer</span></div>
        <nav className="footer-navigation" aria-label="Footer navigation"><Link to="/projects">Projects</Link><Link to="/technical-writing">Technical Writing</Link><Link to="/writing">Articles</Link><Link to="/resume">Résumé</Link></nav>
        <nav className="footer-social" aria-label="Contact and social links"><a href={`mailto:${CONTACT_EMAIL}`}>Email</a><a href={SOCIAL_PROFILES.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href={SOCIAL_PROFILES.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></nav>
        <span className="footer-copyright">© {new Date().getFullYear()} · Technical writing and software development portfolio</span>
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
