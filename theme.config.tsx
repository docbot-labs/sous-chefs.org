import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Main } from "./components/main";

const config: DocsThemeConfig = {
  logo: <span>Sous Chefs</span>,
  project: {
    link: "https://github.com/shuding/nextra-docs-template",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    text: "Nextra Docs Template",
  },
  main: Main,
};

export default config;
