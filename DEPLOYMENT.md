# Deployment Guide for Vercel 🚀

The project is **ready for deployment**. All build errors have been resolved.

## 1. Prerequisites
- A GitHub account (repo pushed).
- A Vercel account.
- A hosted PostgreSQL database (Vercel Postgres, Neon, or Supabase).

## 2. Environment Variables
Configure these in Vercel > Settings > Environment Variables:

| Variable | Description | Example / Value |
|----------|-------------|-----------------|
| `DATABASE_URL` | **Required**. Connection string to your hosted DB. | `postgres://user:pass@host:5432/db` |
| `GITHUB_USERNAME` | **Required** for stats. | `AlibekIsomov` |
| `GITHUB_TOKEN` | Optional but recommended for stats API limits. | `ghp_...` |
| `ADMIN_AUTH_SECRET` | **Required** for admin session security. | Generate with `openssl rand -base64 32` |
| `ADMIN_USERNAME` | **Required** for Admin Login. | `admin` |
| `ADMIN_PASSWORD` | **Required** for Admin Login. | `secure_password` |

## 3. Deployment Steps
1.  **Push Code**: Ensure all changes are committed and pushed to GitHub.
2.  **Import**: Go to Vercel, "Add New Project", and import your repository.
3.  **Configure**: Add the Environment Variables listed above.
4.  **Deploy**: Click "Deploy".
    - Vercel will install dependencies.
    - It will run `prisma generate` (via the `postinstall` script I added).
    - It will run `npm run build`.

## 4. Troubleshooting
- If the build fails on database connection, double-check `DATABASE_URL`.
- If you see "Prisma Client not initialized", ensure `prisma generate` ran.
