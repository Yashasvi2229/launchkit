import { CodeBlock } from "@/components/docs/CodeBlock";

export function Storage() {
  return (
    <section id="storage" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">S3/R2 Storage</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          A provider-agnostic storage layer for S3-compatible services including AWS S3, Cloudflare R2, and DigitalOcean Spaces.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The Implementation Pattern</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            The storage layer in <code className="text-emerald-300">src/lib/storage.ts</code> uses presigned URLs so uploads go directly from client to bucket.
          </p>
          <CodeBlock language="typescript">{`import { getUploadUrl } from "@/lib/storage";

// Request a secure, one-time upload link
const { url, key } = await getUploadUrl("avatars/user_123.png");

// Frontend can now PUT to 'url' directly
await fetch(url, { method: "PUT", body: file });`}</CodeBlock>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Scaling Setup</h3>
          <div className="space-y-6">
             <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">Step 1: Install SDK</h4>
                <CodeBlock language="bash" plain>{`npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`}</CodeBlock>
             </div>
             <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">Step 2: Add Keys</h4>
                <p className="text-zinc-500 text-[13px] mb-3 leading-relaxed">Add these to your <code className="text-white">.env.local</code>. Never commit these secrets.</p>
                <CodeBlock language="text" plain>{`AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
S3_BUCKET_NAME=...`}</CodeBlock>
             </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20">
          <h4 className="text-amber-400 font-semibold mb-2 text-[14px]">Why Presigned URLs?</h4>
          <p className="text-zinc-400 text-[13px] leading-relaxed">
            By using presigned URLs, your server never actually touches the file data. This makes your application significantly faster, reduces your Vercel bandwidth costs, and eliminates the risk of "Payload Too Large" (413) errors on serverless functions.
          </p>
        </div>
      </div>
    </section>
  );
}
