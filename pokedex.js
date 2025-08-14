const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({ checkUpdate: false });
const fs = require("fs");

const config = require("./config.json");
const allowedChannels = [config.spamChannelID];

// Load or create pokedex.json as an object
let pokedex = {};
if (fs.existsSync("pokedex.json")) {
    pokedex = JSON.parse(fs.readFileSync("pokedex.json", "utf8"));
}

// Track processed message IDs per page to avoid double-counting edits
let processedMessages = new Map();

function savePokedex() {
    fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));
}

function processEmbed(message) {
    if (!message.embeds || message.embeds.length === 0) return;
    const embed = message.embeds[0];
    if (!embed.description) return;

    const lastProcessedContent = processedMessages.get(message.id);
    if (lastProcessedContent === embed.description) return; // already processed this page
    processedMessages.set(message.id, embed.description);

    const lines = embed.description.split("\n");
    let pageTotal = 0;

    lines.forEach(line => {
        const nameMatch = line.match(/\*\*.*?>\s*([A-Za-z0-9♀️. ]+?)<:/);
        if (nameMatch && nameMatch[1]) {
            const name = nameMatch[1].trim();
            if (!pokedex[name]) {
                pokedex[name] = { total: 1 };
            } else {
                pokedex[name].total += 1;
            }
            pageTotal += 1;
        }
    });

    savePokedex();
    console.log(`Logged ${pageTotal} Pokémon from this page.`);
    console.log("Current Pokedex totals:", pokedex);

    const footerText = embed.footer?.text || "";
    if (footerText.match(/showing entries 1–\d+ out of \d+/i)) {
        console.log("Flip to next page in the spam channel.");
    } else {
        console.log("Back to page one! Pokémon concluded. Press CTRL+C to exit.");
    }
}

// Ready
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log("Run `@poketwo pokemon` in your spam channel to begin logging process.");
});

// Listen for new messages
client.on("messageCreate", message => {
    if (!allowedChannels.includes(message.channel.id)) return;
    if (message.author.id !== "716390085896962058") return;
    processEmbed(message);
});

// Listen for edited messages
client.on("messageUpdate", (oldMessage, newMessage) => {
    if (!allowedChannels.includes(newMessage.channel.id)) return;
    if (newMessage.author.id !== "716390085896962058") return;
    processEmbed(newMessage);
});

client.login(config.TOKEN);
