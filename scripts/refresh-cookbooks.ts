import path from "path";
import fs from "fs/promises";
import { listRepos } from "../lib/cookbooks";

const outDir = path.join(process.cwd(), "pages/cookbooks");

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const repos = await listRepos();

function authenticatedFetch(url: string) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
}

async function fetchNestedDocumentation(name: string, subdir: string) {
  const contentPath = `https://api.github.com/repos/sous-chefs/${name}/contents/${subdir}`;
  const outDir = path.join(process.cwd(), "pages/cookbooks", name, subdir);
  await fs.mkdir(outDir, { recursive: true });

  const resp = await authenticatedFetch(contentPath);

  if (!resp.ok) {
    return;
  }

  const json = await resp.json();
  console.info(`Found ${json.length} files in ${name}/${subdir}`);

  json.forEach(async ({ name, download_url }: any) => {
    if (!name.endsWith(".md")) {
      return;
    }

    const resp = await authenticatedFetch(download_url);
    const markdown = await resp.text();
    await fs.writeFile(path.join(outDir, name), markdown, {
      flag: "wx",
    });
  });
}

await Promise.all(
  repos.map(async ({ name }) => {
    const downloadPath = `https://raw.githubusercontent.com/sous-chefs/${name}/main/README.md`;
    const dir = path.join(outDir, name);
    await fs.mkdir(dir, { recursive: true });
    const resp = await authenticatedFetch(downloadPath);
    const markdown = await resp.text();
    await fs.writeFile(path.join(dir, `README.md`), markdown, {
      flag: "wx",
    });

    await fetchNestedDocumentation(name, "documentation");
  })
);
