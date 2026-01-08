import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import "dotenv/config";
import assert from "node:assert";
import { drizzle } from "drizzle-orm/neon-http";

assert(
  process.env.DATABASE_URL,
  "DATABASE_URL is not defined in environment variables",
);

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export { sql };

export default db;
