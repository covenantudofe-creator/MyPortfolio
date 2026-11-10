import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'

export default function NotFound() {
  return <><Meta title="Page not found" description="The page you were looking for could not be found. Browse the software projects of Godscovenant Patrick Udofe." /><section className="not-found container"><p className="eyebrow"><span className="eyebrow-line" /> A PAGE THAT ISN’T HERE</p><span className="not-found-number">404</span><h1>Well, this is <em>unexpected.</em></h1><p>The page you’re looking for may have moved, or may not exist.</p><div><Link className="button button-dark" to="/">Back to home <ArrowLeft size={15} /></Link><Link className="text-link" to="/projects">Browse projects <ArrowRight size={15} /></Link></div></section></>
}
