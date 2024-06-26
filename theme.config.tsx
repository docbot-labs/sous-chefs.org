import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Main } from "./components/main";
import { useRouter } from "next/router";
import logo from "./images/logo.png";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: <Image width={48} height={48} src={logo} alt="Sous Chefs" />,
  project: {
    link: "https://github.com/sous-chefs",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Sous Chefs",
    };
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
  main: Main,
};

export default config;
