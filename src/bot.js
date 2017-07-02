'use strict'
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = '';
var db = pgp(connectionString);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', function(err) {
    if (err){
        console.log(err);
    } 
    console.log('The bot is online');  
});

function commandIs(str, msg){
    console.log(msg.content.toLowerCase())
    return msg.content.toLowerCase().startsWith("!" + str);
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
        helpCommand();
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

function helpCommand(){

}

function sorryCommand(message){
    // say sorry to somebody every 2 hours
}

function getUserProfileData(discordId, cb) {
  db.one('select * from "public"."userprofiledev" where discordId = $1', discordId)
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
  db.none('insert into "public"."userprofiledev"(discordId, tacos, birthdate, lastthanktime, lastsorrytime, lastbaketime, lastwelcometime, lastscavangetime)' +
      'values(${discordId}, ${tacos}, ${birthdate}, ${lastthanktime},  ${lastsorrytime}, ${lastbaketime}, ${lastwelcometime}, ${lastscavangetime})',
    data)
    .then(function () {
      cb(null, {
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      cb(err);
    });
}

function updateUserTacosThank(userId, tacos, cb) {
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
    db.none('update "public"."userprofiledev" set tacos=tacos+$1, lastthanktime=$3 where discordid=$2',
    [tacos, userId, lastThank])
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

client.login('');



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
