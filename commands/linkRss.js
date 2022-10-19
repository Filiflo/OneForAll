const { SlashCommandBuilder, channelLink } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rss")
        .setDescription("add/remove rss feed")
        .addSubcommand(sub=>sub
                .setName("link")
                .setDescription("link feed")
                .addChannelOption(channel => channel.setName("channel").setDescription("channel"))
                .addStringOption(link => link.setName("url").setDescription("url"))
        )
        .addSubcommand(sub=>sub
            .setName("unlink")
            .setDescription("unlink feed")
            .addChannelOption(channel => channel.setName("channel").setDescription("channel"))
        )

    ,
    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("channel");
        console.log(interaction.guild.get())
        // if( subCommand === "link") {
        //     const url = interaction.options.getString("url");

        //     interaction.guild.cache.get("rssFeeds").set(channel.id, {link: url});
        // } else if(subCommand === "unlink") {
        //     interaction.guild.cache.get("rssFeeds").delete(channel.id);
        // }
        // else {
        //     console.error("there is not subcommand "+subCommand);
        // }

        // interaction.channel.cache.array.forEach(element => {
        //     console.log(element);
        // });
    },
}