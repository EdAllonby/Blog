import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { type ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { constants } from "@/utils/constants";

import "@/styles/globals.css";

const ebGaramond = EB_Garamond({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-eb-garamond",
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
          ebGaramond.className,
          ebGaramond.variable,
          "bg-light-yellow text-gray-700 dark:bg-dark-gray dark:text-gray-200",
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
