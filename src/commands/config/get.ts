import { BuilderCallback } from "yargs";
import { handlerNoSdk as globalHandler } from "../handler";

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

export const handler = globalHandler<ConfigGetArguments>(async function logout({
  key,
  ...config
}) {
  if (!config[key]) {
    return {
      success: true,
      value: undefined,
    };
  }

  return {
    success: true,
    value: config[key],
  };
});
