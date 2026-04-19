import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

export type InputProps = {
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...rest }, ref) => (
    <div>
      <input
        ref={ref}
        className={clsx("input", className)}
        aria-invalid={error ? "true" : undefined}
        {...rest}
      />
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  ),
);

Input.displayName = "Input";
