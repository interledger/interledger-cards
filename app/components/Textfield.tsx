import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  errorMessage?: string;
}

export const Textfield = forwardRef<HTMLInputElement, InputProps>(
  ({ type, errorMessage, label, ...props }, ref) => {
    const id = useId();

    return (
      <div className="mb-1">
        <label htmlFor={id}>
          {label}{" "}
          {props.required ? <span className="text-red-500">*</span> : null}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          className="flex w-full rounded-md border border-primary bg-background px-3 py-2 text-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-disabled={props.disabled ?? false}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage}
          {...props}
        />
        {errorMessage && (
          <p className="mt-2 text-accent-primary">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textfield.displayName = "Textfield";
