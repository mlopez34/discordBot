'use strict'
var promise = require('bluebird');
var moment = require("moment");
var options = {
  // Initialization Options
  promiseLib: promise
};
var config = require("./config.js");
var pgp = require('pg-promise')(options);
var connectionString = config.database;
var db = pgp(connectionString);

const Discord = require("discord.js");
const client = new Discord.Client();

var BASE_TACO_COST = 50;
var BASE_TACO_PREPARE = 10;
var BASE_TACO_COOK = 10;
var PICKAXE_COST = 15;
var BASE_INTERVAL = 5000;
var PASTA_COST = 125

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
    //steal(channelName);
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
        thankCommand(message);
    }
    else if( commandIs("sorry", message )){
        sorryCommand(message);
    }
    else if( commandIs("help", message )){
        helpCommand(message);
    }
    else if( commandIs("buystand", message )){
        buyStandCommand(message);
    }
    else if( commandIs("prepare", message)){
        prepareCommand(message);
    }
    else if( commandIs("welcome", message)){
        welcomeCommand(message);
    }
    else if (commandIs("give", message)){
        giveCommand(message, args[2]);
    }
    else if (commandIs("cook", message)){
        cookCommand(message);
    }
    else if (commandIs("profile", message)){
        profileCommand(message);
    }
    else if(commandIs("tacos", message)){
        tacosCommand(message);
    }
    else if(commandIs("stands", message)){
        tacoStandsCommand(message);
    }
    else if(commandIs("throw", message)){
        throwCommand(message);
    }
    else if(commandIs("shop", message)){
        shopCommand(message);
    }
    else if(commandIs("buypickaxe", message)){
        buyPickaxeCommand(message);
    }
    else if(commandIs("buypasta", message)){
        buyPastaCommand(message);
    }
    /*
    else if (commandIs("scavange", message)){
        scavangeCommand(message);
    }
    */
});

function thankCommand(message){
    
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
    })
    // check the user mentioned someone, and the user is not the same user
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId ){
        getUserProfileData( mentionedId, function(err, thankResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: mentionedId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: now,
                        lastcooktime: threedaysAgo,
                        lastsorrytime: threedaysAgo,
                        lastscavangetime: threedaysAgo,
                        tacostands: 0,
                        welcomed: false,
                        lastpreparetime: threedaysAgo,
                        pickaxe: "none",
                        map: false,
                        phone: false
                    }
                    createUserProfile(userData, function(err, createUserResponse){
                        if (err){
                            console.log(err); // cant create user RIP
                        }
                        else{
                            message.channel.send(message.author + " you thanked " + mentionedUser + ", they received a taco! :taco:");
                        }
                    }) 
                }
            }else{
                // check against thank timestamp and if 6 hours have passed
                var now = new Date();
                var twoHoursAgo = new Date();
                twoHoursAgo = new Date(twoHoursAgo.setHours(twoHoursAgo.getHours() - 2));
                //console.log("now: " + now);
                //console.log("twoHoursAgo: " + twoHoursAgo);
                //console.log("timestamp: " + thankResponse.data.lastthanktime);
                if ( twoHoursAgo > thankResponse.data.lastthanktime ){
                    // six hours have passed - update the user to have 1 more taco
                    updateUserTacosThank(mentionedId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " you thanked " + mentionedUser + ", they received a taco! :taco:");
                        }
                    })
                }else{
                    // six hours have not passed, tell the user they need to wait 
                    var numberOfHours = getDateDifference(thankResponse.data.lastthanktime, now, 2);
                    message.channel.send(message.author + " you are being too thankful! please wait `" + numberOfHours +"`");
                }
            }
        });
    }
    else{
        message.channel.send(message.author + " you must mention a user or a user that isn't you whom you want to thank!");
    }
}

function sorryCommand(message){
    // say sorry to somebody every 6 hours
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
    })

    if ( message.mentions.users.size > 0 && discordUserId != mentionedId ){
        getUserProfileData( mentionedId, function(err, sorryResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: mentionedId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastcooktime: threedaysAgo,
                        lastsorrytime: now,
                        lastscavangetime: threedaysAgo,
                        tacostands: 0,
                        welcomed: false,
                        lastpreparetime: threedaysAgo,
                        pickaxe: "none",
                        map: false,
                        phone: false
                    }
                    createUserProfile(userData, function(err, createUserResponse){
                        if (err){
                            console.log(err); // cant create user RIP
                        }
                        else{
                            message.channel.send(message.author + " apologized to " + mentionedUser + ", they received a taco! :taco:");
                        }
                    }) 
                }
            }
            else{
                // check six hours ago
                var now = new Date();
                var sixHoursAgo = new Date();
                sixHoursAgo = new Date(sixHoursAgo.setHours(sixHoursAgo.getHours() - 6));

                if ( sixHoursAgo > sorryResponse.data.lastsorrytime ){
                    updateUserTacosSorry(mentionedId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " apologized to " + mentionedUser + ", they received a taco! :taco:");
                        }
                    })
                }else{
                    // six hours have not passed, tell the user they need to wait 
                    var numberOfHours = getDateDifference(sorryResponse.data.lastthanktime, now, 6);
                    message.channel.send(message.author + " you are being too sorryful! Please wait `" + numberOfHours +"`");
                }
            }
        })
    }
    else{
        message.channel.send(message.author + " you must mention a user or a user that isn't you whom you want to apologize to!");
    }

}

function buyStandCommand(message){
    // buy a stand for x number of tacos
    var discordUserId = message.author.id

    getUserProfileData( discordUserId, function(err, sorryResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.channel.send(message.author + " you can't afford a stand atm!");
        }
        else{
            // if user has enough tacos to purchase the stand, add 1 tree, subtract x tacos
            var userTacoStands = 0;
            if (sorryResponse.data.tacostands && sorryResponse.data.tacostands > -1){
                userTacoStands = sorryResponse.data.tacostands;
            }
            console.log(sorryResponse.data.tacos);
            var standCost = BASE_TACO_COST + (userTacoStands * 25);
            if (sorryResponse.data.tacos > standCost){
                // purchaseStand
                var tacosSpent = standCost * -1
                 purchaseTacoStand(discordUserId, tacosSpent, sorryResponse.data.tacostands, function(err, data){
                    if (err){
                        console.log(err);
                        // couldn't purchase stand
                    }
                    else{
                        message.channel.send(message.author + " congratulations you have purchased a taco stand!");
                    }
                 })
            }
            else{
                // can't afford stand
                var standCost = BASE_TACO_COST + (userTacoStands * 25);
                message.channel.send(message.author + " you can't afford a stand , you need `" + standCost + " tacos`!");
            }
        }
    })
}

function prepareCommand(message){
    // prepare tacos based on number of taco trees
    var discordUserId = message.author.id

    getUserProfileData( discordUserId, function(err, prepareResponse) {
        if(err){
            // user doesnt exist, they cannot prepare
            message.channel.send(message.author + " you can't prepare atm because you do not have taco stands!");
        }
        else{
            // get number of trees the user has
            // check lastprepare time
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 72));

            if ( threeDaysAgo > prepareResponse.data.lastpreparetime ){
                // able to prepare again
                var userTacoStands = 0;
                if (prepareResponse.data.tacostands && prepareResponse.data.tacostands > -1){
                    userTacoStands = prepareResponse.data.tacostands;
                }
                if (userTacoStands > 0){
                    // add tacos x10 of # of trees
                    var tacosToPrepare = BASE_TACO_PREPARE * userTacoStands;
                    prepareTacos(discordUserId, tacosToPrepare, function(err, data){
                        if (err){
                            console.log(err);
                            // something happened
                        }
                        else{
                            message.channel.send(message.author + " you have prepared " + tacosToPrepare + " tacos!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " you do not have any stands to prepare tacos with!");
                }
            }
            else{
                var numberOfHours = getDateDifference(prepareResponse.data.lastthanktime, now, 24);
                message.channel.send(message.author + " you ran out of ingredients! Please wait `" + numberOfHours + "`");
            }
        }
    })
}

function welcomeCommand(message){
    // welcome a user to the server gain 2 tacos

    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    if (mentionedId == discordUserId){
        message.channel.send(message.author +" you can't welcome yourself!")
    }
    else{
        // check first that user exists, if user doesn't exist create user, then check if welcomed user exists
        // if welcomed user exists set to true, if not then create the user and set to true
        getUserProfileData( mentionedId, function(err, welcomeResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {

                        discordId: mentionedId,
                        tacos: 2,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastcooktime: threedaysAgo,
                        lastsorrytime: threedaysAgo,
                        lastscavangetime: threedaysAgo,
                        tacostands: 0,
                        welcomed: false,
                        lastpreparetime: threedaysAgo,
                        pickaxe: "none",
                        map: false,
                        phone: false
                    }
                    createUserProfile(userData, function(err, createResponse){
                        if(err){
                            console.log(err);
                        }
                        else{
                            message.channel.send("welcome! " + mentionedUser + " you now have " + userData.tacos + " tacos!")
                        }
                    })
                }
            }
            else{
                // user exists, check if user has already been welcomed
                if ( !welcomeResponse.data.welcomed ){
                    updateUserTacosWelcome(mentionedId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                            message.reply( err );
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(mentionedUser + "welcome! you now have " + (welcomeResponse.data.tacos + 2) + " tacos! :taco:");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " the user has already been welcomed!");
                }
            }
        }) 
    }
}

function giveCommand(message, giveTacoAmount){
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log("giveTacoAmount " + giveTacoAmount)
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    // get user
    if (mentionedId == discordUserId){
        message.channel.send(message.author + " you can't give yourself taco!")
    }
    else{
        getUserProfileData( discordUserId, function(err, giveResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    message.channel.send(message.author + " you have no tacos!");
                }
            }
            else{
                // check if user has enough tacos to give
                if (giveResponse.data.tacos - giveTacoAmount >= 0 ){
                    console.log("have enough");
                    var negativeGiveTacoAmount = giveTacoAmount * -1
                    updateUserTacosGive(discordUserId, negativeGiveTacoAmount, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // 
                            updateUserTacosGive(mentionedId, giveTacoAmount, function(err, updateResponse) {
                                if (err){
                                    console.log(err);
                                    var now = new Date();
                                    var threedaysAgo = new Date();
                                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                                    var userData = {

                                        discordId: mentionedId,
                                        tacos: giveTacoAmount,
                                        birthdate: "2001-10-05",
                                        lastthanktime: threedaysAgo,
                                        lastcooktime: threedaysAgo,
                                        lastsorrytime: threedaysAgo,
                                        lastscavangetime: threedaysAgo,
                                        tacostands: 0,
                                        welcomed: false,
                                        lastpreparetime: threedaysAgo,
                                        pickaxe: "none",
                                        map: false,
                                        phone: false
                                    }
                                    createUserProfile(userData, function(err, createResponse){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            message.channel.send("welcome! " + mentionedUser + " you now have " + userData.tacos + " tacos!")
                                        }
                                    })
                                }
                                else{
                                    // send message that the user has 1 more taco
                                    message.channel.send(message.author + " gifted " + mentionedUser + " " + giveTacoAmount + " tacos! :taco:");
                                    
                                }
                            })
                        }
                    })
                }
                else{
                    console.log('dont have enough tacos ')
                }
            }
        })
    }
}

function cookCommand(message){
    var discordUserId = message.author.id;

    getUserProfileData( discordUserId, function(err, cookResponse) {
        if(err){
            // user doesnt exist, they cannot cook
            // TODO: create user and add base_taco_cook
            message.channel.send(message.author + " you can't cook atm because you do not have taco stands!");
        }
        else{
            // check six hours ago
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 24));

            if ( threeDaysAgo > cookResponse.data.lastcooktime ){
                updateUserTacosCook(discordUserId, BASE_TACO_COOK, function(err, updateResponse) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        // send message that the user has 1 more taco
                        message.channel.send(message.author + " cooked " + BASE_TACO_COOK + " tacos! you now have " + (cookResponse.data.tacos + BASE_TACO_COOK) + " tacos :taco:");
                    }
                })
            }else{
                // six hours have not passed, tell the user they need to wait 
                var numberOfHours = getDateDifference(cookResponse.data.lastthanktime, now, 24);
                message.channel.send(message.author + " you cannot cook tacos currently, Please wait `" + numberOfHours + "`");
            }
        }
    })
}

function throwCommand(message){
    console.log(message);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var userMentioned;
    var mentionedId;
    var mentionedUser;
    var mentionedDiscriminator;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        userMentioned = user;
        mentionedId = user.id;
        mentionedUser = user.username
        mentionedDiscriminator = user.discriminator;
    })
    // throw a taco at someone
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId){
        // 
        getUserProfileData( discordUserId, function(err, throwResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesn't exist
                    message.reply(" you do not have any tacos to throw!");
                }
            }
            else{
                // user exists, subtract 1 taco 
                console.log("asdfasfsd " + throwResponse.data.tacos)
                if (throwResponse.data.tacos > 1){
                    updateUserTacosThrow(discordUserId, -1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " threw a taco at " + userMentioned + " :dizzy_face: :taco: :wave: :smiling_imp:");
                        }
                    })
                }
                else{
                    message.reply(" you do not have any tacos to throw! ")
                }
            }
        })
    }
}

function profileCommand(message){
    console.log(message);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    var mentionedUserAvatarURL;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
        mentionedUserAvatarURL = user.avatarURL;
    })
    if ( message.mentions.users.size > 0 ){
        getUserProfileData( mentionedId, function(err, profileResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesn't exist
                }
            }
            else{
                var profileData = {}
                profileData.userName = mentionedUser;
                profileData.avatarURL = mentionedUserAvatarURL;
                profileData.userTacos = profileResponse.data.tacos;
                profileData.userTacoStands = profileResponse.data.tacostands ? profileResponse.data.tacostands : 0;
                profileData.userItems = "none";
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                profileBuilder(message, profileData);
            }
        })
    }
    else{
        getUserProfileData( discordUserId, function(err, profileResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesnt exist
                }
            }
            else{
                var profileData = {}
                profileData.userName = message.author.username;
                profileData.avatarURL = message.author.avatarURL;
                profileData.userTacos = profileResponse.data.tacos;
                profileData.userTacoStands = profileResponse.data.tacostands ? profileResponse.data.tacostands : 0;
                profileData.userItems = "none";
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                profileBuilder(message, profileData);
            }
        })
    }
}

function tacosCommand(message){
    var discordUserId = message.author.id;

    getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            if(err.code === 0){
                // user doesnt exist
            }
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.userTacos = profileResponse.data.tacos;
            tacoEmbedBuilder(message, profileData);
        }
    })
}

function tacoEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setAuthor(profileData.userName +"'s Tacos")
    .setColor(0x00AE86)
    .addField('Tacos  :taco:', profileData.userTacos, true)
    .setFooter('use !give @user to give a user some tacos!')
    message.channel.send({embed});
}

function tacoStandsCommand(message){
    var discordUserId = message.author.id;

    getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            if(err.code === 0){
                // user doesnt exist
            }
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.userTacoStands = profileResponse.data.tacostands;
            tacoStandsEmbedBuilder(message, profileData);
        }
    })
}

function tacoStandsEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setAuthor(profileData.userName +"'s Taco Stands")
    .setColor(0x00AE86)
    .addField('Taco Stands  :bus:', profileData.userTacoStands, true)

    message.channel.send({embed});
}

function buyPickaxeCommand(message){
    // purchase pickaxe
    var discordUserId = message.author.id

    getUserProfileData( discordUserId, function(err, pickaxeResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.channel.send(message.author + " you can't afford a stand atm!");
        }
        else{
            if (pickaxeResponse.data.pickaxe == "none"){
                if (pickaxeResponse.data.tacos > PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = PICKAXE_COST * -1;
                    purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            message.channel.send(message.author + " congratulations you have purchased a pickaxe :pick:!");
                        }
                    })
                }
            }
            else{
                message.channel.send(message.author + " you already own the pickaxe selected");
            }
        }
    })
}
    

function profileBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    //.setTitle('This is your title, it can hold 256 characters')
    .setAuthor(profileData.userName +"'s profile")
    /*
    * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
    */
    .setColor(0x00AE86)
    //.setDescription('This is the main body of text, it can hold 2048 characters.')
    //.setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
    //.setImage(message.author.avatarURL)
    .setThumbnail(profileData.avatarURL)
    /*
    * Takes a Date object, defaults to current date.
    */
    .setTimestamp()
    .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
    .addField('Tacos  :taco:', profileData.userTacos, true)
    /*
    * Inline fields may not display as inline if the thumbnail and/or image is too big.
    */
    .addField('Taco Stands :bus:', profileData.userTacoStands, true)
    .addField('Achievements: ', " :kaaba: ", true)

    .addField('Items :shopping_bags:', profileData.userItems, true)
    /*
    * Blank field, useful to create some space.
    
    .addBlankField(true)
    .addField('Taco Stands', 3, true);
    */

    message.channel.send({embed});
}

function shopBuilder(message, shopData){
    var welcomeMessage = "Hey " + message.author.username + "! Welcome to Bender's shop."
    var tacoStandDescription = "Taco stands can be used to produce tacos based on the number of stands you have. \nYou can produce " + BASE_TACO_HARVEST + " per taco stand. \nThe cost of each additional stand will be higher - city tax bro. "
    var treeCost = BASE_TACO_COST + (shopData.userTacoCost * 25) + " :taco:"
    var pickaxeDescription = "The pickaxe can be used to scavange. You never know what you will find in these lands ";
    var pastaDescription = "Add a quote to your profile, after purchasing type !pasta quote - you will no longer be basic."
    
    var pickaxeCost = PICKAXE_COST +" :taco:";
    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .setTitle(welcomeMessage)
    .setThumbnail()
    .setDescription("Bender accepts Tacos as currency since he's a hungry guy :shrug:. Have a look around!")
    .addField('Your current tacos', shopData.userTacos + " :taco:", false)
    .addBlankField(false)
    .addField('Taco Stands', ":bus:", true)
    .addField('Description', tacoStandDescription, true)
    .addField('Cost', treeCost, true)
    .addField('Command', "!buystand", true)

    .addBlankField(true)
    .addBlankField(false)
    .addField('Pickaxe', ":pick:", true)
    .addField('Description', pickaxeDescription, true)
    .addField('Cost', pickaxeCost, true)
    .addField('Command', "!buypickaxe", true)

    .addBlankField(true)
    .addBlankField(false)
    .addField('Pasta', ":spaghetti:", true)
    .addField('Description', pastaDescription, true)
    .addField('Cost', PASTA_COST + " :taco:", true)
    .addField('Command', "!buyPasta", true)
    .setTimestamp()
    message.channel.send({embed});
}

function shopCommand(message){
    var discordUserId = message.author.id;
    getUserProfileData( discordUserId, function(err, sorryResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.reply( " you can't afford a stand atm!");
        }
        else{
            // if user has enough tacos to purchase the tree, add 1 tree, subtract x tacos
            var shopData = {};
            var userTacoStands = 0;
            var userTacos = sorryResponse.data.tacos;
            shopData.userTacos = userTacos;
            if (sorryResponse.data.tacostands && sorryResponse.data.tacostands > -1){
                userTacoStands = sorryResponse.data.tacostands;
            }
            shopData.userTacoCost = userTacoStands;
            shopBuilder(message, shopData);
        }
    })
}

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
    var channel = client.channels.get(channelName.id);
    var interval = setTimeout (function(){ 
        var tacos = Math.floor(Math.random() * 10)
        channel.sendMessage("It is time for Bender's meal. :fork_knife_plate: "+ "placeholder has served Bender " + tacos + " tacos :taco: Thank's placeholder for keeping Bender well fed! " + BASE_INTERVAL/1000)
        BASE_INTERVAL = BASE_INTERVAL * 2;
        steal(channelName);
    }, BASE_INTERVAL);

}

function getDateDifference(beforeDate, now, hoursDifference){
    // get difference between now and beforeDate + hoursDifference 
    
    var afterDate = new Date(beforeDate.setHours(beforeDate.getHours() + hoursDifference));
    var test = moment(afterDate);

    var daysToAdd = test.diff(now, 'days');
    var nowPlusDays = new Date(now.setHours(now.getHours() + (daysToAdd * 24) ));
    var hoursToAdd =  test.diff(now, 'hours'); 
    var nowPlusHours = new Date(now.setHours(now.getHours() + hoursToAdd));
    var minutesToAdd = test.diff(nowPlusHours, 'minutes');
    var nowPlusMinutes = new Date(nowPlusHours.setMinutes(nowPlusHours.getMinutes() + minutesToAdd));
    var secondsToAdd = test.diff(nowPlusMinutes, 'seconds');
    var nowPlusSeconds = new Date(nowPlusMinutes.setMinutes(nowPlusMinutes.getSeconds() + secondsToAdd));
    
    var dateDifferenceString = "";
    if (daysToAdd > 0){
        dateDifferenceString = dateDifferenceString + daysToAdd + " Days ";
    }
    if (hoursToAdd > 0){
        dateDifferenceString = dateDifferenceString + hoursToAdd + " Hours ";
    }
    if (minutesToAdd > 0){
        dateDifferenceString = dateDifferenceString + minutesToAdd + " Minutes ";
    }
    if (secondsToAdd > 0){
        dateDifferenceString = dateDifferenceString + secondsToAdd + " Seconds ";
    }
    return dateDifferenceString;
}

function buyPastaCommand(message){
    // purchase a quote for your profile

}

// TODO: achievement logic, scavange logic, Inventory logic, mission logic, casino logic, combine logic

function helpCommand(message){
    var commandsList = "List of commands \n "
    var profile = "!profile - display user's profile \n "
    var thank = "!thank @user - thank a user and they get 1 taco! \n "
    var sorry = "!sorry @user - say sorry to a user and they get 1 taco! \n "
    var welcome = "!welcome @user - welcome a user and they get 2 tacos! \n "
    var cook = "!cook - cook some tacos! \n "
    var give = "!give @user number - give the mentioned user some number of tacos! \n "
    var shop = "!shop - enter Bender's shop! \n "
    var prepare = "!prepare - prepare some tacos from your taco stands! \n "
    var throwTaco = "!throw @user - throw a taco at the mentioned user \n "
    var scavange = "!scavange - in progress "
    var commandsList = "```" + commandsList + profile + thank + sorry + welcome + cook + give + shop + prepare + throwTaco + scavange + "```";
    message.channel.send(commandsList);
}

function getUserProfileData(discordId, cb) {
  var query = 'select * from ' + config.profileTable + ' where discordId = $1'
  db.one(query, [discordId])
    .then(function (data) {
      //console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
}

function createUserProfile(data, cb) {
  var query = 'insert into '+ config.profileTable + '(discordId, tacos, birthdate, lastthanktime, lastsorrytime, lastcooktime, lastscavangetime, tacostands, welcomed, lastpreparetime, pickaxe, map, phone)' +
      'values(${discordId}, ${tacos}, ${birthdate}, ${lastthanktime},  ${lastsorrytime}, ${lastcooktime}, ${lastscavangetime}, ${tacostands}, ${welcomed}, ${lastpreparetime}, ${pickaxe}, ${map}, ${phone})'
  db.none(query, data)
    .then(function () {
      cb(null, {
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      cb(err);
    });
}

function updateUserTacosThank(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastthanktime=$3 where discordid=$2'
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastThank])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

function updateUserTacosSorry(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastsorrytime=$3 where discordid=$2'
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastThank])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

function updateUserTacosCook(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastcooktime=$3 where discordid=$2'
    var lastCook = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastCook])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

function updateUserTacosWelcome(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, welcomed=$3 where discordid=$2'
    var welcomed = true;
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, welcomed])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

function updateUserTacosGive(userId, tacoAmount, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacoAmount, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

function updateUserTacosThrow(userId, tacoAmount, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacoAmount, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

function purchasePickAxe(userId, tacosSpent, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, pickaxe=$3 where discordid=$2'
    console.log(query)
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacosSpent, userId, "basic"])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'purchased pickaxe'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

function purchaseTacoStand(userId, tacosSpent, currentTacoStands, cb){
    console.log(currentTacoStands);
    let tacoStand = 1;
    if (currentTacoStands){
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacostands=tacostands+$3 where discordid=$2'
        console.log(query)
        var lastThank = new Date();
        //console.log("new last thank: " + lastThank);
        db.none(query, [tacosSpent, userId, tacoStand])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added taco stand'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
    else{
        
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacostands=$3 where discordid=$2'
        console.log(query)
        var lastThank = new Date();
        //console.log("new last thank: " + lastThank);
        db.none(query, [tacosSpent, userId, tacoStand])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added taco stand'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
}

function prepareTacos(userId, tacosToHarvest, cb){
    // update tacos and lastharvest
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastpreparetime=$3 where discordid=$2'
    var lastprepare = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [ tacosToHarvest, userId, lastprepare ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

client.login(config.discordClientLogin);
