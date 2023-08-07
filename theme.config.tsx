import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Main } from "./components/main";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <span>Sous Chefs</span>,
  project: {
    link: "https://github.com/sous-chefs",
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://sous-chefs.org/" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "Sous Chefs"} />
        <meta
          property="og:description"
          content={
            frontMatter.description || "Community of Chef cookbook maintainers"
          }
        />
      </>
    );
  },
  docsRepositoryBase: "https://github.com/sous-chefs",
  footer: {
    text: "Sous Chefs",
  },
  main: Main,
};

export default config;
