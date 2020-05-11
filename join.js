const Discord = require('discord.js');
const fs = require('fs')

exports.Setup = (guild, Abot) => {
    const bot = Abot;
    const end = (c, pref) => {
        if (pref.channels == "yes") {
            if (pref.lang == 'esp') c.setName('generalo');
            else if (pref.lang == 'fr') c.setName('général');
            else c.setName('general')
        }
        if (pref.channels == 'yes') {
            cat = c.guild.channels.find('name', 'Darkcore');
            if (pref.commands & 8) c.guild.createChannel('roleplay', {parent: cat.id, type:"text"});
            if (pref.commands & 64) {
                if (pref.lang == 'esp') c.guild.createChannel('juegos', {parent: cat.id, type:"text"});
                else if (pref.lang == 'fr') c.guild.createChannel('jeux', {parent: cat.id, type:"text"});
                else c.guild.createChannel('games', {parent: cat.id, type:"text"});
            }
            if (pref.commands & 256) {
                if (pref.lang == 'esp') c.guild.createChannel('musica', {parent: cat.id, type:"text"});
                else if (pref.lang == 'fr') c.guild.createChannel('musique', {parent: cat.id, type:"text"});
                else c.guild.createChannel('music', {parent: cat.id, type:"text"});
            }
        }
        if (fs.existsSync(`./server_settings/${c.guild.id}.js`)) delete require.cache[require.resolve(`./server_settings/${c.guild.id}`)];
        if (fs.existsSync(`./server_commands/${c.guild.id}.js`)) delete require.cache[require.resolve(`./server_commands/${c.guild.id}`)];
        let inside = [`exports.favC = '${c.id}';`,`exports.lang = '${pref.lang}';`,`exports.igC = '${pref.interguildC}';`,`exports.newsC = '${pref.news}';`,`exports.setup = '${pref.channels}';`,`exports.prefix = '${pref.prefix}';`];
        if (pref.commands & 16) inside.push('exports.swear = true;')
        else inside.push('exports.swear = false;');
        inside = inside.join('\n');
        fs.writeFileSync(`server_settings\\${c.guild.id}.js`, inside, (x) => {if (x) console.error(x)});
        let cmdList = [];
        let insideCmd = ["const Discord = require('discord.js')","const fs = require('fs')"];
        let cmds = require('./command_db.json');
        if (pref.lang == 'esp') {
            cmdList.push(['helpa','Helpa es una commanda para ayudarte y dar una lista de todas las commandas. Puedes poner un palabra despues por una helpa sobre este palabra'])
            cmds.esp.mandatory.description.forEach(l => {cmdList.push(l)});
            cmds.esp.mandatory.commands.forEach(com => {insideCmd.push(com)});
            if (pref.commands & 32) {
                cmds.esp.usuel.description.forEach(l => {cmdList.push(l)});
                cmds.esp.usuel.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 2) {
                cmds.esp.mod.description.forEach(l => {cmdList.push(l)});
                cmds.esp.mod.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 4) {
                cmds.esp.fun.description.forEach(l => {cmdList.push(l)});
                cmds.esp.fun.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 8) {
                cmds.esp.rp.description.forEach(l => {cmdList.push(l)});
                cmds.esp.rp.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 64) {
                cmds.esp.game.description.forEach(l => {cmdList.push(l)});
                cmds.esp.game.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 128) {
                cmds.esp.rdm.description.forEach(l => {cmdList.push(l)});
                cmds.esp.rdm.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 256) {
                cmds.esp.music.description.forEach(l => {cmdList.push(l)});
                cmds.esp.music.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 512) {
                cmds.esp.doc.description.forEach(l => {cmdList.push(l)});
                cmds.esp.doc.commands.forEach(com => {insideCmd.push(com)});
            }
        }
        else if (pref.lang == 'fr') {
            cmdList.push(['aide','Aide est une commande pour donner une liste de toute les commandes disponibles sur ce serveur. Vous pouvez ajouter le nom d\'une commande derrière pour obtenir une aide spécifique dessus.'])
            cmds.fr.mandatory.description.forEach(l => {cmdList.push(l)});
            cmds.fr.mandatory.commands.forEach(com => {insideCmd.push(com)});
            if (pref.commands & 32) {
                cmds.fr.usuel.description.forEach(l => {cmdList.push(l)});
                cmds.fr.usuel.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 2) {
                cmds.fr.mod.description.forEach(l => {cmdList.push(l)});
                cmds.fr.mod.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 4) {
                cmds.fr.fun.description.forEach(l => {cmdList.push(l)});
                cmds.fr.fun.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 8) {
                cmds.fr.rp.description.forEach(l => {cmdList.push(l)});
                cmds.fr.rp.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 64) {
                cmds.fr.game.description.forEach(l => {cmdList.push(l)});
                cmds.fr.game.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 128) {
                cmds.fr.rdm.description.forEach(l => {cmdList.push(l)});
                cmds.fr.rdm.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 256) {
                cmds.fr.music.description.forEach(l => {cmdList.push(l)});
                cmds.fr.music.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 512) {
                cmds.fr.doc.description.forEach(l => {cmdList.push(l)});
                cmds.fr.doc.commands.forEach(com => {insideCmd.push(com)});
            }
        }
        else {
            cmdList.push(['help','Help is a command used to see the list of all commands existing on this server. You can also append the name of a command to see its description'])
            cmds.eng.mandatory.description.forEach(l => {cmdList.push(l)});
            cmds.eng.mandatory.commands.forEach(com => {insideCmd.push(com)});
            if (pref.commands & 32) {
                cmds.eng.usuel.description.forEach(l => {cmdList.push(l)});
                cmds.eng.usuel.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 2) {
                cmds.eng.mod.description.forEach(l => {cmdList.push(l)});
                cmds.eng.mod.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 4) {
                cmds.eng.fun.description.forEach(l => {cmdList.push(l)});
                cmds.eng.fun.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 8) {
                cmds.eng.rp.description.forEach(l => {cmdList.push(l)});
                cmds.eng.rp.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 64) {
                cmds.eng.game.description.forEach(l => {cmdList.push(l)});
                cmds.eng.game.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 128) {
                cmds.eng.rdm.description.forEach(l => {cmdList.push(l)});
                cmds.eng.rdm.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 256) {
                cmds.eng.music.description.forEach(l => {cmdList.push(l)});
                cmds.eng.music.commands.forEach(com => {insideCmd.push(com)});
            }
            if (pref.commands & 512) {
                cmds.eng.doc.description.forEach(l => {cmdList.push(l)});
                cmds.eng.doc.commands.forEach(com => {insideCmd.push(com)});
            }
        }
        let cmdListstr1 = [];
        cmdList.forEach(binome => {let alist = `["${binome[0]}","${binome[1]}"]`; cmdListstr1.push(alist)})
        let cmdListstr2 = ['[', cmdListstr1.join(','), ']'].join('');
        insideCmd.push(`exports.cmdList = ${cmdListstr2}`);
        insideCmd = insideCmd.join('\n');
        fs.writeFileSync(`server_commands\\${c.guild.id}.js`, insideCmd, (x) => {if (x) console.error(x)});
        if (c.guild.channels.find('name', 'Setup')) c.guild.channels.find('name', 'Setup').delete();
        let endEmbed = new Discord.RichEmbed()
        .setColor(4365908)
        if (pref.lang == 'esp') endEmbed.setTitle("Fantastico! Ha finido este setup").setDescription("Soy ready! Puedes empezar en @me para tener informaciones");
        else if (pref.lang == 'fr') endEmbed.setTitle("Bravo! Vous avez fini ce setup").setDescription("Je suis maintenant prêt à être utiliser. Veuillez me @mentionner pour avoir plus d'info");
        else endEmbed.setTitle("Well Done! You finished this setup.").setDescription("I am now ready to go! You can start by @me to get more infos on my use here.");
        c.send(endEmbed);
    }
    
      
    const Lang = (guild, cat, c) => { 
        let lang = new Discord.RichEmbed()
        .setColor(15394559)
        .setTitle("LANGUAGE OPTION")
        .addField("What language do you want?", "English, Spanish, French?")
        .addField("Que langua te quieres?", "Español, Francés, Inglés?")
        .addField("Quelle langue voulez vous?", "Français, Anglais, Espagnol?")
        c.send(lang).then(() => {
            c.awaitMessages((col) => col.author.username != bot.user.username, { max: 1, time:3600000, errors:['time']})
            .then(collected => {
                let pref = {'lang': 'eng', 'channels': 'yes', 'commands': 0, 'news':false, 'prefix':'dc', 'interguildC':false}
                switch (collected.first().content.toLowerCase()) {
                    case 'englais':
                    case 'eng':      
                    case 'ingles':
                    case 'ing': 
                    case 'inglés':
                    case 'english':
                    case 'anglais':                 
                        pref.lang = 'eng';
                        Q1(pref, cat, c);
                        break;
                    case 'fra':
                    case 'fr':       
                    case 'français':
                    case 'francais':
                    case 'french':
                    case 'frances':
                    case 'francés':
                        pref.lang = 'fr'
                        Q1(pref, cat, c);
                        break;
                    case 'esp':
                    case 'es':       
                    case 'espanol':
                    case 'espagnol':
                    case 'español':
                    case 'spanish':
                    case 'spa':
                        pref.lang = 'esp'
                        Q1(pref, cat, c);
                        break;
                    case 'stop':
                        let g = c.guild;
                        let d = c.guild.channels.find('name','Darkcore');
                        d.children.forEach(c => {c.delete()});
                        d.delete();
                        g.leave();
                        break;
                    default:
                        let wrong = new Discord.RichEmbed()
                        .setColor(14483456)
                        .addField("I'm sorry, but I didn't understand what you wanted to say.","Please answer by `english`, `spanish` or `french`")
                        .addField("Perdoneme, pero no he comprendido que queraba decir.", "Por favor responde con `inglés`, `español` o `francés`")
                        .addField("Je suis désolé mais je n'ai pas compris ce que vous avez dit.", "S'il vous plait, veuillez répondre par `englais`, `francais` ou `espagnol`");
                        c.send(wrong);
                        Lang(guild, cat, c)
                        break;
                }
            }, () => {
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                .setDescription("I'm sorry, but I didn't understand what you wanted to say.","Please answer by `english`, `spanish` or `french`")
                .setDescription("Perdoneme, pero no he comprendido que queraba decir.", "Por favor responde con `inglés`, `español` o `francés`")
                .setDescription("Je suis désolé mais je n'ai pas compris ce que vous avez dit.", "S'il vous plait, veuillez répondre par `englais`, `francais` ou `espagnol`");
                c.send(remind)
                Lang(guild, cat, c);
            })
        })
    }
    
    const Q1 = (pref, cat, c) => {
        let q1 = new Discord.RichEmbed()
        if (pref.lang === 'esp') q1.setColor(15394559).setTitle("Quieres to server parametro por Darkcore?").setDescription("Para decir mas, te quieres un channel para descubrir mas sobre Darkcore, un bug report channel, y mas?")
        else if (pref.lang === 'fr') q1.setColor(15394559).setTitle("Veux tu que le server soit setup pour ce bot?").setDescription("De façon plus concrète, veux tu que je me créé une catégorie Darkcore, comme en ce moment, avec en plus une channel dédié au débuggage, avec des nouvelles, et avec une channel pour parler avec le bot?")
        else q1.setColor(15394559).setTitle("Do you want your server setup for Darkcore?").setDescription("In more concrete terms, do you want me to create a channel category Darkcore, like the one we are talking in, with a bugreport channel, a news channel and a bunch of other stuff?")
        c.send(q1).then(() => {
        c.awaitMessages((col) => col.author.username != bot.user.username, { max: 1, time:3600000, errors:['time']})
        .then(collected => {
            switch (collected.first().content.toLowerCase()) {
                case 'yes':
                case 'y':       
                case 'ye':
                case 'yea':
                case 'yeah':
                case 'oui':
                case 'ya':
                case 'ui':
                case 'si':
                case 'yep':
                case 'indeed':
                case 'ok':
                case 'ouais':
                    pref.channels = 'yes'; 
                    Q2(pref, c);
                    break;
                case 'no':
                case 'n':       
                case 'nu':
                case 'nop':
                case 'nup':
                case 'nope':
                case 'not':
                case 'non':
                case 'nein':
                case 'noon':
                    pref.channels = 'no';
                    PreQ2(pref, cat, c);
                    break;
                case 'stop':
                    let g = c.guild;
                    let d = c.guild.channels.find('name','Darkcore');
                    d.children.forEach(c => {c.delete()});
                    d.delete();
                    g.leave();
                    break;
                default:
                    let wrong = new Discord.RichEmbed()
                    .setColor(14483456);
                    if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                    else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `oui` ou par `non`.");
                    else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                    c.send(wrong)
                    Q1(pref, cat, c)
                    break;
            }
        }, () => {
            let remind = new Discord.RichEmbed()
            .setColor(14483456);
            if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
            else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
            else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
            c.send(remind)
            Q1(pref, cat, c);
        })
        })
    }
    
    const Q4 = (c, pref) => {
        let rEmbed = new Discord.RichEmbed()
        .setColor(15394559);
        if (pref.lang == 'fr') rEmbed.setTitle("Etes vous sûr de vos réponses?").setDescription("Ou voulez vous recommencer ce setup?");
        else if (pref.lang == 'esp') rEmbed.setTitle("Esta confidente en usted decision?").setDescription("O quieres re empezar este setup?");
        else rEmbed.setTitle("Are you sure of your answers?").setDescription("Or do you want to restart this setup?");
        c.send(rEmbed).then(() => {
            c.awaitMessages((col) => col.author.id != bot.user.id, { max: 1, time:3600000, errors:['time']})
            .then(collected => {
                switch (collected.first().content.toLowerCase()) {
                    case 'yes':
                    case 'y':       
                    case 'ye':
                    case 'yea':
                    case 'yeah':
                    case 'oui':
                    case 'ya':
                    case 'ui':
                    case 'si':
                    case 'yep':
                    case 'indeed':
                    case 'ok':
                    case 'ouais':
                        end(c, pref);
                        break;
                    case 'no':
                    case 'nope':
                    case 'not':
                    case 'n':       
                    case 'nu':
                    case 'nop':
                    case 'nup':
                    case 'non':
                    case 'nein':
                    case 'noon':
                        if (pref.channels == "yes") {
                            let cat = c.guild.channels.find("name", "Darkcore");
                            Lang(pref, cat, c);
                        }
                        else {
                            c.guild.createChannel('Darkcore',{type:"category"}).then(cat => {
                                c.guild.createChannel('Setup', {parent: cat.id, type:"text"}).then(newC => {
                                    Lang(pref, cat, newC)
                                })
                            })
                        }
                        break;
                    case 'stop':
                        let g = c.guild;
                        if (pref.channels == "yes") {
                            let d = c.guild.channels.find('name','Darkcore');
                            d.children.forEach(c => {c.delete()});
                            d.delete();
                        }
                        g.leave();
                        break;
                    default:
                        let wrong = new Discord.RichEmbed()
                        .setColor(14483456);
                        if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `oui` ou par `non`.");
                        else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        c.send(wrong).then(()=>{Q4(c, pref)});
                        break;
                }
            }, ()=>{
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() =>{Q4(c, pref)});
            })
        })
    }
    
    const check = (c, n, pref) => {
        let qs = [["Do you want a command creator?", "To create your own commands (you will also need to be admin to do that)"],["Do you want some moderator commands?", "With commands to help you moderate, such as report, ban, or lockdown"],["Do you want some fun commands?", "Commands to simply have fun, such as jokes, geek jokes, memes, or yo-mama jokes?"],["Do you want a roleplay system?", "With a level system, the ability to shoot, to defend, etc..."],["Do you want a swear detector?",""],["Do you want useful commands?","Which include basic commands such as infos on a user, a server, or the weather at someplace?"],["Do you want some game commands","With a hangman and a quiz for example"],["Do you want some random commands?","With useless stuff such as a morse translator, one to flip your messages, or one to rate people"],["Do you want music commands?","To listen to music"],["Do you want commands for a support server?","Commands destined to support server, for exemple for a videogame or a language, with docs commands, and with a system for newbies to get helped."]];
        if (n == qs.length) {return Prefix(pref, c)};
        let checkEmbed = new Discord.RichEmbed()
        .setColor(15394559)
        .setTitle(qs[n][0])
        .setDescription(qs[n][1]);
        c.send(checkEmbed).then(() => {
            c.awaitMessages((col) => col.author.id != bot.user.id, { max: 1, time:3600000, errors:['time']})
            .then(collected => {
                switch (collected.first().content.toLowerCase()) {
                    case 'yes':
                    case 'y':       
                    case 'ye':
                    case 'yea':
                    case 'yeah':
                    case 'oui':
                    case 'ya':
                    case 'ui':
                    case 'si':
                    case 'yep':
                    case 'indeed':
                    case 'ok':
                    case 'ouais':
                        pref.commands |= 2**n;
                        n++;
                        check(c, n, pref);
                        break;
                    case 'no':
                    case 'nope':
                    case 'not':
                    case 'n':       
                    case 'nu':
                    case 'nop':
                    case 'nup':
                    case 'non':
                    case 'nein':
                    case 'noon':
                        n++;
                        check(c, n, pref);
                        break;
                    case 'stop':
                        let g = c.guild;
                        if (pref.channels == "yes") {
                            let d = c.guild.channels.find('name','Darkcore');
                            d.children.forEach(c => {c.delete()});
                            d.delete();
                        }
                        g.leave();
                        break;
                    default:
                        let wrong = new Discord.RichEmbed()
                        .setColor(14483456)
                        if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `oui` ou par `non`.");
                        else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        c.send(wrong).then(()=>{check(c, n, pref)});
                        break;
                }
            }, ()=>{
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() =>{check(c, n, pref)});
            })
        })
    }
    
    const Q3 = (pref, c) => {
        let q3 = new Discord.RichEmbed()
        .setColor(15394559)
        if (pref.lang == 'esp') q3.setTitle("Que commandes quieres?").setDescription("Voy a listar todos las posibilitades, entonces responde con si or no por favor");
        else if (pref.lang == 'fr') q3.setTitle("Quelles commandes voudriez vous avoir?").setDescription("Je vais toute les lister, donc veuillez répondre par oui ou non");
        else q3.setTitle("What commands do you want?").setDescription("I am now going to list all possibles thing you can get from me, so please answer by yes or no");    
        c.send(q3).then(()=> {pref.commands = 0; check(c, 0, pref)})
    }
    
    const Q2 = (pref, c) => {
        let q2 = new Discord.RichEmbed()
        .setColor(15394559);
        if (pref.lang == 'fr') q2.setTitle("Voulez vous rester au courant de mes updates?");
        else if (pref.lang == 'esp') q2.setTitle("Quieres nouvellas de mis updates");
        else q2.setTitle("Do you want me to keep you updated about my progression?");
        c.send(q2).then(() => {
            c.awaitMessages((col) => col.author.id != bot.user.id, { max: 1, time:3600000, errors:['time']})
            .then(collected => {
                switch (collected.first().content.toLowerCase()) {
                    case 'yes':
                    case 'y':       
                    case 'ye':
                    case 'yea':
                    case 'yeah':
                    case 'oui':
                    case 'ya':
                    case 'ui':
                    case 'si':
                    case 'yep':
                    case 'indeed':
                    case 'ok':
                    case 'ouais':
                        if (pref.channels == 'yes') {
                            let cat = c.guild.channels.find('name', 'Darkcore');
                            if (pref.lang == 'esp') c.guild.createChannel('news', {parent: cat.id, type:"text"}).then(newsC => {pref.news = newsC.id; Interguild(pref, c)})
                            else if (pref.lang == 'fr') c.guild.createChannel('nouvelles', {parent: cat.id, type:"text"}).then(newsC => {pref.news = newsC.id; Interguild(pref, c)})
                            else c.guild.createChannel('news', {parent: cat.id, type:"text"}).then(newsC => {pref.news = newsC.id; Interguild(pref, c)})
                        }
                        else {
                            pref.news = c.id; 
                            Interguild(pref, c);
                        }
                        break;
                    case 'no':
                    case 'nope':
                    case 'not':
                    case 'n':       
                    case 'nu':
                    case 'nop':
                    case 'nup':
                    case 'non':
                    case 'nein':
                    case 'noon':
                        Interguild(pref, c);
                        break;
                    case 'stop':
                        let g = c.guild;
                        if (pref.channels == "yes") {
                            let d = c.guild.channels.find('name','Darkcore');
                            d.children.forEach(c => {c.delete()});
                            d.delete();
                        }
                        g.leave();
                        break;
                    default:
                        let wrong = new Discord.RichEmbed()
                        .setColor(14483456);
                        if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `oui` ou par `non`.");
                        else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        c.send(wrong).then(()=>{Q2(pref, c)});
                        break;
                }
            }, ()=>{
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() =>{Q2(pref, c)});
            })
        })
    }
    
    const preQ3 = (pref, c) => { 
        let preq3 = new Discord.RichEmbed()
        .setColor(15394559)
        if (pref.lang == 'esp') preq3.setTitle("Entonces podrias decirme que channel quieres como interserver channel?").setDescription("Esta channel vas a devenir interserver, entonces elige una channel no tan usada, o cree una nueva channel. It is important to say also that the channel is going to have a slowmode. Para buscar el ID, izquierda-click sobre el channel y hace `copiar el id`. Por favor escribi el id y el id solamente, en un solo messenge");
        else if (pref.lang == 'fr') preq3.setTitle("Alors pourriez vous entrer l'ID de la channel que vous voulez comme interserveur?").setDescription("Cette channel va devenir interserveur, donc je vous conseille de choisir une channel pas trop utilisée, ou alors de créer une nouvelle channel. Aussi, je tiens à préciser que la channel va avoir un slowmode. Pour trouver son ID, vous pouvez cliquer droit sur la channel voulue et choisi `copier l'ID`. Veuillez entrer l'ID dans un seul et unique message.");
        else preq3.setTitle("Then could you enter the id of the channel you want as the interserver one?").setDescription("It is going to be a interserver channel, so I would rather choose a not too used channel, or create a new one for that. It is important to say also that the channel is going to have a slowmode. In order to find its ID, right click the channel and `copy the id`. Please enter the id and the id only, as a single message.");
        c.send(preq3).then( () => {
            c.awaitMessages((col) => col.author.username != bot.user.username, { max: 1, time:3600000, errors:['time']})
            .then((collected) =>{
                let m = collected.first().content;
                if (m == 'stop') {
                    let d = c.guild.channels.find('name','Darkcore');
                    d.children.forEach(c => {c.delete()});
                    d.delete();
                    m.guild.leave();
                }
                else if (c.guild.channels.find("id", m)) {
                    let newC = c.guild.channels.find("id", m);
                    newC.setRateLimitPerUser(10);
                    pref.interguildC = newC.id;
                    let n = new Discord.RichEmbed()
                    .setColor(15394559);
                    if (pref.lang == 'esp') n.setTitle("Aqui es la nueva interserver channel")
                    else if (pref.lang == 'fr') n.setTitle("Ici est désormais ma nouvelle channel interserveur");
                    else n.setTitle("Here is now my new interserver channel");
                    newC.send(n).then(() =>{Q3(pref, c)})
                }
                else {
                    let wrong = new Discord.RichEmbed()
                    .setColor(14483456)
                    if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, or by the channel ID");
                    else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `stop` ou par l'ID de la channel choisie.");
                    else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, or by the choosen channel ID");
                    c.send(wrong).then(() => {PreQ3(pref, c)})
                }
            }, ()=> {
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() => {PreQ3(pref, c)});
            })
        })
    }
    
    const Interguild = (pref, c) => {
        let ig = new Discord.RichEmbed()
        .setColor(15394559);
        if (pref.lang == 'fr') ig.setTitle("Voulez vous avoir une channel interserveur?").setDescription("Une channel où vous pourriez parler à n'importe qui d'autres serveurs qui ont activés cette option. En gros, c'est comme créer une channel qui appartient à plusieurs serveurs en même temps.");
        else if (pref.lang == 'esp') ig.setTitle("Quieres un channel interserver?").setDescription("A channel where you can speak to anyone from other server who activated this option. Basically, it is like creating a channel who is in many servers.");
        else ig.setTitle("Do you want a channel interserver?").setDescription("A channel where you can speak to anyone from other server who activated this option. Basically, it is like creating a channel who is in many servers.");
        c.send(ig).then(() => {
            c.awaitMessages((col) => col.author.id != bot.user.id, { max: 1, time:3600000, errors:['time']})
            .then(collected => {
                switch (collected.first().content.toLowerCase()) {
                    case 'yes':
                    case 'y':       
                    case 'ye':
                    case 'yea':
                    case 'yeah':
                    case 'oui':
                    case 'ya':
                    case 'ui':
                    case 'si':
                    case 'yep':
                    case 'indeed':
                    case 'ok':
                    case 'ouais':
                        if (pref.channels == 'yes') {
                            let cat = c.guild.channels.find('name', 'Darkcore');
                            if (pref.lang == 'esp') c.guild.createChannel('interserver channel', {parent: cat.id, type:"text", rateLimitPerUser:10}).then(igC => {pref.interguildC = igC.id; Q3(pref, c)})
                            else if (pref.lang == 'fr') c.guild.createChannel('channel interserveur', {parent: cat.id, type:"text", rateLimitPerUser:10}).then(igC => {pref.interguildC = igC.id; Q3(pref, c)})
                            else c.guild.createChannel('interserver channel', {parent: cat.id, type:"text", rateLimitPerUser:10}).then(igC => {pref.interguildC = igC.id; Q3(pref, c)})
                        }
                        else {
                            preQ3(pref, c);
                        }
                        break;
                    case 'no':
                    case 'nope':
                    case 'not':
                    case 'n':       
                    case 'nu':
                    case 'nop':
                    case 'nup':
                    case 'non':
                    case 'nein':
                    case 'noon':
                        Q3(pref, c);
                        break;
                    case 'stop':
                        let g = c.guild;
                        if (pref.channels == "yes") {
                            let d = c.guild.channels.find('name','Darkcore');
                            d.children.forEach(c => {c.delete()});
                            d.delete();
                        }
                        g.leave();
                        break;
                    default:
                        let wrong = new Discord.RichEmbed()
                        .setColor(14483456);
                        if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `oui` ou par `non`.");
                        else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, `yes` or `no`");
                        c.send(wrong).then(()=>{Interguild(pref, c)});
                        break;
                }
            }, ()=>{
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() =>{Interguild(pref, c)});
            })
        })
    }
    
    const Prefix = (pref, c) => {
        let prefix = new Discord.RichEmbed()
        .setColor(21924)
        if (pref.lang == 'esp') prefix.setTitle("Que prefix quieres? Attencion, esta pregunta es importante!").setDescription("Vas a ser el keyword con que vas a llamarme, entonces es aconsejado de hacerle el mas corto posible");
        else if (pref.lang == 'fr') prefix.setTitle("Quel préfixe voulez vous? Attention, cette question est importante").setDescription("Cela va devenir le mot par lequel vous allez m'appeller, donc il est conseillé de le faire petit.");
        else prefix.setTitle("What prefix do you want? Attention, this is an important question").setDescription("It will become the word with which you are going to call me, so it should be as short as possible");
        c.send(prefix).then( () => {
            c.awaitMessages((col) => col.author.username != bot.user.username, { max: 1, time:3600000, errors:['time']})
            .then((collected) =>{
                let m = collected.first().content;
                if (m == 'stop') {
                    let d = c.guild.channels.find('name','Darkcore');
                    d.children.forEach(c => {c.delete()});
                    d.delete();
                    m.guild.leave();
                }
                else if (!(m.includes(' '))) {
                    pref.prefix = m;
                    Q4(c, pref)
                }
                else {
                    let wrong = new Discord.RichEmbed()
                    .setColor(14483456)
                    if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, or by the prefix and the prefix only. Also, a prefix no pude tener \\ o espacios en el");
                    else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `stop` ou par le préfixe choisi, et le préfix seulement. Aussi, il ne peut pas contenir d'espaces ni de \\");
                    else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, or by the prefix and the prefix only. Also, a prefix cannot have spaces nor \\ in it");
                    c.send(wrong).then(() => {prefix(pref, c)})
                }
            }, ()=> {
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() => {prefix(pref, c)});
            })
        })
    }
    
    const PreQ2 = (pref, cat, c) => {
        let preq2 = new Discord.RichEmbed()
        .setColor(15394559)
        if (pref.lang == 'esp') preq2.setTitle("Entonces podrias decirme que channel quieres como la favorid?").setDescription("Vas a ser el default channel para me, y frecuetemente es el bot channel. Para buscar el ID, izquierda-click sobre el channel y hace `copiar el id`. Por favor escribi el id y el id solamente, en un solo messenge");
        else if (pref.lang == 'fr') preq2.setTitle("Alors pourriez vous entrer l'ID de la channel que vous voulez comme favorite?").setDescription("Elle va devenir la channel par défaut pour moi, c'est donc généralement le bot channel. Pour trouver son ID, vous pouvez cliquer droit sur la channel voulue et choisi `copier l'ID`. Veuillez entrer l'ID dans un seul et unique message.");
        else preq2.setTitle("Then could you enter the id of the channel you want as favorite?").setDescription("It will be the default channel for me, usually set as the current bot channel. In order to find its ID, right click the channel and `copy the id`. Please enter the id and the id only, as a single message.");
        c.send(preq2).then( () => {
            c.awaitMessages((col) => col.author.username != bot.user.username, { max: 1, time:3600000, errors:['time']})
            .then((collected) =>{
                let m = collected.first().content;
                if (m == 'stop') {
                    let d = c.guild.channels.find('name','Darkcore');
                    d.children.forEach(c => {c.delete()});
                    d.delete();
                    m.guild.leave();
                }
                else if (c.guild.channels.find("id", m)) {
                    let newC = c.guild.channels.find("id", m);
                    cat.delete();
                    c.delete();
                    let n = new Discord.RichEmbed()
                    .setColor(15394559);
                    if (pref.lang == 'esp') n.setTitle("Aqui es mi nueva default channel")
                    else if (pref.lang == 'fr') n.setTitle("Ici est désormais ma channel par défaut");
                    else n.setTitle("Here is now my new default channel");
                    newC.send(n).then(() =>{Q2(pref, newC)})
                }
                else {
                    let wrong = new Discord.RichEmbed()
                    .setColor(14483456)
                    if (pref.lang == 'esp') wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, or by the channel ID");
                    else if (pref.lang == 'fr') wrong.setTitle("Je suis désolé, mais je n'ai pas compris ce que vous vouliez dire. Veuillez répondre par `stop` ou par l'ID de la channel choisie.");
                    else wrong.setTitle("I'm sorry, but I didn't understand what you wanted to say. Please answer by `stop`, or by the choosen channel ID");
                    c.send(wrong).then(() => {PreQ2(pref, cat, c)})
                }
            }, ()=> {
                let remind = new Discord.RichEmbed()
                .setColor(14483456)
                if (pref.lang == 'fr') remind.setTitle("Veuillez s'il vous plait répondre à ce bot pour pouvoir le setup. Si vous voulez arreter ce setup, vous pouvez à tout moment écrire `stop` dans le chat.")
                else if (pref.lang == 'esp') remind.setTitle("Por favor AnSwEr esta Questiona para setup el bot. Si quieres arretar este setup, puedes escribir `stop` cuando quieres.")
                else remind.setTitle("Please answer this in order to setup the bot. If you want to stop this setup, you can type at any moment `stop` in the chat.")
                c.send(remind).then(() => {PreQ2(pref, cat, c)});
            })
        })
    }
    guild.createChannel('Darkcore',{type:"category"}).then(cat => {
        guild.createChannel('Setup', {parent: cat.id, type:"text"}).then(c => {
            let pres = new Discord.RichEmbed()
            .setColor(15394559)
            .setTitle("SETUP")
            .setDescription('Please answer the next few questions carefully, and don\'t quit discord while the setup isn\'t finished. These questions should take approximately 5 minute to answer. Please answer by yes or no, or by stop if you want to stop this setup')
            c.send(pres).then(() => Lang(guild, cat, c))
        })
    })
}
