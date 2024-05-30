// drizzle.config.ts

import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  strict: true,
  verbose: true,
} satisfies Config;
