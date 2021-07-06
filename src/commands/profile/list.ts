// spell-checker: words keytar
import { BuilderCallback } from "yargs";
import keytar from "keytar";

import { handlerNoSdk as globalHandler } from "../handler";

export const command = "list";
export const desc = "Lists all profiles";

export const builder: BuilderCallback<void, void> = (yargs) => {
  yargs.positional("command", {
    default: "list",
  });
};

export const handler = globalHandler(async function () {
  const credentials = await keytar.findCredentials("hundredpoints");

  return { profiles: credentials.map(({ account }) => account) };
});
