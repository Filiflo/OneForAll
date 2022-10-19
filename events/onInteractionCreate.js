module.exports = { //
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if(!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) return;

        try {
            console.log(`[client]][info] ${interaction.user.tag} #${interaction.channel.name} executed ${interaction.commandName}`)
            console.log(interaction)
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({ content: "ooops! seems like there is an error! ", ephemeral: true });
        }
    },
}