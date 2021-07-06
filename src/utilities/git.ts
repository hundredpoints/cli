import { readFile } from "fs/promises";
import { promisify } from "util";
import { dirname, join, relative } from "path";
import findUpwards from "find-up";
import LRU from "lru-cache";
import gitconfiglocal from "gitconfiglocal";

export interface GitConfig {
  remote: Record<string, { url: string; fetch: string }>;
  branch: Record<string, { remote: string; merge: string }>;
}

const gitconfig = promisify(gitconfiglocal);

const branchCache = new LRU<string, Promise<string | null>>(50);
const configCache = new LRU<string, Promise<GitConfig | undefined>>(50);

async function getCurrentBranch(gitDir: string) {
  if (branchCache.has(gitDir)) {
    return branchCache.get(gitDir);
  }

  async function _getCurrentBranch() {
    const head = await readFile(join(gitDir, "HEAD"), "utf8");
    const match = /ref: refs\/heads\/([^\n]+)/.exec(head);
    return match ? match[1] : null;
  }

  const value = _getCurrentBranch();

  branchCache.set(gitDir, value);

  return value;
}

async function getGitConfig(gitDir: string): Promise<GitConfig | undefined> {
  if (configCache.has(gitDir)) {
    return configCache.get(gitDir);
  }

  const value = new Promise<GitConfig | undefined>((resolve, reject) => {
    gitconfig(gitDir).then((config) => resolve(config as GitConfig), reject);
  });

  configCache.set(gitDir, value);

  return value;
}

export async function fileToGitUrl(file: string) {
  if (!file.startsWith("file://")) {
    return;
  }

  const localFile = file.replace(/^file:\/\/(localhost)?/, "");
  const cwd = dirname(localFile);

  const gitDir = await findUpwards(".git", { type: "directory", cwd });

  if (!gitDir) return;

  const [currentBranch, gitConfig] = await Promise.all([
    getCurrentBranch(gitDir),
    getGitConfig(gitDir),
  ]);

  if (!gitConfig) return;
  if (!currentBranch) return;
  if (!gitConfig.remote) return;
  if (!gitConfig.branch[currentBranch]) return;

  const remote = gitConfig.branch[currentBranch].remote;
  const remoteUrl = gitConfig.remote[remote].url;
  const relativePath = relative(join(gitDir, ".."), localFile);

  return `${remoteUrl}#${currentBranch}/${relativePath}`;
}
