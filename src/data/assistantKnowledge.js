import { CONTACT_EMAIL, CONTACT_PHONE } from './contact.js';
import resumeData from './resumeData.json';
import { articles } from './articles.js';

export const assistantKnowledge = {
  contact: { email: CONTACT_EMAIL, phone: CONTACT_PHONE },
  cv: { downloadPath: resumeData.downloadPath },
  experience: 'The portfolio documents independent software projects, an HNG Internship 15 team project, and frontend programme support at TS Academy. Total software employment tenure is not specified.',
  education: resumeData.education,
  skills: resumeData.skills,
  projects: resumeData.projects,
  additionalProjects: resumeData.additionalProjects,
  contributions: resumeData.contributions,
  articles,
};

export const assistantSuggestedQuestions = [
  'What technologies does she use?',
  'What software projects has she built?',
  'What has she contributed to Zedu Desktop?',
  'What is her education?',
  'Can I download her résumé?',
  'How can I contact her?',
];
