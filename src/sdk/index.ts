import { GraphQLClient } from "graphql-request";
import {
  getSdk as getGeneratedSdk,
  Sdk as GeneratedSdk,
} from "./__generated__";

import { GlobalArguments } from "../commands/arguments";
import { CliError } from "../utilities/error";
import { Config } from "../config";

export type GetClientOptions = Pick<GlobalArguments, "token"> &
  Pick<Config, "origin" | "api">;

export type Sdk = GraphQLClient & GeneratedSdk;

export default function getSdk({ token, origin, api }: GetClientOptions): Sdk {
  if (!token) {
    throw new CliError("No token provided", "No token provided");
  }

  const client = new GraphQLClient(`${origin}${api}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const sdk = getGeneratedSdk(client);

  return Object.assign(client, sdk);
}
