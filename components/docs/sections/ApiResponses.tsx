import { CodeBlock } from "@/components/docs/CodeBlock";

export function ApiResponses() {
  return (
    <section id="api-responses" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Standardized API</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Predictable API responses are the foundation of a stable frontend. LaunchX enforces a uniform JSON structure for every endpoint.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The Pattern</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Instead of manual <code className="text-white">Response.json()</code> calls, use the helpers in <code className="text-emerald-300">src/lib/api-response.ts</code>. This ensures every response contains a <code className="text-white">success</code> boolean and a consistent wrapper.
          </p>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-white font-medium mb-3 text-[14px] uppercase tracking-wider text-emerald-400">Success Response</h4>
              <CodeBlock language="typescript">{`// On the Server
return jsonSuccess({ id: "user_123", email: "test@example.com" });

// Output JSON
{
  "success": true,
  "data": { "id": "user_123", "email": "test@example.com" }
}`}</CodeBlock>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 text-[14px] uppercase tracking-wider text-red-400">Error Response</h4>
              <CodeBlock language="typescript">{`// On the Server
return jsonError("Unauthorized access", 401, "AUTH_REQUIRED");

// Output JSON
{
  "success": false,
  "error": { 
    "message": "Unauthorized access",
    "code": "AUTH_REQUIRED" 
  }
}`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20">
          <h4 className="text-emerald-400 font-semibold mb-2">Frontend Consumption</h4>
          <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">
            By standardizing the error object to always include a <code className="text-white">message</code>, you can create a single reusable toast handler for all your API calls.
          </p>
          <CodeBlock language="typescript">{`const res = await fetch("/api/endpoint");
const json = await res.json();

if (!json.success) {
  return toast.error(json.error.message);
}

// Proceed with json.data...`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
