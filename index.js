// Consts
const Discord = require('discord.js');
const bot = new Discord.Client();
const botconfig = require('./botconfig.json');
bot.login (botconfig.token);
bot.on('ready', () => {
    console.log("Up and running");
    bot.user.setActivity("over you", {type: 3});
});
const admins = botconfig.admins;
const newschannel = botconfig.news;
const fs = require('fs')
const join = require("./join");

// Leaving a guild
bot.on('guildDelete', guild => {
    if (fs.existsSync(`./server_settings/${guild.id}.js`)) {
        fs.unlink(`./server_settings/${guild.id}.js`,(x) => {if (x) console.error(x)});
    }
    if (fs.existsSync(`./server_commands/${guild.id}.js`)) {
        fs.unlink(`./server_commands/${guild.id}.js`,(x) => {if (x) console.error(x)});
    }
})



// Setup
bot.on("guildCreate", guild => {
    console.log(`Joined the server named ${guild.name}`);
    let Member = guild.me;
    if (!Member.hasPermission(['SEND_MESSAGES'])) guild.leave()
    if (!Member.hasPermission(['MANAGE_CHANNELS','VIEW_CHANNEL','MANAGE_MESSAGES'])) {
        let bool = true;
        guild.channels.forEach(c => {
            if (c.type == "text" && bool) {
                c.send('I\'m sorry but to setup properly, I will need to have the rights to view and manage channels.\nHere is a link to reinvite me and `hopefully` give me the rights this time.\nhttps://discordapp.com/oauth2/authorize?client_id=592760920648712192&scope=bot&permissions=11280');
                c.guild.leave();
                bool = false
            }
        });
    }
    else join.Setup(guild, bot)
}) 

// Messages
bot.on('message', message => {
    let bool = false;
    admins.forEach((admin) => {if (admin == message.author.id) bool = true});
    if (message.content.startsWith('darkcore') && bool) {
        let m = message.content.split(' ').splice(1);
        if (m[0] == 'say') {
            message.delete();
            let c = message.guild.channels.find('id', m[1]);
            if (!c) return console.log('can\'t find the channel');
            c.send(m.splice(2).join(' '));
            console.log(`successfully sended the message`)
        }
        else if (m[0] == 'clean') {
            message.delete();
            let d = message.guild.channels.find('name','Darkcore');
            if (!d) return console.log('nothing to clear')
            d.children.forEach(c => {c.delete()});
            d.delete();
            console.log('cleaning successful');
        }
        else if (m[0] == 'leave') {
            message.delete();
            message.guild.leave();
            console.log('successfully leaved the server')
        }
        else if (m[0] == 'help') {
            message.delete();
            message.author.send("Here are my admin commands :\nleave : To leave a server\nclean : To clean any channel I could have created\nsay [channel] : to say a message in a channel")
        }
    }
    else if ((message.channel.id == newschannel) && (message.author.id == bot.user.id)) {
        fs.readdir("./server_settings/", (x, files) => {
            if (x) console.error(x);
            let jsfiles = files.filter(f => f.split(".").pop() ==="js")
            jsfiles.forEach(file => {
                let mod = require(`./server_settings/${file}`)
                if (mod.newsC != 'false') {
                    let g = bot.guilds.find('id', file.split(".")[0]);
                    let c = g.channels.find('id', mod.newsC);
                    c.send(message.content);
                    console.log(`news sent to ${g.name}`);
                }
            })
        })
    }
    else {
        if (!fs.existsSync(`./server_settings/${message.guild.id}.js`)) return;
        let mod = require(`./server_settings/${message.guild.id}`);
        if (message.author == bot.user) return;
        let msg = message.content.toLowerCase();
        if (message.channel.id == mod.igC) {
            if (message.content.startsWith(mod.prefix)) message.reply("I'm sorry, but you cannot use commands here, because of compatibility problems with other servers.");
            fs.readdir("./server_settings/", (x, files) => {
                if (x) console.error(x);
                message.delete();
                let jsfiles = files.filter(f => f.split(".").pop() ==="js");
                let attachments = message.attachments.map(a => a.url);
                jsfiles.forEach(file => {
                    let mod = require(`./server_settings/${file}`)
                    if (mod.igC != 'false') {
                        let g = bot.guilds.find('id', file.split(".")[0]);
                        let c = g.channels.find('id', mod.igC);
                        c.send(`${message.author.username}: ${message.content}`, { tts: message.tts, files: attachments })
                    }
                })
            })
        }
        else if ((mod.swear)&&((msg.indexOf(' fuck') >= 0)||(msg.indexOf(' ptn') >= 0)||(msg.indexOf(' putain') >= 0)||(msg.indexOf(' chie') >= 0)||(msg.indexOf(' pute') >= 0)||(msg.indexOf(' salope') >= 0)||(msg.indexOf(' merde') >= 0)||(msg.indexOf(' shit') >= 0)||(msg.indexOf(' bitch') >= 0)||(msg.indexOf(' ass') >= 0)||(msg.indexOf(' arse') >= 0)||(msg.indexOf(' bastard') >= 0)||(msg.indexOf(' slut') >= 0) || (msg.startsWith('fuck'))||(msg.startsWith('ptn'))||(msg.startsWith('putain'))||(msg.startsWith('chie'))||(msg.startsWith('pute'))||(msg.startsWith('salope'))||(msg.startsWith('merde'))||(msg.startsWith('shit'))||(msg.startsWith('bitch'))||(msg.startsWith('ass'))||(msg.startsWith('arse'))||(msg.startsWith('bastard'))||(msg.startsWith('slut')))) {
            let correction = msg.split('fuck').join('*heck*');
            correction = correction.split('shit').join('*heck*');
            correction = correction.split('chie').join('*défeque*');
            correction = correction.split('merde').join('*mince*');
            correction = correction.split('pute').join('*fille de joie*');
            correction = correction.split('salope').join('*fille de joie*');
            correction = correction.split('putain').join('*fille de joie*');
            correction = correction.split('ptn').join('*fille de joie*');
            correction = correction.split('bitch').join('*happy woman*');
            correction = correction.split('ass').join('*[you know where]*');
            correction = correction.split('arse').join('*[you know where]*');
            correction = correction.split('bastard').join('*bad person*');
            correction = correction.split('slut').join('*bad person*');
            if (mod.lang == "esp") message.channel.send('Perdoneme, pero no soy certain de avoir bien comprendo. Queraba decir :\n'+ correction)
            else if (mod.lang == "fr") message.channel.send('Désolé, je ne suis pas sûr d\'avoir bien compris. Vouliez vous dire:\n'+ correction)
            else message.channel.send('Sorry, I\'m not sure I heard well. Did you mean:\n'+ correction);
        }
        else if (message.content.startsWith(mod.prefix)) {
            if (!fs.existsSync(`./server_commands/${message.guild.id}.js`)) return;
            let cmd = require(`./server_commands/${message.guild.id}`);
            let text = message.content.split('').splice(mod.prefix.length).join('').split(' ');
            abool = false;
            cmd.cmdList.forEach(kw => {
                if (kw[0] == text[0]) abool = true;
            });
            if (abool && (typeof(cmd[text[0]]) == 'function')) cmd[text[0]](message, mod, cmd.cmdList, bot, botconfig);
            else cmd.sorry(message, mod.prefix);
        }
        else if (message.isMentioned(bot.user)) {
            if (mod.lang == 'esp') return message.channel.send(`Hola ;) ! Me llamaba? Para tener una lista de las commandas, escribe \`${mod.prefix}helpa\`. Si quieres precisiones sobre una partcular commanda, escribe \`${mod.prefix}helpa [commanda llama]\``);
            else if (mod.lang == 'fr') return message.channel.send(`Bonjour :) ! On m'appelle? Pour avoir une liste complète de mes commandes, écrivez simplement \`${mod.prefix}aide\`. Si vous voulez une aide plus spécifique, ajoutez le nom de la commande qui vous intrigue après le \`aide\``);
            else return message.channel.send(`Hello :) ! Did you call me? To have a list of all commands available on this server, please type in \`${mod.prefix}help\`. To have a more precise information about a command, you can also type in \`${mod.prefix}helpe [command name]\``);
        }
    }
})