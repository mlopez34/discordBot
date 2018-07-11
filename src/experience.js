'use strict'
// takes care of gaining experience
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
var config = require("./config.js");
var achiev = require("./achievements.js");

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
                    var data = {
                        levelObtained: userLeveledUpTo
                    }
                    data.achievements = userProfileData.data.achievements;
                    achiev.checkForAchievements(discordUser.id, data, message);
                    experienceEmbedBuilder(message, discordUser, userLeveledUpTo, tacoRewards);
                    extraLevelRewards(message, discordUser, userLeveledUpTo)
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

function extraLevelRewards(message, discordUser, userLeveledUpTo){
    // check when the user reaches level 30 and give them a reward
    // reward possibilities (amulet), ancient item, 
    // :sparkle: = emerald amulet - hp 27
    // = onyx amulet - ad 12
    // = amethyst amulet - md 12
    // = peridot amulet - armor 78
    // = garnet amulet - spirit 78

    if (userLeveledUpTo >= 30 && userLeveledUpTo <= 34){
        // give them 1 of 5 of the amulets

        profileDB.getItemData(function(err, getItemResponse){
            if (err){
                console.log(err);
            }else{
                var allItems = getItemResponse.data
                var ancientItems = [];
                var amuletItems = [];

                for (var item in allItems){
                    
                    if(allItems[item].itemraritycategory == "ancient"){
                        ancientItems.push(allItems[item]);
                    }
                    else if(allItems[item].itemraritycategory == "amulet"){
                        amuletItems.push(allItems[item]);
                    }
                }
                var itemsObtainedArray = [];
                // roll for ancient
                var ancientRoll = Math.floor(Math.random() * ancientItems.length);
                console.log(ancientItems[ancientRoll]);
                itemsObtainedArray.push(ancientItems[ancientRoll])
                
                // roll for amulet
                var amuletRoll = Math.floor(Math.random() * amuletItems.length);
                console.log(amuletItems[amuletRoll]);
                itemsObtainedArray.push(amuletItems[amuletRoll])
                if (itemsObtainedArray.length > 0){
                    addToUserInventory(discordUser.id, itemsObtainedArray);
                }

                const embed = new Discord.RichEmbed()
                .setColor(0xF2E93E)
                var rewardString = "";
                rewardString = rewardString + "\n**Items:** \n";

                for (var item in itemsObtainedArray){
                    var itemAmount = itemsObtainedArray[item].itemAmount ? itemsObtainedArray[item].itemAmount : 1;
                    rewardString = rewardString + "**" +itemAmount + "**x " + "[**" + itemsObtainedArray[item].itemraritycategory +"**] " + "**"  + itemsObtainedArray[item].itemname + "** - " + itemsObtainedArray[item].itemdescription + ", " +
                    itemsObtainedArray[item].itemslot + ", " +itemsObtainedArray[item].itemstatistics + " \n";
                }
                embed.addField("Level Up Rewards", rewardString, true)
                .setThumbnail(discordUser.avatarURL)
                message.channel.send({embed});
            }
        })
    }else if (userLeveledUpTo == 36 || userLeveledUpTo == 35){
        // give them 1 of 5 of the amulets

        profileDB.getItemData(function(err, getItemResponse){
            if (err){
                console.log(err);
            }else{
                var allItems = getItemResponse.data
                var ancientItems = [];
                var amuletItems = [];

                for (var item in allItems){
                    
                    if(allItems[item].itemraritycategory == "ancient"){
                        ancientItems.push(allItems[item]);
                    }
                    else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup35"){
                        amuletItems.push(allItems[item]);
                    }
                }
                var itemsObtainedArray = [];
                // roll for ancient
                var ancientRoll = Math.floor(Math.random() * ancientItems.length);
                console.log(ancientItems[ancientRoll]);
                itemsObtainedArray.push(ancientItems[ancientRoll])
                
                // roll for amulet
                var amuletRoll = Math.floor(Math.random() * amuletItems.length);
                console.log(amuletItems[amuletRoll]);
                itemsObtainedArray.push(amuletItems[amuletRoll])
                if (itemsObtainedArray.length > 0){
                    addToUserInventory(discordUser.id, itemsObtainedArray);
                }

                const embed = new Discord.RichEmbed()
                .setColor(0xF2E93E)
                var rewardString = "";
                rewardString = rewardString + "\n**Items:** \n";

                for (var item in itemsObtainedArray){
                    var itemAmount = itemsObtainedArray[item].itemAmount ? itemsObtainedArray[item].itemAmount : 1;
                    rewardString = rewardString + "**" +itemAmount + "**x " + "[**" + itemsObtainedArray[item].itemraritycategory +"**] " + "**"  + itemsObtainedArray[item].itemname + "** - " + itemsObtainedArray[item].itemdescription + ", " +
                    itemsObtainedArray[item].itemslot + ", " +itemsObtainedArray[item].itemstatistics + " \n";
                }
                embed.addField("Level Up Rewards", rewardString, true)
                .setThumbnail(discordUser.avatarURL)
                message.channel.send({embed});
            }
        })
    }else if (userLeveledUpTo >= 37){
        // give them 1 of 5 of the amulets

        profileDB.getItemData(function(err, getItemResponse){
            if (err){
                console.log(err);
            }else{
                var allItems = getItemResponse.data
                var ancientItems = [];
                var artifactItems = []
                var amuletItems = [];
                var lesserAmuletItems = []

                for (var item in allItems){
                    
                    if(allItems[item].itemraritycategory == "ancient"){
                        ancientItems.push(allItems[item]);
                    }
                    else if(allItems[item].itemraritycategory == "artifact+" && allItems[item].amuletsource == "levelup37"){
                        artifactItems.push(allItems[item]);
                    }
                    else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup35"){
                        lesserAmuletItems.push(allItems[item]);
                    }
                    else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup37"){
                        amuletItems.push(allItems[item]);
                    }
                }
                var itemsObtainedArray = [];
                // roll for ancient
                var ancientRoll = Math.floor(Math.random() * ancientItems.length);
                console.log(ancientItems[ancientRoll]);
                itemsObtainedArray.push(ancientItems[ancientRoll])

                var artifactRoll = Math.floor(Math.random() * artifactItems.length);
                console.log(artifactItems[artifactRoll]);
                itemsObtainedArray.push(artifactItems[artifactRoll])
                
                // roll for amulet
                var amuletRoll = Math.floor(Math.random() * amuletItems.length);
                console.log(amuletItems[amuletRoll]);
                itemsObtainedArray.push(amuletItems[amuletRoll])

                var lesserAmuletRoll = Math.floor(Math.random() * lesserAmuletItems.length);
                console.log(lesserAmuletItems[lesserAmuletRoll]);
                itemsObtainedArray.push(lesserAmuletItems[lesserAmuletRoll])

                if (itemsObtainedArray.length > 0){
                    addToUserInventory(discordUser.id, itemsObtainedArray);
                }

                const embed = new Discord.RichEmbed()
                .setColor(0xF2E93E)
                var rewardString = "";
                rewardString = rewardString + "\n**Items:** \n";

                for (var item in itemsObtainedArray){
                    var itemAmount = itemsObtainedArray[item].itemAmount ? itemsObtainedArray[item].itemAmount : 1;
                    rewardString = rewardString + "**" +itemAmount + "**x " + "[**" + itemsObtainedArray[item].itemraritycategory +"**] " + "**"  + itemsObtainedArray[item].itemname + "** - " + itemsObtainedArray[item].itemdescription + ", " +
                    itemsObtainedArray[item].itemslot + ", " +itemsObtainedArray[item].itemstatistics + " \n";
                }
                embed.addField("Level Up Rewards", rewardString, true)
                .setThumbnail(discordUser.avatarURL)
                message.channel.send({embed});
            }
        })
    }
}

function addToUserInventory(discordUserId, items){
    profileDB.addNewItemToUser(discordUserId, items, function(itemError, itemAddResponse){
        if (itemError){
            console.log(itemError);
        }
        else{
            console.log(itemAddResponse);
        }
    })
}