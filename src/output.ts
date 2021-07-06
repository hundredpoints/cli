import prettyjson from "prettyjson";
import { CliArguments } from "./commands/arguments";
import { GlobalReturnType } from "./commands/handler";

export default function output<T extends GlobalReturnType>(
  result: T,
  { json, color, programmatic }: CliArguments
): T {
  if (programmatic) {
    return result;
  }

  const log = (text: any) =>
    console.log(
      json
        ? JSON.stringify(text)
        : prettyjson.render(text, {
            noColor: !color,
          })
    );

  try {
    if (typeof result?.error === "string") {
      log(JSON.parse(result.error));
    } else {
      log(result);
    }
  } catch {
    log(result);
  }

  return result;
}
