import { CommandBuilder } from "yargs";
import { writeConfig } from "../../config";
import { Arguments, handlerNoSdk as globalHandler } from "../handler";

export const command = "set <key> <value>";
export const desc = "Set a config value";

export interface ConfigSetArguments {
  key: string;
  value: string;
}

export const builder: CommandBuilder<ConfigSetArguments, ConfigSetArguments> = (
  yargs
) => {
  yargs.positional("key", {
    describe: "Name of the config value",
    type: "string",
  });

  yargs.positional("value", {
    describe: "Value of the config key",
    type: "string",
  });

  return yargs;
};

export const handler = globalHandler(async function logout({
  key,
  value,
  profile,
}: Arguments<ConfigSetArguments>) {
  await writeConfig(profile, key, value);
});
