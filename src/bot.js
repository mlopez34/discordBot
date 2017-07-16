'use strict'
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var config = require("./config.js");
var commands = require("./commands.js");

const Discord = require("discord.js");
const client = new Discord.Client();

var BASE_INTERVAL = 5000;

var tacoTuesdayEnabled = false;

client.on('ready', function(err) {
    if (err){
        console.log(err);
    } 
    console.log('The bot is online'); 
    var channelName;
    client.channels.forEach(function(channel){
        if (channel.type == "text"){
            channelName = channel;
        }
    })
    steal(channelName);
});

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith(config.commandString + str);
}

client.on('message', function(message){
    console.log(message.author.id); // id of the user that created the message
    var args = message.content.split(/[ ]+/);
    console.log(args);
    // check if it is Taco Tueday
    var dateUtc = new Date()
    var weekday = dateUtc.getDay();
    if (weekday == 2 && !tacoTuesdayEnabled){
        // Taco Tuesday Has begun
        // taco gains are doubled, Bender brings someone along to share his tacos on taco tuesday on every meal
        // Bender's shop allows you to purchase a temporary mariachi band, the band can play music and make you dance
        tacoTuesdayEnabled = true;
        tacoTuesdayAnnouncement(message);
    }
    else{
        // disable Taco Tuesday
    }
    // commands
    if( commandIs("thank", message )){
        commands.thankCommand(message);
    }
    else if( commandIs("sorry", message )){
        commands.sorryCommand(message);
    }
    else if( commandIs("help", message )){
        commands.helpCommand(message);
    }
    else if( commandIs("buystand", message )){
        commands.buyStandCommand(message);
    }
    else if( commandIs("prepare", message)){
        commands.prepareCommand(message);
    }
    else if( commandIs("welcome", message)){
        commands.welcomeCommand(message);
    }
    else if (commandIs("give", message)){
        commands.giveCommand(message, args[2]);
    }
    else if (commandIs("cook", message)){
        commands.cookCommand(message);
    }
    else if (commandIs("profile", message)){
        commands.profileCommand(message);
    }
    else if(commandIs("tacos", message)){
        commands.tacosCommand(message);
    }
    else if(commandIs("stands", message)){
        commands.tacoStandsCommand(message);
    }
    else if(commandIs("throw", message)){
        commands.throwCommand(message);
    }
    else if(commandIs("shop", message)){
        commands.shopCommand(message);
    }
    else if(commandIs("buypickaxe", message)){
        commands.buyPickaxeCommand(message);
    }
    else if(commandIs("buypasta", message)){
        var pasta = "";
        for (var arg in args){
            if (arg > 0){
                pasta = pasta.concat(args[arg] + " ");
            }
        }
        console.log(pasta);
        commands.buyPastaCommand(message, pasta);
    }
    /*
    else if (commandIs("scavange", message)){
        scavangeCommand(message);
    }
    */
});


function tacoTuesdayAnnouncement(message){
    const embed = new Discord.RichEmbed()
    .setTitle("Taco Tuesday time")
    .setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
    .setColor(0xFFAE86)
    //.addField('Tacos  :taco:', profileData.userTacos, true)
    //.setFooter('use !give @user to give a user some tacos!')
    message.channel.send({embed});
}

function steal(channelName){
    // steal random number of tacos, random user, random interval
    // bender's meal time
    // sometimes bender shares his meal with someone else
    // check for random user in channel
    var channel = client.channels.get(channelName.id);
    var possibleUsersUsername = [];
    channel.members.forEach(function(member){
        // possible users to take from and share with
        if (!member.user.bot){
            var user = member.user
            console.log( user );
            possibleUsersUsername.push( user );
        }
    });

    // random the user based on array size
    var userToTakeFromIndex = Math.floor(Math.random() * possibleUsersUsername.length);
    console.log("taking from " + possibleUsersUsername[userToTakeFromIndex].username )
    // random if bender is sharing half his meal
    var sharing = Math.floor(Math.random() * 10)
    console.log("sharing ? " + sharing )
    // random the user bender will share with
    var userToShareWithIndex = Math.floor(Math.random() * possibleUsersUsername.length);

    while( userToShareWithIndex == userToTakeFromIndex){
        // check for a different user until the indeces are not equal
        userToShareWithIndex = Math.floor(Math.random() * possibleUsersUsername.length);
    }
    console.log("sharing with " + possibleUsersUsername[userToShareWithIndex].username )

    // TODO: do not take and share with same person, check if last message started with "It is time for Bender's meal."
    // sharing
    if (sharing >= 8){
        var interval = setTimeout (function(){ 
            var tacos = Math.floor(Math.random() * 5) + 1
            var bendersMeal = "It is time for Bender's meal. " + possibleUsersUsername[userToTakeFromIndex].username + " has served Bender " + tacos + " tacos :taco: and Bender decided to share his meal with " + possibleUsersUsername[userToShareWithIndex].username + ". Thank's " + possibleUsersUsername[userToTakeFromIndex].username + " for keeping Bender well fed! " + BASE_INTERVAL/1000
            stealEmbedBuilder(channel, bendersMeal)
            BASE_INTERVAL = BASE_INTERVAL; 
            steal(channelName);
        }, BASE_INTERVAL);
    }
    // not sharing
    else{
        var interval = setTimeout (function(){ 
            var tacos = Math.floor(Math.random() * 5) + 1;
            var bendersMeal = "It is time for Bender's meal. " + possibleUsersUsername[userToTakeFromIndex].username + " has served Bender " + tacos + " tacos :taco: Thank's " + possibleUsersUsername[userToTakeFromIndex].username + " for keeping Bender well fed! " + BASE_INTERVAL/1000
            stealEmbedBuilder(channel, bendersMeal)
            BASE_INTERVAL = BASE_INTERVAL; 
            steal(channelName);
        }, BASE_INTERVAL);
    }
}

function stealEmbedBuilder(channel, bendersMeal){
    const embed = new Discord.RichEmbed()
    .setTitle("Bender's Meal")
    .setThumbnail("http://www.hwdyk.com/q/images/futurama_s02e13_03.jpg")
    .setColor(0xAAAE86)
    .addField(bendersMeal, ":fork_knife_plate:", true)
    channel.send({embed});
}

client.login(config.discordClientLogin);
