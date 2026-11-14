import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Braces, ClipboardList, FileText } from 'lucide-react';
import Meta from '../components/Meta.jsx';
import { articles } from '../data/articles.js';

const apiArticle = articles.find((article) => article.slug === 'understanding-apis');

function CodeSample({ children, label = 'Example' }) {
  return <figure className="writing-code-sample"><figcaption>{label}</figcaption><pre><code>{children}</code></pre></figure>;
}

const endpoints = [
  ['GET', '/tasks', 'List tasks; accepts the optional filters below.', '200'],
  ['POST', '/tasks', 'Create a task from a title and optional description.', '201'],
  ['GET', '/tasks/{task_id}', 'Return one task by its integer ID.', '200, 404'],
  ['PATCH', '/tasks/{task_id}', 'Update only the supplied task fields.', '200, 404, 422'],
  ['DELETE', '/tasks/{task_id}', 'Delete a task. The response has no body.', '204, 404'],
];

export default function TechnicalWriting() {
  return <>
    <Meta title="Technical Writing & Documentation" description="Independent API documentation, developer tutorial, technical explainer, and software documentation samples by Godscovenant Patrick Udofe." />
    <section className="page-intro container writing-hero">
      <div className="eyebrow">TECHNICAL WRITING &amp; DOCUMENTATION</div>
      <h1>Clear words for<br /><em>working software.</em></h1>
      <p>These independent portfolio samples show how I turn source code, API behavior, and setup steps into practical material for developers and product teams. They are self-directed samples, not commissioned client work.</p>
      <nav className="writing-section-nav" aria-label="Technical writing sample sections">
        <a href="#api-documentation">API documentation</a><a href="#developer-tutorials">Developer tutorials</a><a href="#technical-explainers">Explainers</a><a href="#software-documentation">Software documentation</a>
      </nav>
    </section>

    <section className="writing-sample-section container" id="api-documentation" aria-labelledby="api-documentation-title">
      <div className="writing-section-heading"><span className="writing-section-icon"><Braces size={19} /></span><div><span className="eyebrow">01 / API DOCUMENTATION · INDEPENDENT SAMPLE</span><h2 id="api-documentation-title">Task API <em>reference</em></h2><p>An illustrative REST contract for a small task service. It is documentation practice and does not claim to describe the HNG Internship API.</p></div></div>
      <div className="writing-doc-card">
        <div className="writing-doc-overview">
          <h3>Overview</h3><p>The sample API manages tasks as JSON resources. Each task has an integer <code>id</code>, a required <code>title</code>, an optional <code>description</code>, and a <code>status</code> of <code>pending</code>, <code>in_progress</code>, or <code>completed</code>.</p>
          <dl className="writing-facts"><div><dt>Base URL (local example)</dt><dd><code>http://127.0.0.1:8000</code></dd></div><div><dt>Content type</dt><dd><code>application/json</code></dd></div><div><dt>Authentication</dt><dd>Not implemented in this illustrative sample. Do not use it as a production security model.</dd></div></dl>
        </div>
        <div className="writing-endpoints"><h3>Endpoints</h3><div className="writing-table-scroll"><table><thead><tr><th scope="col">Method</th><th scope="col">Path</th><th scope="col">Purpose</th><th scope="col">Success / error</th></tr></thead><tbody>{endpoints.map(([method, path, purpose, codes]) => <tr key={`${method}-${path}`}><td><span className={`http-method http-${method.toLowerCase()}`}>{method}</span></td><td><code>{path}</code></td><td>{purpose}</td><td>{codes}</td></tr>)}</tbody></table></div></div>
        <div className="writing-two-col">
          <div><h3>List filters</h3><ul className="writing-plain-list"><li><code>status</code> — optional enum filter: <code>pending</code>, <code>in_progress</code>, or <code>completed</code>.</li><li><code>limit</code> — optional page size from 1 to 100; default 20.</li><li><code>offset</code> — optional non-negative number of records to skip; default 0.</li></ul></div>
          <div><h3>Create a task</h3><CodeSample label="POST /tasks · request">{`{
  "title": "Write an API quickstart",
  "description": "Document setup and verification"
}`}</CodeSample></div>
        </div>
        <div className="writing-two-col">
          <div><h3>Response</h3><p>A successful create returns <code>201 Created</code> and the saved task:</p><CodeSample label="201 Created · response">{`{
  "id": 17,
  "title": "Write an API quickstart",
  "description": "Document setup and verification",
  "status": "pending"
}`}</CodeSample></div>
          <div><h3>Update and delete</h3><p><code>PATCH /tasks/17</code> accepts a partial object, such as <code>{'{"status":"completed"}'}</code>. A successful update returns the updated task with <code>200 OK</code>. A successful <code>DELETE /tasks/17</code> returns <code>204 No Content</code> and no response body.</p></div>
        </div>
        <div className="writing-two-col">
          <div><h3>Errors and status codes</h3><ul className="writing-plain-list"><li><code>200</code> — request completed.</li><li><code>201</code> — task created.</li><li><code>204</code> — task deleted; no body.</li><li><code>404</code> — task ID does not exist.</li><li><code>422</code> — request data failed validation.</li><li><code>500</code> — unexpected server error; clients should avoid exposing internal details.</li></ul><p>FastAPI’s default validation response uses a <code>detail</code> array; an application can customize error handling, so clients should follow the deployed API’s OpenAPI schema.</p></div>
          <div><h3>Test with curl</h3><p>With a compatible sample service running locally, create a task and inspect the HTTP status and JSON response:</p><CodeSample label="Terminal">{`curl -i -X POST http://127.0.0.1:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write an API quickstart"}'`}</CodeSample><p>In Postman, use the same URL, select <code>POST</code>, set the JSON content type, add the body, and confirm the response status and returned task.</p></div>
        </div>
      </div>
    </section>

    <section className="writing-sample-section writing-tutorials-section" id="developer-tutorials" aria-labelledby="developer-tutorials-title">
      <div className="container"><div className="writing-section-heading"><span className="writing-section-icon"><BookOpen size={19} /></span><div><span className="eyebrow">02 / DEVELOPER TUTORIALS · INDEPENDENT SAMPLES</span><h2 id="developer-tutorials-title">Build it, connect it, <em>explain it.</em></h2><p>Short, reproducible guides grounded in the Python, FastAPI, React, and database tools represented in my project work.</p></div></div>
        <div className="writing-tutorial-grid">
          <article className="writing-tutorial-card"><span className="eyebrow">FASTAPI · PYTHON</span><h3>Building a REST API with FastAPI</h3><p>Define a validated request model, expose a resource endpoint, return a creation status, and describe the generated OpenAPI docs. This minimal example uses in-memory storage to keep the tutorial focused; its data is lost when the process stops.</p><CodeSample label="main.py · excerpt">{`from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)

@app.post("/tasks", status_code=201)
def create_task(task: TaskCreate):
    return {"id": 1, "title": task.title, "status": "pending"}`}</CodeSample><p>Install <code>fastapi</code> and <code>uvicorn</code>, save the module as <code>main.py</code>, then run <code>uvicorn main:app --reload</code>. Visit <code>/docs</code> to try the endpoint. Replace the fixed ID with persistent storage before building a real service.</p></article>
          <article className="writing-tutorial-card"><span className="eyebrow">REACT · API INTEGRATION</span><h3>Connecting React to a FastAPI backend</h3><p>Keep the browser request explicit: read a configured API origin, check the response, handle network or HTTP failures, and let the backend validate data.</p><CodeSample label="React · request helper">{`const apiBase = import.meta.env.VITE_API_BASE_URL;

export async function loadTasks() {
  const response = await fetch(
    \`${'${apiBase}'}/tasks\`,
    { headers: { Accept: "application/json" } }
  );
  if (!response.ok) {
    throw new Error(\`Task request failed: \${response.status}\`);
  }
  return response.json();
}`}</CodeSample><p>Set the API origin in the frontend environment and configure FastAPI CORS for the exact deployed frontend origin. A <code>VITE_</code> value is public in the built client; never place credentials or private API keys there.</p></article>
          <article className="writing-tutorial-card"><span className="eyebrow">FASTAPI · POSTGRESQL</span><h3>Connecting FastAPI to PostgreSQL</h3><p>Read the database URL from backend environment configuration, create a SQLAlchemy engine, and yield a short-lived session per request.</p><CodeSample label="database.py · excerpt">{`from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(
    bind=engine, autoflush=False, expire_on_commit=False
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`}</CodeSample><p>Install SQLAlchemy and a PostgreSQL driver such as Psycopg. For a hosted Neon database, use its connection URL and required SSL settings from the provider; keep the value in the server environment, never in frontend code or version control.</p></article>
          <article className="writing-tutorial-card"><span className="eyebrow">POSTMAN · API TESTING</span><h3>Testing an API with Postman</h3><ol><li>Create an environment variable such as <code>base_url</code> for the service origin.</li><li>Send a <code>POST</code> request with a JSON body and the <code>Content-Type: application/json</code> header.</li><li>Check the status, response fields, validation behavior, and a missing-resource case.</li><li>Use the created ID in a <code>GET</code>, <code>PATCH</code>, and <code>DELETE</code> request to exercise the documented lifecycle.</li></ol><CodeSample label="Postman Tests tab">{`pm.test("creates a task", () => {
  pm.response.to.have.status(201);
  pm.expect(pm.response.json()).to.have.property("id");
});`}</CodeSample><p>Use disposable test data and keep tokens or secrets in a private environment rather than exporting them with a public collection.</p></article>
        </div>
      </div>
    </section>

    <section className="writing-sample-section container" id="technical-explainers" aria-labelledby="technical-explainers-title">
      <div className="writing-section-heading"><span className="writing-section-icon"><FileText size={19} /></span><div><span className="eyebrow">03 / TECHNICAL EXPLAINERS</span><h2 id="technical-explainers-title">Make technical ideas <em>usable.</em></h2><p>My published portfolio articles are independent writing samples. The API guide is a good place to start.</p></div></div>
      <div className="writing-explainer-grid">
        <article><h3>REST APIs</h3><p>A REST-style web API exposes resources through URLs and uses HTTP semantics to read or change them. The API contract defines accepted data, permissions, and errors.</p>{apiArticle && <Link className="text-link" to={`/writing/${apiArticle.slug}`}>Read the API explainer <ArrowUpRight size={14} /></Link>}</article>
        <article><h3>HTTP methods</h3><p><code>GET</code> reads data and is intended to be safe. <code>POST</code> submits data and may create a resource. <code>PUT</code> replaces a representation, while <code>PATCH</code> applies partial changes. <code>DELETE</code> requests removal. The server’s contract still determines exact behavior.</p></article>
        <article><h3>PostgreSQL</h3><p>PostgreSQL is a relational database. Tables organize rows by defined columns, and SQL queries retrieve or change records. Constraints and transactions help preserve relationships and consistency.</p></article>
        <article><h3>Frontend–backend communication</h3><p>A browser client sends an HTTP request to a backend endpoint. The service validates input, applies application rules, accesses data when needed, then returns a status and response the interface can interpret.</p></article>
        <article><h3>CRUD operations</h3><p>Create, read, update, and delete describe common data operations. A task interface might create a task, list or retrieve it, update its status, and delete it through corresponding API actions.</p></article>
      </div>
      <Link className="writing-browse-link" to="/writing">Browse all technical articles <ArrowRight size={15} /></Link>
    </section>

    <section className="writing-sample-section writing-docs-section" id="software-documentation" aria-labelledby="software-documentation-title">
      <div className="container"><div className="writing-section-heading"><span className="writing-section-icon"><ClipboardList size={19} /></span><div><span className="eyebrow">04 / SOFTWARE DOCUMENTATION · INDEPENDENT SAMPLE</span><h2 id="software-documentation-title">A README that gets a developer <em>started.</em></h2><p>A practical documentation pattern for a React client and FastAPI service. Commands and variable names here are illustrative; a real repository’s own files remain the source of truth.</p></div></div>
        <div className="writing-doc-card writing-readme-sample">
          <div><h3>Installation and local setup</h3><ol><li>Clone the repository and check its README for the supported runtime versions.</li><li>Install frontend packages with <code>npm install</code>.</li><li>Create and activate a Python virtual environment for the API, then install its pinned requirements.</li><li>Copy the documented example environment file and set local values outside version control.</li><li>Start the API and client in separate terminals using their documented development commands.</li><li>Open the client and verify a health check or a documented read operation.</li></ol></div>
          <div><h3>Configuration reference</h3><div className="writing-table-scroll"><table><thead><tr><th scope="col">Variable</th><th scope="col">Used by</th><th scope="col">Purpose</th><th scope="col">Secret?</th></tr></thead><tbody><tr><td><code>VITE_API_BASE_URL</code></td><td>React client</td><td>Public API origin used by browser requests.</td><td>No; exposed in built assets.</td></tr><tr><td><code>DATABASE_URL</code></td><td>FastAPI service</td><td>Server-side database connection string.</td><td>Yes; keep it in the hosting environment.</td></tr></tbody></table></div><p>Actual projects may use different variable names. Document required values, accepted formats, defaults, and where each value is configured without copying real credentials into a README.</p></div>
          <div><h3>Troubleshooting checklist</h3><ul className="writing-plain-list"><li><strong>Browser reports a CORS error:</strong> check that the frontend’s exact origin is allowed by the API, including scheme and port.</li><li><strong>Connection refused:</strong> confirm the backend process is running and the configured API origin and port match it.</li><li><strong>404 response:</strong> check the route path, HTTP method, and API version prefix against the OpenAPI schema.</li><li><strong>422 response:</strong> compare the request body and types with the documented schema and validation response.</li><li><strong>Database connection fails:</strong> check the server-side URL, network access, SSL settings, and secret configuration without printing credentials.</li></ul></div>
          <div><h3>README structure</h3><CodeSample label="Suggested sections">{`# Project name
## What it does
## Architecture
## Requirements
## Installation
## Configuration
## Run locally
## API reference
## Tests
## Troubleshooting
## Deployment`}</CodeSample></div>
        </div>
      </div>
    </section>

    <section className="writing-final-cta container"><div><span className="eyebrow">WRITING &amp; SOFTWARE</span><h2>Clear documentation begins<br />with understanding the <em>system.</em></h2></div><div><Link className="button button-dark" to="/resume">View résumé <ArrowRight size={15} /></Link><Link className="button button-outline" to="/contact">Discuss a role <ArrowUpRight size={15} /></Link></div></section>
  </>;
}
