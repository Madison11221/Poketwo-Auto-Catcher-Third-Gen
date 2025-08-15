# Poketwo-AUTOCATCHER

**Original developer:** akshatop. This version has been enhanced and improved by madsso

A third generation Pokétwo autocatcher, created with the goal of preventing people from wasting their money on buying autocatchers online.

---

### Youtube Tutorial
https://www.youtube.com/watch?v=Qqog9HaNU8Y  
*Note: Tutorial is kind of slow. A short text guide for setup is provided at the end.*

---

### Features
The bot has the following features:  
- ⚙️ Easy Setup (simply run a script and enter the correct information, no 'coding' needed)  
- ⬆️ Auto-levelling (Level up all your duel Pokémon to level 100 **overnight** by just selecting them!)  
- 📜 Log all the Pokémon it catches in your desired channel!  
- 💕 **Trustworthy**; this autocatcher is **completely** open-source (meaning you can see the latest code)  
- 📜 Support for all Pokémon in Pokétwo (GEN9 TOO!!)  
- 🏎️ Super fast; the autocatcher can even handle Incense!  
- 🔍 Pokétwo-Resistant - the autocatcher is undetectable due to its method of catching  
- 🔊 Say command `$say <text>` to trade Pokémon/manipulate bot  
- ✅ Can click any button by using `$click <messageID>`  
- 🌟 Can react to any message by using `$react <messageID>`  

### **ENHANCED Features** - enhanced by madsso
- 📈 Live tracking Pokédex with initial Pokédex logger  
- 🤖 P2 Assistant compatibility (auto-catching only works with premium for now unless P2 developers change features)  
- 📝 Better logging in channels (includes rarity, total amount, and formatting)  
- 🔁 Duplicates command to tell you when you have more than a certain amount of Pokémon  
- ⚡ Faster and better Pokémon recognition  
- 🎉 Big message in logging channel for rare, legendary, mythical, ultra beast, or shiny Pokémon  

---

### Requirements
Please note that this autocatcher requires **Node.js** installed on your system or any platform you are running it on.

## Invite P2 Assistant Bot to make the autocatcher run:  
[Invite Link](https://discord.com/oauth2/authorize?client_id=854233015475109888)  
## you can also use pokename, but it's not as reliable and you would HAVE to use ocr token
*Note: Uptime for PokeName Bot is trash.*

---

#### Running the bot
To start up the bot for the first time, clone the repo by this link to your local machine or Replit (wherever you wish): [click here](https://github.com/AkshatOP/Poketwo-Autocatcher.git)  
Once you have done that, hit `npm install` in console.

---

## **Specific Channel Support**
If you want to run the bot so that it catches only in specific channels, head over to LINE 17 of `index.js` and fill the array with channel IDs of those channels you want to catch in.  
*Leave it like `[ ]` if you don't want this feature.*  

---

## **Help**
Use `$help` command to get info about list of commands bot has in it.

---

## **Captcha**
If Captcha comes, the bot stops its catching and goes to a short sleep. You can solve the captcha from any ID and then use the command `$captcha_completed` for the bot to wake up.

---

## **Config.json**
After that, enter in the following fields in **Config.json**:

##### TOKEN:
Paste in your Discord account's user token. You can find instructions [here](https://www.youtube.com/watch?v=3W9tAEsK7RM)  
*CAUTION:* If you are using Repl.it and don't want your token to be leaked, follow this [tutorial](https://www.youtube.com/watch?v=BKlv__1OoGc) to secure your token and apply that fix in line 130 of `index.js`.

## QUICK SETUP GUIDE AT BOTTOM 

##### spamChannelID:
This will allow the bot to use your preferred channel to spam as well as catch Pokétwo spawns. Make sure you paste this carefully, as if you set it to the wrong channel it will spam and catch there.

##### logChannelID:
This will allow the bot to log the Pokémon caught in your desired channel.

##### errorChannelID:
This will allow the bot to log any code errors in your desired channel.

##### OwnerID:
This will be the user-ID of the account controlling the bot (for using `$say` and `$captcha_completed` commands).  

##### ocrSpaceApiKey:
This is the MOST IMPORTANT part. You have to create an OCR.Space account and put its API key. Click [here](https://ocr.space/ocrapi/freekey) to get a free API key.

After you’ve entered that in, the autocatcher should start successfully. *(If not, check if you entered the right fields.)*

> Remember to `cd` into your autocatcher folder as well. If you need help with something, you can DM *madsso*.

> ALL Done! You can now start your bot by typing `node index.js` or `node .` in the console.

---

### Auto-levelling
To enable auto-levelling, just select the Pokémon in that autocatcher ID and let it auto-level.

---

If you want to contribute to the community, please post the JSON you made after a few weeks of use of this bot here or DM *madsso*.

---

## **DISCLAIMER**
Please note that self-botting is against Discord's Terms of Service and being discovered using a self-bot may result in your account being banned. To avoid this, keep knowledge of your self-bot to a minimum and use a throwaway account. I am not responsible for any accounts lost due to the self-bot. I also recommend checking the self-bot channel's messages occasionally to see if Pokétwo has sent a captcha. **If it has, it would be a good idea to solve it.**

---

## Support Server 
*The support server listed in this README is no longer active, and the owner is unresponsive.*  
DM *madsso* for help.

---

## Acknowledgements
### Creators
* akshatop (Original developer)  
* madsso (Enhancements and improvements)

### Contributors
* madsso  
* akshatop  

---

## Quick Setup Guide

1. **Invite Bot**  
Invite either **PokeName** or **P2A Assistant** to your server.

2. **Install Node.js**  
Install Node.js (required) if you don't already have it. Having **VS Code** on your computer helps as a text editor, but Notepad can also work.

3. **Create a GitHub Account**  
If you don't already have one, sign up here: https://github.com

4. **Go to the Repository**  
Go to the repository here: (insert repository link later)

5. **Create a Folder for the Bot**  
Create a new folder somewhere you would like to store the bot. It’s recommended to place it somewhere easy to access.

6. **Open Command Prompt in the Folder**  
Open the folder, right-click, and select **Command Prompt**.

7. **Clone the Repository**  
Paste this in Command Prompt:  
git clone (https://github.com/Madison11221/Poketwo-Auto-Catcher-Third-Gen)
*Note:* You may need to install Git first if you don't already have it: https://git-scm.com/downloads

8. **Configure the Bot**  
Open `config.json` in the folder you just installed and fill in the details.  
If the folder doesn't appear immediately, close the main folder and reopen it.

Configuration options:  
- `ocrSpaceApiKey`  
- `spamChannelID`  
- `logChannelID`  
- `errorChannelID`  
- `OwnerID`  
- `Token`

*OCR may not be necessary if you are using P2 Assistant.*  
If needed, get an OCRSpace API key here: https://ocr.space/ocrapi/freekey  
(Sign up with email, confirm, and get the final key.)

9. **Enable Developer Mode in Discord**  
- Go to **User Settings > Advanced > Developer Mode**.  
- Right-click your channels to get their IDs.  
- Recommended channels:  
  - **Spam Channel**  
  - **Log Channel**  
  - **Error Channel** (used for duplicates or code errors)  

Fill these IDs in their respective fields in `config.json`.

10. **Owner ID and Token**  
- Owner ID: your own Discord user ID.  
- Token: open Discord in a web browser, press `Ctrl+Shift+I` to open Developer Tools, go to the **Application** tab (click the phone/computer icon if needed), search **Token** in the filter, and paste the long alphanumeric string into the `Token` field in `config.json`.

11. **Initialize Node Modules**  
Open your command prompt again in the folder and type:  


npm init -y

This should yield a response. Then type exactly:  


npm install discord.js-self express ocr-space-api-wrapper

This process may take a couple of minutes.

12. **Set Allowed Channels**  
Open `index.js`, press `Ctrl+F` to search for `const allowedChannels`.  
Inside the brackets, paste your spam channel ID:  


["YOUR_SPAM_CHANNEL_ID"]

Make sure it is just your ID inside quotes.

13. **Run the Bot**  
Run the command:  


node index.js

It should now be working!

14. **Pokédex & Duplicates Commands**  
To use the Pokédex and duplicates commands effectively, you need to run `pokedex.js` (not `pokedex.json`).  
Type in the command window:  


node pokedex.js

You only need to do this once if you constantly run the bot.  
If you catch Pokémon outside the bot and want to use these features, remove the contents of `pokedex.json` and leave only:  


{}


15. **Customizations**  
You can customize things in `index.js` but be careful!  

- In the **spam ready handler** section, search `BRAPBRAP` to customize the message:  


channel.send(" 🔥" + result + " 🔥BRAPBRAPBRAP MOTORCYCLE 🔥")

Do **not** remove `+ result +` (it contains the random numbers to avoid detection). You can change the emojis and words.  

- Search `WOW YOU` to change messages for special Pokémon.  

- At the bottom, in the **DUPLICATES MECHANIC** section:  
  - Change `"brap duplicates"` to whatever triggers the duplicate reader.  
  - Change `"all good bud!"` to customize the message when no duplicates are found.  
  - Adjust the default threshold (`>4`) in:  

if (pokedexData[poke].total >= 4)
to set how many duplicates trigger the alert.

