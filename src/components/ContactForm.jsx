import { useState } from 'react';
import { Send } from 'lucide-react';
import { buildContactMailto, validateContactDetails } from '../utils/contactEmail.js';

export default function ContactForm(){
  const [feedback,setFeedback]=useState('');
  function submit(event){
    event.preventDefault();
    const fields=new FormData(event.currentTarget);
    const details={name:String(fields.get('name')||''),email:String(fields.get('email')||''),subject:String(fields.get('subject')||''),message:String(fields.get('message')||'')};
    const validation=validateContactDetails(details);
    if(!validation.valid){setFeedback(validation.message);event.currentTarget.elements.namedItem(validation.field)?.focus();return;}
    setFeedback('Opening a prepared draft in your email application. Press Send there to deliver your message.');
    window.location.href=buildContactMailto(details);
  }
  return <form className="contact-form" noValidate onSubmit={submit}><div className="form-grid"><label>Your name<input name="name" autoComplete="name" required placeholder="How should I address you?"/></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="Your email address"/></label></div><label>Subject<input name="subject" required placeholder="What would you like to discuss?"/></label><label>Message<textarea name="message" rows="5" required placeholder="Share a little about your project…"/></label><button className="button button-dark" type="submit">Send <Send size={16}/></button>{feedback&&<p className="form-feedback" role="status" aria-live="polite">{feedback}</p>}</form>
}
