import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Braces, BookOpen, ClipboardList } from 'lucide-react';
import Meta from '../components/Meta.jsx';

function CodeSample({ children, label = 'Example' }) {
  return <figure className="writing-code-sample"><figcaption>{label}</figcaption><pre><code>{children}</code></pre></figure>;
}

const endpoints = [
  ['GET',    '/tasks',           'List tasks; supports optional query filters.',           '200'],
  ['POST',   '/tasks',           'Create a new task from a title and optional description.','201'],
  ['GET',    '/tasks/{task_id}', 'Return one task by its integer ID.',                     '200, 404'],
  ['PATCH',  '/tasks/{task_id}', 'Update only the supplied task fields.',                  '200, 404, 422'],
  ['DELETE', '/tasks/{task_id}', 'Delete a task. The response has no body.',               '204, 404'],
];

export default function TaskManagerDocs() {
  return <>
    <Meta
      title="HNG Stage 1 Task Manager — Project Documentation"
      description="Independent documentation sample for the HNG Stage 1 Task Manager project: API reference, setup guide, architecture overview, and troubleshooting notes by Godscovenant Patrick Udofe."
    />

    {/* ── Hero ── */}
    <section className="page-intro container writing-hero">
      <div className="eyebrow">PROJECT DOCUMENTATION · INDEPENDENT SAMPLE</div>
      <h1>HNG Stage 1 Task Manager<br /><em>Documentation.</em></h1>
      <p>
        An independent documentation sample for the HNG Internship 15 Task Manager — a team-built
        React / FastAPI application developed by Team Zedu-Puffin. This page is a writing portfolio
        sample, not official project output.
      </p>
      <nav className="writing-section-nav" aria-label="Documentation sections">
        <a href="#overview">Overview</a>
        <a href="#api-reference">API reference</a>
        <a href="#setup">Setup guide</a>
        <a href="#architecture">Architecture</a>
      </nav>
    </section>

    {/* ── 01 · Overview ── */}
    <section className="writing-sample-section container" id="overview" aria-labelledby="overview-title">
      <div className="writing-section-heading">
        <span className="writing-section-icon"><ClipboardList size={19} /></span>
        <div>
          <span className="eyebrow">01 / PROJECT OVERVIEW</span>
          <h2 id="overview-title">What the Task Manager <em>does.</em></h2>
          <p>A full-stack task management application built during HNG Internship 15 by Team Zedu-Puffin.</p>
        </div>
      </div>
      <div className="writing-doc-card">
        <div className="writing-doc-overview">
          <h3>Project summary</h3>
          <p>
            The HNG Stage 1 Task Manager lets users create, track, and complete dated tasks through a
            React interface backed by a Python / FastAPI REST API. Tasks are persisted in SQLite for the
            internship deliverable, with PostgreSQL explored for production use.
          </p>
          <dl className="writing-facts">
            <div><dt>Frontend</dt><dd>React · Vite · <a href="https://hng-stage1-task-nu.vercel.app/" target="_blank" rel="noopener noreferrer">Live on Vercel ↗</a></dd></div>
            <div><dt>API (FastAPI)</dt><dd><a href="https://hngstage1-task.onrender.com/docs" target="_blank" rel="noopener noreferrer">OpenAPI docs on Render ↗</a></dd></div>
            <div><dt>Repository</dt><dd><a href="https://github.com/covenantudofe-creator/HngStage1_task" target="_blank" rel="noopener noreferrer">GitHub ↗</a></dd></div>
            <div><dt>Team</dt><dd>HNG Internship 15 — Team Zedu-Puffin</dd></div>
          </dl>
        </div>
        <div className="writing-two-col">
          <div>
            <h3>Core features</h3>
            <ul className="writing-plain-list">
              <li>Create, retrieve, edit, delete, and mark tasks complete.</li>
              <li>Descriptions, due dates, and in-progress / completed statuses.</li>
              <li>Monthly calendar and task timeline with progress indicators.</li>
              <li>Persistent task records in SQLite; PostgreSQL documented for production.</li>
            </ul>
          </div>
          <div>
            <h3>Technologies</h3>
            <ul className="writing-plain-list">
              <li><strong>Frontend:</strong> React, Vite, JavaScript</li>
              <li><strong>Backend:</strong> Python, FastAPI, Uvicorn</li>
              <li><strong>Data:</strong> SQLite (dev), PostgreSQL (explored)</li>
              <li><strong>Deployment:</strong> Vercel (frontend), Render (API)</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Scope and attribution</h3>
          <p>
            This is a team project. The repository documents overall functionality and does not
            attribute individual feature ownership to specific contributors. This documentation
            sample is an independent portfolio piece describing the project as a whole.
          </p>
        </div>
      </div>
    </section>

    {/* ── 02 · API Reference ── */}
    <section className="writing-sample-section writing-tutorials-section container" id="api-reference" aria-labelledby="api-reference-title">
      <div className="writing-section-heading">
        <span className="writing-section-icon"><Braces size={19} /></span>
        <div>
          <span className="eyebrow">02 / API REFERENCE · INDEPENDENT SAMPLE</span>
          <h2 id="api-reference-title">Task API <em>endpoints.</em></h2>
          <p>
            An illustrative REST contract derived from the FastAPI service. The deployed OpenAPI
            schema at <code>/docs</code> is the authoritative source; this sample documents the
            general structure and common behaviors.
          </p>
        </div>
      </div>
      <div className="writing-doc-card">
        <div className="writing-doc-overview">
          <h3>Base URL</h3>
          <p>The API is hosted on Render. Use the OpenAPI interactive docs to try requests directly.</p>
          <dl className="writing-facts">
            <div><dt>Production base URL</dt><dd><code>https://hngstage1-task.onrender.com</code></dd></div>
            <div><dt>Local development</dt><dd><code>http://127.0.0.1:8000</code></dd></div>
            <div><dt>Content type</dt><dd><code>application/json</code></dd></div>
            <div><dt>Authentication</dt><dd>Not required by the internship deliverable.</dd></div>
          </dl>
        </div>
        <div className="writing-endpoints">
          <h3>Endpoints</h3>
          <div className="writing-table-scroll">
            <table>
              <thead><tr><th scope="col">Method</th><th scope="col">Path</th><th scope="col">Purpose</th><th scope="col">Status codes</th></tr></thead>
              <tbody>{endpoints.map(([method, path, purpose, codes]) =>
                <tr key={`${method}-${path}`}>
                  <td><span className={`http-method http-${method.toLowerCase()}`}>{method}</span></td>
                  <td><code>{path}</code></td>
                  <td>{purpose}</td>
                  <td>{codes}</td>
                </tr>
              )}</tbody>
            </table>
          </div>
        </div>
        <div className="writing-two-col">
          <div>
            <h3>Create a task</h3>
            <CodeSample label="POST /tasks · request body">{`{
  "title": "Design calendar view",
  "description": "Monthly layout with task indicators"
}`}</CodeSample>
            <CodeSample label="201 Created · response">{`{
  "id": 42,
  "title": "Design calendar view",
  "description": "Monthly layout with task indicators",
  "status": "pending"
}`}</CodeSample>
          </div>
          <div>
            <h3>Update and delete</h3>
            <p><code>PATCH /tasks/42</code> accepts a partial object. Supply only the fields to change:</p>
            <CodeSample label="PATCH /tasks/{task_id} · request">{`{ "status": "completed" }`}</CodeSample>
            <p>A successful update returns <code>200 OK</code> and the updated task. <code>DELETE /tasks/42</code> returns <code>204 No Content</code> with no response body.</p>
            <h3>List filters</h3>
            <ul className="writing-plain-list">
              <li><code>status</code> — filter by <code>pending</code>, <code>in_progress</code>, or <code>completed</code>.</li>
              <li><code>limit</code> — page size 1–100; default 20.</li>
              <li><code>offset</code> — records to skip; default 0.</li>
            </ul>
          </div>
        </div>
        <div className="writing-two-col">
          <div>
            <h3>Status codes</h3>
            <ul className="writing-plain-list">
              <li><code>200</code> — request completed; body contains the resource.</li>
              <li><code>201</code> — task created; body contains the saved task.</li>
              <li><code>204</code> — task deleted; no body.</li>
              <li><code>404</code> — task ID not found.</li>
              <li><code>422</code> — validation failed; body contains a <code>detail</code> array.</li>
              <li><code>500</code> — unexpected server error.</li>
            </ul>
          </div>
          <div>
            <h3>Test with curl</h3>
            <CodeSample label="Terminal">{`curl -i -X POST https://hngstage1-task.onrender.com/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Design calendar view"}'`}</CodeSample>
            <p>Visit <a href="https://hngstage1-task.onrender.com/docs" target="_blank" rel="noopener noreferrer">the interactive OpenAPI docs ↗</a> to try every endpoint in the browser without writing a request.</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── 03 · Setup Guide ── */}
    <section className="writing-sample-section container" id="setup" aria-labelledby="setup-title">
      <div className="writing-section-heading">
        <span className="writing-section-icon"><BookOpen size={19} /></span>
        <div>
          <span className="eyebrow">03 / SETUP GUIDE · INDEPENDENT SAMPLE</span>
          <h2 id="setup-title">Running the project <em>locally.</em></h2>
          <p>
            Illustrative setup steps derived from the repository README. The repository's own files
            remain the source of truth for exact commands and runtime versions.
          </p>
        </div>
      </div>
      <div className="writing-doc-card writing-readme-sample">
        <div>
          <h3>Prerequisites</h3>
          <ul className="writing-plain-list">
            <li>Node.js (check the repository README for the supported version).</li>
            <li>Python 3.10 or later with <code>venv</code> available.</li>
            <li>Git to clone the repository.</li>
          </ul>
        </div>
        <div>
          <h3>Frontend setup</h3>
          <ol>
            <li>Clone the repository and navigate into the project directory.</li>
            <li>Install packages: <code>npm install</code>.</li>
            <li>Copy the example environment file and set <code>VITE_API_BASE_URL</code> to the API origin.</li>
            <li>Start the dev server: <code>npm run dev</code>.</li>
            <li>Open <code>http://localhost:5173</code> and verify the task list loads.</li>
          </ol>
        </div>
        <div>
          <h3>Backend (FastAPI) setup</h3>
          <ol>
            <li>Create and activate a Python virtual environment.</li>
            <li>Install dependencies: <code>pip install -r requirements.txt</code>.</li>
            <li>Set required environment variables (see configuration reference below).</li>
            <li>Start the server: <code>uvicorn main:app --reload</code>.</li>
            <li>Visit <code>http://127.0.0.1:8000/docs</code> to confirm the API is running.</li>
          </ol>
        </div>
        <div>
          <h3>Configuration reference</h3>
          <div className="writing-table-scroll">
            <table>
              <thead><tr><th scope="col">Variable</th><th scope="col">Used by</th><th scope="col">Purpose</th><th scope="col">Secret?</th></tr></thead>
              <tbody>
                <tr><td><code>VITE_API_BASE_URL</code></td><td>React client</td><td>Public API origin used by browser requests.</td><td>No; exposed in built assets.</td></tr>
                <tr><td><code>DATABASE_URL</code></td><td>FastAPI service</td><td>SQLite path (dev) or PostgreSQL connection string (prod).</td><td>Yes; keep in the hosting environment.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3>Troubleshooting</h3>
          <ul className="writing-plain-list">
            <li><strong>CORS error in browser:</strong> confirm the frontend's exact origin is listed in the API's allowed origins, including scheme and port.</li>
            <li><strong>Connection refused:</strong> verify the backend process is running and the configured API base URL and port match it.</li>
            <li><strong>404 on a valid route:</strong> check path, method, and any version prefix against the OpenAPI schema at <code>/docs</code>.</li>
            <li><strong>422 Unprocessable Entity:</strong> compare the request body structure and field types against the schema's validation response.</li>
            <li><strong>Database errors:</strong> check the connection URL, network access, and SSL settings; never log the full connection string.</li>
          </ul>
        </div>
      </div>
    </section>

    {/* ── 04 · Architecture ── */}
    <section className="writing-sample-section writing-docs-section" id="architecture" aria-labelledby="architecture-title">
      <div className="container">
        <div className="writing-section-heading">
          <span className="writing-section-icon"><Braces size={19} /></span>
          <div>
            <span className="eyebrow">04 / ARCHITECTURE OVERVIEW</span>
            <h2 id="architecture-title">How the layers <em>connect.</em></h2>
            <p>A high-level description of the application's frontend, API, and data layers.</p>
          </div>
        </div>
        <div className="writing-doc-card">
          <div className="writing-two-col">
            <div>
              <h3>Frontend — React / Vite</h3>
              <p>
                The browser client is a Vite-bundled React application. It reads the API origin from
                <code>VITE_API_BASE_URL</code>, sends <code>fetch</code> requests to the FastAPI service,
                and renders the returned task data into the calendar and task list views.
              </p>
              <CodeSample label="React fetch helper (illustrative)">{`const apiBase = import.meta.env.VITE_API_BASE_URL;

export async function loadTasks() {
  const res = await fetch(\`\${apiBase}/tasks\`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(\`\${res.status}\`);
  return res.json();
}`}</CodeSample>
            </div>
            <div>
              <h3>Backend — FastAPI / Python</h3>
              <p>
                The Python service exposes the task CRUD endpoints, validates request data with
                Pydantic models, persists records in SQLite, and generates an OpenAPI schema consumed
                by the interactive <code>/docs</code> page.
              </p>
              <CodeSample label="FastAPI route (illustrative)">{`from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)

@app.post("/tasks", status_code=201)
def create_task(task: TaskCreate):
    # real service persists to SQLite / PostgreSQL
    return {"id": 1, "title": task.title, "status": "pending"}`}</CodeSample>
              <h3>Data layer</h3>
              <p>
                SQLite stores task records for the internship deliverable. The project brief documents
                PostgreSQL exploration for a production deployment, using SQLAlchemy to manage
                connections and sessions.
              </p>
            </div>
          </div>
          <div>
            <h3>Request flow</h3>
            <ol>
              <li>The browser renders the React app served from Vercel.</li>
              <li>A user action (create, update, delete) triggers a <code>fetch</code> call to the Render-hosted API.</li>
              <li>FastAPI validates the request body with Pydantic, applies business logic, and reads or writes the SQLite database.</li>
              <li>The API returns a JSON response and HTTP status; the React client updates the UI.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="writing-final-cta container">
      <div>
        <span className="eyebrow">PROJECTS & DOCUMENTATION</span>
        <h2>Writing that starts<br />with understanding the <em>system.</em></h2>
      </div>
      <div>
        <Link className="button button-dark" to="/technical-writing">Technical writing samples <ArrowRight size={15} /></Link>
        <Link className="button button-outline" to="/projects">All projects <ArrowUpRight size={15} /></Link>
      </div>
    </section>
  </>;
}
