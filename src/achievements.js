'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var achievementsData = {
    // NEW
    /// check harvestcount pass harvest count param
    "Farmer": {
        emoji : ":man_farmer:",
        score: 10,
        description: "Purchase a Greenhouse and harvest 20 times"
    },
    /// when reaching rep pass rep reached as data param
    "Loyalty Before Royalty": {
        emoji : ":place_of_worship:",
        score: 10,
        description: "Reach Worshipped reputation with Bender"
    },
    // rpg end pass challenge and keystone as data param
    "Keystone 10": {
        emoji : ":key:",
        score: 10,
        description: "Defeat keystone 10 of an rpg challenge"
    },
    // baking wedding cake pass bake as data param
    "Wedding Season": {
        emoji : ":bride_with_veil:",
        score: 10,
        description: "Bake a wedding cake"
    },
    // upgrade building pass building and level as data param
    "Carpenter": {
        emoji : ":construction_worker:",
        score: 10,
        description: "Upgrade your stable to level 10"
    },
    // upgrade building pass building and level as data param
    "Blue Collar": {
        emoji : ":woman_factory_worker:",
        score: 10,
        description: "Upgrade your greenhouse to level 10"
    },
    // upgrade building pass building and level as data param
    "Worshiper": {
        emoji : ":hindu_temple:",
        score: 10,
        description: "Upgrade your temple to level 10"
    },
    // when fruits end pass fruitcount as data param
    "Fruitcake": {
        emoji : ":grapes:",
        score: 10,
        description: "Win 1000 Fruits games"
    },
    // s1topvotes = true
    "S1 Top Votes": {
        emoji : ":ballot_box:",
        score: 10,
        description: "Become the highest voter for Bender Bot in season 1"
    },
    // s1top1rpg = true
    "S1 Top 1% RPG" : {
        emoji : ":military_medal:",
        score: 10,
        description: "Achieve the top 1% rpg points during bender season 1"
    },
    // s1top1xp = true
    "S1 Top 1% XP" : {
        emoji : ":medal:",
        score: 10,
        description: "Achieve the top 1% experience points during bender season 1"
    },
    // change this to be a zone
    // "Zone1": {
    //     emoji : ":boy::skin-tone-2:",
    //     score: 10,
    //     description: "Complete Zone 1 of RPG"
    // },
    // when crafting from temple pass crafted item as data param, check item.itemlevelrequirement
    "The Blacksmith": {
        emoji : ":hammer:",
        score: 10,
        description: "Craft a level 40 requirement item"
    },
    // "Beluga Whale": {
    //     emoji : ":boy::skin-tone-2:",
    //     score: 10,
    //     description: "Catch a beluga whale while fishing"
    // },
    
    ///
    "Legacy Top 1% RPG" : {
        emoji : ":first_place:",
        score: 10,
        description: "Achieve the top 1% rpg points during legacy bender season"
    },
    "Legacy Top 1% XP" : {
        emoji : ":first_place:",
        score: 10,
        description: "Achieve the top 1% experience points during legacy bender season"
    },
    "Legacy Top 1% Challenge" : {
        emoji : ":first_place:",
        score: 10,
        description: "Achieve the top 1% rpg challenge standings during legacy bender season"
    },
    "Legacy Top Taco Stands" : {
        emoji : ":first_place:",
        score: 10,
        description: "Obtain the most taco stands during legacy bender season"
    },
    "Legacy Top 10% RPG" : {
        emoji : ":medal:",
        score: 10,
        description: "Achieve the top 10% rpg points during legacy bender season"
    },
    "Legacy Top 10% XP" : {
        emoji : ":medal:",
        score: 10,
        description: "Achieve the top 10% experience points during legacy bender season"
    },
    "Nice guy" : {
        emoji : ":boy::skin-tone-2:",
        score: 10,
        description: "Thank 25 users"
    },
    "Fidel cashflow": {
        emoji : ":chart_with_upwards_trend:",
        score: 15,
        description: "Obtain 15 taco stands"
    },
    "Get a room": {
        emoji : ":kiss:",
        score: 10,
        description: "Give 1500 tacos to one person at once"
    },
    "Apologetic geek": {
        emoji : ":shrug::skin-tone-2:",
        score: 10,
        description: "Sorry 12 users"
    },
    "Adventure girl": {
        emoji : ":mag:",
        score: 10,
        description: "Buy a pickaxe & scavenge 20 times"
    },
    "Hoarder": {
        emoji : ":moneybag:",
        score: 15,
        description: "Obtain 1,000,000 tacos"
    },
    "Host": {
        emoji : ":guardsman:",
        score: 10,
        description: "Welcome 5 users"
    },
    "Hand work": {
        emoji : ":cooking:",
        score: 10,
        description: "Cook 70 tacos at one time"
    },
    "Stripper": {
        emoji : ":dancer::skin-tone-2:",
        score: 10,
        description: "Get 350 tacos thrown at you"
    },
    "Make it rain": {
        emoji : ":man_in_tuxedo:",
        score: 10,
        description: "Throw 100 tacos at other people"
    },
    "Luck is on your side": {
        emoji : ":tickets:",
        score: 10,
        description: "Scavenge a ancient quality item or better"
    },
    "Harvester": {
        emoji: ":tractor:",
        score: 10,
        description: "Get 300 extra tacos from soiled crops after preparing"
    },
    "Miss Popularity": {
        emoji: ":champagne: ",
        score: 15,
        description: "Get 50 or more people to attend your party"
    },
    "Executioner" : {
        emoji : ":skull_crossbones:",
        score: 15,
        description : "Throw 2000 rocks at other users"
    },
    "The Exalted" : {
        emoji: ":crown:",
        score: 20,
        description: "Become Sanctified by Bender"
    },
    "Devoted" : {
        emoji: ":scales:",
        score: 15,
        description : "Reach level 30"
    },
    "The Machine" : {
        emoji: ":snowboarder:",
        score: 15,
        description : "Reach level 40"
    },
    "Archeologist" : {
        emoji: ":rosette:",
        score: 15,
        description : "Successfully combine a set of artifact items"
    },
    "Sloppy Eigths" : {
        emoji: ":gift_heart:",
        score: 15,
        description : "Defeat the seven evil exes and obtain a 24 Carat Ring"
    },
    "Exorcist" : {
        emoji: ":prayer_beads:",
        score: 15,
        description : "Defeat Andromalius and obtain a Demonic Bow of Andromalius"
    },
    "Vampire Slayer" : {
        emoji: ":nut_and_bolt:",
        score: 15,
        description : "Defeat The Archvampire and obtain Abraham Lincoln's Vampire Slaying Pike"
    },
    "Closing Your Loop" : {
        emoji: ":hourglass_flowing_sand:",
        score: 15,
        description : "Defeat The Corrupted Overmind and obtain a Time Machine"
    },
    "Gambler" : {
        emoji: ":game_die:",
        score: 15,
        description : "Slot 50,000 tacos and win"
    },
    "Rolechecker" : {
        emoji: ":scroll:",
        score: 15,
        description : "Win the TOS August 2017 Tournament"
    },
    "Confirmed Not Hitler" : {
        emoji: ":white_check_mark:",
        score: 15,
        description : "Win the SH August 2017 Tournament"
    }
    
}


module.exports.checkForAchievements = function(discordUserId, data, message, calledByError, mentionedUser){
    // check for achievements by calling get on user statistics, or checking data
    // check for all the possible achievements
    if (!calledByError){
        // TODO: get the user statistics ALONG with their profile
        // TABLE JOIN
        profileDB.checkStatistics(discordUserId, function(err, statistics){
            if (err){
                // cant find the user's statistics create the user's statistics and check for achievements
                profileDB.createUserStatistics(discordUserId, null, null, function(createError, statsSuccess){
                    if(createError){
                        console.log(createError);
                    }else{
                        exports.checkForAchievements(discordUserId, data, message, true, mentionedUser);
                    }
                })
            }else{
                var achievementEarner = message.author;
                // check for all possible achievments here (achievement logic goes here)
                // console.log(data.achievements);
                if(statistics.data.harvestcount && 
                statistics.data.harvestcount >= 30 && 
                (data.achievements === null || data.achievements.indexOf("Farmer") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Farmer}", function(err, r){
                        achievementEmbedBuilder(message, "Farmer", achievementEarner);
                    })
                }

                if(statistics.data.fruitswon && 
                    statistics.data.fruitswon >= 1000 && 
                    (data.achievements === null || data.achievements.indexOf("Fruitcake") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Fruitcake}", function(err, r){
                            achievementEmbedBuilder(message, "Fruitcake", achievementEarner);
                        })
                    }

                if(statistics.data.thankcount && 
                statistics.data.thankcount >= 25 && 
                (data.achievements === null || data.achievements.indexOf("Nice guy") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Nice guy}", function(err, r){
                        achievementEmbedBuilder(message, "Nice guy", achievementEarner);
                    })
                }

                if(statistics.data.sorrycount && 
                statistics.data.sorrycount >= 12 && 
                (data.achievements === null || data.achievements.indexOf("Apologetic geek") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Apologetic geek}", function(err, r){
                        achievementEmbedBuilder(message, "Apologetic geek", achievementEarner);
                    })
                }

                if(statistics.data.welcomecount && 
                statistics.data.welcomecount >= 5 && 
                (data.achievements === null || data.achievements.indexOf("Host") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Host}", function(err, r){
                        achievementEmbedBuilder(message, "Host", achievementEarner);
                    })
                }

                if(statistics.data.scavengecount && 
                statistics.data.scavengecount >= 20 && 
                (data.achievements === null || data.achievements.indexOf("Adventure girl") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Adventure girl}", function(err, r){
                        achievementEmbedBuilder(message, "Adventure girl", achievementEarner);
                    })
                }

                if(statistics.data.thrownatcount && 
                statistics.data.thrownatcount >= 350 && 
                (data.achievements === null || data.achievements.indexOf("Stripper") == -1)){
                    // the achievement earner is the MENTIONED USER
                    profileDB.updateAchievements(mentionedUser.id, "{Stripper}", function(err, r){
                        achievementEarner = mentionedUser
                        achievementEmbedBuilder(message, "Stripper", achievementEarner);
                    })
                }

                if(statistics.data.throwntocount && 
                statistics.data.throwntocount >= 100 && 
                (data.achievements === null || data.achievements.indexOf("Make it rain") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Make it rain}", function(err, r){
                        achievementEmbedBuilder(message, "Make it rain", achievementEarner);
                    })
                }

                if(statistics.data.rocksthrown && 
                statistics.data.rocksthrown >= 2000 && 
                (data.achievements === null || data.achievements.indexOf("Executioner") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Executioner}", function(err, r){
                        achievementEmbedBuilder(message, "Executioner", achievementEarner);
                    })
                }

                if(data.givecount && 
                data.givecount >= 1500 && 
                (data.achievements === null || data.achievements.indexOf("Get a room") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Get a room}", function(err, r){
                        achievementEmbedBuilder(message, "Get a room", achievementEarner);
                    })
                }
                
                if(data.tacostands && 
                data.tacostands >= 15 &&
                (data.achievements === null || data.achievements.indexOf("Fidel cashflow") == -1 )){
                    profileDB.updateAchievements(discordUserId, "{Fidel cashflow}", function(err, r){
                        achievementEmbedBuilder(message, "Fidel cashflow", achievementEarner);
                    })
                }

                if(data.tacos && 
                data.tacos >= 1000000 && 
                (data.achievements === null || data.achievements.indexOf("Hoarder") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Hoarder}", function(err, r){
                        achievementEmbedBuilder(message, "Hoarder", achievementEarner);
                    })
                }

                if(data.cookcount && 
                data.cookcount >= 70 && 
                (data.achievements === null || data.achievements.indexOf("Hand work") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Hand work}", function(err, r){
                        achievementEmbedBuilder(message, "Hand work", achievementEarner);
                    })
                }

                if(data.rarity && 
                (data.rarity == "ancient" || data.rarity == "artifact") && 
                (data.achievements === null || data.achievements.indexOf("Luck is on your side") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Luck is on your side}", function(err, r){
                        achievementEmbedBuilder(message, "Luck is on your side", achievementEarner);
                    })
                }
                if(data.attendees && 
                    (data.attendees >= 50) && 
                    (data.achievements === null || data.achievements.indexOf("Miss Popularity") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Miss Popularity}", function(err, r){
                            achievementEmbedBuilder(message, "Miss Popularity", achievementEarner);
                        })
                    }

                if(data.maxextratacos && 
                data.maxextratacos >= 300 && 
                (data.achievements === null || data.achievements.indexOf("Harvester") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Harvester}", function(err, r){
                        achievementEmbedBuilder(message, "Harvester", achievementEarner);
                    })
                }

                if(data.reputation && 
                data.reputation.toLowerCase() == "sanctified" && 
                (data.achievements === null || data.achievements.indexOf("The Exalted") == -1)){
                    profileDB.updateAchievements(discordUserId, "{The Exalted}", function(err, r){
                        achievementEmbedBuilder(message, "The Exalted", achievementEarner);
                    })
                }

                if(data.reputation && 
                data.reputation.toLowerCase() == "worshipped" && 
                (data.achievements === null || data.achievements.indexOf("Loyalty Before Royalty") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Loyalty Before Royalty}", function(err, r){
                        achievementEmbedBuilder(message, "Loyalty Before Royalty", achievementEarner);
                    })
                }

                if(data.levelObtained && 
                data.levelObtained >= 30 && 
                (data.achievements === null || data.achievements.indexOf("Devoted") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Devoted}", function(err, r){
                        achievementEmbedBuilder(message, "Devoted", achievementEarner);
                    })
                }

                if(data.keystoneNumDefeated && 
                data.keystoneNumDefeated >= 10 && 
                (data.achievements === null || data.achievements.indexOf("Keystone 10") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Keystone 10}", function(err, r){
                        achievementEmbedBuilder(message, "Keystone 10", achievementEarner);
                    })
                }

                if(data.craftItemLevel && 
                data.craftItemLevel >= 40 && 
                (data.achievements === null || data.achievements.indexOf("The Blacksmith") == -1)){
                    profileDB.updateAchievements(discordUserId, "{The Blacksmith}", function(err, r){
                        achievementEmbedBuilder(message, "The Blacksmith", achievementEarner);
                    })
                }

                if(data.baked && 
                data.baked == "Wedding Cake	" && 
                (data.achievements === null || data.achievements.indexOf("Wedding Season") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Wedding Season}", function(err, r){
                        achievementEmbedBuilder(message, "Wedding Season", achievementEarner);
                    })
                }

                if (data.buildingLevel >= 10){
                    if(data.building && 
                    data.building == "stable" && 
                    (data.achievements === null || data.achievements.indexOf("Carpenter") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Carpenter}", function(err, r){
                            achievementEmbedBuilder(message, "Carpenter", achievementEarner);
                        })
                    }
    
                    if(data.building && 
                    data.building == "greenhouse" && 
                    (data.achievements === null || data.achievements.indexOf("Blue Collar") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Blue Collar}", function(err, r){
                            achievementEmbedBuilder(message, "Blue Collar", achievementEarner);
                        })
                    }
    
                    if(data.building && 
                    data.building == "temple" && 
                    (data.achievements === null || data.achievements.indexOf("Worshiper") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Worshiper}", function(err, r){
                            achievementEmbedBuilder(message, "Worshiper", achievementEarner);
                        })
                    }
                }

                if(data.levelObtained && 
                data.levelObtained >= 40 && 
                (data.achievements === null || data.achievements.indexOf("The Machine") == -1)){
                    profileDB.updateAchievements(discordUserId, "{The Machine}", function(err, r){
                        achievementEmbedBuilder(message, "The Machine", achievementEarner);
                    })
                }

                if(data.itemraritycombined && 
                data.itemraritycombined == "artifact" && 
                (data.achievements === null || data.achievements.indexOf("Archeologist") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Archeologist}", function(err, r){
                        achievementEmbedBuilder(message, "Archeologist", achievementEarner);
                    })
                }

                if(data.rpgDefeated && 
                data.rpgDefeated == "evilExes" && 
                (data.achievements === null || data.achievements.indexOf("Sloppy Eigths") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Sloppy Eigths}", function(err, r){
                        achievementEmbedBuilder(message, "Sloppy Eigths", achievementEarner);
                    })
                }

                if(data.rpgDefeated && 
                    data.rpgDefeated == "andromalius" && 
                    (data.achievements === null || data.achievements.indexOf("Exorcist") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Exorcist}", function(err, r){
                            achievementEmbedBuilder(message, "Exorcist", achievementEarner);
                        })
                    }
                if(data.rpgDefeated && 
                    data.rpgDefeated == "vampireCouncil" && 
                    (data.achievements === null || data.achievements.indexOf("Vampire Slayer") == -1)){
                        profileDB.updateAchievements(discordUserId, "{Vampire Slayer}", function(err, r){
                            achievementEmbedBuilder(message, "Vampire Slayer", achievementEarner);
                        })
                    }
                if(data.rpgDefeated && 
                data.rpgDefeated == "corruptedOvermind" && 
                (data.achievements === null || data.achievements.indexOf("Closing Your Loop") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Closing Your Loop}", function(err, r){
                        achievementEmbedBuilder(message, "Closing Your Loop", achievementEarner);
                    })
                }

                if(data.slotsTacosBet && 
                data.slotsTacosBet >= 50000 && 
                (data.achievements === null || data.achievements.indexOf("Gambler") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Gambler}", function(err, r){
                        achievementEmbedBuilder(message, "Gambler", achievementEarner);
                    })
                }
                /// rewards for legacy
                if(data.legacytop1rpgpoints == true &&
                (data.achievements === null || data.achievements.indexOf("Legacy Top 1% RPG") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Legacy Top 1% RPG}", function(err, r){
                        achievementEmbedBuilder(message, "Legacy Top 1% RPG", achievementEarner);
                    })
                }
                if(data.legacytop1experience == true &&
                (data.achievements === null || data.achievements.indexOf("Legacy Top 1% XP") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Legacy Top 1% XP}", function(err, r){
                        achievementEmbedBuilder(message, "Legacy Top 1% XP", achievementEarner);
                    })
                }
                if(data.legacytop1challenge == true &&
                (data.achievements === null || data.achievements.indexOf("Legacy Top 1% Challenge") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Legacy Top 1% Challenge}", function(err, r){
                        achievementEmbedBuilder(message, "Legacy Top 1% Challenge", achievementEarner);
                    })
                }
                if(data.legacytop1tacostands == true &&
                (data.achievements === null || data.achievements.indexOf("Legacy Top Taco Stands") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Legacy Top Taco Stands}", function(err, r){
                        achievementEmbedBuilder(message, "Legacy Top Taco Stands", achievementEarner);
                    })
                }
                if(data.legacytop10rpgpoints == true &&
                (data.achievements === null || data.achievements.indexOf("Legacy Top 10% RPG") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Legacy Top 10% RPG}", function(err, r){
                        achievementEmbedBuilder(message, "Legacy Top 10% RPG", achievementEarner);
                    })
                }
                if(data.legacytop10experience == true &&
                (data.achievements === null || data.achievements.indexOf("Legacy Top 10% XP") == -1)){
                    profileDB.updateAchievements(discordUserId, "{Legacy Top 10% XP}", function(err, r){
                        achievementEmbedBuilder(message, "Legacy Top 10% XP", achievementEarner);
                    })
                }
                
                if(data.s1topvotes == true &&
                (data.achievements === null || data.achievements.indexOf("S1 Top Votes") == -1)){
                    profileDB.updateAchievements(discordUserId, "{S1 Top Votes}", function(err, r){
                        achievementEmbedBuilder(message, "S1 Top Votes", achievementEarner);
                    })
                }
                if(data.s1top1rpg == true &&
                (data.achievements === null || data.achievements.indexOf("S1 Top 1% RPG") == -1)){
                    profileDB.updateAchievements(discordUserId, "{S1 Top 1% RPG}", function(err, r){
                        achievementEmbedBuilder(message, "S1 Top 1% RPG", achievementEarner);
                    })
                }
                if(data.s1top1xp == true &&
                (data.achievements === null || data.achievements.indexOf("S1 Top 1% XP") == -1)){
                    profileDB.updateAchievements(discordUserId, "{S1 Top 1% XP}", function(err, r){
                        achievementEmbedBuilder(message, "S1 Top 1% XP", achievementEarner);
                    })
                }
            }
        })
    }
}

function achievementEmbedBuilder(message, achievementName, achievementEarner){
    const embed = new Discord.RichEmbed()
    .setTitle(achievementEarner.username + " has earned the achievement " + achievementName + " " + achievementsData[achievementName].emoji)
    .setColor(0x00AE86)
    .setDescription(achievementsData[achievementName].description)
    .setThumbnail(achievementEarner.avatarURL)
    message.channel.send({embed})
    .then(function(res){
        console.log(res)
    })
    .catch(function(err){
        console.log(err)
        message.channel.send("Unable to send embeds - Enable embeds in this channel to display future achievements earned!")
    })
}

module.exports.achievementStringBuilder = function(achievements, long){
    if (long){
        var achievementStrings = [];

        var achievementString = "";
        for (var ach in achievements){
            // append each achievmenet string
            if (achievementString.length > 900){
                achievementStrings.push(achievementString);
                achievementString = "";
                // removes duplicates
                //achievementString = achievementString + (achievementsData[achievements[ach]].emoji) + " **" + achievements[ach] + "** - " + achievementsData[achievements[ach]].description +  " \n"                
            }
            if (achievementsData[achievements[ach]]){
                achievementString = achievementString + (achievementsData[achievements[ach]].emoji) + " **" + achievements[ach] + "** - " + achievementsData[achievements[ach]].description +  " \n"
            }
        }
        if (achievementString.length > 0){
            achievementStrings.push(achievementString);
        }
        if (achievementString.length == 0 && achievementStrings.length == 0){
            achievementStrings.push("No achievements")
            return achievementStrings
        }
        else{
            return achievementStrings;
        }
    }
    else{
        var achievementString = "";
        for (var ach in achievements){
            // append each achievmenet string
            if (achievementsData[achievements[ach]]){
                achievementString = achievementString + (achievementsData[achievements[ach]].emoji) +  " "
            }
        }
        if (achievementString.length == 0){
            return "No achievements"
        }
        else{
            return achievementString;
        }
    }
}