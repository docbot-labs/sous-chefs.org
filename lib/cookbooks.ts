import { GetStaticPaths, GetStaticProps } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await fetch("https://api.github.com/orgs/sous-chefs/repos");
  const repos = await resp.json();

  const paths = (
    await Promise.all(
      repos.map(async (repo) => {
        const paths = [repo.name];

        const resp = await fetch(
          `https://api.github.com/repos/sous-chefs/${repo.name}/contents/documentation`
        );
        const docs = await resp.json();

        return paths;
      })
    )
  ).flat();

  console.log(paths);

  return {
    fallback: "blocking",
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const [repo, path] = slug as string[];

  const resp = await fetch(
    `https://raw.githubusercontent.com/sous-chefs/${repo}/main/README.md`
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
