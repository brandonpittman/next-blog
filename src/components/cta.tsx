import Link from "next/link";
import * as React from "react";

interface CtaProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Cta({ href, className = "", children }: CtaProps) {
  const classes = "inline-block px-3 py-2 font-medium rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 transition"
    .concat(" ")
    .concat(className);

  const style = { color: "white", textDecoration: "none" };

  return href.startsWith("http") ? (
    <a
      href={href}
      className={classes}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link href={href}>
      <a className={classes} style={style}>
        {children}
      </a>
    </Link>
  );
}
