// spell-checker: words cosmiconfig keytar

import fs from "fs";
import { join } from "path";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import findUp from "find-up";
import { parse, stringify } from "ini";
import keytar from "keytar";

import { GlobalArguments } from "./commands/arguments";

let configPath = findUp.sync([
  ".hundredpointsrc",
  ".hundredpoints.json",
  ".hundredpoints",
]);

export type Config = {
  origin: string;
  api: string;
  fileIgnoreList: string[];
};

const env: Partial<Config> = {
  origin: process.env.HUNDREDPOINTS_ORIGIN || "https://app.hundredpoints.io",
  api: process.env.HUNDREDPOINTS_API || "/api/graphql",
};

let filesystemConfig = configPath
  ? parse(fs.readFileSync(configPath, "utf-8"))
  : {};

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

  configPath = configPath || join(homedir(), ".hundredpoints");

  await writeFile(configPath, stringify(filesystemConfig));
}

export default baseConfig;
