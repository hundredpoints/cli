import { BuilderCallback } from "yargs";

import * as list from "./list";
import * as remove from "./remove";
import * as setToken from "./set-token";

const commands = [list, remove, setToken];

export const command = "profile <command>";
export const describe = "Manage profiles";
export const builder: BuilderCallback<any, any> = (yargs) => {
  return yargs.command(commands as any).positional("command", {
    choices: ["list", "set-token", "remove"],
  });
};
