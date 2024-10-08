import type {
  // ActionFunctionArgs,
  // LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
// import { json, useFetcher, useLoaderData } from "@remix-run/react";
// import { Button } from "~/components/Button";
// import { Textfield } from "~/components/Textfield";
// import { getCsrfToken } from "~/lib/csrf.server";
// import { insertCardholder } from "~/lib/db.server";
// import {
//   errorResponse,
//   validateEmailDomain,
//   validateName,
// } from "~/lib/misc.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Interledger Cards" },
    {
      name: "description",
      content: "A surprise for you at the ILF Summit 2024!",
    },
  ];
};

// export async function loader({ request }: LoaderFunctionArgs) {
//   const { token, headers } = await getCsrfToken(request);
//
//   return json({ token }, { headers });
// }

export default function Index() {
  // const { token } = useLoaderData<typeof loader>();
  // const fetcher = useFetcher<typeof action>();

  return (
    <div className="text-center text-primary px-4 md:px-0">
      <h2 className="font-bold text-2xl md:text-5xl">
        The submissions are now closed!
      </h2>
      <h4 className="text-lg md:text-3xl mt-4 md:mt-10">
        Thank you for everyone that registered!
      </h4>
      <h4 className="text-lg md:text-3xl">
        Looking forward to see you at the summit!
      </h4>
    </div>
  );

  // return (
  //   <>
  //     <p className="text-center text-xl text-primary">
  //       We are working with GateHub on a little surprise <br /> gift for all
  //       summit attendees.
  //     </p>
  //     <p className="text-sm text-center">
  //       By allowing us to share your details with GateHub, <br /> you are
  //       agreeing to the{" "}
  //       <a
  //         className="text-blue-500 underline"
  //         href="https://gatehub.net/legal/terms"
  //       >
  //         GateHub Terms and Conditions
  //       </a>
  //       .
  //     </p>
  //     <fetcher.Form method="POST" className="w-96">
  //       {fetcher.data?.errors.form ? (
  //         <div className="rounded-md bg-accent-primary/10 p-4 mb-5">
  //           <div className="flex">
  //             <div className="flex-shrink-0"></div>
  //             <div className="ml-3">
  //               <h3 className="font-medium text-sm text-accent-primary">
  //                 There were was an error with your submission.
  //               </h3>
  //               <div className="mt-2 text-accent-primary">
  //                 <p>{fetcher.data.errors.form}</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       ) : null}
  //       <input type="hidden" name="csrf" value={token} />
  //       <fieldset className="space-y-2">
  //         <Textfield
  //           type="text"
  //           name="firstName"
  //           label="First name"
  //           minLength={1}
  //           errorMessage={fetcher.data?.errors.firstName}
  //           required
  //         />
  //         <Textfield
  //           type="text"
  //           name="lastName"
  //           label="Last name"
  //           minLength={1}
  //           errorMessage={fetcher.data?.errors.lastName}
  //           required
  //         />
  //         <Textfield type="email" name="email" label="Email" required />
  //         <Button type="submit">Submit</Button>
  //         <p className="text-sm text-center">
  //           By submitting this form, you agree to the{" "}
  //           <a
  //             className="text-blue-500 underline"
  //             href="https://gatehub.net/legal/terms"
  //           >
  //             GateHub Terms and Conditions
  //           </a>
  //           .
  //         </p>
  //       </fieldset>
  //     </fetcher.Form>
  //   </>
  // );
}

// export async function action({ request }: ActionFunctionArgs) {
//   const errors = {
//     form: "",
//     firstName: "",
//     lastName: "",
//   };
//   const csrf = await validateCsrfToken(request);
//
//   if (csrf.isErr()) {
//     errors.form = csrf.error.message;
//     return errorResponse(errors, 400);
//   }
//
//   const form = await request.formData();
//   const firstName = (form.get("firstName") as string).trim();
//   const lastName = (form.get("lastName") as string).trim();
//   const email = (form.get("email") as string).trim().toLowerCase();
//   const domain = email.split("@").pop() ?? "";
//
//   const validFirstName = validateName(firstName);
//   const validLastName = validateName(lastName);
//
//   if (validFirstName.isErr()) {
//     errors.firstName = validFirstName.error.message;
//   }
//
//   if (validLastName.isErr()) {
//     errors.lastName = validLastName.error.message;
//   }
//
//   if (errors.firstName || errors.lastName) {
//     return errorResponse(errors, 400);
//   }
//
//   const isValidEmailDomain = await validateEmailDomain(domain);
//
//   if (isValidEmailDomain.isErr()) {
//     errors.form = isValidEmailDomain.error.message;
//     return errorResponse(errors, 400);
//   }
//
//   const result = await insertCardholder({
//     firstName,
//     lastName,
//     email,
//   });
//
//   if (result.isErr()) {
//     errors.form = result.error.message;
//     return errorResponse(errors, 400);
//   }
//
//   return json({ status: "success" as const });
// }
