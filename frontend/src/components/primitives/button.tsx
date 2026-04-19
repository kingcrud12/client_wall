import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "base" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "base",
  loading = false,
  icon,
  iconRight,
  fullWidth,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "btn",
        `btn--${variant}`,
        size === "sm" && "btn--sm",
        size === "lg" && "btn--lg",
        fullWidth && "btn--full",
        icon && !children && !iconRight && "btn--icon-only",
        className,
      )}
      type={type}
      aria-busy={loading}
      disabled={rest.disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="btn__spinner" aria-hidden="true" />
      ) : (
        icon && <span className="btn__icon">{icon}</span>
      )}
      {children ? <span>{children}</span> : null}
      {!loading && iconRight && (
        <span className="btn__icon">{iconRight}</span>
      )}
    </button>
  );
}
