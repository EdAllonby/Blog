"use client";

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type CodeFigureProps = ComponentPropsWithoutRef<"figure">;

function normalizeCodeText(value: string) {
  // Rehype output usually ends with a trailing newline.
  return value.replace(/\n$/, "");
}

async function copyText(value: string) {
  if (typeof navigator?.clipboard?.writeText === "function") {
    await navigator.clipboard.writeText(value);

    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function CodeFigure({ children, className, ...props }: CodeFigureProps) {
  const figureRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  const isCodeFigure = "data-rehype-pretty-code-figure" in props;

  const handleCopy = async () => {
    const code = figureRef.current?.querySelector("pre code");
    const text = normalizeCodeText(code?.textContent ?? "");

    if (!text) {
      return;
    }

    try {
      await copyText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure
      ref={figureRef}
      className={cn(className, isCodeFigure && "mdx-code-figure")}
      {...props}
    >
      {isCodeFigure ? (
        <button
          aria-label={copied ? "Code copied" : "Copy code to clipboard"}
          className="mdx-code-copy-button"
          onClick={handleCopy}
          type="button"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      ) : null}
      {children}
    </figure>
  );
}
