'use strict'
// takes care of gaining reputation with bender
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
var config = require("./config.js")
var commands = require("./commands")

var REPUTATIONS = config.reputations;

module.exports.gainReputation = function (message, discordUserId, reputationNumber, cb){
    // check the user repstatus
    if (discordUserId && reputationNumber){
        // call to add reputation to user
        profileDB.getUserProfileData(discordUserId, function(getProfileErr, getProfileRes){
            if (getProfileErr){
                // console.log(getProfileErr);
            }
            else{
                var currentReputation = getProfileRes.data.reputation;
                profileDB.addUserReputation(discordUserId, reputationNumber, currentReputation, function(repError, repRes){
                    if (repError){
                        // console.log(repError)
                        cb(repError);
                    }
                    else{
                        // console.log(repRes);
                        reachedNewRepStatus(message, getProfileRes, discordUserId, reputationNumber, function(statusErr, statusRes){
                            if (statusErr){
                                cb(statusErr);
                            }
                            else{
                                // console.log(statusRes);
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
    else if(reputationNumber + reputationGained >= REPUTATIONS.sanctified.repToGet 
        && reputationStatus.toLowerCase() != "sanctified"){
        // reched sanctified
        updateReputationStatus(message, discordId, "Sanctified");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Sanctified" })
    }
    else if(reputationNumber + reputationGained >= REPUTATIONS.glorified.repToGet 
        && reputationStatus.toLowerCase() != "glorified"){
        // reched glorified
        updateReputationStatus(message, discordId, "Glorified");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Glorified" })
    }
    else if(reputationNumber + reputationGained >= REPUTATIONS.admired.repToGet 
        && reputationNumber + reputationGained < REPUTATIONS.glorified.repToGet
        && reputationStatus.toLowerCase() != "admired" ){
        // reached admired
        updateReputationStatus(message, discordId, "Admired");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Admired" })
    }
    else if (reputationNumber + reputationGained >= REPUTATIONS.respected.repToGet 
        && reputationNumber + reputationGained < REPUTATIONS.admired.repToGet
        && reputationStatus.toLowerCase() != "respected"){
        // reached respected
        updateReputationStatus(message, discordId, "Respected");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Respected" })
    }
    else if (!reputationStatus){
        // console.log("no change");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: "Friendly"})
    }
    else{
        // nothing happened;
        // console.log("no change");
        cb(null, {repNumber: reputationNumber + reputationGained, repStatus: reputationStatus})
    }
}

function updateReputationStatus(message, discordId, repstatus){
    profileDB.updateUserReputation(discordId, repstatus, function(err, res){
        if (err){
            // console.log(err);
        }      
        else{
            // console.log(res);
            if (repstatus){
                updateUserRewards(message, discordId, repstatus, function(updateErr, updateRes){
                    if (updateErr){
                        // console.log(updateErr);
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

function obtainReputationItem(message, reputationSource){
    var allItems = commands.getAllItems()
    var greaterAmuletItems = []
    var artifactItems = []

    for (var item in allItems){
        if(allItems[item].itemraritycategory == "artifact+" && allItems[item].fromreputation == reputationSource){
            artifactItems.push(allItems[item]);
        }
        if(allItems[item].itemraritycategory == "amulet" && allItems[item].amuletsource == reputationSource){
            greaterAmuletItems.push(allItems[item]);
        }
    }

    var itemsObtainedArray = [];
    if (greaterAmuletItems.length > 0){
        var amuletRoll = Math.floor(Math.random() * greaterAmuletItems.length);
        console.log(greaterAmuletItems[amuletRoll]);
        itemsObtainedArray.push(greaterAmuletItems[amuletRoll])    
    }
    if (artifactItems.length){
        var artifactRoll = Math.floor(Math.random() * artifactItems.length);
        console.log(artifactItems[artifactRoll]);
        itemsObtainedArray.push(artifactItems[artifactRoll])    
    }

    if (itemsObtainedArray.length > 0){
        addToUserInventory(message.author.id, itemsObtainedArray);
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
    embed.addField("Reputation Rewards", rewardString, true)
    .setThumbnail(message.author.avatarURL)
    message.channel.send({embed});
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

// list of rewards to give the user
function updateUserRewards(message, discordId, repstatus, cb){
    switch(repstatus.toLowerCase()){
        case "liked":
            cb(null, "none");
            break;
        case "respected":
            // able to upgrade past level 3 on all buildings + able to improve artifacts
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
            
        case "admired":
            // able to upgrade past level 6 on all buildings + able to improve artifacts
            // give user sprinting shoes on their profile
            profileDB.obtainSprintingShoes(discordId, function(error, res){
                if (error){
                    console.log(error);
                }
                else{
                    cb(null, "sprinting shoes");
                }
            })
            break;
        case "glorified":
            // able to upgrade past level 9 on all buildings + able to improve artifacts
            // special greater amulet             
            obtainReputationItem(message, "reputationglorified")
            // something for thanks be able to critically earn from thanking - 10% chance to get 50% more tacos from thanks
            // chance to reset scavenge cooldown
            profileDB.obtainHolyCandle(discordId, function(error, res){
                if (error){
                    console.log(error);
                }
                else{
                    cb(null, "holy candle");
                }
            })
            break;
        case "sanctified":
            // able to upgrade past level 12 on all buildings + able to master ancients
            obtainReputationItem(message, "reputationsanctified")
            profileDB.obtainLaboratoryAccessCard(discordId, function(error, res){
                if (error){
                    console.log(error)
                }else{
                    cb(null, "lavoratory access card");
                }
            })
            break; 
        case "worshipped":
        // 125k rep - be able to refine artifacts
            obtainReputationItem(message, "reputationworshipped")
            profileDB.obtainPandorasBox(discordId, function(error, res){
                if (error){
                    console.log(error)
                }else{
                    cb(null, "pandoras box");
                }
            })
            break;
            
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
    else if(repstatus.toLowerCase() == "sanctified"){
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
    if (rewards === "sprinting shoes"){
        embed.addField( "Rewards: " , ":athletic_shoe: Sprinting Shoes - reduce prepare cooldown by 1% based on your level", true)
    }
    if (rewards === "holy candle"){
        embed.addField( "Rewards: " , ":candle: Holy Candle - on thank 20% chance to reset scavenge cooldown, 10% chance to critically gain 50% of your tacos gained while thanking", true)
    }
    if (rewards === "lavoratory access card"){
        embed.addField( "Rewards: " , ":flower_playing_cards: Laboratory Card - present this card to Bender to be able to shop transformium from his shop", true)
    }
    if (rewards === "pandoras box"){
        embed.addField( "Rewards: " , ":crystal_ball: Pandora's Box - present this box to Bender to be able to shop ethereum from his shop", true)
    }
    message.channel.send({embed});
}