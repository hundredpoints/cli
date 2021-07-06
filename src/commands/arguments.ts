export type CliArguments<T = {}> = T & GlobalArguments;

export type ProgrammaticArguments<T = {}> = T & Partial<GlobalArguments>;

export type GlobalArguments = {
  profile?: string;
  color?: boolean;
  json: boolean;
  token?: string;
  interactive: boolean;
};
