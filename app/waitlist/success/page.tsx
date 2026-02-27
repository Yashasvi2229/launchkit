"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function WaitlistSuccessPage() {
    return (
        <div className="min-h-screen h-screen bg-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black opacity-50 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 h-full"
            >
                {/* Full-page two-column split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

                    {/* LEFT: Success content */}
                    <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full max-w-sm text-center"
                        >
                            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🎉</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-3">
                                You&apos;re on the list!
                            </h1>

                            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                                We&apos;ve sent you a welcome email, follow our socials for updates.
                            </p>

                            <p className="text-zinc-500 text-xs mb-8">
                                Check your inbox (and promotions tab, just in case).
                            </p>

                            <div className="space-y-3">
                                <Button
                                    variant="default"
                                    className="w-full bg-white text-black hover:bg-zinc-200 h-11 rounded-xl text-[14px] font-medium"
                                    onClick={() => (window.location.href = "/waitlist/survey" + window.location.search)}
                                >
                                    Help us improve {'->'}
                                </Button>

                                <Button
                                    variant="default"
                                    className="w-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-white hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/30 h-11 rounded-xl text-[13px] flex items-center justify-center gap-2"
                                    onClick={() => window.open("https://x.com/lauuunchx", "_blank")}
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[14px] h-[14px] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                    Follow us on X
                                </Button>

                                <Button
                                    variant="default"
                                    className="w-full bg-transparent border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white h-11 rounded-xl text-[13px]"
                                    onClick={() => (window.location.href = "/")}
                                >
                                    Back to home
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: ASCII Art Image */}
                    <div className="relative hidden lg:block border-l border-white/[0.06]">
                        <Image
                            src="/ascii-art-5.webp"
                            alt="ASCII art of a rocket launch"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
