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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Waiting List Email Collection

1. Create a Supabase project and a `waiting_list` table as described in the code comments.
2. Add the following to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

3. Emails submitted via the form will be stored in Supabase.

## Email Confirmation with Resend

1. Create a free account at https://resend.com/ and get your API key.
2. Add the following to your `.env.local`:

```
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender@email.com
```

3. Users will receive a confirmation email when they join the waiting list.

## Live Active Users Table Setup

To enable live tracking of users on the site, create a new table in your Supabase project:

```sql
create table active_users (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  joined_at timestamp with time zone default timezone('utc'::text, now())
);
```

- `session_id`: A unique identifier for each browser session.
- `joined_at`: Timestamp when the user joined.

Enable Realtime on this table in the Supabase dashboard for best results.
