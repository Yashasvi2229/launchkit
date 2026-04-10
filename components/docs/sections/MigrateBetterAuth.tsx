import { CodeBlock } from "@/components/docs/CodeBlock";
import {
  ArrowRightLeft,
  Package,
  Server,
  Database,
  KeyRound,
  Layout,
  UserCircle,
  LogIn,
  Shield,
  Trash2,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────────────────────── */

const CHANGE_OVERVIEW = [
  { layer: "Auth abstraction (src/lib/auth.ts)", action: "Replace 5 function bodies" },
  { layer: "Auth UI (4 components + 2 pages)", action: "Replace with custom forms" },
  { layer: "Middleware (src/proxy.ts)", action: "Replace Clerk middleware with Better Auth session check" },
  { layer: "Root layout (src/app/layout.tsx)", action: "Remove ClerkProvider" },
  { layer: "Webhook (src/app/api/auth/webhook/)", action: "Delete entirely" },
  { layer: "Environment variables", action: "Swap Clerk vars for Better Auth vars" },
  { layer: "Database", action: "Run one migration" },
];

const FILES_CHANGED = [
  { file: "src/lib/auth.ts", action: "Replace function bodies" },
  { file: "better-auth-server.ts (new)", action: "New file in lib" },
  { file: "better-auth-client.ts (new)", action: "New file in lib" },
  { file: "src/app/api/auth/[...all]/route.ts", action: "New file" },
  { file: "src/lib/env.ts", action: "Swap Clerk vars for Better Auth vars" },
  { file: "src/app/layout.tsx", action: "Remove ClerkProvider" },
  { file: "src/proxy.ts", action: "Replace middleware" },
  { file: "src/components/auth/header-auth-buttons.tsx", action: "Replace component" },
  { file: "src/components/auth/sign-in-button.tsx", action: "Replace component" },
  { file: "src/components/auth/user-menu.tsx", action: "Replace component" },
  { file: "src/app/(auth)/sign-in/[[...sign-in]]/page.tsx", action: "Replace with custom form" },
  { file: "src/app/(auth)/sign-up/[[...sign-up]]/page.tsx", action: "Replace with custom form" },
  { file: "src/app/api/auth/webhook/route.ts", action: "Delete" },
  { file: "src/server/subscriptions/service.ts", action: "Rename clerkId field" },
  { file: "src/server/subscriptions/queries.ts", action: "Rename column reference" },
  { file: "src/server/stripe/webhooks.ts", action: "Rename metadata key" },
  { file: "Supabase migration", action: "Rename clerk_id column" },
];

const VERIFICATION_ITEMS = [
  "npm run typecheck passes",
  "npm run build succeeds",
  "Visit /sign-up — create a test account",
  "Visit /sign-in — sign in with test credentials",
  "Visit /dashboard — see \"Better Auth connected\" in health check",
  "Visit /dashboard/settings — see your name and email, save a name change",
  "Visit /dashboard/billing — subscription lookup works",
  "Sign out from header — redirects to home",
  "Check Supabase users table — new user row exists with auth_provider_id",
];

/* ─── Step config ─────────────────────────────────────────────────────────────── */

interface Step {
  number: number;
  title: string;
  icon: typeof Package;
  color: string;
  borderColor: string;
  description: string;
  codeBlocks: { filename?: string; language: string; code: string }[];
  notes?: string[];
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Install Dependencies",
    icon: Package,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/10",
    description: "Remove Clerk packages and install Better Auth.",
    codeBlocks: [
      {
        language: "bash",
        code: `npm uninstall @clerk/nextjs svix\nnpm install better-auth`,
      },
    ],
  },
  {
    number: 2,
    title: "Set Up Better Auth Server",
    icon: Server,
    color: "text-blue-400",
    borderColor: "border-blue-500/10",
    description:
      "Create the server instance, the Next.js API catch-all route, and the client helper.",
    codeBlocks: [
      {
        filename: "src/lib/better-auth-server.ts",
        language: "typescript",
        code: `import { betterAuth } from "better-auth";

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
});`,
      },
      {
        filename: "src/app/api/auth/[...all]/route.ts",
        language: "typescript",
        code: `import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth-server"; // new file

export const { GET, POST } = toNextJsHandler(auth);`,
      },
      {
        filename: "src/lib/better-auth-client.ts",
        language: "typescript",
        code: `import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL
});`,
      },
    ],
  },
  {
    number: 3,
    title: "Database Migration",
    icon: Database,
    color: "text-amber-400",
    borderColor: "border-amber-500/10",
    description:
      "Better Auth manages its own tables (user, session, account, verification). Run the CLI migration, then rename the Clerk-specific column.",
    codeBlocks: [
      {
        language: "bash",
        code: `npx better-auth migrate`,
      },
      {
        filename: "supabase migration",
        language: "sql",
        code: `-- Rename the column
ALTER TABLE users RENAME COLUMN clerk_id TO auth_provider_id;

-- Update the unique index
ALTER INDEX users_clerk_id_key RENAME TO users_auth_provider_id_key;`,
      },
    ],
    notes: [
      'src/server/subscriptions/queries.ts — change .eq("clerk_id", ...) to .eq("auth_provider_id", ...)',
      'src/server/subscriptions/service.ts — rename the clerkId field to authUserId',
      "src/server/stripe/webhooks.ts — change all references to clerkId metadata to authUserId",
      "src/app/api/stripe/checkout/route.ts — update client_reference_id metadata key if applicable",
    ],
  },
  {
    number: 4,
    title: "Replace src/lib/auth.ts",
    icon: KeyRound,
    color: "text-rose-400",
    borderColor: "border-rose-500/10",
    description:
      "Replace the entire file contents. All 9 server-side files that import from the auth module will work without any changes.",
    codeBlocks: [
      {
        filename: "src/lib/auth.ts",
        language: "typescript",
        code: `import { auth } from "@/lib/better-auth-server";
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
}`,
      },
    ],
  },
  {
    number: 5,
    title: "Replace Environment Variables",
    icon: KeyRound,
    color: "text-violet-400",
    borderColor: "border-violet-500/10",
    description:
      "Remove Clerk environment variables and add Better Auth secrets.",
    codeBlocks: [
      {
        filename: ".env.local — remove",
        language: "bash",
        code: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\nCLERK_SECRET_KEY\nCLERK_WEBHOOK_SECRET`,
      },
      {
        filename: ".env.local — add",
        language: "bash",
        code: `BETTER_AUTH_SECRET=your-random-secret-at-least-32-chars\nDATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres`,
      },
      {
        filename: "src/lib/env.ts",
        language: "typescript",
        code: `// In serverSchema, replace:
// Remove these:
CLERK_SECRET_KEY: z.string().min(1),
CLERK_WEBHOOK_SECRET: z.string().min(1).optional(),

// Add these:
BETTER_AUTH_SECRET: z.string().min(32),
DATABASE_URL: z.string().url(),

// In clientSchema, remove:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),`,
      },
    ],
  },
  {
    number: 6,
    title: "Replace Root Layout",
    icon: Layout,
    color: "text-sky-400",
    borderColor: "border-sky-500/10",
    description:
      "Remove the ClerkProvider wrapper from the root layout.",
    codeBlocks: [
      {
        filename: "src/app/layout.tsx",
        language: "typescript",
        code: `// Remove these imports:
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
return content;`,
      },
    ],
  },
  {
    number: 7,
    title: "Replace Auth UI Components",
    icon: UserCircle,
    color: "text-pink-400",
    borderColor: "border-pink-500/10",
    description:
      "Replace the three auth-related UI components with Better Auth equivalents.",
    codeBlocks: [
      {
        filename: "src/components/auth/header-auth-buttons.tsx",
        language: "typescript",
        code: `"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth-client";

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
}`,
      },
      {
        filename: "src/components/auth/sign-in-button.tsx",
        language: "typescript",
        code: `import Link from "next/link";

export default function LaunchKitSignInButton() {
  return (
    <Link
      href="/sign-in"
      className="rounded-md border border-border/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-base-200"
    >
      Sign in
    </Link>
  );
}`,
      },
      {
        filename: "src/components/auth/user-menu.tsx",
        language: "typescript",
        code: `"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth-client";

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
}`,
      },
    ],
  },
  {
    number: 8,
    title: "Replace Sign-In / Sign-Up Pages",
    icon: LogIn,
    color: "text-teal-400",
    borderColor: "border-teal-500/10",
    description:
      "Replace the Clerk-powered auth pages with custom email + password forms.",
    codeBlocks: [
      {
        filename: "src/app/(auth)/sign-in/[[...sign-in]]/page.tsx",
        language: "typescript",
        code: `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/public-header";
import { authClient } from "@/lib/better-auth-client";

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
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email" type="email"
                className="input input-bordered w-full"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password" type="password"
                className="input input-bordered w-full"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
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
}`,
      },
      {
        filename: "src/app/(auth)/sign-up/[[...sign-up]]/page.tsx",
        language: "typescript",
        code: `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/public-header";
import { authClient } from "@/lib/better-auth-client";

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
              <label htmlFor="name" className="text-sm font-medium">Full name</label>
              <input
                id="name" type="text"
                className="input input-bordered w-full"
                value={name} onChange={(e) => setName(e.target.value)} required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email" type="email"
                className="input input-bordered w-full"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password" type="password"
                className="input input-bordered w-full"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required minLength={8}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
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
}`,
      },
    ],
  },
  {
    number: 9,
    title: "Replace Middleware",
    icon: Shield,
    color: "text-orange-400",
    borderColor: "border-orange-500/10",
    description:
      "Replace the Clerk middleware with a custom rate limiter. Better Auth handles session validation at the API layer instead of the edge.",
    codeBlocks: [
      {
        filename: "src/proxy.ts",
        language: "typescript",
        code: `import { NextResponse } from "next/server";
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
    ? rateLimit(\`sensitive:\${ip}\`, 15 * 60 * 1000, 5)
    : rateLimit(\`public:\${ip}\`, 60 * 1000, 120);

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
    "/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};`,
      },
    ],
  },
  {
    number: 10,
    title: "Delete Clerk Webhook & Add User Sync Hook",
    icon: Trash2,
    color: "text-red-400",
    borderColor: "border-red-500/10",
    description:
      "Better Auth writes directly to the database — no webhook sync needed. Instead, add a signup hook to sync new users to your LaunchKit users table.",
    codeBlocks: [
      {
        language: "bash",
        code: `rm src/app/api/auth/webhook/route.ts`,
      },
      {
        filename: "src/lib/better-auth-server.ts (updated)",
        language: "typescript",
        code: `import { betterAuth } from "better-auth";
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
});`,
      },
    ],
  },
  {
    number: 11,
    title: "Update Stripe Metadata",
    icon: CreditCard,
    color: "text-indigo-400",
    borderColor: "border-indigo-500/10",
    description:
      "The client_reference_id already uses getAuthUserId() — no change needed. Update the metadata key used to look up users in the webhook handler.",
    codeBlocks: [
      {
        filename: "src/server/stripe/webhooks.ts",
        language: "typescript",
        code: `// Before:
const clerkId = subscription.metadata?.clerkId;

// After:
const authUserId = subscription.metadata?.authUserId;`,
      },
      {
        filename: "src/server/subscriptions/service.ts",
        language: "typescript",
        code: `// Before:
clerkId: string;

// After:
authUserId: string;`,
      },
    ],
  },
];

/* ─── Component ───────────────────────────────────────────────────────────────── */

export function MigrateBetterAuth() {
  return (
    <section id="migrate-better-auth" className="scroll-mt-20">
      {/* ── Header ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[12px] font-mono text-emerald-400/80 uppercase tracking-widest">Migration Guide</span>
        </div>
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 leading-tight text-center lg:text-left">
          Migrate from Clerk to Better Auth
        </h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-2xl">
          Replace Clerk with{" "}
          <a href="https://www.better-auth.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            Better Auth
          </a>
          , an open-source, self-hosted authentication library — no vendor lock-in, no per-user pricing.
        </p>

        {/* Time estimate badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-[13px]">
          <span className="text-zinc-500">Time estimate:</span>
          <span className="text-white font-medium">30 – 45 minutes</span>
        </div>
      </div>

      <div className="space-y-16">
        {/* ── Change overview table ── */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-6 bg-emerald-500 rounded-full" />
            What Changes
          </h3>

          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-5 py-3 text-zinc-400 font-medium">Layer</th>
                  <th className="text-left px-5 py-3 text-zinc-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {CHANGE_OVERVIEW.map((row, i) => (
                  <tr
                    key={row.layer}
                    className={`border-b border-white/[0.04] ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"} hover:bg-white/[0.03] transition-colors`}
                  >
                    <td className="px-5 py-3 text-zinc-300 font-mono text-[12px]">{row.layer}</td>
                    <td className="px-5 py-3 text-zinc-500">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Step-by-step timeline ── */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-6 bg-blue-500 rounded-full" />
            Step-by-Step Migration
          </h3>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-white/[0.06]" />

            <div className="space-y-14">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex gap-8 relative group">
                    {/* Icon node */}
                    <div
                      className={`w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 z-10 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.02] ${step.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-mono text-zinc-600">
                          {String(step.number).padStart(2, "0")}
                        </span>
                        <h4 className="text-white font-semibold text-[16px]">{step.title}</h4>
                      </div>

                      <p className="text-zinc-500 text-[14px] leading-relaxed mb-5 max-w-xl">
                        {step.description}
                      </p>

                      {/* Code blocks */}
                      <div className="space-y-4">
                        {step.codeBlocks.map((block, idx) => (
                          <div
                            key={idx}
                            className={`rounded-xl overflow-hidden border ${step.borderColor} bg-zinc-950/50`}
                          >
                            <CodeBlock language={block.language} filename={block.filename}>
                              {block.code}
                            </CodeBlock>
                          </div>
                        ))}
                      </div>

                      {/* Optional notes */}
                      {step.notes && (
                        <div className="mt-5 p-5 rounded-xl border border-amber-500/10 bg-amber-500/[0.02]">
                          <p className="text-amber-400 text-[12px] font-semibold uppercase tracking-wider mb-3">
                            Also update these files:
                          </p>
                          <ul className="space-y-2">
                            {step.notes.map((note) => (
                              <li key={note} className="flex gap-2 text-[13px]">
                                <span className="text-amber-500 shrink-0">→</span>
                                <span className="text-zinc-400">{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Verification Checklist ── */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="text-emerald-400 font-semibold text-[16px]">Verification Checklist</h4>
          </div>
          <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">
            After completing all 11 steps, run through each check to confirm a successful migration.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {VERIFICATION_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-5 h-5 rounded-md border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-sm bg-emerald-500/40" />
                </div>
                <span className="text-zinc-400 text-[13px] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Files changed summary ── */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-6 bg-violet-500 rounded-full" />
            Summary of Files Changed
          </h3>

          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-5 py-3 text-zinc-400 font-medium">File</th>
                  <th className="text-left px-5 py-3 text-zinc-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {FILES_CHANGED.map((row, i) => (
                  <tr
                    key={row.file}
                    className={`border-b border-white/[0.04] ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"} hover:bg-white/[0.03] transition-colors`}
                  >
                    <td className="px-5 py-3 text-zinc-300 font-mono text-[12px]">{row.file}</td>
                    <td className="px-5 py-3 text-zinc-500">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footer callout ── */}
        <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
          <p className="text-zinc-400 text-sm leading-relaxed">
            <strong className="text-blue-400">Heads up —</strong>{" "}
            Better Auth supports OAuth providers (Google, GitHub), Magic Links, and Passkeys via plugins.
            Once migrated, check the{" "}
            <a
              href="https://www.better-auth.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Better Auth docs
            </a>{" "}
            to enable additional sign-in methods.
          </p>
        </div>
      </div>
    </section>
  );
}
