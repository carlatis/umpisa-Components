## Folder structure

```
assets/       Tailwind entry stylesheet
components/   Reusable React components and public exports
public/       Static assets used by the playground
server/       Server-safe Next.js configuration helpers
utils/        Framework-neutral shared utilities
app/          Standalone Next.js component playground
```

## Run the component playground

This repository is also a standalone Next.js application for visually testing the library:

```bash
npm install
npm run dev
```

Open http://localhost:3001. Click **Open component playground** to test the authenticated shell, buttons, badges, cards, inputs, validation state, and empty state. Run `npm run build` to verify both the distributable library and playground; `npm run build:lib` builds only the package in `dist`.

This directory is an independent repository. Commit and push it before changing the frontend dependency from `file:../component-library` to its GitLab URL.
