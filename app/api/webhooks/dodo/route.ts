import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend/client";

export async function POST(request: NextRequest) {
    const rawBody = await request.text();

    // Log all headers for debugging webhook signature
    const allHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        allHeaders[key] = value;
    });
    console.log("Webhook headers:", JSON.stringify(allHeaders));
    console.log("Webhook body preview:", rawBody.substring(0, 200));

    // Try multiple possible header names
    const signature =
        request.headers.get("webhook-signature") ||
        request.headers.get("x-dodo-signature") ||
        request.headers.get("x-webhook-signature") ||
        request.headers.get("signature");

    if (!signature) {
        console.error("No signature header found. Available headers:", Object.keys(allHeaders).join(", "));
        return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    console.log("Signature found:", signature.substring(0, 50) + "...");

    const secret = process.env.DODO_WEBHOOK_SECRET;
    if (!secret) {
        console.error("Missing DODO_WEBHOOK_SECRET environment variable");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

    console.log("Expected signature:", expectedSignature.substring(0, 20) + "...");
    console.log("Received signature:", signature.substring(0, 20) + "...");

    try {
        const sigBuffer = Buffer.from(signature, "hex");
        const expectedBuffer = Buffer.from(expectedSignature, "hex");

        if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
            console.error("Signature mismatch. Lengths:", sigBuffer.length, expectedBuffer.length);
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }
    } catch (err) {
        console.error("Signature verification error:", err);
        return NextResponse.json({ error: "Signature verification failed" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    switch (payload.event_type) {
        case "payment.succeeded": {
            const githubUsername = payload.data?.metadata?.github_username;
            const customerEmail = payload.data?.customer?.email;
            const customerName = payload.data?.customer?.name;
            const paymentId = payload.data?.payment_id;

            console.log("Payment succeeded:", paymentId, "GitHub:", githubUsername, "Email:", customerEmail);

            const resend = getResend();

            // 1. Notify yourself about the new sale
            await resend.emails.send({
                from: "LaunchX <hello@launchx.page>",
                to: "thedakshjaitly@gmail.com",
                subject: `New Sale: ${customerName || "Unknown"} — ${githubUsername || "no username"}`,
                html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; padding: 40px 20px;">
                    <div style="max-width: 500px; margin: 0 auto; background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden;">
                        <div style="background-color: #18181b; padding: 12px 16px; border-bottom: 1px solid #27272a;">
                            <span style="color: #22c55e; font-family: monospace; font-size: 13px;">New Sale</span>
                        </div>
                        <div style="padding: 32px;">
                            <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 24px 0;">General SaaS Template</p>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="color: #71717a; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #27272a;">Name</td>
                                    <td style="color: #ffffff; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #27272a; text-align: right;">${customerName || "—"}</td>
                                </tr>
                                <tr>
                                    <td style="color: #71717a; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #27272a;">Email</td>
                                    <td style="color: #ffffff; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #27272a; text-align: right;">${customerEmail || "—"}</td>
                                </tr>
                                <tr>
                                    <td style="color: #71717a; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #27272a;">GitHub</td>
                                    <td style="color: #ffffff; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #27272a; text-align: right;">
                                        <a href="https://github.com/${githubUsername}" style="color: #22c55e; text-decoration: none;">${githubUsername || "—"}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #71717a; font-size: 13px; padding: 8px 0;">Payment ID</td>
                                    <td style="color: #71717a; font-size: 11px; padding: 8px 0; text-align: right; font-family: monospace;">${paymentId || "—"}</td>
                                </tr>
                            </table>
                            <div style="margin-top: 24px; padding: 16px; background-color: #18181b; border-radius: 8px; border: 1px solid #27272a;">
                                <p style="color: #71717a; font-size: 12px; margin: 0;">
                                    Action: Invite <a href="https://github.com/${githubUsername}" style="color: #22c55e; text-decoration: none;">${githubUsername}</a> to the template repo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`,
            });

            // 2. Send confirmation email to the buyer
            if (customerEmail) {
                await resend.emails.send({
                    from: "LaunchX <hello@launchx.page>",
                    to: customerEmail,
                    subject: "Payment Confirmed — LaunchKit SaaS Template",
                    html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; padding: 40px 20px;">
                        <div style="max-width: 500px; margin: 0 auto; background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">

                            <div style="background-color: #18181b; padding: 12px 16px; border-bottom: 1px solid #27272a; display: flex; align-items: center; gap: 8px;">
                                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #ef4444;"></span>
                                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #eab308; margin-left: 6px;"></span>
                                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #22c55e; margin-left: 6px;"></span>
                                <span style="margin-left: auto; color: #71717a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px;">launchx — bash</span>
                            </div>

                            <div style="padding: 40px;">
                                <p style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; color: #22c55e; margin: 0 0 24px 0;">
                                    > payment.confirmed
                                </p>

                                <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -0.025em;">
                                    Thank you${customerName ? `, ${customerName}` : ""}!
                                </h1>

                                <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
                                    Your purchase of the <strong style="color: #ffffff;">LaunchKit SaaS Template</strong> is confirmed.
                                </p>

                                <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                                    <p style="color: #ffffff; font-size: 14px; font-weight: 500; margin: 0 0 12px 0;">What happens next?</p>
                                    <table style="width: 100%;">
                                        <tr>
                                            <td style="color: #22c55e; font-size: 13px; padding: 4px 8px 4px 0; vertical-align: top; width: 20px;">1.</td>
                                            <td style="color: #a1a1aa; font-size: 13px; padding: 4px 0; line-height: 1.5;">
                                                We'll send a <strong style="color: #ffffff;">GitHub repository invite</strong> to
                                                <span style="color: #22c55e; font-family: monospace;">${githubUsername || "your account"}</span>
                                                within the next few hours.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #22c55e; font-size: 13px; padding: 4px 8px 4px 0; vertical-align: top;">2.</td>
                                            <td style="color: #a1a1aa; font-size: 13px; padding: 4px 0; line-height: 1.5;">
                                                Accept the invite from your GitHub notifications or email.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #22c55e; font-size: 13px; padding: 4px 8px 4px 0; vertical-align: top;">3.</td>
                                            <td style="color: #a1a1aa; font-size: 13px; padding: 4px 0; line-height: 1.5;">
                                                Clone the repo and start building your SaaS.
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                                    <p style="color: #71717a; font-size: 13px; line-height: 1.6; margin: 0;">
                                        If you have any questions, reply to this email or reach out at
                                        <a href="mailto:thedakshjaitly@gmail.com" style="color: #22c55e; text-decoration: none;">thedakshjaitly@gmail.com</a>.
                                    </p>
                                </div>

                                <p style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; color: #3f3f46; margin: 24px 0 0 0;">
                                    — LaunchX
                                </p>
                            </div>
                        </div>
                    </div>`,
                });
            }

            break;
        }
        case "payment.failed":
            console.log("Payment failed:", payload.data?.payment_id);
            break;
        default:
            console.log("Unhandled webhook event:", payload.event_type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
