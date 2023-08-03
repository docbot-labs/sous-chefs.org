import { GetStaticPaths, GetStaticProps } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("getStaticPaths");

  return {
    fallback: "blocking",
    paths: [
      {
        params: {
          slug: "test-slug",
        },
      },
    ],
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
