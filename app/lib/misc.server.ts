import domains from "disposable-email-domains";
import dns from "node:dns";
import { err, errAsync, ok, Result, ResultAsync } from "neverthrow";
import { json } from "@remix-run/node";

const disposableDomains = new Set(domains);

function resolveMxRecords(domain: string): ResultAsync<boolean, Error> {
  return ResultAsync.fromPromise(
    new Promise<boolean>((res, rej) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err) {
          rej(
            new Error(
              "We could not verify the email domain. Please check if you typed it correctly."
            )
          );
        } else {
          res(addresses.length > 0);
        }
      });
    }),
    (err) => err as Error
  );
}

export function validateEmailDomain(
  domain: string
): ResultAsync<undefined, Error> {
  const isDisposableDomain = disposableDomains.has(domain);
  if (isDisposableDomain)
    return errAsync(
      new Error(
        "Email was created using a disposable email service. Please use another email."
      )
    );

  return resolveMxRecords(domain).andThen((hasMxRecords) => {
    if (!hasMxRecords) {
      return err(
        new Error(
          "We couldn't find any mail servers for this email domain. Are you sure you entered your email address correctly?"
        )
      );
    }
    return ok(undefined);
  });
}

export function validateName(name: string): Result<undefined, Error> {
  if (name.length < 1 || name.length > 32) {
    return err(
      new Error("The name should be between 1 and 32 characters long.")
    );
  }

  if (!/^[A-Za-z-']*$/.test(name)) {
    return err(
      new Error("The name must contain only A-Z, a-z, - and ' characters.")
    );
  }

  return ok(undefined);
}

export function errorResponse<T extends Record<string, string>>(
  errors: T,
  status: number
) {
  return json(
    {
      status: "error" as const,
      errors,
    },
    { status }
  );
}
