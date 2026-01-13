This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Backend & Admin Panel

This portfolio now includes a PostgreSQL-backed content API and an admin panel for managing copy. The public pages read text by slug, so you can localize or update messaging without touching the UI code.

### Database setup

1. Create a PostgreSQL database and set `DATABASE_URL` in your environment (see `.env.example`).
2. Run the schema file:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

### Admin panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to add, edit, or delete content items. Changes are saved to Postgres via `/api/content`.

### API endpoints

- `GET /api/content` (optionally `?page=home`) to list content items.
- `POST /api/content` to create or update a slug.
- `PUT /api/content/:id` and `DELETE /api/content/:id` for editing or removing entries.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
