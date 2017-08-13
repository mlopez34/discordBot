'use strict'
// takes care of gaining experience
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
var config = require("./config.js");

var Levels = config.Levels

module.exports.gainExperience = function (message, discordUserId, experienceNumber, userProfileData){
    if (!userProfileData){
        profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
            if(err){
                console.log(err);
            }
            else{
                gainExperienceHandler(message, discordUserId, experienceNumber, profileResponse)
            }
        })
    }
    else{
        gainExperienceHandler(message, discordUserId, experienceNumber, userProfileData)
    }
}

function experienceEmbedBuilder(message, level){
    var xpEmoji = ":arrow_up:";
    const embed = new Discord.RichEmbed()
    .setColor(0xED962D)
    .addField(message.author.username +" has leveled up!", "Level " + level + " "  + xpEmoji, true)
    message.channel.send({embed});
}

function gainExperienceHandler(message, discordUserId, experienceNumber, userProfileData){
    // once the user has gained experience, check if the user has leveled and check which level the user is in 
    if (discordUserId && experienceNumber){
        // get user's experience, and level
        var firstExperienceGain = userProfileData.data.experience;
        var userExperience = userProfileData.data.experience ? userProfileData.data.experience : 0;
        var userLevel = userProfileData.data.level ? userProfileData.data.level : 1;
        var nextLevel = userLevel + 1;
        var nextLevelExperience = Levels[nextLevel];
        var levelUp = false;
        var userLeveledUpTo = userLevel;
        // check if experience + experienceNumber will be >= next level
        if (userExperience + experienceNumber >= nextLevelExperience){
            levelUp = true;
            userLeveledUpTo = nextLevel;
        }
        // get the correct level to level up to
        if (levelUp){
            // find the correct level for the user to be placed in
            while(userExperience + experienceNumber > Levels[userLeveledUpTo+1]){
                userLeveledUpTo++
            }
        }
        console.log("xp: " + experienceNumber + " lvl: " + userLeveledUpTo)
        // add experience and if userleveledupto is different than userlevel then update userlevel also
        profileDB.updateUserExperience(experienceNumber, userLeveledUpTo, discordUserId, firstExperienceGain, function(updateXpErr, updateXpRes){
            if (updateXpErr){
                console.log(updateXpErr);
            }
            else{
                console.log(updateXpRes);
                if (levelUp){
                    // create the level up embed
                    experienceEmbedBuilder(message, userLeveledUpTo);
                }
            }
        })
    }
    else{
        // something wrong
    }
}