# Godscovenant Patrick Udofe — Software Developer Portfolio

An editorial-style responsive technology portfolio built with React, Vite, React Router, Tailwind CSS v4, and Lucide icons.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; inspect it locally with `npm run preview`.

## Portfolio content

- Software project catalogue and verified contributions: `src/data/resumeData.json`.
- Six complete technology articles and diagrams: `src/data/technologyArticles.js` and `src/components/TechnicalDiagram.jsx`.
- Central contact details: `src/data/contact.js`.
- The technology-focused résumé PDF is generated from the résumé data and contact configuration with `npm run resume:pdf`.

## Routes

Home, About, Projects, Technical Articles and article detail pages, Resume, and Contact. The application includes responsive navigation, light/dark mode, article search and category filtering, reading progress, project details, contact actions, a portfolio assistant, and a custom not-found route.

## Contact form

The form validates its fields and prepares a message in the visitor’s default email application. The visitor must send the message there; the website does not send email directly.

## Deployment

Run `npm run build` and deploy `dist/` to a static host configured to serve `index.html` for client-side routes.
