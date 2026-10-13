import type { ReactNode } from "react";

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  plain?: boolean;
  newTab?: boolean;
};

export function Link({ href, children, className = "", plain, newTab }: LinkProps) {
  const color = plain ? "text-ink no-underline" : "text-rust underline";
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`${color} hover:text-ink focus-visible:outline-2 focus-visible:outline-rust focus-visible:outline-offset-4 ${className}`}
    >
      {children}
    </a>
  );
}
