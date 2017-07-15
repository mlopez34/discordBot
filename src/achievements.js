'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var achievementsData = {
    "Nice guy" : {
        emoji : ":boy::skin-tone-2:",
        description: "Thank 25 users"
    },
    "Fidel Cashflow": {
        emoji : ":chart_with_upwards_trend:",
        description: "Obtain 5 taco stands"
    },
    "Get a room": {
        emoji : ":kiss:",
        description: "Give 150 tacos to one person at once"
    },
    "Apologetic geek": {
        emoji : ": :shrug::skin-tone-2:",
        description: "Sorry 12 users"
    },
    "Adventure girl": {
        emoji : ":mag:",
        description: "Buy a pickaxe & Scavange 20 times"
    },
    "Hoarder": {
        emoji : ":moneybag:",
        description: "Obtain 300 tacos"
    },
    "Host": {
        emoji : ":guardsman:",
        description: "Welcome 5 users"
    },
    "Hand work": {
        emoji : ":cooking:",
        description: "Cook 7 tacos at one time"
    },
    "Stripper": {
        emoji : ":dancer::skin-tone-2:",
        description: "Get 100 tacos thrown at you"
    },
    "Make it rain": {
        emoji : ":man_in_tuxedo:",
        description: "Throw 100 tacos at other people"
    },
    "Luck is on your side": {
        emoji : ":tickets:",
        description: "Scavange a rare quality item or better"
    },
    "Get a room": {
        emoji : ":kiss:",
        description: "Give 150 tacos to one person at once"
    }
}


module.exports.checkForAchievements = function(discordUserId, data, message){
    // check for achievements by calling get on user statistics, or checking data
    // check for all the possible achievements
    profileDB.checkStatistics(discordUserId, function(err, statistics){
        if (err){
            // cant find the user's statistics
        }
        else{
            console.log(statistics);
            // check for all possible achievments here (achievement logic goes here)

            // statistics table achievements
            if(statistics.data.thankcount && 
               statistics.data.thankcount >= 25 && 
               data.achievements.indexOf("Nice guy") == -1){

                profileDB.updateAchievements(discordUserId, "{Nice guy}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Nice guy");
                    }
                })
            }

            if(statistics.data.sorrycount && 
               statistics.data.sorrycount >= 12 && 
               data.achievements.indexOf("Apologetic geek") == -1){

                profileDB.updateAchievements(discordUserId, "{Apologetic geek}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Apologetic geek");
                    }
                })
            }

            if(statistics.data.welcomecount && 
               statistics.data.welcomecount >= 5 && 
               data.achievements.indexOf("Host") == -1){

                profileDB.updateAchievements(discordUserId, "{Host}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Host");
                    }
                })
            }

            if(statistics.data.scavengecount && 
               statistics.data.scavengecount >= 20 && 
               data.achievements.indexOf("Adventure girl") == -1){

                profileDB.updateAchievements(discordUserId, "{Adventure girl}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Adventure girl");
                    }
                })
            }

            if(statistics.data.thrownatcount && 
               statistics.data.thrownatcount >= 100 && 
               data.achievements.indexOf("Stripper") == -1){

                profileDB.updateAchievements(discordUserId, "{Stripper}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Stripper");
                    }
                })
            }

            if(statistics.data.throwntocount && 
               statistics.data.throwntocount >= 100 && 
               data.achievements.indexOf("Make it rain") == -1){

                profileDB.updateAchievements(discordUserId, "{Make it rain}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Make it rain");
                    }
                })
            }
            // data achievements
            if(data.givecount && 
               data.givecount >= 150 && 
               data.achievements.indexOf("Get a room") == -1){

                profileDB.updateAchievements(discordUserId, "{Get a room}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Get a room");
                    }
                })
            }
            console.log("here")
            
            if(data.tacostands && 
               data.tacostands >= 5 &&
               data.achievements.indexOf("Fidel Cashflow") == -1 ){
                console.log("here2");
                profileDB.updateAchievements(discordUserId, "{Fidel Cashflow}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Fidel Cashflow");
                    }
                })
            }

            if(data.tacos && 
               data.tacos >= 500 && 
               data.achievements.indexOf("Hoarder") == -1){

                profileDB.updateAchievements(discordUserId, "{Hoarder}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Hoarder");
                    }
                })
            }

            if(data.cookcount && 
               data.cookcount >= 7 && 
               data.achievements.indexOf("Hand work") == -1){

                profileDB.updateAchievements(discordUserId, "{Hand work}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Hand work");
                    }
                })
            }

            if(data.rarity && 
               data.rarity == "Rare" && 
               data.achievements.indexOf("Luck is on your side") == -1){

                profileDB.updateAchievements(discordUserId, "{Luck is on your side}", function(err, r){
                    if (err){
                        console.log(err);
                    }
                    {
                        achievementEmbedBuilder(message, "Luck is on your side");
                    }
                })
            }
        }
    })
}

function achievementEmbedBuilder(message, achievementName){
    const embed = new Discord.RichEmbed()
    .setTitle(message.author.username + " has earned the achievement " + achievementName + " " + achievementsData[achievementName].emoji)
    .setColor(0x00AE86)
    .setThumbnail(message.author.avatarURL)
    message.channel.send({embed});
}

module.exports.achievementStringBuilder = function(achievements){
    var achievementString = "";
    for (var ach in achievements){
        // append each achievmenet string
        if (achievementsData[achievements[ach]]){
            achievementString = achievementString + (achievementsData[achievements[ach]].emoji) + " " + achievements[ach] + " - " + achievementsData[achievements[ach]].description +  " \n"
        }
    }
    if (achievementString.length == 0){
        return "No achievements"
    }
    else{
        return achievementString;
    }
}