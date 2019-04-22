'use strict'
// takes care of gaining experience
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
var config = require("./config.js");
var achiev = require("./achievements.js");
var commands = require("./commands")

var Levels = config.Levels
var RPGLevels = config.RPGLevels
var levelRewards = config.levelTacoRewards;

module.exports.gainExperience = function (message, discordUser, experienceNumber, userProfileData, isRpgExperience){
    if (!userProfileData){
        profileDB.getUserProfileData( discordUser.id, function(err, profileResponse) {
            if(err){
                // console.log(err);
            }
            else{
                gainExperienceHandler(message, discordUser, experienceNumber, profileResponse, isRpgExperience)
            }
        })
    }
    else{
        gainExperienceHandler(message, discordUser, experienceNumber, userProfileData, isRpgExperience)
    }
}

function experienceEmbedBuilder(message, userThatLeveled, level, tacoRewards, isRpgExperience){
    var xpEmoji = (!isRpgExperience ? ":arrow_up: :tada:" : ":fleur_de_lis:")
    var levelUpString = ""
    if (isRpgExperience){
        levelUpString = userThatLeveled.username + " has leveled up in RPG!"
    }else{
        levelUpString = userThatLeveled.username + " has leveled up!"
    }
    const embed = new Discord.RichEmbed()
    .setColor(0xED962D)
    .addField(levelUpString, "Level " + level + " "  + xpEmoji + "\n**Rewards:** " + tacoRewards + " tacos! :taco:",true)
    message.channel.send({embed});
}

function gainExperienceHandler(message, discordUser, experienceNumber, userProfileData, isRpgExperience){
    // once the user has gained experience, check if the user has leveled and check which level the user is in 
    if (isRpgExperience){
        // get user's experience, and level
        var firstRPGExperienceGain = userProfileData.data.rpgpoints;
        var userRPGExperience = userProfileData.data.rpgpoints ? userProfileData.data.rpgpoints : 0;
        var userRPGLevel = userProfileData.data.rpglevel ? userProfileData.data.rpglevel : 1;
        var nextRPGLevel = userRPGLevel + 1;
        var nextRPGLevelExperience = RPGLevels[nextRPGLevel];
        var levelUp = false;
        var userLeveledUpTo = userRPGLevel;
        var tacoRewards = 0;
        // check if rpgexperience + rpgexperienceNumber will be >= next level
        if (userRPGExperience + experienceNumber >= nextRPGLevelExperience){
            levelUp = true;
            userLeveledUpTo = nextRPGLevel;
        }
        if (levelUp){
            // find the correct level for the user to be placed in
            while(userRPGExperience + experienceNumber > RPGLevels[userLeveledUpTo + 1]){
                tacoRewards = tacoRewards + levelRewards[userLeveledUpTo];
                userLeveledUpTo++
            }
            tacoRewards = tacoRewards + levelRewards[userLeveledUpTo];
        }
        if (levelUp){
            // add experience and if userleveledupto is different than userlevel then update userlevel also
            profileDB.updateUserRPGExperience(experienceNumber, userLeveledUpTo, discordUser.id, firstRPGExperienceGain, tacoRewards, function(updateXpErr, updateXpRes){
                if (updateXpErr){
                    // console.log(updateXpErr);
                }else{
                    // TODO: update this for RPG
                    // console.log(updateXpRes);
                    // var data = {
                    //     levelObtained: userLeveledUpTo
                    // }
                    // data.achievements = userProfileData.data.achievements;
                    // achiev.checkForAchievements(discordUser.id, data, message);
                    experienceEmbedBuilder(message, discordUser, userLeveledUpTo, tacoRewards, isRpgExperience);
                    //var allItems = commands.getAllItems()
                    //extraLevelRewards(message, discordUser, userLeveledUpTo, allItems)
                }
            })
        }
        else{
            profileDB.updateUserRPGExperience(experienceNumber, userLeveledUpTo, discordUser.id, firstRPGExperienceGain, null, function(updateXpErr, updateXpRes){
                if (updateXpErr){
                    // console.log(updateXpErr);
                }else{
                    // console.log(updateXpRes);
                }
            })
        }
    }else{
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
                    tacoRewards = tacoRewards + levelRewards[userLeveledUpTo];
                    userLeveledUpTo++
                }
                tacoRewards = tacoRewards + levelRewards[userLeveledUpTo];
            }
            // console.log("xp: " + experienceNumber + " lvl: " + userLeveledUpTo)
            if (levelUp){
                // add experience and if userleveledupto is different than userlevel then update userlevel also
                profileDB.updateUserExperience(experienceNumber, userLeveledUpTo, discordUser.id, firstExperienceGain, tacoRewards, function(updateXpErr, updateXpRes){
                    if (updateXpErr){
                        // console.log(updateXpErr);
                    }else{
                        // console.log(updateXpRes);
                        var data = {
                            levelObtained: userLeveledUpTo
                        }
                        data.achievements = userProfileData.data.achievements;
                        achiev.checkForAchievements(discordUser.id, data, message);
                        experienceEmbedBuilder(message, discordUser, userLeveledUpTo, tacoRewards);
                        var allItems = commands.getAllItems()
                        extraLevelRewards(message, discordUser, userLeveledUpTo, allItems)
                    }
                })
            }
            else{
                profileDB.updateUserExperience(experienceNumber, userLeveledUpTo, discordUser.id, firstExperienceGain, null, function(updateXpErr, updateXpRes){
                    if (updateXpErr){
                        // console.log(updateXpErr);
                    }else{
                        // console.log(updateXpRes);
                    }
                })
            }
            
        }
        else{
            // something wrong
        }
    }
    
}

function extraLevelRewards(message, discordUser, userLeveledUpTo, allItems){
    // check when the user reaches level 30 and give them a reward
    // reward possibilities (amulet), ancient item, 
    // :sparkle: = emerald amulet - hp 27
    // = onyx amulet - ad 12
    // = amethyst amulet - md 12
    // = peridot amulet - armor 78
    // = garnet amulet - spirit 78
    if (userLeveledUpTo == 10 || userLeveledUpTo == 15){
        // give them 1 of 5 of the amulets
        var rareItems = [];

        for (var item in allItems){
            
            if(allItems[item].itemraritycategory == "rare" 
            && allItems[item].itemslot != "consumable"
            && !allItems[item].findinchallenge){
                rareItems.push(allItems[item]);
            }
        }
        var itemsObtainedArray = [];
        // roll for rare
        var rareRoll = Math.floor(Math.random() * rareItems.length);
        console.log(rareItems[rareRoll]);
        itemsObtainedArray.push(rareItems[rareRoll])

        // roll for second rare
        rareRoll = Math.floor(Math.random() * rareItems.length);
        console.log(rareItems[rareRoll]);
        itemsObtainedArray.push(rareItems[rareRoll])
                
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
    else if (userLeveledUpTo >= 30 && userLeveledUpTo <= 34){
        // give them 1 of 5 of the amulets
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
    }else if (userLeveledUpTo == 36 || userLeveledUpTo == 35){
        // give them 1 of 5 of the amulets
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
    }else if (userLeveledUpTo >= 37 && userLeveledUpTo <= 39){
        // give them 1 of 5 of the amulets
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
    }else if (userLeveledUpTo == 40 ){
        // give them 1 of 5 of the amulets
        var ancientItems = [];
        var artifactItems = []
        var greaterAmuletItems = []
        var amuletItems = [];
        var lesserAmuletItems = []

        for (var item in allItems){
            
            if(allItems[item].itemraritycategory == "ancient"){
                ancientItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "artifact+" && allItems[item].amuletsource == "levelup40"){
                artifactItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup35"){
                lesserAmuletItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup37"){
                amuletItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup40"){
                greaterAmuletItems.push(allItems[item]);
            }
        }
        var itemsObtainedArray = [];
        // roll for ancients
        var ancientRoll = Math.floor(Math.random() * ancientItems.length);
        console.log(ancientItems[ancientRoll]);
        var ancientToGet = ancientItems[ancientRoll]
        ancientToGet.itemAmount = 4
        itemsObtainedArray.push(ancientToGet)
                
        // roll for artifact
        var artifactRoll = Math.floor(Math.random() * artifactItems.length);
        console.log(artifactItems[artifactRoll]);
        itemsObtainedArray.push(artifactItems[artifactRoll])
        
        // roll for amulet
        var amuletRoll = Math.floor(Math.random() * amuletItems.length);
        console.log(amuletItems[amuletRoll]);
        itemsObtainedArray.push(amuletItems[amuletRoll])
        // greater amulet
        var greaterAmuletRoll = Math.floor(Math.random() * greaterAmuletItems.length);
        console.log(greaterAmuletItems[greaterAmuletRoll]);
        itemsObtainedArray.push(greaterAmuletItems[greaterAmuletRoll])

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
    else if (userLeveledUpTo == 41 ){
        // give them 1 of 5 of the amulets
        var ancientItems = [];
        var artifactItems = []
        var greaterAmuletItems = []
        var amuletItems = [];
        var lesserAmuletItems = []

        for (var item in allItems){
                    
            if(allItems[item].itemraritycategory == "ancient"){
                ancientItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "artifact+" && allItems[item].amuletsource == "levelup41"){
                artifactItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup35"){
                lesserAmuletItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup37"){
                amuletItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup41"){
                greaterAmuletItems.push(allItems[item]);
            }
        }
        var itemsObtainedArray = [];
        // roll for ancients
        var ancientRoll = Math.floor(Math.random() * ancientItems.length);
        console.log(ancientItems[ancientRoll]);
        var ancientToGet = ancientItems[ancientRoll]
        ancientToGet.itemAmount = 4
        itemsObtainedArray.push(ancientToGet)
        
        // roll for artifact
        var artifactRoll = Math.floor(Math.random() * artifactItems.length);
        console.log(artifactItems[artifactRoll]);
        itemsObtainedArray.push(artifactItems[artifactRoll])
        
        // roll for amulet
        var amuletRoll = Math.floor(Math.random() * amuletItems.length);
        console.log(amuletItems[amuletRoll]);
        itemsObtainedArray.push(amuletItems[amuletRoll])
        // greater amulet
        var greaterAmuletRoll = Math.floor(Math.random() * greaterAmuletItems.length);
        console.log(greaterAmuletItems[greaterAmuletRoll]);
        itemsObtainedArray.push(greaterAmuletItems[greaterAmuletRoll])

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
    }else if (userLeveledUpTo == 42 ){
        // give them 1 of 5 of the amulets
        var ancientItems = [];
        var artifactItems = []
        var greaterAmuletItems = []
        var amuletItems = [];
        var lesserAmuletItems = []

        for (var item in allItems){

            if(allItems[item].itemraritycategory == "ancient"){
                ancientItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "artifact+" && allItems[item].amuletsource == "levelup42"){
                artifactItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup35"){
                lesserAmuletItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup37"){
                amuletItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == "levelup42"){
                greaterAmuletItems.push(allItems[item]);
            }
        }
        var itemsObtainedArray = [];
        // roll for ancients
        var ancientRoll = Math.floor(Math.random() * ancientItems.length);
        console.log(ancientItems[ancientRoll]);
        var ancientToGet = ancientItems[ancientRoll]
        ancientToGet.itemAmount = 4
        itemsObtainedArray.push(ancientToGet)

        // roll for artifact
        var artifactRoll = Math.floor(Math.random() * artifactItems.length);
        console.log(artifactItems[artifactRoll]);
        itemsObtainedArray.push(artifactItems[artifactRoll])

        // roll for amulet
        var amuletRoll = Math.floor(Math.random() * amuletItems.length);
        console.log(amuletItems[amuletRoll]);
        itemsObtainedArray.push(amuletItems[amuletRoll])
        // greater amulet
        var greaterAmuletRoll = Math.floor(Math.random() * greaterAmuletItems.length);
        console.log(greaterAmuletItems[greaterAmuletRoll]);
        itemsObtainedArray.push(greaterAmuletItems[greaterAmuletRoll])

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
    }else if (userLeveledUpTo == 43 ){
        // give them 1 of 5 of the amulets
        var ancientItems = [];
        var artifactItems = []
        var greaterAmuletItems = []
        var amuletItems = [];
        var lesserAmuletItems = []

        for (var item in allItems){

            if(allItems[item].itemraritycategory == "ancient"){
                ancientItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "artifact+" && allItems[item].amuletsource == "levelup43"){
                artifactItems.push(allItems[item]);
            }
        }
        var itemsObtainedArray = [];
        // roll for ancients
        var ancientRoll = Math.floor(Math.random() * ancientItems.length);
        console.log(ancientItems[ancientRoll]);
        var ancientToGet = ancientItems[ancientRoll]
        ancientToGet.itemAmount = 8
        itemsObtainedArray.push(ancientToGet)

        // roll for artifact
        var artifactRoll = Math.floor(Math.random() * artifactItems.length);
        console.log(artifactItems[artifactRoll]);
        itemsObtainedArray.push(artifactItems[artifactRoll])

        // // roll for amulet
        // var amuletRoll = Math.floor(Math.random() * amuletItems.length);
        // console.log(amuletItems[amuletRoll]);
        // itemsObtainedArray.push(amuletItems[amuletRoll])
        // // greater amulet
        // var greaterAmuletRoll = Math.floor(Math.random() * greaterAmuletItems.length);
        // console.log(greaterAmuletItems[greaterAmuletRoll]);
        // itemsObtainedArray.push(greaterAmuletItems[greaterAmuletRoll])

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