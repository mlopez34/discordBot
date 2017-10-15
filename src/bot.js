'use strict'
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var config = require("./config.js");
var commands = require("./commands.js");
var profileDB = require("./profileDB.js");

const Discord = require("discord.js");
const client = new Discord.Client();

var BASE_INTERVAL = 18000000;
var MAIN_CHANNEL = config.mainChannelName;
var BOT_CHANNEL = config.botChannelName;
var RPG_CHANNEL = config.rpgChannelName;
var TURN_OFF_MSG = config.turnOff;
var TURN_ON_MSG = config.turnOn;

var tacoTuesdayEnabled = false;
var botEnabled = true;
var mainChannel;

client.on('ready', function(err) {
    if (err){
        console.log(err);
    } 
    console.log('The bot is online'); 
    var channelName;
    client.channels.forEach(function(channel){
        // console.log(channel);
        if (channel.type == "text" && channel.name == BOT_CHANNEL){
            channelName = channel;
        }
        if (channel.type == "text" && channel.name == MAIN_CHANNEL){
            mainChannel = channel;
        }
    })
    //steal(channelName);
});

function commandIs(str, msg){
    if ((str === "thank" || str === "sorry" || str === "welcome")){
        if (msg.content.toLowerCase().startsWith(config.commandString)){
            return  msg.content.toLowerCase().startsWith(config.commandString + str);
        }
        else{
            return  msg.content.toLowerCase().startsWith(str);
        }
    }else{
        return msg.content.toLowerCase().startsWith(config.commandString + str);
    }
}

client.on('message', function(message){
    //console.log(message);
    if (botEnabled){
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
            
        }

        if (commandIs("enable", message)){
            for (var arg in args){
                if(args[arg] == TURN_OFF_MSG){
                    botEnabled = false;
                }
            }
        }
        // commands
        if (message.channel.type == "text" && message.channel.name == BOT_CHANNEL && !message.author.bot){
            if( commandIs("thank", message )){
                commands.thankCommand(message);
            }
            else if( commandIs("sorry", message )){
                commands.sorryCommand(message);
            }
            else if( commandIs("help", message )){
                commands.helpCommand(message);
            }
            else if (commandIs("itemhelp", message )){
                commands.itemhelpCommand(message);
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
                commands.shopCommand(message, args);
            }
            else if(commandIs("repshop", message)){
                commands.repShopCommand(message);
            }
            else if(commandIs("buyrecipe", message)){
                commands.buyRecipeCommand(message);
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
            else if (commandIs("scavenge", message)){
                commands.scavangeCommand(message);
            }
            else if (commandIs("inventory", message)){
                commands.inventoryCommand(message);
            }
            else if (commandIs("rares", message)){
                commands.raresCommand(message, args);
            }
            else if (commandIs("standings", message)){
                commands.standingsCommand(message, client.users);
            }
            else if (commandIs("toplist", message)){
                commands.toplistCommand(message, client.users);
            }
            else if (commandIs("toprpg", message)){
                commands.rpgTopListCommand(message, client.users);
            }
            else if (commandIs("slots", message)){
                if (args.length > 1){
                    var bet = args[1];
                    console.log(args[1])
                    commands.slotsCommand(message, bet);
                }
            }
            else if (commandIs("use", message)){
                commands.useCommand(message, args);
            }
            else if (commandIs("pickup", message)){
                commands.pickupCommand(message);
            }
            else if (commandIs("buypet", message)){
                commands.buypetCommand(message, args);
            }
            else if (commandIs("fetch", message)){
                commands.fetchCommand(message);
            }
            else if (commandIs("xp", message)){
                commands.xpCommand(message);
            }
            else if (commandIs("ach", message)){
                commands.achievementsCommand(message);
            }
            else if (commandIs("puton", message)){
                commands.putonCommand(message, args);
            }
            else if (commandIs("wearing", message)){
                commands.wearingCommand(message, args);
            }
            else if (commandIs("takeoff", message)){
                commands.takeoffCommand(message, args);
            }
            else if (commandIs("auction", message)){
                commands.auctionCommand(message, args);
            }
            else if (commandIs("bid", message)){
                commands.bidCommand(message, args);
            }
            else if (commandIs("trade", message)){
                commands.tradeCommand(message, args);
            }
            else if (commandIs("accept", message)){
                commands.acceptTradeCommand(message, args);
            }
            else if (commandIs("cancel", message)){
                commands.cancelTradeCommand(message, args);
            }
            else if (commandIs("combine", message)){
                commands.combineCommand(message, args);
            }
            else if (commandIs("agree", message)){
                commands.agreeTermsCommand(message, args);
            }
            else if (commandIs("deny", message)){
                commands.denyTermsCommand(message, args);
            }
            else if (commandIs("raffle", message)){
                commands.enterRaffleCommand(message);
            }
            else if (commandIs("party", message)){
                commands.createTableCommand(message, mainChannel);
            }
            else if (commandIs("rpgstart", message)){
                message.channel.send("use the rpg channel for this")
            }
            else if (commandIs("rpgstats", message)){
                commands.rpgstatsCommand(message);
            }
            
            /*
            else if (commandIs("game", message)){
                commands.gameCommand(message);
            }
            */
        }
        else if (message.channel.type == "text" && message.channel.name == RPG_CHANNEL && !message.author.bot){
            // artifact abilities
            if (commandIs("timetravel", message)){
                
                var channelName;
                client.channels.forEach(function(channel){
                    if (channel.type == "voice" && channel.name == "General"){
                        channelName = channel;
                    }
                })

                commands.timeTravelCommand(message, args, channelName);
            }
            else if (commandIs("rpgstart", message)){
                commands.rpgBattleCommand(message);
            }
            else if (commandIs("ready", message)){
                commands.rpgReadyCommand(message);
            }
            else if (commandIs("skip", message)){
                commands.rpgSkipCommand(message);
            }
            else if (commandIs("cast", message)){
                commands.castCommand(message, args);
            }
            else if (commandIs("rpghelp", message)){
                commands.rpghelpCommand(message);
            }
        }
        else if (message.channel.type == "text" && message.channel.name == MAIN_CHANNEL && !message.author.bot){
             if( commandIs("thank", message )){
                commands.thankCommand(message);
            }
            else if( commandIs("sorry", message )){
                commands.sorryCommand(message);
            }
            else if( commandIs("welcome", message)){
                commands.welcomeCommand(message);
            }
            else if (commandIs("agree", message)){
                commands.agreeTermsCommand(message, args);
            }
        }
        
    }else{
        var args = message.content.split(/[ ]+/);
        console.log(args);
        if (commandIs("enable", message)){
            for (var arg in args){
                if(args[arg] == TURN_ON_MSG){
                    botEnabled = true;
                }
            }
        }
    }
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
            // console.log( user );
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

    // sharing
    if (sharing >= 8){
        var interval = setTimeout (function(){ 
            var tacos = Math.floor(Math.random() * 5) + 1
            var bendersMeal = "It is time for Bender's meal. " + possibleUsersUsername[userToTakeFromIndex].username + " has served Bender " + tacos + " tacos :taco: and Bender decided to share his meal with " + possibleUsersUsername[userToShareWithIndex].username + ". Thanks " + possibleUsersUsername[userToTakeFromIndex].username + " for keeping Bender well fed!"
            // update both users with neg, and pos and then do the embed
            profileDB.getUserProfileData(possibleUsersUsername[userToTakeFromIndex].id, function(getProfileErr, getProfileData){
                if (getProfileErr){
                    // user doesn't exist
                }
                else{
                    // user exists, get the number of tacos they have
                    var userTacos = getProfileData.data.tacos;
                    if (userTacos < tacos){
                        tacos = userTacos;
                    }
                    profileDB.updateUserTacosGive(possibleUsersUsername[userToTakeFromIndex].id, (tacos * -1), function(err, updateResponse){
                        if (err){
                            console.log(err);
                        }
                        else{
                            // took from user
                        }
                    })
                }
                
            })
            profileDB.updateUserTacosGive(possibleUsersUsername[userToShareWithIndex].id, tacos , function(err, updateResponse){
                if (err){
                    console.log(err);
                }
                else{
                    stealEmbedBuilder(channel, bendersMeal)
                }
            })
            BASE_INTERVAL = BASE_INTERVAL; 
            steal(channelName);
        }, BASE_INTERVAL);
    }
    // not sharing
    else{
        var interval = setTimeout (function(){ 
            var tacos = Math.floor(Math.random() * 5) + 1;
            var bendersMeal = "It is time for Bender's meal. " + possibleUsersUsername[userToTakeFromIndex].username + " has served Bender " + tacos + " tacos :taco: Thanks " + possibleUsersUsername[userToTakeFromIndex].username + " for keeping Bender well fed!"
            profileDB.getUserProfileData(possibleUsersUsername[userToTakeFromIndex].id, function(getProfileErr, getProfileData){
                if (getProfileErr){
                    // user doesn't exist
                }
                else{
                    // user exists, get the number of tacos they have
                    var userTacos = getProfileData.data.tacos;
                    if (userTacos < tacos){
                        tacos = userTacos;
                    }
                    profileDB.updateUserTacosGive(possibleUsersUsername[userToTakeFromIndex].id, (tacos * -1), function(err, updateResponse){
                        if (err){
                            console.log(err);
                        }
                        else{
                            stealEmbedBuilder(channel, bendersMeal)
                        }
                    })
                }
            })
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
