import { Arguments } from "yargs";
import { Config, getProfile } from "../config";
import output from "../output";
import getSdk, { Sdk } from "../sdk";
import { CliError } from "../utilities/error";

import { CliArguments } from "./arguments";

export type HandleFn<T> = (
  args: Arguments<Config & CliArguments<T>>,
  sdk: Sdk
) => Promise<any>;

export type HandleFnNoSdk<T> = (
  args: Arguments<Config & CliArguments<T>>
) => Promise<any>;

export function handlerNoSdk<T>(fn: HandleFnNoSdk<T>) {
  return async (args: Arguments<CliArguments & T>) => {
    try {
      const profileSettings = await getProfile(args);
      const result = await fn(profileSettings);

      if (!result && args.json) {
        return output({ success: true }, args);
      } else if (result) {
        return output(result, args);
      }
    } catch (error) {
      if (error.response) {
        return output(error.response, args);
      }

      return output(error.message, args);
    }
  };
}

export default function handler<T>(fn: HandleFn<T>) {
  return async (args: Arguments<CliArguments & T>) => {
    try {
      const profileSettings = await getProfile(args);
      const sdk = getSdk(profileSettings);
      const result = await fn(profileSettings, sdk);

      if (!result && args.json) {
        return output({ success: true }, args);
      } else if (result) {
        return output(result, args);
      }
    } catch (error) {
      if (error instanceof CliError) {
        return output({ error }, args);
      }

      if (error.response) {
        return output(error.response, args);
      }

      return output({ error: error.message }, args);
    }
  };
}
