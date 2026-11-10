import { CONTACT_EMAIL } from '../data/contact.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactDetails({ name, email, subject, message }) {
  if (!name.trim()) return { valid: false, field: 'name', message: 'Please enter your name.' };
  if (!email.trim()) return { valid: false, field: 'email', message: 'Please enter your email address.' };
  if (!EMAIL_PATTERN.test(email.trim())) return { valid: false, field: 'email', message: 'Please enter a valid email address.' };
  if (!subject.trim()) return { valid: false, field: 'subject', message: 'Please enter a subject.' };
  if (!message.trim()) return { valid: false, field: 'message', message: 'Please enter a message.' };
  return { valid: true };
}

export function buildContactMailto({ name, email, subject, message }) {
  const emailSubject = `Portfolio enquiry: ${subject.trim()}`;
  const emailBody = [
    `Name: ${name.trim()}`,
    `Reply email: ${email.trim()}`,
    '',
    message.trim(),
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}
