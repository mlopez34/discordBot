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
var MAIN_CHANNELS = config.mainChannelName;
var BOT_CHANNELS = config.botChannelName;
var RPG_CHANNELS = config.rpgChannelName;
var TURN_OFF_MSG = config.turnOff;
var TURN_ON_MSG = config.turnOn;

var tacoTuesdayEnabled = false;
var botEnabled = true;
var guildsRegistered = {}
var messagesByUserCount = {}

client.on('ready', function(err) {
    if (err){
        // console.log(err);
    } 
    console.log("in guilds: " + client.guilds.size)
    console.log('The bot is online'); 
    // initialize market
    commands.initializeItemsMaps(client, function(err, res){
        commands.initializeMarketPlace()
        console.log(res)
    })
    //steal(channelName);
});

client.on("error", (e) => console.error(e));

client.on("guildCreate", guild => {
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
        }
    }
    })
    //defaultChannel will be the channel object that it first finds the bot has permissions for
    if (defaultChannel){
        defaultChannel.send(`Hello I am Bender type -help for more info!`, {
            embed:{
                title: ':robot: Prefix',
                color: 0x2471a3, 
                description: "The prefix for all my commands is -, e.g: -help OR -profile OR -cook",
                fields:[
                    {
                        name: ':taco: Currency',
                        value: 'Tacos are my main form of currency'
                    },
                    {
                        name: ':exclamation: Warning',
                        value: 'Most of my commands are highly interactive so I advise you only allow me to send messages in specific bot channels'
                    }
                ],
    
                footer: {
                    text: 'Bender created and developed by shakyrax'
                }
            }
        })
    }
})

function commandIs(str, msg){
    if (( (str === "thank" || str === "sorry" || str === "welcome") && 
    (msg.channel.guild.id == "167298338905915393"
    || msg.channel.guild.id == "231378019292282880" ) )){
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
    // log the guild that this message came from into guildactivity table
    var mainChannel; //
    //// console.log(message);
    var channelName;
    try{
        if (message.channel && message.channel.guild && message.channel.guild.id && !guildsRegistered[message.channel.guild.id]){
            profileDB.getGuildData(message.channel.guild.id, function(gErr, gData){
                if (gErr){
                    // create guild
                    var d = {
                        guildId: message.channel.guild.id
                    }
                    profileDB.createGuildProfile(d, function(gE, gD){
                        console.log("created guild in db")
                        guildsRegistered[message.channel.guild.id] = true
                    })
                }else{
                    guildsRegistered[message.channel.guild.id] = true
                    console.log("guild in db")
                }
            })
        }
    }catch(ex){
        console.log(ex)
    }
    
    
        
    client.channels.forEach(function(channel){
        // // console.log(channel);
        if (channel.type == "text" && BOT_CHANNELS.indexOf(channel.name) != -1){
            channelName = channel;
        }
        if (channel.type == "text" && MAIN_CHANNELS.indexOf(channel.name) != -1){
            mainChannel = channel;
        }
    })
    var guildId;
    if (message.channel && message.channel.guild && message.channel.guild.id){
        guildId = message.channel.guild.id
    }else {
        guildId = 1234567890
    }
    var data = {
        guildId: guildId,
        discordId: message.author.id,
        username: message.author.username,
        message: message.content
    }
    // every message being inserted should add 1 to the user
    // start at 0, add +1 to the count if the count is at 0, no wait, otherwise do timeout  500 * count
    // when the timeout goes off subtract -1
    if (message.channel && message.channel.guild && 
        (message.channel.guild.id == "167298338905915393"
        || message.channel.guild.id == "231378019292282880")){
    
        if (botEnabled){
            // console.log(message.author.id); // id of the user that created the message
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
            if (message.channel.type == "text" && (BOT_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                if( commandIs("thank", message )){
                    try{
                        commands.thankCommand(message)
                    }
                    catch(error){
                        message.channel.send(error);
                    }
                }
                
                // else if (commandIs("trickortreat", message)){
                //     commands.trickOrTreatCommand(message);
                // }
                //SEASONAL
                else if (commandIs("present", message)){
                    //messagesByUserTimeout(commands.openPresentCommand, message)
                }
                
                else if( commandIs("sorry", message )){
                    commands.sorryCommand(message)
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
                else if( commandIs("buyitem", message )){
                    commands.buyShopItem(message, args);
                    data.command = "buyitem"
                    profileDB.createUserActivity(data)
                }
                else if( commandIs("prepare", message)){
                    commands.prepareCommand(message)
                }
                else if( commandIs("welcome", message)){
                    commands.welcomeCommand(message);
                }
                else if (commandIs("give", message)){
                    commands.giveCommand(message, args[2]);
                }
                else if (commandIs("cook", message)){
                    commands.cookCommand(message)
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
                else if(commandIs("buyflask", message)){
                    commands.buyFlaskCommand(message);
                }
                else if(commandIs("createpotion", message)){
                    commands.createPotionCommand(message);
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
                    // console.log(pasta);
                    commands.buyPastaCommand(message, pasta);
                }
                else if (commandIs("scavenge", message)){
                    commands.scavangeCommand(message)
                }
                else if (commandIs("inventory", message) || commandIs("inv", message)){
                    commands.inventoryCommand(message);
                }
                else if (commandIs("rares", message)){
                    commands.raresCommand(message, args, "rare");
                }
                else if (commandIs("ancients", message)){
                    commands.raresCommand(message, args, "ancient");
                }
                else if (commandIs("artifacts", message)){
                    commands.raresCommand(message, args, "artifact");
                }
                else if (commandIs("iteminfo", message)){
                    commands.itemDetailsCommand(message, args);
                }
                else if (commandIs("hint", message)){
                    commands.hintCommand(message);
                    data.command = "hint"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("standings", message)){
                    if (args.length > 1 && args[1] == "global"){
                        commands.standingsCommand(message, client.users, true);
                    }else{
                        commands.standingsCommand(message, message.channel.guild.members, false);
                    }
                }
                else if (commandIs("toplist", message)){
                    if (args.length > 1 && args[1] == "global"){
                        commands.toplistCommand(message, client.users, true); // client.users FOR GLOBAL
                    }else{
                        if (message.channel.guild.members){
                            console.log("1")
                            commands.toplistCommand(message, message.channel.guild.members, false); // client.users FOR GLOBAL
                        }else if (message.guild.members){
                            console.log("2")
                            commands.toplistCommand(message, message.guild.members, false); // client.users FOR GLOBAL
                        }
                    }
                }
                else if (commandIs("toprpg", message)){
                    if (args.length > 1 && args[1] == "global"){
                        commands.rpgTopListCommand(message, client.users, true);
                    }else{
                        commands.rpgTopListCommand(message, message.channel.guild.members, false);
                    }
                }
                else if (commandIs("slots", message)){
                    if (args.length > 1){
                        var bet = args[1];
                        // console.log(args[1])
                        commands.slotsCommand(message, bet);
                    }
                }
                else if (commandIs("use", message)){
                    commands.useCommand(message, args)
                }
                else if (commandIs("pickup", message)){
                    commands.pickupCommand(message);
                }
                else if (commandIs("buypet", message)){
                    commands.buypetCommand(message, args);
                }
                else if (commandIs("fetch", message)){
                    commands.fetchCommand(message, args)
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
                else if (commandIs("amulets", message)){
                    commands.amuletsWearingCommand(message, args);
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
                else if (commandIs("greenhouse", message)){
                    //commands.greenHouseCommand(message)
                }
                else if (commandIs("markethelp", message)){
                    commands.marketHelpCommand(message)
                }
                else if (commandIs("market", message)){
                    commands.marketCommand(message, args)
                }
                else if (commandIs("mkbid", message)){
                    commands.marketBidCommand(message, args)
                }else if (commandIs("mkcancel", message)){
                    commands.marketCancelCommand(message, args)
                }else if (commandIs("mkauction", message)){
                    commands.marketAuctionCommand(message, args)
                }
                else if (commandIs("plant", message)){
                    message.channel.send(":herb:")
                }
                else if (commandIs("harvest", message)){
                    message.channel.send(":tractor:")
                }
                else if (commandIs("disassemble", message)){
                    // disassemble items - mark them as used - obtain items based on the item disassembled
                    commands.disassembleCommand(message, args);
                }
                else if (commandIs("createarmament", message)){
                    commands.createArmament(message, args);
                }
                else if (commandIs("armaments", message)){
                    commands.raresCommand(message, args, "armament");
                }
                else if (commandIs("bake", message)){
                    commands.bakeCommand(message, args);
                }else if (commandIs("fish", message)){
                    // go fishing - catch a big fish!
                    message.channel.send(":tractor:")
                }
                else if (commandIs("upgrade", message)){
                    // can be stable or greenhouse or temple
                    commands.upgradeCommand(message, args);
                }
                else if (commandIs("craft", message)){
                    // craft a specific item via id
                    commands.craftCommand(message, args)
                }
                else if (commandIs("buyhacksaw", message)){
                    // craft a specific item via id
                    commands.buyHacksawCommand(message, args)
                }
                else if (commandIs("race", message)){
                    // enter an upcoming race
                    message.channel.send(":tractor:")
                }
                else if (commandIs("map", message)){
                    commands.mapCommand(message, args)
                }
                else if (commandIs("travel", message)){
                    commands.travelCommand(message, args)
                }
                else if (commandIs("rpgstart", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.rpgBattleCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("pvpstart", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.rpgBattleCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("rpgchallenge", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.rpgChallengeCommand(message, args);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("ready", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.rpgReadyCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("skip", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.rpgSkipCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("cast", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.castCommand(message, args);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("rpghelp", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.rpghelpCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                
                else if (commandIs("fruits", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.miniGameCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }else if (commandIs("take", message)){
                    if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                        commands.miniGamePlay(message, args);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("rpgstats", message)){
                    commands.rpgstatsCommand(message);
                }
                if (commandIs("timetravel", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.timeTravelCommand(message, args, channelName);
                }
                else if (commandIs("propose", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.proposeCommand(message, channelName);
                }
                else if (commandIs("wedding", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.weddingCommand(message, channelName);
                }
                else if (commandIs("explore", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.exploreTombCommand(message, channelName);
                }
                else if (commandIs("ritual", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.ritualCommand(message, channelName);
                }
            }
            else if (message.channel.type == "text" && (RPG_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                // artifact abilities
                try{
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
                    else if (commandIs("pvpstart", message)){
                        commands.rpgBattleCommand(message);
                    }
                    else if (commandIs("rpgchallenge", message)){
                        commands.rpgChallengeCommand(message, args);
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
                    
                    else if (commandIs("fruits", message)){
                        commands.miniGameCommand(message);
                    }else if (commandIs("take", message)){
                        commands.miniGamePlay(message, args);
                    }
                }
                catch(error){
                    // console.log(error);
                    message.channel.send("error : " + error);
                }
            }
            else if (message.channel.type == "text" && (MAIN_CHANNELS.indexOf(message.channel.name) != -1) && !message.author.bot){
                 if( commandIs("thank", message )){
                    commands.thankCommand(message)
                }
                else if( commandIs("sorry", message )){
                    commands.sorryCommand(message)
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
            // console.log(args);
            if (commandIs("enable", message)){
                for (var arg in args){
                    if(args[arg] == TURN_ON_MSG){
                        botEnabled = true;
                    }
                }
            }
        }
    }else{
        
        channelName = message.channel.name;
        mainChannel = message.channel.name;

        if (botEnabled){
            // console.log(message.author.id); // id of the user that created the message
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
            if (message.channel.type == "text" && !message.author.bot){
                if( commandIs("thank", message )){
                    try{
                        commands.thankCommand(message)
                        data.command = "thank"
                        profileDB.createUserActivity(data)
                    }
                    catch(error){
                        message.channel.send(error);
                    }
                }
                
                // else if (commandIs("trickortreat", message)){
                //     commands.trickOrTreatCommand(message);
                // }
                // SEASONAL
                else if (commandIs("present", message)){
                    //messagesByUserTimeout(commands.openPresentCommand, message)
                }
                
                else if( commandIs("sorry", message )){
                    commands.sorryCommand(message)
                    data.command = "sorry"
                    profileDB.createUserActivity(data)
                }
                else if( commandIs("help", message )){
                    commands.helpCommand(message);
                    data.command = "help"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("itemhelp", message )){
                    commands.itemhelpCommand(message);
                    data.command = "itemhelp"
                    profileDB.createUserActivity(data)
                }
                else if( commandIs("buystand", message )){
                    commands.buyStandCommand(message);
                    data.command = "buystand"
                    profileDB.createUserActivity(data)
                }
                else if( commandIs("buyitem", message )){
                    commands.buyShopItem(message, args);
                    data.command = "buyitem"
                    profileDB.createUserActivity(data)
                }
                else if( commandIs("prepare", message)){
                    commands.prepareCommand(message)
                    data.command = "prepare"
                    profileDB.createUserActivity(data)
                }
                else if( commandIs("welcome", message)){
                    commands.welcomeCommand(message);
                    data.command = "welcome"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("give", message)){
                    commands.giveCommand(message, args[2]);
                    data.command = "give"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("cook", message)){
                    commands.cookCommand(message)
                    data.command = "cook"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("profile", message)){
                    commands.profileCommand(message);
                    data.command = "profile"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("tacos", message)){
                    commands.tacosCommand(message);
                    data.command = "tacos"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("stands", message)){
                    commands.tacoStandsCommand(message);
                    data.command = "stands"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("throw", message)){
                    commands.throwCommand(message);
                    data.command = "throw"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("shop", message)){
                    commands.shopCommand(message, args);
                    data.command = "shop"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("repshop", message)){
                    commands.repShopCommand(message);
                    data.command = "repshop"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("buyrecipe", message)){
                    commands.buyRecipeCommand(message);
                    data.command = "buyrecipe"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("buyflask", message)){
                    commands.buyFlaskCommand(message);
                    data.command = "buyflask"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("createpotion", message)){
                    commands.createPotionCommand(message);
                    data.command = "createpotion"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("buypickaxe", message)){
                    commands.buyPickaxeCommand(message);
                    data.command = "buypickaxe"
                    profileDB.createUserActivity(data)
                }
                else if(commandIs("buypasta", message)){
                    var pasta = "";
                    for (var arg in args){
                        if (arg > 0){
                            pasta = pasta.concat(args[arg] + " ");
                        }
                    }
                    // console.log(pasta);
                    commands.buyPastaCommand(message, pasta);
                    data.command = "buypasta"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("scavenge", message)){
                    commands.scavangeCommand(message)
                    data.command = "scavenge"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("inventory", message) || commandIs("inv", message)){
                    commands.inventoryCommand(message);
                    data.command = "inventory"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("rares", message)){
                    commands.raresCommand(message, args, "rare");
                    data.command = "rares"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("ancients", message)){
                    commands.raresCommand(message, args, "ancient");
                    data.command = "ancients"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("artifacts", message)){
                    commands.raresCommand(message, args, "artifact");
                    data.command = "artifacts"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("iteminfo", message)){
                    commands.itemDetailsCommand(message, args);
                    data.command = "iteminfo"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("hint", message)){
                    commands.hintCommand(message);
                    data.command = "hint"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("standings", message)){
                    if (args.length > 1 && args[1] == "global"){
                        commands.standingsCommand(message, client.users, true);
                    }else{
                        commands.standingsCommand(message, message.channel.guild.members, false);
                    }
                    data.command = "standings"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("toplist", message)){
                    if (args.length > 1 && args[1] == "global"){
                        commands.toplistCommand(message, client.users, true); // client.users FOR GLOBAL
                    }else{
                        if (message.channel.guild.members){
                            console.log("1")
                            commands.toplistCommand(message, message.channel.guild.members, false); // client.users FOR GLOBAL
                        }else if (message.guild.members){
                            console.log("2")
                            commands.toplistCommand(message, message.guild.members, false); // client.users FOR GLOBAL
                        }
                    }
                    data.command = "toplist"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("toprpg", message)){
                    if (args.length > 1 && args[1] == "global"){
                        commands.rpgTopListCommand(message, client.users, true);
                    }else{
                        commands.rpgTopListCommand(message, message.channel.guild.members, false);
                    }
                    data.command = "toprpg"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("slots", message)){
                    if (args.length > 1){
                        var bet = args[1];
                        // console.log(args[1])
                        commands.slotsCommand(message, bet);
                        data.command = "slots"
                    profileDB.createUserActivity(data)
                    }
                }
                else if (commandIs("use", message)){
                    commands.useCommand(message, args)
                    data.command = "use"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("pickup", message)){
                    commands.pickupCommand(message);
                    data.command = "pickup"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("buypet", message)){
                    commands.buypetCommand(message, args);
                    data.command = "buypet"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("fetch", message)){
                    commands.fetchCommand(message, args)
                    data.command = "fetch"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("xp", message)){
                    commands.xpCommand(message);
                    data.command = "xp"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("ach", message)){
                    commands.achievementsCommand(message);
                    data.command = "ach"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("puton", message)){
                    commands.putonCommand(message, args);
                    data.command = "puton"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("wearing", message)){
                    commands.wearingCommand(message, args);
                    data.command = "wearing"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("amulets", message)){
                    commands.amuletsWearingCommand(message, args);
                    data.command = "amulets"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("takeoff", message)){
                    commands.takeoffCommand(message, args);
                    data.command = "takeoff"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("auction", message)){
                    commands.auctionCommand(message, args);
                    data.command = "auction"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("bid", message)){
                    commands.bidCommand(message, args);
                    data.command = "bid"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("trade", message)){
                    commands.tradeCommand(message, args);
                    data.command = "trade"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("accept", message)){
                    commands.acceptTradeCommand(message, args);
                    data.command = "accept"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("cancel", message)){
                    commands.cancelTradeCommand(message, args);
                    data.command = "cancel"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("combine", message)){
                    commands.combineCommand(message, args)
                    data.command = "combine"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("agree", message)){
                    commands.agreeTermsCommand(message, args);
                    data.command = "agree"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("deny", message)){
                    commands.denyTermsCommand(message, args);
                    data.command = "deny"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("raffle", message)){
                    commands.enterRaffleCommand(message);
                    data.command = "raffle"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("party", message)){
                    commands.createTableCommand(message, mainChannel);
                    data.command = "party"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("greenhouse", message)){
                    commands.greenHouseCommand(message)
                }
                else if (commandIs("stable", message)){
                    commands.stableCommand(message)
                }
                else if (commandIs("temple", message)){
                    commands.templeCommand(message)
                }
                else if (commandIs("markethelp", message)){
                    commands.marketHelpCommand(message)
                    data.command = "markethelp"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("market", message)){
                    commands.marketCommand(message, args)
                    data.command = "market"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("mkbid", message)){
                    commands.marketBidCommand(message, args)
                    data.command = "mkbid"
                    profileDB.createUserActivity(data)
                }else if (commandIs("mkcancel", message)){
                    commands.marketCancelCommand(message, args)
                }else if (commandIs("mkauction", message)){
                    commands.marketAuctionCommand(message, args)
                    data.command = "mkauction"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("plant", message)){
                    commands.plantCommand(message, args)
                }
                else if (commandIs("harvest", message)){
                    commands.harvestCommand(message)
                }
                else if (commandIs("disassemble", message)){
                    // disassemble items - mark them as used - obtain items based on the item disassembled
                    commands.disassembleCommand(message, args);
                }
                else if (commandIs("bake", message)){
                    commands.bakeCommand(message, args);
                }
                else if (commandIs("createarmament", message)){
                    commands.createArmament(message, args);
                }
                else if (commandIs("armaments", message)){
                    commands.raresCommand(message, args, "armament");
                }
                else if (commandIs("upgrade", message)){
                    // can be stable or greenhouse or temple
                    commands.upgradeCommand(message, args);
                }
                else if (commandIs("craft", message)){
                    // craft a specific item via id
                    commands.craftCommand(message, args)
                }
                else if (commandIs("buyhacksaw", message)){
                    commands.buyHacksawCommand(message, args)
                }
                else if (commandIs("map", message)){
                    commands.mapCommand(message, args)
                }
                else if (commandIs("travel", message)){
                    commands.travelCommand(message, args)
                }
                else if (commandIs("rpgstart", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.rpgBattleCommand(message);
                        data.command = "rpgstart"
                    profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("pvpstart", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.rpgBattleCommand(message);
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("rpgchallenge", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.rpgChallengeCommand(message, args);
                        data.command = "rpgchallenge"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("ready", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.rpgReadyCommand(message);
                        data.command = "ready"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("skip", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.rpgSkipCommand(message);
                        data.command = "skip"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("cast", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.castCommand(message, args);
                        data.command = "cast"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("rpghelp", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.rpghelpCommand(message);
                        data.command = "rpghelp"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                
                else if (commandIs("fruits", message)){
                    if (message.channel.type == "text" && !message.author.bot){
                        commands.miniGameCommand(message);
                        data.command = "fruits"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }else if (commandIs("take", message)){
                    if (message.channel.type == "text"  && !message.author.bot){
                        commands.miniGamePlay(message, args);
                        data.command = "take"
                        profileDB.createUserActivity(data)
                    }else{
                        message.channel.send("use the rpg channel for this")
                    }
                }
                else if (commandIs("rpgstats", message)){
                    commands.rpgstatsCommand(message);
                    data.command = "rpgstats"
                    profileDB.createUserActivity(data)
                }
                if (commandIs("timetravel", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.timeTravelCommand(message, args, channelName);
                    data.command = "timetravel"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("propose", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.proposeCommand(message, channelName);
                    data.command = "propose"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("wedding", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.weddingCommand(message, channelName);
                    data.command = "wedding"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("explore", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.exploreTombCommand(message, channelName);
                    data.command = "explore"
                    profileDB.createUserActivity(data)
                }
                else if (commandIs("ritual", message)){
                        
                    var channelName;
                    client.channels.forEach(function(channel){
                        if (channel.type == "voice" && channel.name == "General"){
                            channelName = channel;
                        }
                    })
    
                    commands.ritualCommand(message, channelName);
                    data.command = "ritual"
                    profileDB.createUserActivity(data)
                }
            }
        }
        else{
            var args = message.content.split(/[ ]+/);
            // console.log(args);
            if (commandIs("enable", message)){
                for (var arg in args){
                    if(args[arg] == TURN_ON_MSG){
                        botEnabled = true;
                    }
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

function messagesByUserTimeout(commandFunction, message){
    if (messagesByUserCount[message.author.id] && messagesByUserCount[message.author.id].count > -1){
        var timeoutCount = messagesByUserCount[message.author.id].count
        if (timeoutCount < 0 ){
            timeoutCount = 0
        }
        var messageTimeout = setTimeout(function(){
            commandFunction(message);
            messagesByUserCount[message.author.id].count = messagesByUserCount[message.author.id].count - 1
        }, 1500 * (timeoutCount + 1)) 
        messagesByUserCount[message.author.id].count = messagesByUserCount[message.author.id].count + 1
        messagesByUserCount[message.author.id].timeout = messageTimeout
    }else{
        messagesByUserCount[message.author.id] = { count: 0 }
        commandFunction(message);
    }
}

function messagesByUserTimeoutArgs(commandFunction, message, args){
    if (messagesByUserCount[message.author.id] && messagesByUserCount[message.author.id].count > -1){
        var timeoutCount = messagesByUserCount[message.author.id].count
        if (timeoutCount < 0 ){
            timeoutCount = 0
        }
        var messageTimeout = setTimeout(function(){
            commandFunction(message, args);
            messagesByUserCount[message.author.id].count = messagesByUserCount[message.author.id].count - 1
        }, 1500 * (timeoutCount + 1)) 
        messagesByUserCount[message.author.id].count = messagesByUserCount[message.author.id].count + 1
        messagesByUserCount[message.author.id].timeout = messageTimeout
    }else{
        messagesByUserCount[message.author.id] = { count: 0 }
        commandFunction(message, args);
    }
}

function messagesByUserTimeoutArgsRarity(commandFunction, message, args, rarity){
    if (messagesByUserCount[message.author.id] && messagesByUserCount[message.author.id].count > -1){
        var timeoutCount = messagesByUserCount[message.author.id].count
        if (timeoutCount < 0 ){
            timeoutCount = 0
        }
        var messageTimeout = setTimeout(function(){
            commandFunction(message, args, rarity);
            messagesByUserCount[message.author.id].count = messagesByUserCount[message.author.id].count - 1
        }, 1500 * (timeoutCount + 1)) 
        messagesByUserCount[message.author.id].count = messagesByUserCount[message.author.id].count + 1
        messagesByUserCount[message.author.id].timeout = messageTimeout
    }else{
        messagesByUserCount[message.author.id] = { count: 0 }
        commandFunction(message, args, rarity);
    }
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
            // // console.log( user );
            possibleUsersUsername.push( user );
        }
    });

    // random the user based on array size
    var userToTakeFromIndex = Math.floor(Math.random() * possibleUsersUsername.length);
    // console.log("taking from " + possibleUsersUsername[userToTakeFromIndex].username )
    // random if bender is sharing half his meal
    var sharing = Math.floor(Math.random() * 10)
    // console.log("sharing ? " + sharing )
    // random the user bender will share with
    var userToShareWithIndex = Math.floor(Math.random() * possibleUsersUsername.length);

    while( userToShareWithIndex == userToTakeFromIndex){
        // check for a different user until the indeces are not equal
        userToShareWithIndex = Math.floor(Math.random() * possibleUsersUsername.length);
    }
    // console.log("sharing with " + possibleUsersUsername[userToShareWithIndex].username )

    // sharing
    if (sharing >= 8){
        var interval = setTimeout (function(){ 
            var tacos = Math.floor(Math.random() * 50) + 1
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
                            // console.log(err);
                        }
                        else{
                            // took from user
                        }
                    })
                }
                
            })
            profileDB.updateUserTacosGive(possibleUsersUsername[userToShareWithIndex].id, tacos , function(err, updateResponse){
                if (err){
                    // console.log(err);
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
            var tacos = Math.floor(Math.random() * 50) + 1;
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
                            // console.log(err);
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
