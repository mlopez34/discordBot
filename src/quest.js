var rpg = require("./rpg.js")
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

module.exports.questStageEmbedBuilder = function(message, discordUserId, questline, stageInQuest){
    // this will create the specific embed for the stage the user is in parameters should include (questline, stage, user)
    if (questline == "testQuest"){
        // handle stage
        handleDemonicArtifact(stageInQuest, discordUserId);
    }
    else if (questline == "timetravel"){
        // handle stage
    }
    // quest lines = 
    /*
    ring:
    -stage 1 = propose to a member
    -stage 2 = give them 200 tacos
    -stage 3 = thank and sorry them
    -stage 4 = react to the embed with hearts
    -stage 5 = defeat the 4 evil exes

    abraham lincoln tomb
    -stage 1 = arrive at the tomb and gather supplies
    -stage 2 = defeat the vampires in the first chamber
    -stage 3 = pull the lever - all users must react to all 5 reactions within 1 second to pull down the lever
    -stage 4 = defeat the vampire council holding abraham lincoln's soul shackled

    */
}

module.exports.questStringBuilder = function(questName){
    return "Travel with 4 other companions back in time and save the Jin Dynasty";
}

module.exports.questStartEmbedBuilder = function(message, questName, questString){

    if (questName == "timetravel"){
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has begun an artifact quest.")
        .addField("Save the Jin Dynasty from Genghis Khan", questString, true)
        .setDescription(":hourglass_flowing_sand:  :hourglass_flowing_sand:  :hourglass_flowing_sand:  \n" + message.author.username + " reads the cassete player's label.. the label says the following: Our messanger Minghan has betrayed us... because of this he besieged, captured, and sacked our Jin capital of Zhongdu, the empire has collapsed...")
        .addField("New command granted", "-timetravel [number (positive or negative)] [@user] [@user] [@user] [@user]")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
    else if(questName == "demonic"){
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has begun an artifact quest.")
        .addField("Stage 1 name", questString, true)
        .setDescription(":sparkles: :sparkles: :sparkles:")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
    else if(questName == "ring"){
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has begun an artifact quest.")
        .addField("Stage 1 name", questString, true)
        .setDescription(":sparkles: :sparkles: :sparkles:")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
    else if(questName == "tomb"){
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has begun an artifact quest.")
        .addField("Stage 1 name", questString, true)
        .setDescription(":sparkles: :sparkles: :sparkles:")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
}

function handleDemonicArtifact(stage, discordUserId){
    /*
    demonic scroll :
    -stage 1 = all members stand in a star formation (react on spots)
    -stage 2 = react to say the summoning ritual in order
    -stage 3 = sacrifice a server member by throwing tacos to each other in the formation to create a star (start at top)
    -stage 4 = defeat a legion of demons that have spawned from the summoning (5 members)
    -stage 5 = defeat the demon lord andromalius that has spawned from the summoning (5 members)
    (upon finishing stage 5 reward leader with bow of andromalius, consume the artifacts, 10 reactions each member gets to pick from 1) 
    */
    if (stage == 1){
        // all members stand in a star formation (react on spots)
    }
    else if (stage == 2){
        // react to say the summoning ritual in order
    }
    else if (stage == 3){
        // sacrifice a server member by throwing tacos to each other in the formation to create a star (start at top)
    }
    else if (stage == 4){
        // defeat a legion of demons that have spawned from the summoning (5 members)
    }
    else if (Stage == 5){
        // defeat the demon lord andromalius that has spawned from the summoning (5 members)
    }
}

function handleTimeMachineArtifact(stage, discordUserId){
    /*
    time travel with time machine = different years specify different embeds ?
    */
    if (stage == 2){
        // travel to the year 1211 and defeat genghis khan before he invades 
    }
    else if (stage == 3){
        // travel to the year -1200 and defeat the trojans
    }
    else if (stage == 4){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
    }
    else if (Stage == 5){
        // travel to the year 4,000,000 and defeat the overmind formed by civilization
        // after the milky way galaxy has been colonized
    }
    // travel to the year 3,189 and free the humans that are being held hostage in a remote island
}

function artifactStartString(questline, discordUser, mentionedUsers){
    // return the starting quest text
}