const FS = require("node:fs");
const PATH = require("node:path");
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { TOKEN } = require("./secret.json");

const commands = [];
const commandsPath = PATH.join(__dirname, "commands");
const commandFiles = FS.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const clientId = "515823156758577153";

for (const file of commandFiles) {
    const filePath = PATH.join(commandsPath, file);
    const command = require(filePath)
    
    const data = command.data;
    console.info(`[info] pushing { ${data.name} } onto deployment stack`);
    commands.push(data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.info(`[info] Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log(`[success] Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();