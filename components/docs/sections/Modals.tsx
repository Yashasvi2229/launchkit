import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function Modals() {
  return (
    <section id="modals" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Modals & Dialogs</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          The template includes a standardized, accessible modal component built on top of DaisyUI's portal system.
        </p>
      </div>

      <div className="space-y-16">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Core Component</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            The primary modal component is located at <code className="text-emerald-400">src/components/ui/modal.tsx</code>. It handles background blurring, focus trapping, and animations automatically.
          </p>
          
          <div className="p-1 rounded-2xl bg-zinc-900/50 border border-white/[0.06]">
            <CodeBlock language="typescript">{`import Modal from "@/components/ui/modal";

<Modal 
  title="Discard Changes?" 
  description="All unsaved progress will be permanently lost."
  open={isOpen} 
  onClose={() => setIsOpen(false)}
>
  <div className="py-4">
    <p>Are you 100% sure you want to proceed?</p>
  </div>
</Modal>`}</CodeBlock>
          </div>

          <div className="mt-10">
            <DocImagePanel
              src="/docs/images/modals.png"
              alt="LaunchX Modal Design"
              title="Modal Interaction"
              caption="Modals should preserve focus order and require explicit confirmation for destructive actions."
            />
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Component Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="py-3 font-semibold text-zinc-200">Prop</th>
                  <th className="py-3 font-semibold text-zinc-200">Type</th>
                  <th className="py-3 font-semibold text-zinc-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                <tr>
                  <td className="py-4 font-mono text-emerald-400">title</td>
                  <td className="py-4 text-zinc-500">string</td>
                  <td className="py-4 text-zinc-400">The main heading of the modal.</td>
                </tr>
                <tr>
                  <td className="py-4 font-mono text-emerald-400">description</td>
                  <td className="py-4 text-zinc-500">string</td>
                  <td className="py-4 text-zinc-400">Optional sub-text for additional context.</td>
                </tr>
                <tr>
                  <td className="py-4 font-mono text-emerald-400">open</td>
                  <td className="py-4 text-zinc-500">boolean</td>
                  <td className="py-4 text-zinc-400">Controls the visibility state.</td>
                </tr>
                <tr>
                  <td className="py-4 font-mono text-emerald-400">onClose</td>
                  <td className="py-4 text-zinc-500">() =&gt; void</td>
                  <td className="py-4 text-zinc-400">Callback function triggered when clicking 'Close'.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
