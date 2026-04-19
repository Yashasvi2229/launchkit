export function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[13px] text-zinc-600">
          © 2026 LaunchX. Built for developers who ship.
        </p>
        <div className="flex gap-8">
          <a
            href="/terms"
            className="text-[13px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="text-[13px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="/eula"
            className="text-[13px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            EULA
          </a>
          <a
            href="mailto:thedakshjaitly@gmail.com"
            className="text-[13px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
