// spell-checker: words keytar
import keytar from "keytar";
import { BuilderCallback } from "yargs";

import { handlerNoSdk as globalHandler } from "../handler";

export const command = "remove <profile>";
export const desc = "Remove access token from the current profile";

export const builder: BuilderCallback<unknown, void> = (yargs) => {
  yargs
    .positional("command", {
      default: "remove",
    })
    .positional("profile", {
      type: "string",
    });
};

export interface IntegrationSetTokenArguments {
  profile: string;
}

export const handler = globalHandler<IntegrationSetTokenArguments>(
  async function ({ profile }) {
    if (!profile) {
      throw new Error("No profile provided");
    }

    await keytar.deletePassword("hundredpoints", profile);
  }
);
