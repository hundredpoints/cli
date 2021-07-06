// spell-checker: words keytar
import prompts from "prompts";
import { BuilderCallback } from "yargs";
import open from "open";
import keytar from "keytar";

import { Arguments, handlerNoSdk as globalHandler } from "../handler";

export const command = "install <name>";
export const desc = "Create a new installation";

export interface IntegrationInstallArguments {
  name: string;
}

export const builder: BuilderCallback<IntegrationInstallArguments, void> = (
  yargs
) => {
  yargs
    .positional("command", {
      default: "install",
    })
    .positional("name", {
      demandOption: "Integration name is required",
      choices: ["vim"],
    });
};

export const handler = globalHandler(async function ({
  name,
  interactive,
  origin,
}: Arguments<IntegrationInstallArguments>) {
  if (interactive) {
    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: `Hundredpoints will open your browser to get the access token, did you wish to continue?`,
      initial: true,
    });

    if (!confirm) {
      return;
    }
  }

  open(`${origin}/integrations/auth/${name}`);

  if (interactive) {
    const { token } = await prompts({
      type: "text",
      name: "token",
      message: `Enter token for new profile '${name}'`,
    });

    if (!token) {
      return;
    }

    await keytar.setPassword("hundredpoints", name, token);
  }
});
