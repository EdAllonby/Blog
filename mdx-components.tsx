import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

import { CodeFigure } from "@/components/mdx/code-figure";

const components: MDXComponents = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (!href) {
      return (
        <a {...props} className="text-gray-700 underline dark:text-gray-200">
          {children}
        </a>
      );
    }

    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");

    if (isExternal) {
      return (
        <a
          className="text-gray-700 underline dark:text-gray-200"
          href={href}
          rel="noreferrer"
          target="_blank"
          title={href}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        className="text-gray-700 underline dark:text-gray-200"
        href={href}
        {...props}
      >
        {children}
      </Link>
    );
  },
  figure: (props: ComponentPropsWithoutRef<"figure">) => {
    return <CodeFigure {...props} />;
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
