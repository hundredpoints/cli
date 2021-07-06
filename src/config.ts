// spell-checker: words cosmiconfig keytar

import { writeFile } from "fs/promises";
import { homedir } from "os";
import { cosmiconfigSync } from "cosmiconfig";
import { parse, stringify } from "ini";
import keytar from "keytar";

import { GlobalArguments } from "./commands/arguments";

export type Config = {
  origin: string;
  api: string;
  fileIgnoreList: string[];
};

const env: Partial<Config> = {
  origin: process.env.HUNDREDPOINTS_ORIGIN || "https://app.hundredpoints.io",
  api: process.env.HUNDREDPOINTS_API || "/api/graphql",
};

const explorerSync = cosmiconfigSync("hundredpoints", {
  searchPlaces: [".hundredpoints"],
  loaders: {
    noExt: (_, content) => parse(content),
  },
});

const search = explorerSync.search(process.cwd());
const filepath = search?.filepath || homedir() + "/.hundredpoints";
let filesystemConfig = search?.config;

const baseConfig: GlobalArguments = {
  ...env,
  fileIgnoreList: [],
  ...filesystemConfig?.default,
};

export async function getProfile(args: GlobalArguments) {
  const { profile } = args;
  if (!profile) {
    return { ...baseConfig, ...args };
  }

  const token = await keytar.getPassword("hundredpoints", profile);

  const mergedConfig = {
    ...baseConfig,
    ...filesystemConfig[profile],
    profile,
    token,
    ...args,
  };

  return mergedConfig;
}

export async function writeConfig(
  section: string | undefined,
  key: string,
  value: string | number | undefined
): Promise<void> {
  const profile = section || "default";

  filesystemConfig = {
    ...filesystemConfig,
    [profile]: {
      ...filesystemConfig[profile],
      [key]: value === undefined ? "" : value,
    },
  };

  await writeFile(filepath, stringify(filesystemConfig));

  return filesystemConfig;
}

export default baseConfig;
