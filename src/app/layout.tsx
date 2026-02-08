import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { type ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistPixelSquare } from "geist/font/pixel";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { constants } from "@/utils/constants";

import "@/styles/globals.css";
import "@/styles/mdx.css";

const ebGaramond = EB_Garamond({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const geistPixelSquare = GeistPixelSquare;

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
          geistPixelSquare.variable,
          "bg-light-yellow dark:bg-dark-gray text-gray-700 dark:text-gray-200",
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
        <SpeedInsights />
      </body>
    </html>
  );
}
