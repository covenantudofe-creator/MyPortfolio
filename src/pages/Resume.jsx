import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail } from 'lucide-react';
import Meta from '../components/Meta.jsx';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_PROFILES } from '../data/contact.js';
import resumeData from '../data/resumeData.json';

const allProjects = [...resumeData.projects, ...resumeData.additionalProjects];
const projectCategories = ['All projects', ...new Set(allProjects.map((project) => project.category))];
const projectGroupOrder = ['Independently Built Products', 'Team and Internship Projects', 'Portfolio Projects', 'Independent Frontend Projects'];

function ProjectLinks({ links = [] }) {
  if (!links.length) return null;
  return <div className="resume-project-links">{links.map((link) => link.url.startsWith('/')
    ? <Link to={link.url} key={link.url}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>
    : <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>;
}

function ProjectCard({ project, index }) {
  return <details className="resume-project-card" key={project.title}>
    <summary><span className="resume-project-number">{String(index + 1).padStart(2, '0')}</span><div>{project.image && <img className="project-detail-image" src={project.image} alt={`${project.title} project preview`} loading="lazy" />}<span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><span className="resume-status">{project.status || project.ownership}</span></div><span className="resume-expand">View Project Details <ArrowUpRight size={15} /></span></summary>
    <div className="resume-project-detail">
      {project.purpose && <div><h4>Purpose</h4><p>{project.purpose}</p></div>}
      {project.problem && <div><h4>Problem / context</h4><p>{project.problem}</p></div>}
      {project.role && <div><h4>Role &amp; Contribution</h4><p>{project.role}</p></div>}
      {project.ownership && <div><h4>Ownership / Status</h4><p>{project.ownership}</p></div>}
      {project.technologies?.length > 0 && <div><h4>Technology</h4><div className="resume-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>}
      {project.implemented?.length > 0 && <div><h4>Key Features &amp; Contributions</h4><ul>{project.implemented.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
      {project.planned?.length > 0 && <div className="resume-planned"><h4>Planned Scope</h4><ul>{project.planned.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
      {project.notes?.length > 0 && <div className="resume-project-note"><h4>Verification Notes</h4><ul>{project.notes.map((note) => <li key={note}>{note}</li>)}</ul></div>}
      <ProjectLinks links={project.links} />
    </div>
  </details>;
}

export default function Resume() {
  const [projectCategory, setProjectCategory] = useState('All projects');
  const visibleProjects = useMemo(() => projectCategory === 'All projects'
    ? allProjects
    : allProjects.filter((project) => project.category === projectCategory), [projectCategory]);

  return <>
    <Meta title="Software Developer Résumé" description="Explore Godscovenant Patrick Udofe’s technical skills, software projects, engineering contributions, education, and technical learning." />
    <section className="page-hero container resume-hero">
      <p className="eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPER RÉSUMÉ</p>
      <h1>Software Developer<br /><em>Frontend &amp; Backend</em></h1>
      <p className="page-deck">{resumeData.intro}</p>
      <div className="resume-actions">
        <a className="button button-dark" href="/documents/Godscovenant_Patrick_Udofe_Resume.pdf" download="Godscovenant_Patrick_Udofe_Resume.pdf">Download Resume <ArrowDownToLine size={16} /></a>
        <a className="button button-outline" href={`mailto:${CONTACT_EMAIL}`}>Contact Me <Mail size={16} /></a>
      </div>
      <div className="resume-contact-links"><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a><a href={SOCIAL_PROFILES.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={SOCIAL_PROFILES.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a></div>
    </section>

    <section className="resume-section container resume-summary" aria-labelledby="resume-summary-title">
      <div className="resume-section-aside"><span className="eyebrow">01 / PROFILE</span><h2 id="resume-summary-title">Professional <em>summary</em></h2></div>
      <div><p className="resume-lead">{resumeData.summary}</p><div className="resume-focus">{resumeData.titles.map((title) => <span key={title}>{title}</span>)}</div></div>
    </section>

    <section className="resume-section container" aria-labelledby="resume-experience-title">
      <div className="resume-section-heading"><span className="eyebrow">02 / TECHNICAL EXPERIENCE</span><h2 id="resume-experience-title">Projects &amp; <em>collaboration</em></h2></div>
      <div className="resume-timeline">{resumeData.experience.map((item) => <article className="resume-timeline-item" key={`${item.organization}-${item.role}`}><span className="resume-timeline-mark" aria-hidden="true" /><div className="resume-timeline-meta"><BriefcaseBusiness size={16} /><span>{item.period}</span></div><h3>{item.role}</h3><h4>{item.organization}</h4><p>{item.summary}</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</div>
    </section>

    <section className="resume-project-section" aria-labelledby="resume-projects-title">
      <div className="container">
      <div className="resume-section-heading"><span className="eyebrow">03 / SELECTED PROJECTS</span><h2 id="resume-projects-title">Things I’ve <em>built</em></h2><p>Selected independent products, team projects, and portfolio work.</p></div>
        <div className="resume-project-filters" role="group" aria-label="Filter projects by category">{projectCategories.map((category) => <button type="button" key={category} className={projectCategory === category ? 'filter active' : 'filter'} aria-pressed={projectCategory === category} onClick={() => setProjectCategory(category)}>{category}</button>)}</div>
        {projectGroupOrder.map((group) => {
          const groupProjects = visibleProjects.filter((project) => project.catalogueGroup === group);
          if (!groupProjects.length) return null;
          return <div className="resume-project-group" key={group}><h3 className="resume-project-group-title">{group}</h3><div className="resume-project-list">{groupProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div></div>;
        })}
      </div>
    </section>

    <section className="resume-section container" aria-labelledby="resume-contributions-title">
      <div className="resume-section-heading"><span className="eyebrow">04 / OPEN SOURCE &amp; TEAM CONTRIBUTIONS</span><h2 id="resume-contributions-title">Contribute, improve, <em>iterate</em></h2><p>Pull requests are identified as merged or open; the Ziki redesign remains a separate project.</p></div>
      <div className="resume-contribution-grid">{resumeData.contributions.map((item) => <article className="resume-contribution-card" key={item.url}><span className="eyebrow">{item.category}</span><span className="resume-status">{item.status}</span><h3>{item.title}</h3><p className="resume-contribution-org">{item.organization}</p><div className="contribution-details"><h4>Purpose</h4><p>{item.purpose}</p><h4>Problem / context</h4><p>{item.problem}</p><h4>My role</h4><p>{item.role}</p>{item.technologies?.length > 0 && <><h4>Technologies</h4><div className="resume-tags">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></>}</div><p>{item.summary}</p>{item.notes?.map((note) => <small className="resume-project-note" key={note}>{note}</small>)}<a href={item.url} target="_blank" rel="noopener noreferrer">View Pull Request <ArrowUpRight size={14} /></a></article>)}</div>
    </section>

    <section className="resume-section container" aria-labelledby="resume-skills-title">
      <div className="resume-section-heading"><span className="eyebrow">05 / TECHNICAL CAPABILITIES</span><h2 id="resume-skills-title">Skills &amp; <em>tools</em></h2><p>Categories distinguish project use from foundational knowledge and learning interests.</p></div>
      <div className="resume-skills-grid">{resumeData.skills.map((group) => <article className="resume-skill-card" key={group.category}><h3>{group.category}</h3><p>{group.basis}</p><div className="resume-tags">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
    </section>

    <section className="resume-section container resume-education-section" aria-labelledby="resume-education-title">
      <div className="resume-section-heading"><span className="eyebrow">06 / EDUCATION</span><h2 id="resume-education-title">Education &amp; <em>development</em></h2></div>
      <div className="resume-education-grid">
        <article className="resume-education-card"><GraduationCap size={22} /><span className="eyebrow">EDUCATION</span>{resumeData.education.map((item) => <div key={item.qualification}><h3>{item.qualification}</h3><p>{item.institution}</p><small>{item.period}</small></div>)}</article>
        <article className="resume-education-card resume-courses"><span className="eyebrow">COURSEWORK &amp; LEARNING</span><p>{resumeData.notes.developmentRecords}</p><ul>{resumeData.professionalDevelopment.map((course) => <li key={`${course.name}-${course.provider}`}><span>{course.name}</span><small>{course.provider}{course.year !== 'Not provided' ? ` · ${course.year}` : ''}</small></li>)}</ul></article>
      </div>
    </section>

    <section className="resume-contact-cta"><div className="container resume-contact-cta-inner"><div><span className="eyebrow">LET’S CONTINUE THE CONVERSATION</span><h2>Good work begins<br />with a <em>good question.</em></h2></div><a className="button button-light" href={`mailto:${CONTACT_EMAIL}`}>Contact Godscovenant <Mail size={16} /></a></div></section>
  </>;
}
