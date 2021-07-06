import { BuilderCallback } from "yargs";
import { Arguments, handlerNoSdk as globalHandler } from "../handler";

export const command = "get <key>";
export const desc = "Get a config value";

export interface ConfigGetArguments {
  key: string;
}

export const builder: BuilderCallback<ConfigGetArguments, ConfigGetArguments> =
  (yargs) => {
    return yargs.positional("key", {
      describe: "Name of the config value",
      type: "string",
    });
  };

export const handler = globalHandler(async function logout({
  key,
  ...config
}: Arguments<ConfigGetArguments>) {
  if (!config[key]) {
    return {
      value: undefined,
    };
  }

  return {
    value: config[key],
  };
});
