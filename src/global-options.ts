export const color = {
  alias: "c",
  type: "boolean",
  describe: "Allow color output",
  default: true,
};

export const profile = {
  alias: "p",
  type: "string",
  describe: "Specify a profile to use",
};

export const json = {
  alias: "j",
  type: "boolean",
  describe: "Output on single line as JSON",
  default: false,
};

export const token = {
  alias: "t",
  type: "string",
  describe: "Override profile's token",
};

export const interactive = {
  alias: "i",
  type: "boolean",
  describe: "Enable interactive prompts",
  default: true,
};
