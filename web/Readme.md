## Little Wins Together – Web

This is the Next.js web app for **Little Wins Together**.

- **Framework**: Next.js (App Router) with TypeScript  
- **Styling**: Tailwind CSS  
- **Design tone**: calm, spacious, soft, and supportive

### Development

From the `web` folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

The main landing hero is defined in `app/page.tsx` and is designed to be easy to customize by editing the constants at the top of the file.


### Supabase setup

Create a Supabase project, then copy `web/.env.local.example` to `web/.env.local`.

In the Supabase dashboard, open your project settings and use:

- **Project URL** for `NEXT_PUBLIC_SUPABASE_URL`
- **Publishable key / anon key** for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Only use public browser-safe keys in `NEXT_PUBLIC_` environment variables. Never place a Supabase service role key in frontend environment variables or commit it to the repository.
