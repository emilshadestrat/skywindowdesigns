"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href" | "children"> & {
  href: string;
  children?: ReactNode;
};

/**
 * Compatibility bridge used while legacy presentation components are moved
 * from Wouter to the Next.js App Router. It always uses Next navigation.
 */
export function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation(): [string, (href: string) => void] {
  const pathname = usePathname() || "/";
  const router = useRouter();

  return [pathname, (href: string) => router.push(href)];
}
