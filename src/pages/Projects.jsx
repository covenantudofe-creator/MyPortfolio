import Meta from '../components/Meta.jsx';
import { Link } from 'react-router-dom';
import resumeData from '../data/resumeData.json';
import { ArrowUpRight } from 'lucide-react';
import { assetPath } from '../utils/assetPath.js';

const groups = ['Independently Built Products', 'Team and Internship Projects', 'Independent Frontend Projects', 'Portfolio Projects'];
const allProjects = [...resumeData.projects, ...resumeData.additionalProjects];

function ProjectDetails({ project }) {
  return <details className="resume-project-card project-catalogue-card">
    <summary><span className="resume-project-number">↗</span><div>{project.image && <img className="project-detail-image" src={assetPath(project.image)} alt={`${project.title} project preview`} loading="lazy" />}<span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><span className="resume-status">{project.status || project.ownership}</span></div><span className="resume-expand">Project details <ArrowUpRight size={15} /></span></summary>
    <div className="resume-project-detail">
      <div><h4>Purpose</h4><p>{project.purpose || project.summary}</p></div>
      <div><h4>Problem / context</h4><p>{project.problem || 'The available project documentation does not state a separate problem statement.'}</p></div>
      {project.role && <div><h4>My role</h4><p>{project.role}</p></div>}
      <div><h4>Project type and status</h4><p>{project.ownership || project.status}</p></div>
      {project.technologies?.length > 0 && <div><h4>Technologies</h4><div className="resume-tags">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div></div>}
      {project.implemented?.length > 0 && <div><h4>Implemented features / work</h4><ul>{project.implemented.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      {project.notes?.length > 0 && <div className="resume-project-note"><h4>Project notes</h4><ul>{project.notes.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      <div className="resume-project-links">{(project.links || []).map((link) => link.url.startsWith('/')
        ? <Link to={link.url} key={link.url}>{link.label}<ArrowUpRight size={14} /></Link>
        : <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}</div>
    </div>
  </details>;
}

export default function Projects() {
  return <>
    <Meta title="Software Projects" description="Independent software products, team projects, frontend prototypes, and engineering contributions by Godscovenant Patrick Udofe." />
    <section className="projects-hero container" aria-labelledby="projects-title">
      <p className="eyebrow"><span className="eyebrow-line" /> PROJECTS &amp; ENGINEERING CONTRIBUTIONS</p>
      <h1 id="projects-title">Software built<br /><em>to be useful.</em></h1>
      <div className="projects-hero-copy"><span className="projects-hero-index">A closer look at my work</span><p>Independent products, team projects, and open-source contributions, with my role and each project’s status clearly identified.</p></div>
    </section>
    <section className="resume-project-section"><div className="container">{groups.map((group) => {
      const projects = allProjects.filter((project) => project.catalogueGroup === group);
      if (!projects.length) return null;
      return <section className="resume-project-group" key={group}><h2 className="resume-project-group-title">{group}</h2><div className="resume-project-list">{projects.map((project) => <ProjectDetails project={project} key={project.title} />)}</div></section>;
    })}
      <section className="resume-project-group"><h2 className="resume-project-group-title">Open-source and team contributions</h2><div className="resume-contribution-grid">{resumeData.contributions.map((item) => <article className="resume-contribution-card" key={item.url}><span className="eyebrow">{item.category}</span><span className="resume-status">{item.status}</span><h3>{item.title}</h3><p className="resume-contribution-org">{item.organization}</p><div className="contribution-details"><h4>Purpose</h4><p>{item.purpose}</p><h4>Problem / context</h4><p>{item.problem}</p><h4>My role</h4><p>{item.role}</p>{item.technologies?.length > 0 && <><h4>Technologies</h4><div className="resume-tags">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></>}</div><p>{item.summary}</p><a href={item.url} target="_blank" rel="noopener noreferrer">View pull request <ArrowUpRight size={14} /></a></article>)}</div></section>
    </div></section>
  </>;
}
