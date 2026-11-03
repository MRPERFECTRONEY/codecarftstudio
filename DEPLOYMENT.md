# CodeCraft Studio — production deployment

## Stack
- React + Vite frontend
- Express API
- PostgreSQL via the `pg` driver
- Admin authentication via a signed, short-lived token

## Required environment variables
Set these in your hosting provider (never commit real credentials):
- `DATABASE_URL`: managed PostgreSQL connection string
- `JWT_SECRET`: random secret, minimum 32 characters
- `ADMIN_EMAIL`: admin login email
- `ADMIN_PASSWORD_HASH`: output of `createPasswordHash` in `server/auth.js`

Generate a password hash after installing dependencies:
```sh
node --input-type=module -e "import('./server/auth.js').then(m => console.log(m.createPasswordHash('REPLACE_WITH_A_LONG_UNIQUE_PASSWORD')))"
```

## Free-hosting warning
A free web-service filesystem is ephemeral. Do not store production records in local files. Connect an external managed PostgreSQL service and review its current free-tier retention, backups, connection limits, and inactivity policies before using it for client data. Free database tiers can expire or pause; keep independent backups.

## Deploy
1. Create a managed PostgreSQL database and copy its connection string.
2. Set the required environment variables in the hosting dashboard.
3. Build the frontend with `npm run build`.
4. Start the API with `npm start`.
5. Verify `/api/health` reports PostgreSQL as connected.
6. Test inquiry submission, admin sign-in, project updates, and tracking with a real test record before launch.

Do not use sample/demo client records as portfolio proof. Add only work and metrics you can substantiate.
