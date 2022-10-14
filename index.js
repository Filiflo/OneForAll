const FS = require("node:fs");
const PATH = require("node:path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { TOKEN } = require("./secret.json");


const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once("ready", ()=>{
    console.log("[client][status] online");
});

const commandPath = PATH.join(__dirname, "commands");
const commandFiles = FS.readdirSync(commandPath).filter(file => file.endsWith(".js"));

client.commands = new Collection();
for( const file of commandFiles) {
    const filepath = PATH.join(commandPath, file);
    const command = require(filepath);

    client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interaction.reply({ content: "ooops! seems like there is an error! ", ephemeral: true });
    }
});

client.login(TOKEN);