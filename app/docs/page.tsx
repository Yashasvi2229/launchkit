import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { SingleDocsPage } from "@/components/docs/SingleDocsPage";

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 flex min-h-screen">
      <DocsSidebar />
      <main className="flex-1 py-12 lg:pl-12 w-full max-w-full lg:max-w-3xl min-w-0 overflow-x-hidden relative">
        <div className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight mb-4 text-white">
            general saas documentation
          </h1>
          <p className="text-[16px] leading-relaxed text-zinc-400 max-w-3xl">
            A structured reference for setup, architecture, integrations, and product modules in the general SaaS template. Use this as the implementation map for local development and feature customization.
          </p>
        </div>
        <SingleDocsPage />
      </main>
    </div>
  );
}
