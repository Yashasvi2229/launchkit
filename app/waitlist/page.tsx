"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/actions/join-waitlist";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function WaitlistPage() {
    const [state, action, isPending] = useActionState(joinWaitlist, null);

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
                <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] h-full">

                    {/* LEFT: Sign-up form */}
                    <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
                        <div className="w-full max-w-sm">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-2">
                                    Join the waitlist
                                </h1>
                                <p className="text-zinc-400 text-sm">
                                    Get early access to LaunchX.
                                </p>

                            </div>

                            {/* Form */}
                            <form action={action} className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label htmlFor="firstName" className="text-xs font-medium text-zinc-400">
                                            First Name
                                        </label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 focus:ring-0 rounded-lg h-10 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="lastName" className="text-xs font-medium text-zinc-400">
                                            Last Name
                                        </label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 focus:ring-0 rounded-lg h-10 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-medium text-zinc-400">
                                        Email address
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 focus:ring-0 rounded-lg h-10 text-sm"
                                    />
                                </div>

                                {state?.error && (
                                    <p className="text-red-400 text-sm text-center">{state.error}</p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    variant="default"
                                    className="w-full bg-white text-black hover:bg-zinc-200 h-10 rounded-lg text-[14px] font-medium mt-1"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Joining...
                                        </>
                                    ) : (
                                        "Join waitlist ->"
                                    )}
                                </Button>

                                <p className="text-center text-[11px] text-zinc-600 pt-2">
                                    No spam. Unsubscribe anytime.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: ASCII Art Image */}
                    <div className="relative hidden lg:block border-l border-white/[0.06]">
                        <Image
                            src="/ascii-art-4.webp"
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
