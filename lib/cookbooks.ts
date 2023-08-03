import { GetStaticPaths, GetStaticProps } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await fetch("https://api.github.com/orgs/sous-chefs/repos");
  const repos = await resp.json();

  const paths = repos.map((repo) => ({
    params: {
      slug: [repo.name],
    },
  }));

  return {
    fallback: "blocking",
    paths,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps");

  const resp = await fetch(
    `https://raw.githubusercontent.com/sous-chefs/nginx/main/README.md`
  );
  const markdown = await resp.text();

  const mdx = await buildDynamicMDX(markdown, {
    defaultShowCopyCode: true,
    mdxOptions: {
      remarkPlugins: [
        // ...defaultRemarkPlugins,
        // [remarkLinkRewrite, { pattern: /^\/docs(\/.*)?$/, replace: "/v2$1" }],
      ],
    },
  });

  return {
    props: {
      ...mdx,
      ...(await buildDynamicMeta()),
    },
  };
};
