const palette = { ink: '#302b29', wine: '#743944', gold: '#b28b50', paper: '#f5f1e9', pale: '#e8dfd3', sage: '#dce4dc', muted: '#776e66', line: '#aa9e91' }

function Box({ x, y, w, h, title, lines = [], fill = palette.paper, stroke = palette.line, accent = palette.wine }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
    <path d={`M${x + 12} ${y}h${w - 24}`} stroke={accent} strokeWidth="3" />
    <text x={x + w / 2} y={y + 27} textAnchor="middle" className="diagram-title">{title}</text>
    {lines.map((line, i) => <text key={line} x={x + w / 2} y={y + 49 + i * 17} textAnchor="middle" className="diagram-label">{line}</text>)}
  </g>
}
function Arrow({ d, label, x, y, reverse = false }) {
  return <g>
    <path d={d} fill="none" stroke={palette.wine} strokeWidth="2" markerEnd={reverse ? 'url(#diagram-arrow-reverse)' : 'url(#diagram-arrow)'} />
    {label && <text x={x} y={y} textAnchor="middle" className="diagram-small">{label}</text>}
  </g>
}
function Diagram({ id, title, description, caption, children }) {
  return <figure className="technical-figure">
    <div className="technical-figure-scroll" role="region" aria-label={`${title} diagram; scroll horizontally on small screens`} tabIndex="0">
      <svg className="technical-diagram" viewBox="0 0 760 300" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{description}</desc>
        <defs>
          <marker id="diagram-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={palette.wine} /></marker>
          <marker id="diagram-arrow-reverse" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M10 0L0 5L10 10z" fill={palette.wine} /></marker>
        </defs>
        <rect x="1" y="1" width="758" height="298" rx="12" fill={palette.paper} stroke={palette.pale} />
        {children}
      </svg>
    </div>
    <figcaption><span>FIGURE 1</span>{caption}</figcaption>
  </figure>
}

export default function TechnicalDiagram({ type }) {
  if (type === 'saas') return <Diagram id="saas" title="How a SaaS application is delivered" description="Users connect over the internet to a provider-hosted SaaS application. The provider manages application infrastructure and its database; the business manages user access and its information." caption="Customers use the application over the internet while the provider operates the hosting infrastructure. Data and access responsibilities still need to be agreed between both sides.">
    <text x="380" y="29" textAnchor="middle" className="diagram-kicker">SOFTWARE AS A SERVICE</text>
    <Box x={24} y={90} w={145} h={105} title="Business users" lines={['Browser or app', 'Authorized accounts']} fill="#fffdf8" />
    <Arrow d="M170 142H257" label="request / use" x={213} y={128} />
    <g><rect x="267" y="61" width="466" height="179" rx="15" fill="#eee8de" stroke={palette.gold} strokeDasharray="5 5"/><text x="500" y="84" textAnchor="middle" className="diagram-small">SAAS PROVIDER MANAGES HOSTING</text></g>
    <Box x={292} y={105} w={175} h={98} title="SaaS application" lines={['Business features', 'Updates & operations']} fill={palette.sage} />
    <Arrow d="M468 154H530" label="reads / writes" x={500} y={139} />
    <Box x={540} y={105} w={160} h={98} title="Database" lines={['Customer records', 'Provider-hosted']} fill="#fffdf8" />
    <text x="500" y="222" textAnchor="middle" className="diagram-small">Underlying servers, storage, networking and maintenance</text>
    <text x="380" y="272" textAnchor="middle" className="diagram-small">Business configures users and permissions; provider responsibility varies by service.</text>
  </Diagram>

  if (type === 'cloud') return <Diagram id="cloud" title="Small business cloud environments" description="A small business accesses applications, storage and computing from cloud environments. Public cloud resources are provider-operated and shared across customers with logical separation; private cloud is dedicated to one organization; hybrid connects environments." caption="Public, private and hybrid describe deployment arrangements. The business reaches selected services through a provider, with responsibility and access controls defined for each service.">
    <text x="380" y="29" textAnchor="middle" className="diagram-kicker">CLOUD DEPLOYMENT OPTIONS</text>
    <Box x={22} y={91} w={150} h={116} title="Small business" lines={['Staff & devices', 'Internet connection']} fill="#fffdf8" />
    <Arrow d="M173 149H226" label="secure access" x={199} y={135} />
    <Box x={237} y={66} w={155} h={82} title="Public cloud" lines={['Provider-operated', 'Shared, separated resources']} fill={palette.sage} />
    <Box x={237} y={165} w={155} h={82} title="Private cloud" lines={['Dedicated to one', 'organization']} fill="#fffdf8" />
    <Box x={434} y={111} w={149} h={97} title="Hybrid cloud" lines={['Connected public +', 'private environments']} fill="#f0e3d8" />
    <path d="M393 106H423M393 206H423M430 117L419 106L430 95M430 200L419 211L430 222" fill="none" stroke={palette.gold} strokeWidth="2" />
    <Arrow d="M585 159H627" label="services" x={605} y={145} />
    <Box x={637} y={96} w={104} h={126} title="Resources" lines={['Storage', 'Apps', 'Compute']} fill="#fffdf8" />
    <text x="380" y="275" textAnchor="middle" className="diagram-small">Provider operates cloud services; the business manages its data, users, configuration and chosen workload.</text>
  </Diagram>

  if (type === 'api') return <Diagram id="api" title="API request and response cycle" description="Application A sends a request to an API. The API validates and forwards it to a server, which processes it; the response returns through the API to Application A." caption="The API defines the allowed request and response format. The server performs the underlying work, and the result travels back along the same integration path.">
    <text x="380" y="29" textAnchor="middle" className="diagram-kicker">REQUEST → PROCESSING → RESPONSE</text>
    <Box x={24} y={101} w={142} h={98} title="Application A" lines={['Sends request', 'Receives result']} fill="#fffdf8" />
    <Box x={243} y={101} w={142} h={98} title="API" lines={['Checks format & access', 'Routes the request']} fill="#f0e3d8" />
    <Box x={461} y={101} w={142} h={98} title="Server" lines={['Applies business rules', 'Reads or updates data']} fill={palette.sage} />
    <Box x={642} y={115} w={94} h={70} title="Result" lines={['Status + data']} fill="#fffdf8" />
    <Arrow d="M168 123H238" label="1 · request" x={203} y={109} />
    <Arrow d="M385 123H456" label="2 · forward" x={420} y={109} />
    <Arrow d="M462 178H390" label="3 · response" x={426} y={202} reverse />
    <Arrow d="M244 178H174" label="4 · return" x={209} y={202} reverse />
    <path d="M604 150H636" fill="none" stroke={palette.gold} strokeWidth="1.5" strokeDasharray="4 4" />
    <text x="380" y="263" textAnchor="middle" className="diagram-small">A response may contain a success or error status and the data the API permits.</text>
  </Diagram>

  if (type === 'security') return <Diagram id="security" title="Layered cybersecurity protections" description="Five complementary controls protect business assets: network security, application security, authentication, endpoint protection and data protection. No single layer replaces the others." caption="Security layers overlap to reduce exposure and limit harm. Their design should reflect the business systems, information and risks that matter most.">
    <text x="380" y="29" textAnchor="middle" className="diagram-kicker">DEFENSE IN DEPTH · COMPLEMENTARY CONTROLS</text>
    <g fill="none" stroke={palette.gold} strokeWidth="2"><rect x="57" y="54" width="646" height="207" rx="33"/><rect x="92" y="74" width="576" height="168" rx="29"/><rect x="127" y="94" width="506" height="129" rx="25"/><rect x="162" y="114" width="436" height="90" rx="22"/><rect x="197" y="134" width="366" height="51" rx="18"/></g>
    <Box x={211} y={61} w={338} h={34} title="Network security · firewalls & segmentation" fill="#fffdf8" />
    <Box x={229} y={101} w={302} h={34} title="Application security · updates & testing" fill={palette.sage} />
    <Box x={247} y={141} w={266} h={34} title="Authentication · MFA & account controls" fill="#f0e3d8" />
    <text x="380" y="206" textAnchor="middle" className="diagram-title">Endpoint protection · supported, managed devices</text>
    <text x="380" y="239" textAnchor="middle" className="diagram-title">Data protection · access, encryption & tested backups</text>
    <text x="380" y="282" textAnchor="middle" className="diagram-small">Each layer helps prevent, detect or recover from different kinds of failure.</text>
  </Diagram>

  if (type === 'ai') return <Diagram id="ai" title="Human-guided business AI workflow" description="Business data enters an AI system, which analyzes it and produces recommendations. A human reviews the result and makes or approves the decision. Example tasks include support suggestions, demand forecasts and workflow automation." caption="AI can organize information and suggest next steps. People remain accountable for reviewing outputs, handling exceptions and making consequential decisions.">
    <text x="380" y="29" textAnchor="middle" className="diagram-kicker">A HUMAN-GUIDED AI WORKFLOW</text>
    <Box x={20} y={102} w={128} h={94} title="Data input" lines={['Orders · tickets', 'Approved records']} fill="#fffdf8" />
    <Box x={184} y={102} w={132} h={94} title="AI processing" lines={['Classify · predict', 'Draft · summarize']} fill="#e7dce8" />
    <Box x={352} y={102} w={125} h={94} title="Analysis" lines={['Patterns & limits', 'Uncertainty']} fill={palette.sage} />
    <Box x={513} y={102} w={119} h={94} title="Suggestion" lines={['Next step', 'For review']} fill="#f0e3d8" />
    <Box x={666} y={102} w={77} h={94} title="Human" lines={['Decides']} fill="#fffdf8" />
    <Arrow d="M149 149H179" x={164} y={137} /><Arrow d="M317 149H347" x={332} y={137} /><Arrow d="M478 149H508" x={493} y={137} /><Arrow d="M633 149H661" x={647} y={137} />
    <text x="380" y="234" textAnchor="middle" className="diagram-label">Examples: support reply suggestions · demand forecasts · routine workflow automation</text>
    <text x="380" y="267" textAnchor="middle" className="diagram-small">Check outputs against source information; route uncertain or high-impact cases to a person.</text>
  </Diagram>

  if (type === 'blockchain') return <Diagram id="blockchain" title="Simplified distributed ledger" description="Three network participants maintain copies of a ledger. Proposed transactions are checked under the network's rules, grouped into a block, and linked to the prior block using a cryptographic reference. Different blockchains use different validation and governance designs." caption="This simplified view shows replicated records and cryptographic links. Verification rules vary between blockchains, and a verified record does not prove that the original real-world input was true.">
    <text x="380" y="29" textAnchor="middle" className="diagram-kicker">A SIMPLIFIED DISTRIBUTED LEDGER</text>
    <Box x={28} y={63} w={149} h={66} title="Participant A" lines={['Ledger copy']} fill="#fffdf8" />
    <Box x={28} y={143} w={149} h={66} title="Participant B" lines={['Ledger copy']} fill="#fffdf8" />
    <Box x={28} y={223} w={149} h={55} title="Participant C" lines={['Ledger copy']} fill="#fffdf8" />
    <path d="M179 94H215V175H179M179 175H215M179 250H215V175" fill="none" stroke={palette.gold} strokeWidth="2" />
    <Box x={232} y={113} w={135} h={119} title="Transaction" lines={['Order / transfer', 'Proposed record']} fill="#f0e3d8" />
    <Arrow d="M368 173H414" label="verify by rules" x={391} y={159} />
    <Box x={425} y={113} w={138} h={119} title="Block" lines={['Transactions', 'Previous-block link', 'Accepted record']} fill={palette.sage} />
    <Arrow d="M564 173H600" label="linked to" x={582} y={159} />
    <Box x={611} y={113} w={122} h={119} title="Earlier block" lines={['Prior records', 'Cryptographic', 'reference']} fill="#fffdf8" />
    <text x="478" y="262" textAnchor="middle" className="diagram-small">Participants maintain synchronized copies; consensus and access rules depend on the network.</text>
  </Diagram>
  return null
}
