import { GetStaticPaths, GetStaticProps } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";

export const getStaticPaths: GetStaticPaths = async () => {
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
  const markdown = `
    # Hello World
    `;

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
