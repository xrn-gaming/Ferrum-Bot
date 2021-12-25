const discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()


const client = new discord.Client({

    intents: [

        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS
    ]
})


client.on('ready', () => {

    console.log("Bot Ready")
})


//COMMAND HANDLER
const fs = require('fs');

client.commands = new discord.Collection()

const commands = fs.readdirSync(`./Commands/`).filter(file => file.endsWith('.js'))

for (file of commands)
{
    
    const command = require(`./Commands/${file}`)

    client.commands.set(command.name, command)
}


const prefix = ',';


//HELP
client.on('messageCreate', (message) =>
{
    
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'help') {

        client.commands.get('help').execute(message, args, discord)
    }
})


//PING PONG
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    if (command == 'ping') {

        client.commands.get('ping').execute(message, args)
    }
})


//AVATAR
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'avatar') {
        
        client.commands.get('avatar').execute(message, args, discord)
    }
})


//TAG
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'tag') {
        
        client.commands.get('tag').execute(message, args)
    }
})


//MEMBER UPDATE
client.on('guildMemberUpdate', (oldMem, newMem) => {

    if (oldMem.nickname !== newMem.nickname) {

        client.commands.get('memberUpdate').execute(oldMem, newMem, discord)
    }
})


//CHANNEL CREATE
client.on('channelCreate', (channel) => {

    client.commands.get('channelCreate').execute(channel)
})


//MEMBERCOUNT
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'mc' || command == 'membercount') {

        client.commands.get('mc').execute(message, args, discord)
    }
})


//KICK
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    if (command == 'kick') {

        client.commands.get('kick').execute(message, args, discord)
    }
})

//BAN
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    let fbot = message.guild.members.cache.get('919201684213878824')
    
    if (command == 'ban') {

        client.commands.get('ban').execute(message, args, discord)
    }
})


//WARN
client.on('messageCreate', (message) => {

    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    let args = message.content.slice(prefix.length).split(' ')
    let command = args.shift().toLowerCase()

    if (command == 'warn') {

        client.commands.get('warn').execute(message, args, discord)
    }
})


//PURGE
client.on('messageCreate', (message) => {

    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    let args = message.content.slice(prefix.length).split(' ')
    let command = args.shift().toLowerCase()

    if (command == 'purge') {
        
        client.commands.get('purge').execute(message, args)
    }
})


//SUPPORT
client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'support') {
        
        client.commands.get('support').execute(message, args, discord)
    }
})


// LOGIN TO THE BOT
client.login(process.env.TOKEN).then( () => {

    client.user.setPresence({

        activities: [{

            name: 'C and C++',
            type: 'PLAYING'
        }],
        status: 'online'
    })
})