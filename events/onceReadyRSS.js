const { hyperlink, hideLinkEmbed, Collection } = require("discord.js");
const { rssFeeds } = require("./settings.json");

const Parser = require("rss-parser");
const url = "https://www.fh-wedel.de/news.rss";
//const embed = hideLinkEmbed(hyperlink())
const parser = new Parser();

if(!rssFeeds) rssFeeds = new Collection();

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.rssFeeds = rssFeeds;
        client.guild
        setInterval(()=>{
            rssFeeds.array.forEach(async ({ guildId, feeds})  => {
                
                const guild = client.guilds.get(guildId);

                feeds.array.forEach(async ({channelId, url}) => {
                    const feed = await parser.parseURL(url);
                    //console.log(feed.title);
        
                    const channel = guild.channels.get(channelId);
                    
                    if(!channel) return;

                    feed.items.forEach(item => {
                        channel.threads.create({
                            name: item.title,
                            message: { content: item.title },
                            appliedTags: item.categories,
                        });
                    });
                })
            });
        }, 600000) // 10min
    },
}