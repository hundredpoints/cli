import { Arguments as YargsArguments } from "yargs";
import { Config, getProfile } from "../config";
import output from "../output";
import getSdk, { Sdk } from "../sdk";
import { CliError } from "../utilities/error";

import { GlobalArguments } from "./arguments";

export type Arguments<T> = YargsArguments<Config & GlobalArguments & T>;

export type GlobalReturnType = {
  error?: boolean | string | CliError;
  [key: string]: any;
} | void;

export type HandleFn<T> = (
  args: Arguments<T>,
  sdk: Sdk
) => Promise<GlobalReturnType>;

export type HandleFnNoSdk<T> = (
  args: Arguments<T>
) => Promise<GlobalReturnType>;

export function handlerNoSdk<T, F extends HandleFnNoSdk<T>>(fn: F) {
  return async (args: Arguments<T>): Promise<ReturnType<F>> => {
    try {
      const profileSettings = await getProfile(args);
      const result = await fn(profileSettings);
      return output(result, args);
    } catch (error) {
      if (error.response) {
        return output(error.response, args);
      }

      return output(error.message, args);
    }
  };
}

export default function handler<T>(fn: HandleFn<T>) {
  return async (args: Arguments<T>) => {
    try {
      const profileSettings = await getProfile(args);
      const sdk = getSdk(profileSettings);
      const result = await fn(profileSettings, sdk);
      return output(result, args);
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

export function toProgrammatic<
  F extends (args: Arguments<any>) => Promise<GlobalReturnType>
>(fn: F): F {
  return ((args) => {
    return fn({
      ...args,
      color: false,
      interactive: false,
      json: true,
    });
  }) as F;
}
