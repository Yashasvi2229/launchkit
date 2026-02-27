"use server";

import { resend } from "@/lib/resend/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
});

export async function joinWaitlist(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const result = schema.safeParse({ email, firstName, lastName });

    if (!result.success) {
        return { error: "Please fill in all fields." };
    }

    let success = false;

    try {
        // 1. Add to Resend Audience (Contact)
        const { error } = await resend.contacts.create({
            email,
            firstName,
            lastName,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID || "general",
        });

        if (error) {
            console.error("Resend Error:", error);
            return { error: "Failed to join waitlist. Please try again." };
        }

        await resend.emails.send({
            from: "LaunchX <hello@launchx.page>",
            to: email,
            subject: "Welcome to the LaunchX Waitlist 🚀",
            html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; padding: 40px 20px;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    
                    <!-- MacOS Terminal Header -->
                    <div style="background-color: #18181b; padding: 12px 16px; border-bottom: 1px solid #27272a; display: flex; align-items: center; gap: 8px;">
                        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #ef4444;"></span>
                        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #eab308; margin-left: 6px;"></span>
                        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #22c55e; margin-left: 6px;"></span>
                        <span style="margin-left: auto; color: #71717a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px;">launchx — bash</span>
                    </div>

                    <div style="padding: 40px;">
                        <p style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; color: #22c55e; margin: 0 0 24px 0;">
                            > connection established.
                        </p>
                        <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 24px 0; color: #ffffff; letter-spacing: -0.5px;">
                            You're on the list.
                        </h1>
                        <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin: 0 0 24px 0;">
                            Hi ${firstName},
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin: 0 0 24px 0;">
                            Thanks for joining the LaunchX early access waitlist. You are officially in line for our upcoming launch. 
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin: 0 0 32px 0;">
                            Keep an eye on your inbox. If you're selected for the first batch, we'll send you an exclusive link and your <strong>50% off code</strong> right here when we go live.
                        </p>

                        <!-- Call to Action Button -->
                        <div style="margin: 32px 0 40px 0;">
                            <a href="https://x.com/lauuunchx" target="_blank" style="background-color: #ffffff; color: #000000; text-decoration: none; padding: 12px 24px; font-weight: 600; font-size: 15px; border-radius: 6px; display: inline-block;">
                                Follow on X for Updates
                            </a>
                        </div>

                        <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                            <p style="font-size: 14px; color: #71717a; margin: 0;">
                                — The LaunchX Team
                            </p>
                            <p style="font-size: 12px; color: #52525b; margin: 16px 0 0 0;">
                                If you have any questions, connect with us on <a href="https://x.com/lauuunchx" target="_blank" style="color: #ffffff; text-decoration: none;">X</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            `,
        });

        success = true;
    } catch (err) {
        console.error(err);
        return { error: "Something went wrong" };
    }

    if (success) {
        redirect("/waitlist/success?email=" + encodeURIComponent(email));
    }
}
