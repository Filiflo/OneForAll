const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("I will reflect your ping"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
}