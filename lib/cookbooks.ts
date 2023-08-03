import { GetStaticPaths, GetStaticProps } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";

async function listRepos() {
  const resp = await fetch("https://api.github.com/orgs/sous-chefs/repos", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  return resp.json();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await listRepos();
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
