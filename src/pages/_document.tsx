import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/EBGaramond-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Ed's Blogs" />
      </Head>
      <body className="bg-light-yellow font-ebgaramond text-gray-700 dark:bg-dark-gray dark:text-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
