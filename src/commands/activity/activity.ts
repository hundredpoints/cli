import { BuilderCallback } from "yargs";
import { CreateActivityEventInputEvent } from "../../sdk/__generated__";
import { fileToGitUrl } from "../../utilities/git";
import globalHandler, { Arguments } from "../handler";

export const command = "activity <entities>";
export const desc = "Submit activity";

export interface ActivityArguments {
  entities: CreateActivityEventInputEvent[];
  git?: boolean;
}

export const builder: BuilderCallback<ActivityArguments, void> = (yargs) => {
  yargs
    .positional("entities", {
      describe: "A json encoded string of the activity entities",
      type: "string",
      coerce: JSON.parse,
    })
    .option("git", {
      describe: "Allow file urls to be converted to git urls",
      type: "boolean",
    });
};

export const handler = globalHandler(async function activity(
  { entities, git, fileIgnoreList }: Arguments<ActivityArguments>,
  sdk
) {
  const input: Record<string, CreateActivityEventInputEvent> = {};

  await Promise.all(
    entities.map(async (entity) => {
      const url = git
        ? (await fileToGitUrl(entity.url)) || entity.url
        : entity.url;

      if (fileIgnoreList.some((file) => url.match(file))) {
        return;
      }

      const startDateTime = new Date(entity.startDateTime);
      const endDateTime = new Date(entity.endDateTime);

      // This key will be used to de-duplicate entries later on
      const key = `${url}-${startDateTime}-${endDateTime}`;

      input[key] = {
        ...input[key],
        ...entity,
        startDateTime,
        endDateTime,
        url,
        isWrite: input[key]?.isWrite ? true : !!entity.isWrite,
      };
    })
  );

  const response = await sdk.createActivityEvents({
    input: {
      events: Object.values(input),
    },
  });

  return response.createActivityEvents;
});
