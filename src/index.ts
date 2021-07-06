import { toProgrammatic } from "./commands/handler";

import { handler as activityHandler } from "./commands/activity/activity";

import { handler as configGet } from "./commands/config/get";
import { handler as configSet } from "./commands/config/set";

import { handler as integrationInstall } from "./commands/integration/install";

import { handler as meHandler } from "./commands/me/me";

import { handler as profileList } from "./commands/profile/list";
import { handler as profileRemove } from "./commands/profile/remove";
import { handler as setToken } from "./commands/profile/set-token";

export const activity = toProgrammatic(activityHandler);

export const config = {
  get: toProgrammatic(configGet),
  set: toProgrammatic(configSet),
};

export const integration = {
  install: toProgrammatic(integrationInstall),
};

export const me = toProgrammatic(meHandler);

export const profile = {
  list: toProgrammatic(profileList),
  remove: toProgrammatic(profileRemove),
  setToken: toProgrammatic(setToken),
};
