#!/usr/bin/env node
const { version, repository } = require("../package.json");
const args = process.argv.slice(2).map(parseArgs);

function parseArgs(arg) {
    if (arg.includes("=")) {
        const [k, v] = arg.split("=");
        return { [k]: v };
    }
    return { [arg]: arg };
}

function getArgs(name) {
    const found = args.find(x => x[name]);
    if (found) return found[name];
}

const assetsBuilder = (force) => import("../scripts/assets/build.mjs").then(res => res.build(force));

const helpMessage = `Commands: canvacord <command_name> [options]
help               : shows this menu
rebuild [--force]  : rebuilds assets
version            : shows canvacord version info
github             : returns github repository url for canvacord

Canvacord v${version}`;

async function main() {
    if (getArgs("rebuild")) {
        if (getArgs("--help")) return console.log(`Rebuilds assets cache.\n\nExamples:\ncanvacord rebuild\ncanvacord rebuild --force`);
        return await assetsBuilder(!!getArgs("--force"));
    }
    if (getArgs("version")) return console.log(`Canvacord v${version}`);
    if (getArgs("github")) return console.log(repository.url.replace("git+", ""));
    console.log(helpMessage);
}

main();