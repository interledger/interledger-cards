import { createCookieSessionStorage } from "@remix-run/node";
import { randomBytes } from "node:crypto";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { env } from "./env.server";

const CSRF_KEY = "csrf";

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    secure: env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    secrets: [env.COOKIE_SECRET || "my-super-long-cookie-session-secret"],
    maxAge: 300,
  },
});

export { getSession, commitSession };

function generateCsrfToken() {
  return randomBytes(32).toString("hex");
}

export async function getCsrfToken(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  const token = generateCsrfToken();

  session.set(CSRF_KEY, token);

  const headers = request.headers;
  const setCookieHeader = await commitSession(session);
  headers.append("Set-Cookie", setCookieHeader);

  return { token, headers };
}

export async function validateCsrfToken(
  request: Request
): Promise<ResultAsync<undefined, Error>> {
  const formData = await request.clone().formData();
  const session = await getSession(request.headers.get("cookie"));
  const sessionToken = session.get(CSRF_KEY);

  if (!formData.get(CSRF_KEY)) {
    return errAsync(
      new Error(
        "Some important security information is missing from your request. Please try submitting the form again or refresh the page!"
      )
    );
  }

  if (formData.get(CSRF_KEY) !== sessionToken) {
    return errAsync(
      new Error(
        "We couldn't verify your request's security information. This might happen if you've been on this page for a long time. Please refresh the page and try again."
      )
    );
  }

  return okAsync(undefined);
}
