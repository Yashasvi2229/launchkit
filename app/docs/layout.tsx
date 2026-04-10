import type { Metadata } from "next";
import { DocsNavbar } from "@/components/docs/DocsNavbar";

export const metadata: Metadata = {
  title: "Documentation — LaunchX SaaS Starter",
  description:
    "Complete documentation for the LaunchX General SaaS template. Auth, billing, database, email, MEX AI context, and deployment guides.",
  openGraph: {
    title: "Documentation — LaunchX SaaS Starter",
    description:
      "Production-ready Next.js SaaS starter kit documentation. Everything you need to ship fast.",
    type: "website",
  },
};

export default function DocsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <DocsNavbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
