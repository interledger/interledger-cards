import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="bg-primary text-white px-8 py-4 w-full hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
