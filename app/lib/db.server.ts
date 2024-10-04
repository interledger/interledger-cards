import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { ResultAsync } from "neverthrow";
import { env } from "./env.server";

interface Database {
  cardholders: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: env.DATABASE_URL,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export async function insertCardholder(
  args: Omit<Database["cardholders"], "id">
) {
  return ResultAsync.fromPromise(
    db
      .insertInto("cardholders")
      .values({
        id: crypto.randomUUID(),
        ...args,
      })
      .execute(),

    (e) => {
      if (e instanceof Error && e.message.includes("unique violation")) {
        return new Error("This email is already registered");
      }
      return new Error(
        "We could not fulfill your submission. Please try again!"
      );
    }
  );
}
