import { GetStaticPaths, GetStaticProps } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";

// FIXME: Update the MD on these pages to get the docs working
const excludedRepos = [
  "rvm",
  "apt",
  "elasticsearch",
  "aws",
  "emacs",
  "ntp",
  "postfix",
];

export async function listRepos() {
  const resp = await fetch("https://api.github.com/orgs/sous-chefs/repos", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  const repos = await resp.json();
  return repos.filter((repo) => !excludedRepos.includes(repo.name));
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

  console.log(repo, path);

  const contentPath = `https://raw.githubusercontent.com/sous-chefs/${repo}/main/${
    path ? `documentation/${path}.md` : "README.md"
  }`;
  console.log(contentPath);
  const resp = await fetch(contentPath);
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
