#!/usr/bin/env bash

npx cli-docs-generator \
  --cli=./hundredpoints.js \
  --pretty_cli_name=hundredpoints \
  --license=BSD-3-Clause\
  --npm_registry_namespace=hundredpoints \

sed -i 's/# hundredpoints/# HundredPoints Cli/' README.md


# Install section
echo "$(cat << EOF | sed '/^## Install$/ r /dev/stdin' README.md

Download the latest binary from [releases](https://github.com/hundredpoints/cli/releases/latest)

Also available on \`npm\`
EOF
)" > README.md


# Programmatic use (hijack the available commands and be sure to replace it
sed -i 's/^## Available commands$/## Programmatic usage/' README.md

echo "$(cat << EOF | sed '/^## Programmatic usage$/ r /dev/stdin' README.md

All commands are also available via programmatic use.

When used programmatically:

- \`color\` defaults to \`false\`
- \`json\` defaults to \`true\`
- \`interactive\` defaults to \`false\`

Changing these values may cause the package to work in an unexpected manner

The commands take the form off

\`\`\`
<command>({ ...[positionals], ...options })

or

<command>.<subcommand>({ ...[positionals], ...options })
\`\`\`

For example

\`\`\`js
import { activity, config } from "@hundredpoints/cli";

await activity({
  entities: [],
  profile: "cli",
});

const apiEndpoint = config.get({
  key: "api",
});
\`\`\`

## Available commands
EOF
)" > README.md
