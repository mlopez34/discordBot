'use strict'
// takes care of gaining reputation with bender
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
var config = require("./config.js")

var REPUTATIONS = config.reputations;

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
function reachedNewRepStatus(message, getProfileRes, discordId, reputationGained, cb){
    // query for user's current reputation number
    var reputationNumber = getProfileRes.data.reputation;
    if (!reputationNumber){
        reputationNumber = 0;
    }
    var reputationStatus = getProfileRes.data.repstatus;
    // check the current status, and then check the next status number, and check if user rep is greater than that
    if (!reputationStatus && reputationNumber + reputationGained >= REPUTATIONS.liked.repToGet){
        // reached liked
        updateReputationStatus(message, discordId, "Liked");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Liked" })
    }
    else if(reputationNumber + reputationGained >= REPUTATIONS.glorified.repToGet 
        && reputationStatus.toLowerCase() != "glorified"){
        // reched glorified
        updateReputationStatus(message, discordId, "Glorified");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Glorified" })
    }
    else if(reputationNumber + reputationGained >= REPUTATIONS.admired.repToGet 
        && reputationStatus.toLowerCase() != "admired"){
        // reached admired
        updateReputationStatus(message, discordId, "Admired");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Admired" })
    }
    else if (reputationNumber + reputationGained >= REPUTATIONS.respected.repToGet 
        && reputationStatus.toLowerCase() != "respected" 
        && reputationStatus.toLowerCase() != "admired"){
        // reached respected
        updateReputationStatus(message, discordId, "Respected");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Respected" })
    }
    else if (!reputationStatus){
        console.log("no change");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Friendly"})
    }
    else{
        // nothing happened;
        console.log("no change");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: reputationStatus})
    }
}

function updateReputationStatus(message, discordId, repstatus){
    profileDB.updateUserReputation(discordId, repstatus, function(err, res){
        if (err){
            console.log(err);
        }      
        else{
            console.log(res);
            if (repstatus){
                updateUserRewards(message, discordId, repstatus, function(updateErr, updateRes){
                    if (updateErr){
                        console.log(updateErr);
                    }
                    else{
                        reputationEmbedBuilder(message, repstatus, updateRes);
                    }
                })
            }
            else{
                reputationEmbedBuilder(message, repstatus, "none");
            }
        }
    })
}

// list of rewards to give the user
function updateUserRewards(message, discordId, repstatus, cb){
    switch(repstatus.toLowerCase()){
        case "liked":
            cb(null, "none");
            break;
        case "respected":
            // give the user a casserole on their profile
            profileDB.obtainCasserole(discordId, function(error, res){
                if (error){
                    console.log(error);
                }
                else{
                    cb(null, "casserole");
                }
            })
            break;
            /*
        case "admired":
            // give the user an ancient and a fishing rod?
            profileDB.obtainCasserole(discordId, function(error, res){
                if (error){
                    console.log(error);
                }
                else{
                    cb(null, "casserole");
                }
            })
            break;
            */
    }
        
}


function reputationEmbedBuilder(message, repstatus, rewards){
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
    // Image by Ellen from SCD
    if (repstatus.toLowerCase() == "liked" || repstatus.toLowerCase() == "admired"){
        embed.setThumbnail("http://i.imgur.com/KyQCBq9.jpg")
    }
    else{
        embed.setThumbnail("http://i.imgur.com/nrhHBK5.jpg")
    }
    embed
    .addField(message.author.username +" has reached a reputation of `" + repstatus + "` with Bender", repEmoji, true)
    // rewards
    if (rewards === "casserole"){
        embed.addField( "Rewards: " , ":shallow_pan_of_food: Casserole - gain extra tacos on cook based on your level", true)
    }
    message.channel.send({embed});
}