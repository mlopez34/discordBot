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

client.on('ready', function(err) {
    if (err){
        console.log(err);
    } 
    console.log('The bot is online');  
});

function commandIs(str, msg){
    console.log(msg.content.toLowerCase())
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
    
}

function helpCommand(message){
    var commandsList = "List of commands \n "
    var thank = "!thank @user - thank a user and get 1 taco! \n "
    var sorry = "!sorry @user - say sorry to a user and get 1 taco! \n "
    var welcome = "!welcome @user - welcome a user and get 2 tacos! \n "
    var scavange = "!scavange - in progress "
    var commandsList = "```" + commandsList + thank + sorry + welcome + scavange + "```";
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

client.login(config.discordClientLogin);



// const embed = new Discord.RichEmbed()
//         .setTitle('This is your title, it can hold 256 characters')
//         .setAuthor('Author Name', 'https://i.imgur.com/lm8s41J.png')
//         /*
//         * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
//         */
//         .setColor(0x00AE86)
//         .setDescription('This is the main body of text, it can hold 2048 characters.')
//         .setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
//         .setImage('http://i.imgur.com/yVpymuV.png')
//         .setThumbnail('http://i.imgur.com/p2qNFag.png')
//         /*
//         * Takes a Date object, defaults to current date.
//         */
//         .setTimestamp()
//         .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
//         .addField('This is a field title, it can hold 256 characters',
//             'This is a field value, it can hold 2048 characters.')
//         /*
//         * Inline fields may not display as inline if the thumbnail and/or image is too big.
//         */
//         .addField('Inline Field', 'They can also be inline.', true)
//         /*
//         * Blank field, useful to create some space.
//         */
//         .addBlankField(true)
//         .addField('Inline Field 3', 'You can have a maximum of 25 fields.', true);

//         message.channel.send({embed});
