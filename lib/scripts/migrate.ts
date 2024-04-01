import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "../db";
import { sql } from "@vercel/postgres";

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await sql.end();
  console.log("Migration complete");
}

main();
