# Dr Divya's Skin Clinic Website

This project is built with Next.js App Router and includes:

- SEO-optimized pages with route-level metadata.
- Firestore-backed blog management.
- Firebase Auth protected admin dashboard.
- Blog analytics (view counts + lead insights).
- Site-wide popup contact form and contact capture API.

## 1. Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Fill all Firebase values in `.env.local`:

- `NEXT_PUBLIC_FIREBASE_*` values from Firebase web app settings.
- `FIREBASE_*` values from Firebase service account credentials.

## 2. Firebase Requirements

1. Enable Firebase Authentication with Email/Password provider.
2. Create at least one admin user in Firebase Auth.
3. Enable Cloud Firestore.
4. Firestore collections used by the app:

- `blogs`
- `contactLeads`

## 3. Run the App

```bash
npm run dev
```

Open http://localhost:3000.

## 4. Admin URLs

- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- New blog post form: `/admin/blogs/new`

## 5. Notes

- Blog content supports safe HTML tags for internal linking and richer formatting.
- Blog SEO fields are stored per post (meta title, description, keywords).
- If Firebase Admin credentials are missing, the site falls back to static sample blogs.
