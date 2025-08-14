/*
@Developer: akshatop / improved by brapbrap
Name: Poketwo-Autocatcher
Version: V1.3.3
Description: bot to help users with catching pokemons and updating pokedex.json with totals
@Supported: poketwo/pokemon
STAR THIS REPO(https://github.com/AkshatOP/Poketwo-Autocatcher) 
*/
const Discord = require("discord.js-selfbot-v13")
const client = new Discord.Client({ checkUpdate: false });
const express = require('express');
const { solveHint, checkRarity } = require("pokehint")
const { ocrSpace } = require('ocr-space-api-wrapper');
const fs = require("fs");

const config = require('./config.json')
const json = require('./namefix.json');
const allowedChannels = ["SPAM CHANNEL ID"]; // your spam channel(s)
let isSleeping = false;

// Pokedex file setup
let pokedex = {};
if (fs.existsSync("pokedex.json")) {
    pokedex = JSON.parse(fs.readFileSync("pokedex.json", "utf8"));
}

//------------------------- KEEP-ALIVE --------------------------------//
const app = express();
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
app.get("/", (req, res) => res.status(200).send({ success: "true" }));
app.listen(process.env.PORT || 3000);

//--------------------------------------------------------------------//

function findOutput(input) {
    if (json.hasOwnProperty(input)) {
        return json[input];
    } else {
        return input;
    }
}

//-------------------------READY HANDLER-----------------------------//
client.on('ready', () => {
    console.log("https://github.com/AkshatOP/Poketwo-Autocatcher - Made better by 🔥brapbrap - original creator akshatop")
    console.log(`Account: ${client.user.username} is ONLINE and READY FOR ACTIONS`)
    console.log("Use $help to know about commands")

    const channel = client.channels.cache.get(config.spamChannelID)

    function getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function spam() {
        const result = Math.random().toString(36).substring(2, 15);
        channel.send(" 🔥" + result + " 🔥BRAPBRAPBRAP SPAM MESSAGE 🔥")
        setTimeout(spam, getRandomInterval(1500, 5000));
    }
    spam();
})

//-------------------------Anti-Crash-------------------------//
process.on("unhandledRejection", (reason, p) => {
    if (reason !== "Error: Unable to identify that pokemon.") console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => console.log(err, origin));
process.on("uncaughtExceptionMonitor", (err, origin) => console.log(err, origin));
process.on("multipleResolves", (type, promise, reason) => console.log(type, promise, reason));

//----------------------------AUTOCATCHER--------------------------------------//
client.on('messageCreate', async message => {
    if (allowedChannels.length > 0 && !allowedChannels.includes(message.channel.id)) return;

    if (message.content === "$captcha_completed" && message.author.id === config.OwnerID) {
        isSleeping = false;
        console.log("[Autocatcher] Resumed (captcha solved)")
        message.channel.send("Autocatcher Started!")
    }

    if (message.content === "$help" && message.author.id === config.OwnerID) {
        await message.channel.send(
            "``` Poketwo-Autocatcher\n Link: https://github.com/AkshatOP/Poketwo-Autocatcher\n\n $captcha_completed : Use to restart the bot once captcha is solved\n $say <content> : Make the bot say whatever you want\n $react <messageID> : React with ✅ emoji\n $click <messageID> : Clicks the button which has ✅ emoji\n $help : To show this message ```"
        )
    }

    if (!isSleeping) {

        if (message.content.includes("Please tell us") && message.author.id === "716390085896962058") {
            isSleeping = true;
            console.log("[Autocatcher] Paused (captcha detected)")
            message.channel.send("Autocatcher Stopped , Captcha Detected! Use `$captcha_completed` once the captcha is solved ");
            setTimeout(() => { isSleeping = false }, 18000000) //5 hours

        } else if (message.content.startsWith("$say") && message.author.id == config.OwnerID) {
            let say = message.content.split(" ").slice(1).join(" ")
            message.channel.send(say)

        } else if (message.content.startsWith("$react") && message.author.id == config.OwnerID) {
            let msg
            try {
                const args = message.content.slice(1).trim().split(/ +/g)
                msg = await message.channel.messages.fetch(args[1])
            } catch {
                message.reply(`Please Specify the message ID as an argument like "$react <messageID>"`)
            }
            if (msg) {
                try { msg.react("✅"); message.react("✅") } catch { message.react("❌") }
            }

        } else if (message.content.startsWith("$click") && message.author.id == config.OwnerID) {
            let msg
            try {
                var args = message.content.slice(1).trim().split(/ +/g)
                msg = await message.channel.messages.fetch(args[1])
            } catch {
                message.reply(`Please Specify the message ID as an argument like "$click <messageID>".`)
            }
            if (msg) {
                try { await msg.clickButton(); message.react("✅") } catch { message.react("❌") }
            }

        } else if (message.content == "That is the wrong pokémon!" && message.author.id == "716390085896962058") {
            message.channel.send(`<@716390085896962058> h`)

        } else if (message.author.id == "716390085896962058") {
            if (message?.embeds[0]?.footer?.text.includes("Spawns Remaining")) {
                await message.channel.send(`<@716390085896962058> h`)
                if (message.embeds[0]?.footer?.text == "Incense: Active.\nSpawns Remaining: 0.") {
                    message.channel.send(`<@716390085896962058> buy incense`)
                }

            } else if (message.content.includes("The pokémon is")) {
                let rarity;
                const pokemon = await solveHint(message)
                await message.channel.send(`<@716390085896962058> c ${pokemon[0]}`)
                try { rarity = await checkRarity(`${pokemon[0]}`) } catch { rarity = "Not Found in Database"; }
                const channel6 = client.channels.cache.get(config.logChannelID)
                if(channel6) {
                    channel6.send("[" + message.guild.name + "/#" + message.channel.name + "] " + "**__" + pokemon[0] + "__** " + "Rarity " + rarity)
                    const specialRarities = ["Shiny", "Rare", "Legendary", "Ultra Beast", "Mythical"];
                    if(specialRarities.includes(rarity)) {
                        channel6.send(`# WOW YOU CAUGHT A ${rarity.toUpperCase()} POKEMON WAY TO GO!!!!`);
                    }
                }
            }

        } else {
            const Pokebots = ["696161886734909481", "874910942490677270", "1254602968938844171"]; // sierra, pokename, p2a premium

            if (Pokebots.includes(message.author.id)) {

                // Handle P2A Premium plain text messages with a 5-10 sec random delay
                if (message.author.id === "1254602968938844171") {
                    const match = message.content.match(/^([A-Za-z]+):/i);
                    if (match) {
                        const pokemonName = match[1];
                        const delay = (Math.floor(Math.random() * 6) + 5) * 1000; // 5-10 seconds
                        setTimeout(async () => {
                            await message.channel.send(`<@716390085896962058> c ${pokemonName}`);

                            // Update pokedex.json
                            if(!pokedex[pokemonName]) {
                                pokedex[pokemonName] = { entries: [{ name: pokemonName }], total: 1 };
                            } else {
                                if (!Array.isArray(pokedex[pokemonName].entries)) { pokedex[pokemonName].entries = []; }
                                pokedex[pokemonName].entries.push({ name: pokemonName });
                                pokedex[pokemonName].total += 1;
                            }
                            fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));

                            // Log to the log channel
                            const logchannel = client.channels.cache.get(config.logChannelID);
                            if (logchannel) {
                                let rarity;
                                try { rarity = await checkRarity(pokemonName); } catch { rarity = "Not Found in Database"; }
                                logchannel.send("-# [" + message.guild.name + "/#" + message.channel.name + "] " + "**__" + pokemonName + "__** " + "Rarity **" + rarity + "** | Total: " + pokedex[pokemonName].total).catch(console.error);

                                const specialRarities = ["Shiny", "Rare", "Legendary", "Ultra Beast", "Mythical"];
                                if (specialRarities.includes(rarity)) {
                                    logchannel.send(`# WOW YOU CAUGHT A ${rarity.toUpperCase()} POKEMON WAY TO GO!!!!`);
                                }
                            }

                        }, delay);
                    }
                    return;
                }

                // Existing OCR handling for Sierra / Pokename
                let preferredURL = null;
                message.embeds.forEach((e) => {
                    if (e.image) {
                        const imageURL = e.image.url;
                        if (imageURL.includes("prediction.png")) preferredURL = imageURL;
                        else if (imageURL.includes("embed.png") && !preferredURL) preferredURL = imageURL;
                    }
                });

                if (preferredURL) {
                    let url = preferredURL;
                    async function main() {
                        try {
                            const res1 = await ocrSpace(url, { apiKey: `${config.ocrSpaceApiKey}` });
                            const name1 = res1.ParsedResults[0].ParsedText.split('\r')[0];
                            const name5 = name1.replace(/Q/g, 'R');
                            const name = findOutput(name5);

                            const delay = Math.floor(Math.random() * 6 + 5) * 1000;
                            setTimeout(async () => {
                                message.channel.send(`<@716390085896962058> c ${name}`).catch(console.error);

                                // Update pokedex.json
                                if(!pokedex[name]) {
                                    pokedex[name] = { entries: [{ name }], total: 1 };
                                } else {
                                    if (!Array.isArray(pokedex[name].entries)) { pokedex[name].entries = []; }
                                    pokedex[name].entries.push({ name });
                                    pokedex[name].total += 1;
                                }
                                fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));

                                const filter = (msg) => msg.author.id === "716390085896962058";
                                const collector = new Discord.MessageCollector(message.channel, filter, { max: 1, time: 13000 });

                                collector.on('collect', async (collected) => {
                                    if (collected.content.includes("Congratulations")) {
                                        const name2 = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                                        let rarity;
                                        try { rarity = await checkRarity(name2); } catch { rarity = "Not Found in Database"; }

                                        const logchannel = client.channels.cache.get(config.logChannelID)
                                        if(logchannel) {
                                            logchannel.send("[" + collected.guild.name + "/#" + collected.channel.name + "] " + "**__" + name2 + "__** " + "Rarity " + rarity + " | Total: " + pokedex[name2].total).catch(console.error);

                                            const specialRarities = ["Shiny", "Rare", "Legendary", "Ultra Beast", "Mythical"];
                                            if(specialRarities.includes(rarity)) {
                                                logchannel.send(`# WOW YOU CAUGHT A ${rarity.toUpperCase()} POKEMON WAY TO GO!!!!`);
                                            }
                                        }
                                        collector.stop();
                                    }
                                });
                            }, delay);

                        } catch (error) {
                            console.error(error);
                            const channel = client.channels.cache.get(config.errorChannelID)
                            if(channel) channel.send(error)
                        }
                    }
                    main()
                }
            }
        }
    }
});

//------------------------- INCENSE CHANNEL HANDLER -------------------------//
client.on('messageCreate', async message => {
    if (message.channel.id !== config.incenseChannelID) return;

    const Pokebots = ["696161886734909481", "874910942490677270", "1254602968938844171"]; // Sierra, Pokename, P2A Premium
    if (!Pokebots.includes(message.author.id)) return;

    // ---------- P2A Premium plain text messages ----------
    if (message.author.id === "1254602968938844171") {
        const match = message.content.match(/^([A-Za-z]+):/i);
        if (match) {
            const pokemonName = match[1];
            const delay = Math.floor(Math.random() * 5000) + 3000; // 3-8 seconds
            setTimeout(async () => {
                await message.channel.send(`<@716390085896962058> c ${pokemonName}`);

                // Update pokedex.json
                if (!pokedex[pokemonName]) {
                    pokedex[pokemonName] = { entries: [{ name: pokemonName }], total: 1 };
                } else {
                    if (!Array.isArray(pokedex[pokemonName].entries)) pokedex[pokemonName].entries = [];
                    pokedex[pokemonName].entries.push({ name: pokemonName });
                    pokedex[pokemonName].total += 1;
                }
                fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));

                // Log to log channel
                const logchannel = client.channels.cache.get(config.logChannelID);
                if (logchannel) {
                    let rarity;
                    try { rarity = await checkRarity(pokemonName); } catch { rarity = "Not Found in Database"; }
                    logchannel.send("-# [" + message.guild.name + "/#" + message.channel.name + "] " + "**__" + pokemonName + "__** " + "Rarity **" + rarity + "** | Total: " + pokedex[pokemonName].total).catch(console.error);

                    const specialRarities = ["Shiny", "Rare", "Legendary", "Ultra Beast", "Mythical"];
                    if (specialRarities.includes(rarity)) {
                        logchannel.send(`# WOW YOU CAUGHT A ${rarity.toUpperCase()} POKEMON WAY TO GO!!!!`);
                    }
                }
            }, delay);
        }
        return;
    }

    // ---------- Sierra / Pokename OCR / Embed handling ----------
    let preferredURL = null;
    message.embeds.forEach((e) => {
        if (e.image) {
            const imageURL = e.image.url;
            if (imageURL.includes("prediction.png")) preferredURL = imageURL;
            else if (imageURL.includes("embed.png") && !preferredURL) preferredURL = imageURL;
        }
    });

    if (!preferredURL) return;

    async function main() {
        try {
            const res1 = await ocrSpace(preferredURL, { apiKey: `${config.ocrSpaceApiKey}` });
            const name1 = res1.ParsedResults[0].ParsedText.split('\r')[0];
            const name5 = name1.replace(/Q/g, 'R');
            const name = findOutput(name5);

            const delay = Math.floor(Math.random() * 5000) + 3000; // 3-8 seconds
            setTimeout(async () => {
                await message.channel.send(`<@716390085896962058> c ${name}`).catch(console.error);

                // Update pokedex.json
                if(!pokedex[name]) {
                    pokedex[name] = { entries: [{ name }], total: 1 };
                } else {
                    if (!Array.isArray(pokedex[name].entries)) pokedex[name].entries = [];
                    pokedex[name].entries.push({ name });
                    pokedex[name].total += 1;
                }
                fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));

                const filter = (msg) => msg.author.id === "716390085896962058";
                const collector = new Discord.MessageCollector(message.channel, filter, { max: 1, time: 13000 });

                collector.on('collect', async (collected) => {
                    if (collected.content.includes("Congratulations")) {
                        const name2 = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                        let rarity;
                        try { rarity = await checkRarity(name2); } catch { rarity = "Not Found in Database"; }

                        const logchannel = client.channels.cache.get(config.logChannelID);
                        if (logchannel) {
                            logchannel.send("[" + collected.guild.name + "/#" + collected.channel.name + "] " + "**__" + name2 + "__** " + "Rarity " + rarity + " | Total: " + pokedex[name2].total).catch(console.error);

                            const specialRarities = ["Shiny", "Rare", "Legendary", "Ultra Beast", "Mythical"];
                            if(specialRarities.includes(rarity)) {
                                logchannel.send(`# WOW YOU CAUGHT A ${rarity.toUpperCase()} POKEMON WAY TO GO!!!!`);
                            }
                        }
                        collector.stop();
                    }
                });
            }, delay);
        } catch (error) {
            console.error(error);
            const channel = client.channels.cache.get(config.errorChannelID);
            if(channel) channel.send(error);
        }
    }
    main();
}); // <-- closes incense messageCreate

//------------------------- DUPLICATES MECHANIC (LIVE READ) -------------------------//
client.on('messageCreate', async message => {
    if (message.content.toLowerCase() === "brap duplicates" && message.channel.id === config.errorChannelID) {
        let pokedexData = {};
        if (fs.existsSync("pokedex.json")) {
            pokedexData = JSON.parse(fs.readFileSync("pokedex.json", "utf8"));
        }

        const duplicates = [];
        for (const poke in pokedexData) {
            if (pokedexData[poke].total >= 4) {
                duplicates.push({ name: poke, total: pokedexData[poke].total });
            }
        }

        if (duplicates.length > 0) {
            duplicates.sort((a, b) => b.total - a.total);
            
            // First message: header
            message.channel.send("**DUPLICATES:**");

            // Second message: names + totals
            const namesMessage = duplicates
                .map(d => `__**${d.name}**__ - total ${d.total}`)
                .join(', ');
            message.channel.send(namesMessage);

        } else {
            message.channel.send("all good bud!");
        }
    }
});

client.login(config.TOKEN)
