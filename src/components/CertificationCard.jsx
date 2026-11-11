import { Award, ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CertificationCard({ certificate, compact = false }) {
  return (
    <article className={`certification-card${compact ? ' certification-card-compact' : ''}`}>
      <div className="certification-mark" aria-hidden="true"><Award size={21} /></div>
      <div className="certification-copy">
        <span className="eyebrow">CERTIFICATION</span>
        <h3>{certificate.title}</h3>
        <dl className="certification-details">
          <div><dt>Issued by</dt><dd>{certificate.issuer}</dd></div>
          <div><dt>Completed</dt><dd>{certificate.completed}</dd></div>
        </dl>
      </div>
      {!compact && certificate.available && <a className="certification-preview" href={certificate.file} target="_blank" rel="noopener noreferrer"><img src={certificate.file} alt={`${certificate.title} certificate issued to Godscovenant Patrick Udofe by ${certificate.issuer} on ${certificate.completed}`} loading="lazy" /></a>}
      <div className="certification-actions">
        {certificate.available
          ? <a className="button button-dark" href={certificate.file} target="_blank" rel="noopener noreferrer">View certificate <ArrowUpRight size={15} /></a>
          : <span className="button button-outline certification-pending" aria-disabled="true">Certificate file pending</span>}
        {compact && <Link className="text-link" to="/resume#certifications">Résumé details <ArrowUpRight size={14} /></Link>}
        {!compact && !certificate.available && <p className="certification-note">Add the original certificate image or PDF to <code>public/documents/certificates/</code> to enable viewing.</p>}
      </div>
      {!compact && certificate.available && <a className="certification-download" href={certificate.file} download><Download size={14} /> Download certificate</a>}
    </article>
  );
}
