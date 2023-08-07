import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Main } from "./components/main";

const config: DocsThemeConfig = {
  logo: <span>Sous Chefs</span>,
  project: {
    link: "https://github.com/sous-chefs",
  },
  docsRepositoryBase: "https://github.com/sous-chefs",
  footer: {
    text: "Sous Chefs",
  },
  main: Main,
};

export default config;
