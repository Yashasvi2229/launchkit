import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend/client";

function verifyWebhookSignature(rawBody: string, request: NextRequest): boolean {
    const secret = process.env.DODO_WEBHOOK_SECRET;
    if (!secret) {
        console.error("Missing DODO_WEBHOOK_SECRET environment variable");
        return false;
    }

    const webhookId = request.headers.get("webhook-id");
    const webhookTimestamp = request.headers.get("webhook-timestamp");
    const webhookSignature = request.headers.get("webhook-signature");

    if (!webhookId || !webhookTimestamp || !webhookSignature) {
        console.error("Missing Svix webhook headers");
        return false;
    }

    // Svix secret format: "whsec_<base64>" — strip prefix and decode
    const secretBytes = Buffer.from(
        secret.startsWith("whsec_") ? secret.slice(6) : secret,
        "base64"
    );

    // Svix signature payload: "${webhook-id}.${webhook-timestamp}.${body}"
    const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;

    const expectedSignature = crypto
        .createHmac("sha256", secretBytes)
        .update(signedContent)
        .digest("base64");

    // webhook-signature can contain multiple signatures like "v1,xxx v1,yyy"
    const signatures = webhookSignature.split(" ");
    for (const sig of signatures) {
        const sigValue = sig.split(",")[1];
        if (sigValue === expectedSignature) {
            return true;
        }
    }

    console.error("Signature mismatch");
    return false;
}

export async function POST(request: NextRequest) {
    const rawBody = await request.text();

    if (!verifyWebhookSignature(rawBody, request)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    switch (payload.type) {
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
                                                Open the <strong style="color: #ffffff;">Dodo customer dashboard</strong> link in the email sent by Dodo Payments and connect your GitHub to Dodo. Once connected, the repo invite will arrive in your GitHub inbox.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #22c55e; font-size: 13px; padding: 4px 8px 4px 0; vertical-align: top;">2.</td>
                                            <td style="color: #a1a1aa; font-size: 13px; padding: 4px 0; line-height: 1.5;">
                                                For the Notion workspace, open this link and duplicate the template into your Notion:
                                                <div style="margin-top:6px;"><a href="https://launchpad-os.notion.site/LaunchPad-OS-Indie-Founder-Workspace-3473a989d450818d910ff90f3c033ef5?source=copy_link" style="color: #22c55e; text-decoration: none;">LaunchPad OS — Duplicate in Notion</a></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #22c55e; font-size: 13px; padding: 4px 8px 4px 0; vertical-align: top;">3.</td>
                                            <td style="color: #a1a1aa; font-size: 13px; padding: 4px 0; line-height: 1.5;">
                                                After you accept the GitHub invite and duplicate the Notion template, you are ready to start building. Clone the repo and use the Notion workspace to manage tasks, customers, and docs.
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                                    <p style="color: #71717a; font-size: 13px; line-height: 1.6; margin: 0;">
                                        If you have any questions, reach out at
                                        <a href="mailto:launchxofficial@gmail.com" style="color: #22c55e; text-decoration: none;">launchxofficial@gmail.com</a>.
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
