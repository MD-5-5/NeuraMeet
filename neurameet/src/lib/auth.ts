import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@/database/Schema"
import { db } from "@/database";
export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
 database: drizzleAdapter(db, {
        provider: "pg", // postgress
        schema: {
            ...schema,
        }
    }),
});