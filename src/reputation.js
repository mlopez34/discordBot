'use strict'
// takes care of gaining reputation with bender
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var REPUTATIONS = {
    liked: 50,
    respected: 225,
    admired: 625,
    glorified: 1625
}

module.exports.gainReputation = function (message, discordUserId, reputationNumber, cb){
    // check the user repstatus
    if (discordUserId && reputationNumber){
        // call to add reputation to user
        profileDB.getUserProfileData(discordUserId, function(getProfileErr, getProfileRes){
            if (getProfileErr){
                console.log(getProfileErr);
            }
            else{
                var currentReputation = getProfileRes.data.reputation;
                profileDB.addUserReputation(discordUserId, reputationNumber, currentReputation, function(repError, repRes){
                    if (repError){
                        console.log(repError)
                        cb(repError);
                    }
                    else{
                        console.log(repRes);
                        reachedNewRepStatus(message, getProfileRes, discordUserId, reputationNumber, function(statusErr, statusRes){
                            if (statusErr){
                                cb(statusErr);
                            }
                            else{
                                console.log(statusRes);
                                cb(null, statusRes);
                            }
                        });
                    }
                })
            }
        })
    }
    else{
        cb ("error")
    }
    // 
}

// check if user has obtained a new reputation status
function reachedNewRepStatus(message, getProfileRes, discordId, reputationNumber, cb){
    // query for user's current reputation number
    var reputationNumber = getProfileRes.data.reputation;
    if (!reputationNumber){
        reputationNumber = 0;
    }
    var reputationStatus = getProfileRes.data.repstatus;
    // check the current status, and then check the next status number, and check if user rep is greater than that
    if (!reputationStatus && reputationNumber + 1 >= REPUTATIONS.liked){
        // reached liked
        updateReputationStatus(message, discordId, "Liked");
        cb(null, {repNumber: reputationNumber + 1, repStatus: "Liked" })
    }
    else if(reputationNumber + 1 >= REPUTATIONS.glorified && reputationStatus.toLowerCase() != "glorified"){
        // reched glorified
        updateReputationStatus(message, discordId, "Glorified");
        cb(null, {repNumber: reputationNumber + 1, repStatus: "Glorified" })
    }
    else if(reputationNumber + 1 >= REPUTATIONS.admired && reputationStatus.toLowerCase() != "admired"){
        // reached admired
        updateReputationStatus(message, discordId, "Admired");
        cb(null, {repNumber: reputationNumber + 1, repStatus: "Admired" })
    }
    else if (reputationNumber + 1 >= REPUTATIONS.respected && reputationStatus.toLowerCase() != "respected"){
        // reached respected
        updateReputationStatus(message, discordId, "Respected");
        cb(null, {repNumber: reputationNumber + 1, repStatus: "Respected" })
    }
    else if (!reputationStatus){
        console.log("no change");
        cb(null, {repNumber: reputationNumber + 1, repStatus: "Friendly"})
    }
    else{
        // nothing happened;
        console.log("no change");
        cb(null, {repNumber: reputationNumber + 1, repStatus: reputationStatus})
    }
}

function updateReputationStatus(message, discordId, repstatus){
    profileDB.updateUserReputation(discordId, repstatus, function(err, res){
        if (err){
            console.log(err);
        }      
        else{
            console.log(res);
            reputationEmbedBuilder(message, repstatus);
        }
    })
}

function reputationEmbedBuilder(message, repstatus){
    var repEmoji = "";
    if (repstatus.toLowerCase() == "liked"){
        repEmoji = ":statue_of_liberty:"
    }
    else if (repstatus.toLowerCase() == "respected"){
        repEmoji = ":statue_of_liberty:"
    }
    else if(repstatus.toLowerCase() == "admired"){
        repEmoji = ":statue_of_liberty:"
    }
    else if(repstatus.toLowerCase() == "glorified"){
        repEmoji = ":statue_of_liberty:"
    }
    const embed = new Discord.RichEmbed()
    .setColor(0xED962D)
    .addField(message.author.username +" has reached a reputation of `" + repstatus + "` with Bender", repEmoji, true)
    message.channel.send({embed});
}