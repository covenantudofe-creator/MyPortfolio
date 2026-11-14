import { useEffect } from 'react';

const SITE_URL = 'https://my-portfolio-nine-beta-94.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/images/profile-photo.jpg`;

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export default function Meta({ title, description, path, image = DEFAULT_IMAGE }) {
  useEffect(() => {
    const pageTitle = `${title} | Godscovenant Patrick Udofe`;
    const canonicalUrl = new URL(path || window.location.pathname, SITE_URL).href;
    document.title = pageTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', pageTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', pageTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    const canonical = document.head.querySelector('link[rel="canonical"]') || document.head.appendChild(document.createElement('link'));
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
  }, [title, description, path, image]);
  return null;
}
