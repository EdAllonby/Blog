import createMDX from "@next/mdx";

const rehypePrettyCodeOptions = {
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
  keepBackground: false,
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
};

const withMDX = createMDX({
  options: {
    // Use string plugin names with serializable options for Turbopack compatibility.
    rehypePlugins: [["rehype-pretty-code", rehypePrettyCodeOptions]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  reactStrictMode: true,
};

export default withMDX(nextConfig);
