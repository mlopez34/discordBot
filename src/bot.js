'use strict'
var promise = require('bluebird');
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
var BASE_TACO_HARVEST = 10;
var BASE_TACO_COOK = 20;

client.on('ready', function(err) {
    if (err){
        console.log(err);
    } 
    console.log('The bot is online');  
});

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith(config.commandString + str);
}

client.on('message', function(message){
    console.log(message.author.id); // id of the user that created the message
    var args = message.content.split(/[ ]+/);
    console.log(args);

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
    else if( commandIs("buytree", message )){
        buyTreeCommand(message);
    }
    else if( commandIs("harvest", message)){
        harvestCommand(message);
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
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
    })
    // check the user mentioned someone, and the user is not the same user
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId ){
        getUserProfileData( discordUserId, function(err, thankResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: discordUserId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: now,
                        lastbaketime: threedaysAgo,
                        lastwelcometime: threedaysAgo,
                        lastsorrytime: threedaysAgo,
                        lastscavangetime: threedaysAgo
                    }
                    createUserProfile(userData, function(err, createUserResponse){
                        if (err){
                            console.log(err); // cant create user RIP
                        }
                        else{
                            message.reply( " you now have " + 1 + " taco! :taco:");
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
                    updateUserTacosThank(discordUserId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.reply( " you now have " + (thankResponse.data.tacos + 1) + " tacos! :taco:");
                        }
                    })
                }else{
                    // six hours have not passed, tell the user they need to wait 
                    message.reply( " you are being too thankful!");
                }
            }
        });
    }
    else{
        message.reply( " you must mention a user or a user that isn't you whom you want to thank!");
    }
}

function sorryCommand(message){
    // say sorry to somebody every 6 hours
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
    })

    if ( message.mentions.users.size > 0 && discordUserId != mentionedId ){
        getUserProfileData( discordUserId, function(err, sorryResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: discordUserId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastbaketime: threedaysAgo,
                        lastwelcometime: threedaysAgo,
                        lastsorrytime: now,
                        lastscavangetime: threedaysAgo
                    }
                    createUserProfile(userData, function(err, createUserResponse){
                        if (err){
                            console.log(err); // cant create user RIP
                        }
                        else{
                            message.reply( " you now have " + 1 + " taco! :taco:");
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
                    updateUserTacosSorry(discordUserId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.reply( " you now have " + (sorryResponse.data.tacos + 1) + " tacos! :taco:");
                        }
                    })
                }else{
                    // six hours have not passed, tell the user they need to wait 
                    message.reply( " you are being too sorryful!");
                }
            }
        })
    }
    else{
        message.reply( " you must mention a user or a user that isn't you whom you want to sorry!");
    }

}

function buyTreeCommand(message){
    // buy a tree for x number of tacos
    var discordUserId = message.author.id

    getUserProfileData( discordUserId, function(err, sorryResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.reply( " you can't afford a tree atm!");
        }
        else{
            // if user has enough tacos to purchase the tree, add 1 tree, subtract x tacos
            var userTacoTrees = 0;
            if (sorryResponse.data.tacotrees && sorryResponse.data.tacotrees > -1){
                userTacoTrees = sorryResponse.data.tacotrees;
            }
            console.log(sorryResponse.data.tacos);
            var treeCost = BASE_TACO_COST + (userTacoTrees * 25);
            if (sorryResponse.data.tacos > treeCost){
                // purchaseTree
                var tacosSpent = treeCost * -1
                 purchaseTacoTree(discordUserId, tacosSpent, sorryResponse.data.tacotrees, function(err, data){
                    if (err){
                        console.log(err);
                        // couldn't purchase tree
                    }
                    else{
                        message.reply( " congratulations you have purchased a taco tree!");
                    }
                 })
            }
            else{
                // can't afford tree
                var treeCost = BASE_TACO_COST + (userTacoTrees * 25);
                message.reply( " you can't afford a tree atm you need " + treeCost + " tacos!");
            }
        }
    })
}

function harvestCommand(message){
    // harvest tacos based on number of taco trees
    var discordUserId = message.author.id

    getUserProfileData( discordUserId, function(err, harvestResponse) {
        if(err){
            // user doesnt exist, they cannot harvest
            message.reply( " you can't harvest atm because you do not have taco trees!");
        }
        else{
            // get number of trees the user has
            // check lastharvest time
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 72));

            if ( threeDaysAgo > harvestResponse.data.lastharvesttime ){
                // able to harvest again
                var userTacoTrees = 0;
                if (harvestResponse.data.tacotrees && harvestResponse.data.tacotrees > -1){
                    userTacoTrees = harvestResponse.data.tacotrees;
                }
                if (userTacoTrees > 0){
                    // add tacos x10 of # of trees
                    var tacosToHarvest = BASE_TACO_HARVEST * userTacoTrees;
                    harvestTacos(discordUserId, tacosToHarvest, function(err, data){
                        if (err){
                            console.log(err);
                            // something happened
                        }
                        else{
                            message.reply( " you have harvested " + tacosToHarvest + " tacos!");
                        }
                    })
                }
                else{
                    message.reply( " you do not have any trees to harvest!");
                }
            }
            else{
                message.reply( " you are being too harvestful!");
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
        mentionedUser = user.username
    })
    if (mentionedId == discordUserId){
        message.channel.send(" you can't welcome yourself!")
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
                        tacos: 1,
                        tacotrees: 0,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastbaketime: threedaysAgo,
                        lastwelcometime: threedaysAgo,
                        lastsorrytime: threedaysAgo,
                        lastscavangetime: threedaysAgo,
                        lastharvesttime : threedaysAgo,
                        welcomed: true
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
                            message.reply( " you now have " + (welcomeResponse.data.tacos + 1) + " tacos! :taco:");
                        }
                    })
                }
                else{
                    message.reply( " the user has already been welcomed!");
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
        mentionedUser = user.username
    })
    // get user
    if (mentionedId == discordUserId){
        message.channel.send(" you can't give yourself taco!")
    }
    else{
        getUserProfileData( discordUserId, function(err, giveResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    message.reply( " you have no tacos!");
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
                            message.reply( err );
                        }
                        else{
                            // 
                            updateUserTacosGive(mentionedId, giveTacoAmount, function(err, updateResponse) {
                                if (err){
                                    console.log(err);
                                    message.reply( err );
                                }
                                else{
                                    // send message that the user has 1 more taco
                                    message.reply( " gifted " + giveTacoAmount + " tacos! :taco:");
                                    
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
            // user doesnt exist, they cannot harvest
            message.reply( " you can't cook atm because you do not have taco trees!");
        }
        else{
            // check six hours ago
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 72));

            if ( threeDaysAgo > cookResponse.data.lastbaketime ){
                updateUserTacosCook(discordUserId, BASE_TACO_COOK, function(err, updateResponse) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        // send message that the user has 1 more taco
                        message.reply( " you now have " + (cookResponse.data.tacos + BASE_TACO_COOK) + " tacos! :taco:");
                    }
                })
            }else{
                // six hours have not passed, tell the user they need to wait 
                message.reply( " you are being too sorryful!");
            }
        }
    })
}

function throwCommand(message){
    console.log(message);
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
    // throw a taco at someone
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId){
        // 
        getUserProfileData( discordUserId, function(err, throwResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesn't exist
                    message.reply( " you do not have any tacos to throw!");
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
                            message.reply( " threw a taco at " + mentionedUser + " :dizzy_face: :taco: :wave: :smiling_imp:");
                        }
                    })
                }
                else{
                    message.reply( " you do not have any tacos to throw! ")
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
                profileData.userTacoStands = profileResponse.data.tacotrees;
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
                profileData.userTacoStands = profileResponse.data.tacotrees;
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
            profileData.userTacoStands = profileResponse.data.tacotrees;
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
    .addField('Achievments: ', " :kaaba: ", true)
    /*
    * Blank field, useful to create some space.
    
    .addBlankField(true)
    .addField('Taco Stands', 3, true);
    */

    message.channel.send({embed});
}

function shopCommand(message){
    
}

function helpCommand(message){
    var commandsList = "List of commands \n "
    var profile = "!profile - display user's profile \n "
    var thank = "!thank @user - thank a user and get 1 taco! \n "
    var sorry = "!sorry @user - say sorry to a user and get 1 taco! \n "
    var welcome = "!welcome @user - welcome a user and get 2 tacos! \n "
    var cook = "!cook - cook some tacos! \n "
    var give = "!give @user number - give the mentioned user some number of tacos! \n "
    var harvest = "!harvest - harvest some tacos from your taco stands! \n "
    var scavange = "!scavange - in progress "
    var commandsList = "```" + commandsList + profile + thank + sorry + welcome + cook + give + harvest + scavange + "```";
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
  var query = 'insert into '+ config.profileTable + '(discordId, tacos, birthdate, lastthanktime, lastsorrytime, lastbaketime, lastwelcometime, lastscavangetime)' +
      'values(${discordId}, ${tacos}, ${birthdate}, ${lastthanktime},  ${lastsorrytime}, ${lastbaketime}, ${lastwelcometime}, ${lastscavangetime})'
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
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastbaketime=$3 where discordid=$2'
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

function purchaseTacoTree(userId, tacosSpent, currentTacoTrees, cb){
    console.log(currentTacoTrees);
    let tacoTree = 1;
    if (currentTacoTrees){
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacotrees=tacotrees+$3 where discordid=$2'
        console.log(query)
        var lastThank = new Date();
        //console.log("new last thank: " + lastThank);
        db.none(query, [tacosSpent, userId, tacoTree])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added taco tree'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
    else{
        
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacotrees=$3 where discordid=$2'
        console.log(query)
        var lastThank = new Date();
        //console.log("new last thank: " + lastThank);
        db.none(query, [tacosSpent, userId, tacoTree])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added taco tree'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
}

function harvestTacos(userId, tacosToHarvest, cb){
    // update tacos and lastharvest
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastharvesttime=$3 where discordid=$2'
    var lastharvest = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [ tacosToHarvest, userId, lastharvest ])
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

