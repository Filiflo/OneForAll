const FS = require("node:fs");
const PATH = require("node:path");
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { TOKEN } = require("./secret.json");

const commands = [];
const CMDS_PATH = PATH.join(__dirname, "commands");
const CMD_FILES = FS.readdirSync(CMDS_PATH).filter(file => file.endsWith(".js"));

for (const FILE of CMD_FILES) {
    const FILEPATH = PATH.join(CMDS_PATH, FILE);
    const COMMAND = require(FILEPATH);

    commands.push(COMMAND.data.toJSON());
}

