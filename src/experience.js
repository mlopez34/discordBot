'use strict'
// takes care of gaining experience
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
var config = require("./config.js");

var Levels = config.Levels
var levelRewards = config.levelTacoRewards;

module.exports.gainExperience = function (message, discordUser, experienceNumber, userProfileData){
    if (!userProfileData){
        profileDB.getUserProfileData( discordUser.id, function(err, profileResponse) {
            if(err){
                // console.log(err);
            }
            else{
                gainExperienceHandler(message, discordUser, experienceNumber, profileResponse)
            }
        })
    }
    else{
        gainExperienceHandler(message, discordUser, experienceNumber, userProfileData)
    }
}

function experienceEmbedBuilder(message, userThatLeveled, level, tacoRewards){
    var xpEmoji = ":arrow_up: :tada:";
    const embed = new Discord.RichEmbed()
    .setColor(0xED962D)
    .addField(userThatLeveled.username +" has leveled up!", "Level " + level + " "  + xpEmoji + "\n**Rewards:** " + tacoRewards + " tacos! :taco:", true)
    message.channel.send({embed});
}

function gainExperienceHandler(message, discordUser, experienceNumber, userProfileData){
    // once the user has gained experience, check if the user has leveled and check which level the user is in 
    if (discordUser && discordUser.id && experienceNumber){
        // get user's experience, and level
        var firstExperienceGain = userProfileData.data.experience;
        var userExperience = userProfileData.data.experience ? userProfileData.data.experience : 0;
        var userLevel = userProfileData.data.level ? userProfileData.data.level : 1;
        var nextLevel = userLevel + 1;
        var nextLevelExperience = Levels[nextLevel];
        var levelUp = false;
        var userLeveledUpTo = userLevel;
        var tacoRewards = 0;
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
            tacoRewards = levelRewards[userLeveledUpTo];
        }
        // console.log("xp: " + experienceNumber + " lvl: " + userLeveledUpTo)
        if (levelUp){
            // add experience and if userleveledupto is different than userlevel then update userlevel also
            profileDB.updateUserExperience(experienceNumber, userLeveledUpTo, discordUser.id, firstExperienceGain, tacoRewards, function(updateXpErr, updateXpRes){
                if (updateXpErr){
                    // console.log(updateXpErr);
                }
                else{
                    // console.log(updateXpRes);
                    // create the level up embed
                    // TODO: embed needs the name of the user that leveled up
                    experienceEmbedBuilder(message, discordUser, userLeveledUpTo, tacoRewards);
                }
            })
        }
        else{
            profileDB.updateUserExperience(experienceNumber, userLeveledUpTo, discordUser.id, firstExperienceGain, null, function(updateXpErr, updateXpRes){
                if (updateXpErr){
                    // console.log(updateXpErr);
                }
                else{
                    // console.log(updateXpRes);
                }
            })
        }
        
    }
    else{
        // something wrong
    }
}