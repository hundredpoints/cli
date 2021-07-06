import prettyjson from "prettyjson";
import { CliArguments } from "./commands/arguments";

export default function output(
  result: any,
  { json, color }: CliArguments
): void {
  const log = (text: any) =>
    console.log(
      json
        ? JSON.stringify(text)
        : prettyjson.render(text, {
            noColor: !color,
          })
    );

  try {
    if (result.error && typeof result.error === "string") {
      log(JSON.parse(result.error));
    } else {
      log(result);
    }
  } catch {
    log(result);
  }
}
