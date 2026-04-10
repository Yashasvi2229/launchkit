import { CodeBlock } from "@/components/docs/CodeBlock";

export function RateLimiting() {
  return (
    <section id="rate-limiting" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Rate Limiting</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX includes a built-in rate limiting layer to prevent brute-force attacks and ensure fair API usage across your platform.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The Implementation</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            The rate limiter logic resides in <code className="text-emerald-300">src/lib/rate-limit.ts</code>. It uses a sliding window algorithm to track requests per IP address (or any custom key).
          </p>
          <CodeBlock language="typescript">{`import { rateLimit } from "@/lib/rate-limit";

// Allow 5 requests per 10 minutes for this key
const { allowed, remaining } = rateLimit("auth_attempt", {
  windowMs: 10 * 60 * 1000, 
  max: 5
});

if (!allowed) {
  return jsonError("Too many attempts. Try again later.", 429);
}`}</CodeBlock>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Scaling to Redis</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            By default, the rate limiter uses an in-memory store (<code className="text-white">Map</code>). While this works perfectly for single-node deployments, you can easily swap the store for Redis/Upstash in <code className="text-emerald-300">src/lib/rate-limit.ts</code> for multi-region serverless scaling.
          </p>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">Security Recommended</h4>
            <p className="text-zinc-400 text-[14px]">
              We recommend applying rate limits to all sensitive routes, including:
            </p>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-[13px] text-zinc-500 font-mono">
              <li>• /api/auth/* (Login attempts)</li>
              <li>• /api/email/* (Spam prevention)</li>
              <li>• /api/admin/* (Extra protection)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
