# Migrate from Clerk to Better Auth

This guide walks you through replacing Clerk with [Better Auth](https://www.better-auth.com) in your LaunchKit template. Better Auth is an open-source, self-hosted authentication library — no vendor lock-in, no per-user pricing.

**Time estimate:** 30-45 minutes

**What changes:**

| Layer                                 | Action                                                  |
| ------------------------------------- | ------------------------------------------------------- |
| Auth abstraction (`src/lib/auth.ts`)  | Replace 5 function bodies                               |
| Auth UI (4 component files + 2 pages) | Replace with custom forms                               |
| Middleware (`src/proxy.ts`)           | Replace Clerk middleware with Better Auth session check |
| Root layout (`src/app/layout.tsx`)    | Remove ClerkProvider                                    |
| Webhook (`src/app/api/auth/webhook/`) | Delete entirely                                         |
| Environment variables                 | Swap Clerk vars for Better Auth vars                    |
| Database                              | Run one migration                                       |

---

## Step 1: Install Dependencies

```bash
npm uninstall @clerk/nextjs svix
npm install better-auth
```

---

## Step 2: Set Up Better Auth Server

Create a new file called **better-auth-server.ts** in the lib directory:

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    type: "postgres",
    url: process.env.DATABASE_URL!
  },
  emailAndPassword: {
    enabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  }
});
```

Create the Better Auth API route at `src/app/api/auth/[...all]/route.ts`:

```typescript
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth-server"; // new file

export const { GET, POST } = toNextJsHandler(auth);
```

Create a new client helper file called **better-auth-client.ts** in the lib directory:

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL
});
```

---

## Step 3: Database Migration

Better Auth manages its own tables (`user`, `session`, `account`, `verification`). Run the Better Auth migration CLI:

```bash
npx better-auth migrate
```

Then update the LaunchKit `users` table to reference Better Auth's user ID instead of Clerk's:

```sql
-- Rename the column
ALTER TABLE users RENAME COLUMN clerk_id TO auth_provider_id;

-- Update the unique index
ALTER INDEX users_clerk_id_key RENAME TO users_auth_provider_id_key;
```

After this migration, update the column name in these files:

- `src/server/subscriptions/queries.ts` — change `.eq("clerk_id", ...)` to `.eq("auth_provider_id", ...)`
- `src/server/subscriptions/service.ts` — change `.eq("clerk_id", ...)` to `.eq("auth_provider_id", ...)` and rename the `clerkId` field in `UpsertSubscriptionInput` to `authUserId`
- `src/server/stripe/webhooks.ts` — change all references to `clerkId` metadata to `authUserId`
- `src/app/api/stripe/checkout/route.ts` — change `client_reference_id: userId` metadata key if applicable

---

## Step 4: Replace `src/lib/auth.ts`

Replace the entire file contents with:

```typescript
import { auth } from "@/lib/better-auth-server"; // created in Step 2
import { headers } from "next/headers";

export const AUTH_PROVIDER_NAME = "Better Auth";

export type AuthUser = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
};

export async function getAuthUserId(): Promise<string | null> {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session?.user?.id ?? null;
}

export async function requireAuth(): Promise<string> {
  const userId = await getAuthUserId();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email ?? null,
    firstName: session.user.name?.split(" ")[0] ?? null,
    lastName: session.user.name?.split(" ").slice(1).join(" ") ?? null,
    imageUrl: session.user.image ?? null
  };
}

export async function updateUserProfile(
  userId: string,
  data: { firstName: string; lastName: string }
): Promise<void> {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  await auth.api.updateUser({
    body: { name },
    headers: await headers()
  });
}

export async function deleteUserAccount(userId: string): Promise<void> {
  await auth.api.deleteUser({
    headers: await headers()
  });
}
```

That's it for the backend. All 9 server-side files that import from the auth module will work without any changes.

---

## Step 5: Replace Environment Variables

### Remove from `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
```

### Add to `.env.local`:

```
BETTER_AUTH_SECRET=your-random-secret-at-least-32-chars
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

### Update `src/lib/env.ts`:

In the `serverSchema`, replace:

```typescript
// Remove these:
CLERK_SECRET_KEY: z.string().min(1),
CLERK_WEBHOOK_SECRET: z.string().min(1).optional(),

// Add these:
BETTER_AUTH_SECRET: z.string().min(32),
DATABASE_URL: z.string().url(),
```

In the `clientSchema`, replace:

```typescript
// Remove this:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
```

---

## Step 6: Replace Root Layout

In `src/app/layout.tsx`, remove the Clerk provider logic:

```typescript
// Remove these imports:
import { ClerkProvider } from "@clerk/nextjs";

// Remove these variables:
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const enableClerk = ...;

// Replace the conditional return at the bottom.
// Before:
if (!enableClerk) {
  return content;
}
return <ClerkProvider>{content}</ClerkProvider>;

// After:
return content;
```

---

## Step 7: Replace Auth UI Components

### `src/components/auth/header-auth-buttons.tsx`

Replace the entire file:

```typescript
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth-client"; // created in Step 2

export default function HeaderAuthButtons() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="btn btn-ghost btn-sm">
          Dashboard
        </Link>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={async () => {
            await authClient.signOut();
            router.push("/");
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/sign-in" className="btn btn-ghost btn-sm">
        Sign in
      </Link>
      <Link href="/sign-up" className="btn btn-primary btn-sm">
        Get started
      </Link>
    </div>
  );
}
```

### `src/components/auth/sign-in-button.tsx`

Replace the entire file:

```typescript
import Link from "next/link";

export default function LaunchKitSignInButton() {
  return (
    <Link
      href="/sign-in"
      className="rounded-md border border-border/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-base-200"
    >
      Sign in
    </Link>
  );
}
```

### `src/components/auth/user-menu.tsx`

Replace the entire file:

```typescript
"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth-client"; // created in Step 2

export default function UserMenu() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {session?.user?.name?.[0] ?? "U"}
          </div>
        )}
      </div>
      <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-40 rounded-lg bg-base-100 p-2 shadow-lg">
        <li>
          <button
            onClick={async () => {
              await authClient.signOut();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
```

---

## Step 8: Replace Sign-In / Sign-Up Pages

### `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`

Replace the entire file:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/public-header";
import { authClient } from "@/lib/better-auth-client"; // created in Step 2

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password
    });

    if (result.error) {
      setError(result.error.message ?? "Invalid credentials");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
```

### `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`

Replace the entire file:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/public-header";
import { authClient } from "@/lib/better-auth-client"; // created in Step 2

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await authClient.signUp.email({
      name,
      email,
      password
    });

    if (result.error) {
      setError(result.error.message ?? "Could not create account");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Get started with your free account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
```

---

## Step 9: Replace Middleware

Replace `src/proxy.ts` with:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, windowMs: number, max: number) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }
  entry.count++;
  if (entry.count > max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  return { allowed: true, remaining: max - entry.count };
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

const SENSITIVE_PATHS = ["/sign-in", "/sign-up", "/api/auth"];

export default function middleware(request: NextRequest) {
  const ip = getClientIp(request);
  const path = request.nextUrl.pathname;
  const isSensitive = SENSITIVE_PATHS.some((p) => path.startsWith(p));

  const { allowed, remaining, resetAt } = isSensitive
    ? rateLimit(`sensitive:${ip}`, 15 * 60 * 1000, 5)
    : rateLimit(`public:${ip}`, 60 * 1000, 120);

  if (!allowed) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(((resetAt ?? 0) - Date.now()) / 1000)),
        "X-RateLimit-Remaining": "0"
      }
    });
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", String(remaining));
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};
```

---

## Step 10: Delete the Clerk Webhook

Better Auth writes directly to the database — no webhook sync needed.

```bash
rm src/app/api/auth/webhook/route.ts
```

However, you'll need to sync new Better Auth users to the LaunchKit `users` table. Add a Better Auth hook to the **better-auth-server.ts** file created in Step 2:

```typescript
import { betterAuth } from "better-auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const auth = betterAuth({
  database: {
    type: "postgres",
    url: process.env.DATABASE_URL!
  },
  emailAndPassword: {
    enabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  hooks: {
    after: [
      {
        matcher(context) {
          return context.path === "/sign-up/email";
        },
        async handler(ctx) {
          const user = ctx.context?.newUser;
          if (!user) return;

          await supabase.from("users").upsert(
            {
              auth_provider_id: user.id,
              email: user.email,
              name: user.name,
              avatar_url: user.image
            },
            { onConflict: "auth_provider_id" }
          );
        }
      }
    ]
  }
});
```

---

## Step 11: Update Stripe Metadata

In `src/app/api/stripe/checkout/route.ts`, the `client_reference_id` already uses the value from `getAuthUserId()` — no change needed.

In `src/server/stripe/webhooks.ts`, update the metadata key used to look up users:

```typescript
// Before:
const clerkId = subscription.metadata?.clerkId;

// After:
const authUserId = subscription.metadata?.authUserId;
```

And update the `UpsertSubscriptionInput` type in `src/server/subscriptions/service.ts`:

```typescript
// Before:
clerkId: string;

// After:
authUserId: string;
```

---

## Verification Checklist

After completing all steps:

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Visit `/sign-up` — create a test account
- [ ] Visit `/sign-in` — sign in with test credentials
- [ ] Visit `/dashboard` — see "Better Auth connected" in health check
- [ ] Visit `/dashboard/settings` — see your name and email, save a name change
- [ ] Visit `/dashboard/billing` — subscription lookup works
- [ ] Sign out from header — redirects to home
- [ ] Check Supabase `users` table — new user row exists with `auth_provider_id`

---

## Summary of Files Changed

| File                                             | Action                               |
| ------------------------------------------------ | ------------------------------------ |
| `src/lib/auth.ts`                                | Replace function bodies              |
| **better-auth-server.ts** (new)                  | New file in lib                      |
| **better-auth-client.ts** (new)                  | New file in lib                      |
| `src/app/api/auth/[...all]/route.ts`             | New file                             |
| `src/lib/env.ts`                                 | Swap Clerk vars for Better Auth vars |
| `src/app/layout.tsx`                             | Remove ClerkProvider                 |
| `src/proxy.ts`                                   | Replace middleware                   |
| `src/components/auth/header-auth-buttons.tsx`    | Replace component                    |
| `src/components/auth/sign-in-button.tsx`         | Replace component                    |
| `src/components/auth/user-menu.tsx`              | Replace component                    |
| `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx` | Replace with custom form             |
| `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx` | Replace with custom form             |
| `src/app/api/auth/webhook/route.ts`              | Delete                               |
| `src/server/subscriptions/service.ts`            | Rename `clerkId` field               |
| `src/server/subscriptions/queries.ts`            | Rename column reference              |
| `src/server/stripe/webhooks.ts`                  | Rename metadata key                  |
| Supabase migration                               | Rename `clerk_id` column             |
