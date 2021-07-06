# HundredPoints Cli

## Install

Download the latest binary from [releases](https://github.com/hundredpoints/cli/releases/latest)

Also available on `npm`

`npm i @hundredpoints/cli`

```
hundredpoints <command>

Commands:
  hundredpoints activity <entities>    Submit activity
  hundredpoints config                 Manage the config
  hundredpoints integration <command>  Manage integration
  hundredpoints me                     Print current profile information
  hundredpoints profile <command>      Manage profiles

Options:
  -c, --color        Allow color output                     [boolean] [default: true]
  -p, --profile      Specify a profile to use                                [string]
  -j, --json         Output on single line as JSON         [boolean] [default: false]
  -t, --token        Override profile's token                                [string]
  -i, --interactive  Enable interactive prompts             [boolean] [default: true]
  -h, --help         Show help                                              [boolean]
  -v, --version      Show version number                                    [boolean]
```

## Programmatic use

All commands are also available via programmatic use.

When used programmatically:

- `color` defaults to `false`
- `json` defaults to `true`
- `interactive` defaults to `false`

Changing these values may cause the package to work in an unexpected manner

The commands take the form off

```
<command>({ ...[positionals], ...options })

or

<command>.<subcommand>({ ...[positionals], ...options })
```

For example

```js
import { activity, config } from "@hundredpoints/cli";

await activity({
  entities: [],
  profile: "cli",
});

const apiEndpoint = config.get({
  key: "api",
});
```
