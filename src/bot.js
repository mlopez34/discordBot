const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => { 
    console.log('The bot is online');  
});

client.on('message', message => {
    if(message.content === '!hello'){
        message.reply('Hello there, ' + message.author.username);
    }
});

client.login('');