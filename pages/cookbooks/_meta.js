const { createCatchAllMeta } = require("nextra/catch-all");

module.exports = async () => {
  console.log("Running cookbooks meta");

  const resp = await fetch("https://api.github.com/orgs/sous-chefs/repos");
  const repos = await resp.json();

  return createCatchAllMeta(
    repos.map((repo) => repo.name).map((name) => `${name}.mdx`)
  );
};
