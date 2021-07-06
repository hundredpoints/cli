import { BuilderCallback } from "yargs";
import globalHandler from "../handler";

export const command = "me";
export const desc = "Print current profile information";

export const builder: BuilderCallback<void, void> = (yargs) => {
  yargs.positional("command", {
    default: "me",
    implies: "profile",
  });
};

export const handler = globalHandler(async function me(_, sdk) {
  const response = await sdk.me();
  return response.me;
});
