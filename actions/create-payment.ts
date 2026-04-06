"use server";

import { z } from "zod";
import { getDodo } from "@/lib/dodo/client";

const schema = z.object({
    email: z.string().email("Please enter a valid email address."),
    name: z.string().min(1, "Name is required."),
    githubUsername: z.string().min(1, "GitHub username is required."),
    productId: z.string().min(1, "Product ID is required."),
});

export async function createPayment(data: {
    email: string;
    name: string;
    githubUsername: string;
    productId: string;
}) {
    const result = schema.safeParse(data);
    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    try {
        const response = await getDodo().checkoutSessions.create({
            customer: {
                email: result.data.email,
                name: result.data.name,
            },
            metadata: {
                github_username: result.data.githubUsername,
            },
            product_cart: [
                {
                    product_id: result.data.productId,
                    quantity: 1,
                },
            ],
            return_url: "https://launchx.page/templates/general-saas?payment=success",
            customization: {
                theme: "dark",
            },
        });

        if (!response.checkout_url) {
            return { error: "Failed to create checkout session." };
        }

        return { checkout_url: response.checkout_url };
    } catch (error) {
        console.error("Failed to create checkout session:", error);
        return { error: "Failed to create payment. Please try again." };
    }
}
