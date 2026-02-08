import type { Metadata } from "next";
import localFont from "next/font/local";
import { type ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { constants } from "@/utils/constants";

import "@/styles/globals.css";

const ebGaramond = localFont({
  src: "../../public/fonts/EBGaramond-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-eb-garamond",
  weight: "200 700",
});

export const metadata: Metadata = {
  description: constants.websiteDescription,
  title: constants.websiteName,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          ebGaramond.variable,
          "bg-light-yellow font-ebgaramond text-gray-700 dark:bg-dark-gray dark:text-gray-200",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
