import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { attachDatabasePool } from "@vercel/functions";

const client = new MongoClient(`${process.env.BETTER_AUTH_MONGO_DB_URL}`, {
    // Drop idle sockets before Vercel freezes the function, so we don't resume on dead ones
    maxIdleTimeMS: 30_000,
});
// Lets Vercel release idle connections before the function is suspended (no-op locally)
attachDatabasePool(client);
const db = client.db("fixmate");

/** True when the error (or its cause) means the Mongo client lost its connection. */
const isConnectionClosed = (error: unknown): boolean => {
    let current = error as { name?: string; cause?: unknown } | undefined;
    while (current) {
        if (current.name === "MongoTopologyClosedError" || current.name === "MongoNotConnectedError") {
            return true;
        }
        current = current.cause as typeof current;
    }
    return false;
};

/**
 * Runs a DB-backed auth call. If the serverless instance resumed with a closed
 * Mongo connection, reconnect once and retry instead of failing the page.
 */
export const withDbRetry = async <T>(task: () => Promise<T>): Promise<T> => {
    try {
        return await task();
    } catch (error) {
        if (!isConnectionClosed(error)) throw error;
        await client.close(true).catch(() => {});
        await client.connect();
        return task();
    }
};

/** Roles a user may pick at sign up. Admin is created manually only. */
const SIGN_UP_ROLES = ["customer", "technician"];

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    // Add the production client URL here (comma separated) before deploying
    trustedOrigins: (process.env.TRUSTED_ORIGINS ?? "").split(",").filter(Boolean),
    user: {
        additionalFields: {
            role: {
                type: ["admin", "technician", "customer"],
                input: true,
                defaultValue: "customer",
            },
            phone: { type: "string", required: false, input: false },
            area: { type: "string", required: false, input: false },
            bio: { type: "string", required: false, input: false },
        },
    },
    databaseHooks: {
        user: {
            create: {
                // Server-side guard: anything other than customer/technician is saved as customer
                before: async (user) => ({
                    data: {
                        ...user,
                        role: SIGN_UP_ROLES.includes(user.role as string) ? user.role : "customer",
                    },
                }),
            },
        },
    },
    plugins: [
        // Issues a signed JWT the Express server verifies (via /api/auth/jwks)
        jwt({
            jwt: {
                expirationTime: "1h",
                definePayload: ({ user }) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }),
            },
        }),
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
