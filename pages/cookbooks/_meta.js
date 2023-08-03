import { createCatchAllMeta } from "nextra/catch-all";
import { listRepos } from "../../lib/cookbooks";

export default async () => {
  console.log("Running cookbooks meta");

  const repos = await listRepos();

  return createCatchAllMeta(
    repos.map((repo) => repo.name).map((name) => `${name}.mdx`)
  );
};
