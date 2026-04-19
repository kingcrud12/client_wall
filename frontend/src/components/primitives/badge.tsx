import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "primary";

export type BadgeProps = {
  variant?: BadgeVariant;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({
  variant = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={clsx("badge", `badge--${variant}`, className)}
      {...rest}
    >
      {children}
    </span>
  );
}
