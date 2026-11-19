import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: ["admin", "technician", "customer"],
                input: false,
                defaultValue: "customer",
                // NOTE: input:false strips the role sent from the sign-up form, so a
                // "technician" selection can never be saved. Switch to input:true once
                // server-side validation (only "customer" | "technician" accepted,
                // anything else coerced to "customer") is in place.
            },
            phone: {
                type: "string",
                required: false,
                defaultValue: "",
            },
            area: {
                type: "string",
                required: false,
                defaultValue: "",
            },
            bio: {
                type: "string",
                required: false,
                defaultValue: "",
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});