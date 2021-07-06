import { BuilderCallback } from "yargs";

import * as install from "./install";

const commands = [install];

export const command = "integration <command>";
export const describe = "Manage integration";
export const builder: BuilderCallback<any, any> = (yargs) => {
  return yargs.command(commands as any).positional("command", {
    choices: ["install"],
  });
};
