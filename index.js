const FS = require("node:fs");
const PATH = require("node:path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { TOKEN } = require("./secret.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

const commandPath = PATH.join(__dirname, "commands");
const commandFiles = FS.readdirSync(commandPath).filter(file => file.endsWith(".js"));

const eventsPath =  PATH.join(__dirname, "events");
const eventFiles = FS.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

/// add commands ///
client.commands = new Collection();
for( const file of commandFiles) {
    const filepath = PATH.join(commandPath, file);
    const command = require(filepath);

    client.commands.set(command.data.name, command);
}
console.log(`[client][setup] prepared ${commandFiles.length} commands`);

/// add events ///
for( const file of eventFiles ) {
    const filePath = PATH.join(eventsPath, file);
    const event = require(filePath);

    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
console.log(`[client][setup] prepared ${eventFiles.length} events`);

client.login(TOKEN);