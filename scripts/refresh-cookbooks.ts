import path from "path";
import fs from "fs/promises";
import { listRepos } from "../lib/cookbooks";

const outDir = path.join(process.cwd(), "cookbooks");

const repos = await listRepos();

await Promise.all(
  repos.map(async (repo) => {
    const contentPath = `https://raw.githubusercontent.com/sous-chefs/${repo.name}/main/README.md`;
    const resp = await fetch(contentPath, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    const markdown = await resp.text();
    await fs.writeFile(path.join(outDir, `${repo.name}.md`), markdown, {
      flag: "wx",
    });
  })
);
