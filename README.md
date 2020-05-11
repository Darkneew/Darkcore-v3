# DARKCORE

Darkcore is a polyfunctional discord bot, easy to setup and install. It can manage a server, make music, manage games, has an integrated roleplay system and documentation system, as well as a buncch of misceallenous other commands. Also, it support french, english and spanish

***

## Setup

### Downloading the repository

First download the whole project.
You can do that by simply cloning the repository from github, with the git tool. 
```bash 
git clone https://github.com/Darkneew/Darkcore-2.0
```
If you don't git, you can download the repository from [here](https://github.com/Darkneew/Darkcore-2.0)

### Creating the bot

> If you have already created your bot, jump on the next section

Now, it is time to actually create the bot. First, connect to your discord account, and go to the [discord developer portal](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications), in your application. Here, just click on the button `New Application`. You might want to name it and give it a profile picture.

After that, in settings, still on the bot page, go to `bot` and create your bot. You can make it private if you don't want to share it with people on other servers than yours. 

### Filling in the configurations

Now, you will have to create a file named `botconfig.json`, and fill it in.
You can find a template for it [here](./botconfig_template.json).

Your object should have the property `token` with your token as value. You can find your token on the page where you created the bot, in the discord developer portals. It should be situated in bot (settings).

Also, your object should have a property `admins`, and a property `news`. 

The `admins` property is a list of the discord id of each admin of the bot. To get the id of someone, if you have the developer mode deactivated, just mention this person and put a backslash (\\) in front. When sent, you should see something like this : 
```
<@[id of this person]>
```
Where [id of this person] is the actual id. If you don't want any admin, just leave the list empty

The `news` property should have the news channel id as value. If you don't want a news channel, just leave this blank. If you choose to have a news channel, every time you will send a message here, every other server following your server will receive the message.

### Installing modules

The next step is to download all required modules. For that, just type :
```bash 
npm install 
```
In the command prompt in the folder. In order to go into the folder, you can just type the following :
```
cd [folder path]
```

> Well done, your bot is now ready to be launched

***

## Usage

To use this bot, you just need to launch it. In order to do that, just type :
```bash
npm start
```
In your bot's folder.

To invite it in your server, you will need an invite link. To create it, return to the [discord developer portal](https://discord.com/developers/applications), go in your application, in `General informations` and copy the client id.

Now go [to this link generator](https://discordapi.com/permissions.html), select the permissions you want your bot to have, enter the client id, and it should generate a link at the bottom of the page. If you want to be redirected after inviting the bot, you can also insert a redirect URI.

You can click on the newly generated link, and from there add your bot to any server you have.

Once the bot have joined your server, a setup will take place. 

To access admin commands, just type 
```
darkcore help
```
In the chat

*** 

## Future plans

The darkcore team is currently working on adding a lot more commands. 

Also, we plan on getting a support for more languages. 

Moreover, we plan on improving a few commands, such as jokes and meme which will receive a support for different languages, or such as the help which will get organised, and we will improve the interserver section. 

Finally, we plan on adding new categories of commands, for exemple one for photo editing, one to implement a visioconference app, and maybe one for socialisation

***

## Contributing

Any contribution is welcome. For small changes or fixes, you can always pull a requests, but for major changes and contributions, please send a mail at ninjade59@gmail.com.

***

## License

This bot is under a [MIT](./LICENSE) license.