import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, SOCIAL_PROFILES } from '../data/contact.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div><p className="eyebrow">LET’S MAKE SOMETHING MATTER</p><h2>Have a story in mind?</h2></div>
        <a className="button button-light" href={`mailto:${CONTACT_EMAIL}`}>Start a conversation <ArrowUpRight size={16} /></a>
      </div>
      <div className="container footer-bottom">
        <Link className="footer-brand" to="/">Godscovenant Patrick Udofe</Link>
        <p>Words that inform. Stories that connect. Ideas that inspire.</p>
        <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
        <a href={SOCIAL_PROFILES.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
        <a href={SOCIAL_PROFILES.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>
        <span>© {new Date().getFullYear()} · Made with intention.</span>
      </div>
    </footer>
  )
}
