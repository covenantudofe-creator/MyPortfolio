import { assistantKnowledge as knowledge } from '../data/assistantKnowledge.js';

const makeReply = (topic, text, links = []) => ({ topic, text, links });
const emailLink = () => ({ label: knowledge.contact.email, href: `mailto:${knowledge.contact.email}` });

function projectLinkItems(project) {
  return (project.links || []).slice(0, 5).map((link) => link.url.startsWith('/')
    ? { label: link.label, to: link.url }
    : { label: link.label, href: link.url });
}

function projectAnswer(question) {
  const normalized = question.toLowerCase();
  if (/\bziki\b/.test(normalized) && /\b(pr|pull request)\b/.test(normalized)) {
    const contribution = knowledge.contributions.find((item) => item.title.includes('#624'));
    if (contribution) return makeReply('projects', `${contribution.title}. ${contribution.summary} Status: ${contribution.status}`, [{ label: 'View pull request', href: contribution.url }]);
  }
  const prNumber = normalized.match(/(?:pr|pull request)\s*#?(624|27|71|73)|#(624|27|71|73)/);
  if (prNumber) {
    const number = prNumber[1] || prNumber[2];
    const contribution = knowledge.contributions.find((item) => item.title.includes(`#${number}`));
    if (contribution) return makeReply('projects', `${contribution.title}. ${contribution.summary} Status: ${contribution.status}`, [{ label: 'View pull request', href: contribution.url }]);
  }
  if (/\b(zedu|pull request|contribut|open.source)\b/.test(normalized) && /\b(contribut\w*|pull request|pr|changes?)\b/.test(normalized)) {
    const items = knowledge.contributions.filter((item) => item.organization.includes('Zedu Desktop'));
    return makeReply('projects', `Godscovenant’s verified Zedu Desktop work is represented by these individual pull requests; the wider application is a team project. ${items.map((item) => `${item.title}: ${item.summary} Status: ${item.status}`).join(' ')}`, items.map((item) => ({ label: item.title, href: item.url })));
  }
  const allProjects = [...knowledge.projects, ...knowledge.additionalProjects];
  const direct = allProjects.find((project) => normalized.includes(project.title.toLowerCase()));
  const aliases = [
    [/\b(noir|perfume store|noir scents)\b/, 'Noir Scents'],
    [/\bcoveilla\b/, 'Coveilla Blog'],
    [/\bziki redesign\b|\bziki\b|\bcollaborative workspace\b/, 'Ziki Redesign'],
    [/\b(start\.ng|startng|whimsical design|creator companion|robot companion)\b/, 'Start.ng — Whimsical Creator Companion'],
    [/\b(hng|task manager|task-management)\b/, 'HNG Stage 1 Task Manager'],
    [/\b(zedu|flutter desktop)\b/, 'Zedu Desktop'],
    [/\bcalculator\b/, 'Basic Calculator'],
    [/\b(image gallery|gallery)\b/, 'Image Gallery'],
    [/\b(todo card|todo-card)\b/, 'Todo Card Stage 1a'],
    [/\b(portfolio website|this portfolio|portfolio site)\b/, 'Portfolio Website'],
  ];
  const project = direct || allProjects.find((item) => aliases.some(([pattern, title]) => item.title === title && pattern.test(normalized)));
  if (project) {
    const features = (project.implemented || []).slice(0, 3).join(' ');
    const tech = project.technologies?.length ? ` Technologies: ${project.technologies.join(', ')}.` : '';
    return makeReply('projects', `${project.title}. ${project.summary} My role: ${project.role || project.ownership}. Status: ${project.status || project.ownership}.${tech}${features ? ` Key work: ${features}` : ''}`, projectLinkItems(project));
  }
  const main = knowledge.projects.slice(0, 7);
  return makeReply('projects', `The portfolio includes ${knowledge.projects.length} selected software projects, ${knowledge.additionalProjects.length} smaller frontend projects, and ${knowledge.contributions.length} linked engineering contributions. Independent products, prototypes, team projects, and pull requests are identified separately.`, [
    { label: 'View all projects', to: '/projects' },
    ...main.map((item) => ({ label: item.title, href: item.links?.find((link) => link.url.startsWith('http'))?.url })).filter((item) => item.href),
  ]);
}

export function answerPortfolioQuestion(rawQuestion, previousTopic = '') {
  const question = rawQuestion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (/\b(cv|resume|curriculum vitae)\b/.test(question)) return makeReply('cv', "You can download Godscovenant’s résumé from the portfolio or contact her to request a copy.", [
    { label: 'Download résumé', href: knowledge.cv.downloadPath, download: true }, emailLink(),
  ]);
  if (/\b(phone|telephone|call|contact number|phone number)\b/.test(question)) return makeReply('phone', `You can reach Godscovenant on ${knowledge.contact.phone} or by email at ${knowledge.contact.email}.`, [
    { label: knowledge.contact.phone, href: `tel:${knowledge.contact.phone}` }, emailLink(),
  ]);
  if (/\b(email|e-mail|contact|reach|hire|collaborat|inquir)\b/.test(question)) return makeReply('email', `You can reach Godscovenant at ${knowledge.contact.email}.`, [emailLink()]);
  if (/\b(education|degree|university|studied)\b/.test(question)) return makeReply('education', knowledge.education.map((item) => `${item.qualification}, ${item.institution} (${item.period})`).join('; '));
  if (/\b(technology|technologies|tech stack|skills|frameworks|programming languages)\b/.test(question)) {
    const skillGroups = knowledge.skills.map((group) => `${group.category}: ${group.items.join(', ')}`).join('. ');
    return makeReply('skills', `${skillGroups}. The résumé distinguishes project use from current learning areas.`, [{ label: 'View résumé', to: '/resume' }]);
  }
  if (/\b(experience|experienced|employment|internship|how long|years?)\b/.test(question)) return makeReply('experience', knowledge.experience, [{ label: 'View résumé', to: '/resume' }]);
  if (/\b(projects?|built|products?|contribut\w*|pull request|pr|ziki|noir|coveilla|zedu|calculator|gallery|todo.card|start.ng|startng|whimsical)\b/.test(question)) return projectAnswer(question);
  if (/\b(article|articles|technical writing|insights|saas|cloud|api|cybersecurity|blockchain|artificial intelligence)\b/.test(question)) {
    return makeReply('articles', 'The portfolio has six technical articles on SaaS, cloud computing, APIs, cybersecurity, artificial intelligence, and blockchain, with explanatory diagrams.', [{ label: 'Browse technical articles', to: '/writing' }]);
  }
  if (/\b(who built|who developed|developer behind|built this portfolio)\b/.test(question)) return makeReply('about', 'Godscovenant Patrick Udofe built and maintains this React and Vite portfolio.', [{ label: 'View portfolio project', to: '/projects' }]);
  if (/\b(it|that|those|them|more|one)\b|\bhow about\b/.test(question)) {
    if (previousTopic === 'email') return makeReply('email', `You can email Godscovenant at ${knowledge.contact.email}.`, [emailLink()]);
    if (previousTopic === 'projects') return projectAnswer(question);
    if (previousTopic === 'experience') return makeReply('experience', knowledge.experience);
  }
  return makeReply('unknown', `I can answer questions about Godscovenant’s technical skills, software projects, engineering contributions, education, résumé, and contact details.`, [{ label: 'Browse projects', to: '/projects' }, { label: 'Browse technical articles', to: '/writing' }, emailLink()]);
}
