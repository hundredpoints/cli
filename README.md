# HundredPoints Cli

## Install

Download the latest binary from [releases](https://github.com/hundredpoints/cli/releases/latest)

Also available on `npm`

```sh
$ npm i @hundredpoints/hundredpoints -g
```

## Usage

```sh
$ hundredpoints --help
```

Help output:

```
hundredpoints <command>

Commands:
  hundredpoints activity <entities>    Submit activity
  hundredpoints config                 Manage the config
  hundredpoints integration <command>  Manage integration
  hundredpoints me                     Print current profile information
  hundredpoints profile <command>      Manage profiles

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

## Programmatic usage

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

## Available commands

* [activity](#activity)
* [config](#config)
  * [config get](#config-get)
  * [config set](#config-set)
* [integration](#integration)
  * [integration install](#integration-install)
* [me](#me)
* [profile](#profile)
  * [profile list](#profile-list)
  * [profile remove](#profile-remove)
  * [profile set-token](#profile-set-token)

### activity

```sh
$ hundredpoints activity --help
```

Help output:

```
hundredpoints activity <entities>

Submit activity

Positionals:
  entities  A json encoded string of the activity entities  [string] [required]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
      --git          Allow file urls to be converted to git urls  [boolean]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

### config

```sh
$ hundredpoints config --help
```

Help output:

```
hundredpoints config

Manage the config

Commands:
  hundredpoints config get <key>          Get a config value
  hundredpoints config set <key> <value>  Set a config value

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

#### config get

```sh
$ hundredpoints config get --help
```

Help output:

```
hundredpoints config get <key>

Get a config value

Positionals:
  key  Name of the config value  [string] [required]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

#### config set

```sh
$ hundredpoints config set --help
```

Help output:

```
hundredpoints config set <key> <value>

Set a config value

Positionals:
  key    Name of the config value  [string] [required]
  value  Value of the config key  [string] [required]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

### integration

```sh
$ hundredpoints integration --help
```

Help output:

```
hundredpoints integration <command>

Manage integration

Commands:
  hundredpoints integration install <name>  Create a new installation

Positionals:
  command  [required] [choices: "install"]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

#### integration install

```sh
$ hundredpoints integration install --help
```

Help output:

```
hundredpoints integration install <name>

Create a new installation

Positionals:
  command  [required] [choices: "install"] [default: "install"]
  name  [required] [choices: "vim"]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

### me

```sh
$ hundredpoints me --help
```

Help output:

```
hundredpoints me

Print current profile information

Positionals:
  command  [default: "me"]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

### profile

```sh
$ hundredpoints profile --help
```

Help output:

```
hundredpoints profile <command>

Manage profiles

Commands:
  hundredpoints profile list               Lists all profiles
  hundredpoints profile remove <profile>   Remove access token from the current profile
  hundredpoints profile set-token <token>  Set an access token for the current profile

Positionals:
  command  [required] [choices: "list", "set-token", "remove"]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

#### profile list

```sh
$ hundredpoints profile list --help
```

Help output:

```
hundredpoints profile list

Lists all profiles

Positionals:
  command  [required] [choices: "list", "set-token", "remove"] [default: "list"]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

#### profile remove

```sh
$ hundredpoints profile remove --help
```

Help output:

```
hundredpoints profile remove <profile>

Remove access token from the current profile

Positionals:
  command  [required] [choices: "list", "set-token", "remove"] [default: "remove"]
  profile, p  [string] [required]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -t, --token        Override profile's token  [string]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

#### profile set-token

```sh
$ hundredpoints profile set-token --help
```

Help output:

```
hundredpoints profile set-token <token>

Set an access token for the current profile

Positionals:
  command  [required] [choices: "list", "set-token", "remove"] [default: "set-token"]
  token, t  Access token  [string] [required]

Options:
  -c, --color        Allow color output  [boolean] [default: true]
  -p, --profile      Specify a profile to use  [string]
  -j, --json         Output on single line as JSON  [boolean] [default: false]
  -i, --interactive  Enable interactive prompts  [boolean] [default: true]
  -h, --help         Show help  [boolean]
  -v, --version      Show version number  [boolean]
```

## License

BSD-3-Clause.
