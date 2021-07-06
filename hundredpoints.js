#!/usr/bin/env node
const yargs = require("yargs");
const helpers = require("yargs/helpers");

const commands = require("./dist/commands").default;
const options = require("./dist/global-options");

const package = require("./package.json");

yargs(helpers.hideBin(process.argv))
  .scriptName("hundredpoints")
  .version(package.version)
  .wrap(Math.min(130, yargs.terminalWidth()))
  .option(options)
  .alias("h", "help")
  .alias("v", "version")
  .command(commands)
  .demandCommand()
  .recommendCommands()
  .strict().argv;
