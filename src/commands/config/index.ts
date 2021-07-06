import { BuilderCallback } from "yargs";

import * as get from "./get";
import * as set from "./set";

const commands = [get, set];

export const command = "config";
export const describe = "Manage the config";
export const builder: BuilderCallback<any, any> = (yargs) => {
  return yargs.command(commands as any);
};
