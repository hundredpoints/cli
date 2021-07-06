// spell-checker: words keytar
import { BuilderCallback } from "yargs";
import keytar from "keytar";
import prompts from "prompts";

import { Arguments, handlerNoSdk as globalHandler } from "../handler";

import getSdk from "../../sdk";
import { CliError } from "../../utilities/error";

export const command = "set-token <token>";
export const desc = "Set an access token for the current profile";

export interface IntegrationSetTokenArguments {
  token: string;
  profile: string;
}

export const builder: BuilderCallback<IntegrationSetTokenArguments, void> = (
  yargs
) => {
  yargs
    .positional("command", {
      default: "set-token",
      implies: "profile",
    })
    .positional("token", {
      describe: "Access token",
      type: "string",
    });
};

export const handler = globalHandler(async function ({
  profile,
  token,
  interactive,
  origin,
  api,
}: Arguments<IntegrationSetTokenArguments>) {
  const sdk = getSdk({ token, origin, api });

  if (interactive) {
    const existing = await keytar.getPassword("hundredpoints", profile);

    if (!existing) {
      const { confirm } = await prompts({
        type: "confirm",
        name: "confirm",
        message: `Did you want to create a new profile named ${profile}`,
      });

      if (!confirm) {
        throw new CliError("User canceled");
      }
    }
  }

  const response = await sdk.me();

  await keytar.setPassword("hundredpoints", profile, token);
  return response.me;
});
