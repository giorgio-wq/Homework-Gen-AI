# Studio Legale Caso — academic prototype

This repository contains an academic website prototype created for **Studio Legale Caso**. It is not the firm's official website and must not be used to request legal assistance. Do not enter confidential or otherwise sensitive information in the contact form.

The public prototype is available at:

<https://homework-gen-ai.giorgiogiancaspro.workers.dev/>

## Technology

- React and TypeScript
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS
- Lenis for smooth scrolling
- Resend-backed server function for the contact form

## Development

Use Node.js and npm:

```bash
npm install
npm run dev
```

The other supported scripts are:

```bash
npm run lint
npm run build
npm run build:dev
npm run preview
```

## Contact form

The form is active. Submissions are validated on the client and server and are sent through the configured server-side email provider. Messages currently reach the project mailbox configured by the project owner, not an official Studio Legale Caso mailbox; the recipient and credentials are never exposed in the browser. The configured reply-to address is the email address entered by the visitor. The form is available in Italian and English and includes a honeypot and rate limiting.

The deployment must provide the existing server variables `RESEND_API_KEY` and `CONTACT_TO_EMAIL`; `CONTACT_FROM_EMAIL` is optional. Values are intentionally not documented here. Never submit confidential information.
