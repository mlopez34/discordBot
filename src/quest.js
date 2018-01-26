var rpg = require("./rpg.js")
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var dispatcher = null
var voiceChannel = null

/*
activeQuests holds { id: discordid of quest starter, username: username of quest starter }
activeQuests key is the message that was sent for the embed - quest-messageid

check to see if user is in a quest, if they are check off the quest step
check if the quest is completed at the end of checking off the quest step
if the user has completed the quest, then continue
delete the quest from map

*/
var activeMissions = {} // 'quest-discorduserid' - { missionName: 'ritual', status: 'in-progress' }
var activeQuests = {}; // 'quest-sentmessageid -  { id: discordid of quest starter, username: username of quest starter }'

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
        .addField("Perform the summoning ritual and expell the evil demons", questString, true)
        .setDescription(":sparkles: :sparkles: :sparkles:")
        .addField("New command granted", "-ritual [@user] [@user] [@user] [@user]")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
    else if(questName == "ring"){
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has begun an artifact quest.")
        .addField("Propose your love", questString, true)
        .setDescription(":sparkles: :sparkles: :sparkles:")
        .addField("New command granted", "-propose [@user]")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
    else if(questName == "tomb"){
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has begun an artifact quest.")
        .addField("Enter the tomb of abraham lincoln and discover a horrifying secrets", questString, true)
        .setDescription(":sparkles: :sparkles: :sparkles:")
        .addField("New command granted", "-entertomb [number (positive or negative)] [@user] [@user] [@user] [@user]")
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
}

module.exports.questStringBuilder = function(questname, questData){
    if (questname == "timetravel"){
        if (questData.stage == "start"){
            return "Travel with 4 other companions back in time and save the Jin Dynasty";
        }
        else if (questData.stage == 1){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", the time machine you have assembled has triangluated the exact position of the planet in spacetime at the year 1215, and has begun to break down your body onto its individual subatomic particles..."
            }else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", the time machine you have assembled has triangluated the exact position of the planet in spacetime at the year 1215, and has begun to break down your body onto its individual subatomic particles... \n:fireworks: :eight_pointed_black_star: .... Your team has now arrived at the year 1215..."
            }else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", the time machine you have assembled has triangluated the exact position of the planet in spacetime at the year 1215, and has begun to break down your body onto its individual subatomic particles... \n:fireworks: :eight_pointed_black_star: .... Your team has now arrived at the year 1215... \nA tower scout yells of an incoming enemy from the mountains... Your team quickly gathers supplies for an incoming invasion..."        
            }
        }
        else if (questData.stage == 2){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", the battle ensues.. both sides suffer many casualties..."
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", the battle ensues.. both sides suffer many casualties... Because of " + questData.message.author.username + " and his team, the capital is not ransacked..."                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", the battle ensues.. both sides suffer many casualties... Because of " + questData.message.author.username + " and his team, the capital is not ransacked... only Genghis Khan and his top generals remain."                
            }
        }
        else if (questData.stage == 3){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", Your party prepares to be sent back in time millions of years ago..."
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", Your party prepares to be sent back in time millions of years ago... exact position of the asteroid that is about to hit the planet has been aquired... your party prepares to be sent back in time millions of years ago...\n Your party has now arrived..\n There is no sign of life near your party, as you look up you notice a planet that resembles your home.. "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", Your party prepares to be sent back in time millions of years ago... exact position of the asteroid that is about to hit the planet has been aquired... your party prepares to be sent back in time millions of years ago...\n Your party has now arrived..\n There is no sign of life near your party, as you look up you notice a planet that resembles your home...\nYour party has arrived and is standing on the asteroid.  "                
            }
        }
        else if (questData.stage == 4){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", 2 Enormous Creatures emerge..."
            }
        }
        else if (questData.stage == 5){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", Your party prepares to arrive to the stranded island where the humans are being held"
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", Nobody is seen in sight, the silence is too suspicious.. "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", Your party sees an enormous wall over the horizon, you slowly walk in its direction, the sky slowly begins to turn black"                
            }
        }
        else if (questData.stage == 6){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", Your party climbs the wall, You are greeted by a human whom whispers in your ear the words 'help us', moments later you are swarmed by robots"
            }
        }
        else if (questData.stage == 7){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", Your party prepares itself to travel forward in time"
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", Your party arrives atht the year 325,000,000 and in a remote planet very close to the center of the galaxy "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", A strong presence is felt..."                
            }
        }
        else if (questData.stage == 8){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", The corrupted overmind emerges from above"
            }
        }
        else{
            return "not a valid stage";
        }
    }
    if (questname == "tomb"){
        // enter tomb
        if (questData.stage == "start"){
            return "Travel with 4 other companions into the tomb of Abraham Lincoln";
        }
        else if (questData.stage == 1){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", After obtaining the map, compass, and the secret chamber key you enter the tomb"
            }else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", "
            }else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "        
            }
        }
        // Hounds battle
        else if (questData.stage == 2){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ","                
            }
        }
        else if (questData.stage == 3){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ",   "                
            }
        }
        // vampire swarm
        else if (questData.stage == 4){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
        // 
        else if (questData.stage == 5){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "                
            }
        }
        // gatekeeper battle
        else if (questData.stage == 6){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
        // use the secret chamber key and enter the secret chamber
        else if (questData.stage == 7){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "                
            }
        }
        // archvampire battle
        else if (questData.stage == 8){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }else{
            return "not a valid stage";
        }
    }
    if (questname == "demonic"){
        // 
        if (questData.stage == "start"){
            return "Perform the demonic ritual with 4 other companions";
        }
        else if (questData.stage == 1){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", After obtaining the map, compass, and the secret chamber key you enter the tomb"
            }else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", "
            }else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "        
            }
        }
        // defeat the ghost of andromalius
        else if (questData.stage == 2){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ","                
            }
        }
        // create ritual
        else if (questData.stage == 3){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ",   "                
            }
        }
        // defeat the evil witches that have come to stop the ritual
        else if (questData.stage == 4){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
        // 
        else if (questData.stage == 5){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "                
            }
        }
        // son of andromalius battle
        else if (questData.stage == 6){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
        // 
        else if (questData.stage == 7){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "                
            }
        }
        // andromalius battle
        else if (questData.stage == 8){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }else{
            return "not a valid stage";
        }
    }
    if (questname == "ring"){
        // propose
        if ( questData.stage == "start"){
            return "Profess your love to your soulmate";
        }
        else if (questData.stage == 1){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", After obtaining the map, compass, and the secret chamber key you enter the tomb"
            }else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ", "
            }else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "        
            }
        }
        // defeat the first evil ex
        else if (questData.stage == 2){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ","                
            }
        }
        // defeat the second evil ex
        else if (questData.stage == 3){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ",   "                
            }
        }
        // defeat the third evil ex
        else if (questData.stage == 4){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
        // defeat the fourth evil ex
        else if (questData.stage == 5){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
            else if (questData && questData.storyStep == 2){
                return questData.message.author.username + ",  "                
            }
            else if (questData && questData.storyStep == 3){
                return questData.message.author.username + ", "                
            }
        }else{
            return "Profess your love to your soulmate";
        }
    }
    else{
        return "Check error - quest stage not set correctly";
    }
    
}

module.exports.questHandler = function(message, discordUserId, questline, stageInQuest, team, dataUsedInQuest, channel){
    // this will create the specific embed for the stage the user is in parameters should include (questline, stage, user)
    if (questline == "testQuest"){
        // handle stage
        handleDemonicArtifact(stageInQuest, discordUserId);
    }
    else if (questline == "timetravel"){
        // handle timetravel
        var year = dataUsedInQuest.year;
        handleTimeMachineArtifact(message, discordUserId, stageInQuest, team, year, channel)
    }
    else if (questline == "tomb"){
        // handle abraham lincoln
        handleTombArtifact(message, discordUserId, stageInQuest, team, channel)
    }
    else if (questline == "demonic"){
        // handle demonic
        handleDemonicArtifact(message, discordUserId, stageInQuest, team, channel)
    }
    else if (questline == "ring"){
        // handle evilexes
        handleRingArtifact(message, discordUserId, stageInQuest, team, channel)
    }
}

function handleTimeMachineArtifact(message, discordUserId, stage, team, year, channel){
    /*
    timetravel
    -stage 1 = (embed)get supplies
    -stage 2 = * (rpg)defeat genghis khan
    -stage 3 = (embed)arrive at the meteor (collect supplies)
    -stage 4 = * (rpg)defeat the rock golems
    -stage 5 = * (rpg)defeat the robots and save humans
    -stage 6 = * (rpg)defeat the corrupted overmind
    */

    if (stage == 1){
        handleTimeMachineArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 2){
        handleTimeMachineArtifactStageTwo(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 3){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleTimeMachineArtifactStageThree(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 4){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleTimeMachineArtifactStageFour(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 5){
        // travel to the year 3,189 and free the humans that are being held hostage in a remote island
        handleTimeMachineArtifactStageFive(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 6){
        // travel to the year 3,250,000 and defeat the corrupted overmind
        handleTimeMachineArtifactStageSix(message, discordUserId, stage, team, year, channel)
    }
}

function handleTombArtifact(message, discordUserId, stage, team, channel){
    /*
    abraham lincoln tomb
    -stage 1 = (embed)arrive at the tomb and gather supplies 
    -stage 2 = * (rpg)defeat the hounds 
    -stage 3 = * (rpg)defeat the vampires in the first chamber 
    -stage 4 = * (rpg)defeat the gatekeeper 
    -stage 5 = (embed) pull the lever - all users must react to all 5 reactions within 1 second to pull down the lever
    -stage 6 = * (rpg) defeat the vampire council holding abraham lincoln's soul shackled
    */
    if (stage == 1){
        // embed shows supplies that users can gather (item pickup)
        handleTombArtifactStageOne(message, discordUserId, stage, team, channel)
    }
    else if (stage == 2){
        // create special encounter with hounds
        handleTombArtifactStageTwo(message, discordUserId, stage, team, channel)
    }
    else if (stage == 3){
        // defeat the vampires in the first chamber
        handleTombArtifactStageThree(message, discordUserId, stage, team, channel)
    }
    else if (stage == 4){
        // defeat the gatekeeper
        handleTombArtifactStageFour(message, discordUserId, stage, team, channel)
    }
    else if (stage == 5){
        // pull the lever
        handleTombArtifactStageFive(message, discordUserId, stage, team, channel)
    }
    else if (stage == 6){
        // defeat the archvampires
        handleTombArtifactStageSix(message, discordUserId, stage, team, channel)
    }
}

function handleDemonicArtifact(message, discordUserId, stage, team, channel){
    /*
    demonic scroll :
    -stage 1 = * (mission) all members stand in a star formation (react on spots)
    -stage 2 = (embed)react to say the summoning ritual in order
    -stage 3 = * (mission)sacrifice a server member by throwing tacos to each other in the formation to create a star (start at top)
    -stage 4 = * (rpg)defeat a legion of demons that have spawned from the summoning (5 members)
    -stage 5 = * (rpg)defeat the demon lord andromalius that has spawned from the summoning (5 members)
    (upon finishing stage 5 reward leader with bow of andromalius, consume the artifacts, 10 reactions each member gets to pick from 1) 
    */
    if (stage == 1){
        // all members stand in a star formation (react on spots)
        handleDemonicArtifactStageOne(message, discordUserId, stage, team, channel)
    }
    else if (stage == 2){
        // react to say the summoning ritual in order
        handleDemonicArtifactStageTwo(message, discordUserId, stage, team, channel)
    }
    else if (stage == 3){
        // sacrifice a server member by throwing tacos to each other in the formation to create a star (start at top)
        handleDemonicArtifactStageThree(message, discordUserId, stage, team, channel)
    }
    else if (stage == 4){
        // defeat a legion of demons that have spawned from the summoning (5 members)
        handleDemonicArtifactStageFour(message, discordUserId, stage, team, channel)
    }
    else if (Stage == 5){
        // defeat the demon lord andromalius that has spawned from the summoning (5 members)
        handleDemonicArtifactStageFive(message, discordUserId, stage, team, channel)
    }
}

function handleRingArtifact(message, discordUserId, stage, team, questData, channel){
    /*
    fight the evil exes
    ring:
    -stage 1 = * (mission)propose to a member
    -stage 2 = * (mission)give them 20000 tacos
    -stage 3 = * (mission)thank and sorry them
    -stage 4 = (embed)react to the embed with hearts
    -stage 5 = * (rpg)defeat the 7 evil exes
    */
    if (stage == 1){
        // propose to a member
        var proposedTo = questData.proposedTo;
        handleRingArtifactStageOne(message, discordUserId, stage, team, proposedTo, channel)
    }
    else if (stage == 2){
        // give member 20000 tacos
        var giveAmount = questData.giveAmount
        var giveTo = questData.giveTo
        handleRingArtifactStageTwo(message, discordUserId, stage, team, giveAmount, giveTo, channel)
    }
    else if (stage == 3){
        // sorry and thank the user
        var command = questData.command
        var commandTo = questData.commandTo
        handleRingArtifactStageThree(message, discordUserId, stage, team, command, commandTo, channel)
    }
    else if (stage == 4){
        // react to embed with hearts
        var marriedTo = questData.marriedTo
        handleRingArtifactStageFour(message, discordUserId, stage, team, marriedTo, channel)
    }
    else if (stage == 5){
        // rpg - defeat the 7 evil exes
        var marriedTo = questData.marriedTo
        handleRingArtifactStageFive(message, discordUserId, stage, team, channel)
    }
}
/*
** Time Machine Artifact Stages
*/

// embed
function handleTimeMachineArtifactStageOne(message, discordUserId, stage, team, year, channel){
    var questData = {
        questname: "timetravel",
        message: message,
        year: year,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("timetravel", questData);
    // travel to the year 1211 and defeat genghis khan before he invades
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🛀")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            sentMessage.react("💈")
            sentMessage.react("📮")
            sentMessage.react("🔗")
            sentMessage.react("🚽")
            sentMessage.react("🎨")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            var mapOfTeamMembers = {}
            for (var m in team){
                var teamUser = team[m]
                mapOfTeamMembers["quest-" + teamUser.id] = false
            }
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                            }
                        })
                    })
                }
            })

            collector.collected.forEach(function(reaction){
                console.log(reaction);
                reaction.users.forEach(function(collectorUser){
                    if (!collectorUser.bot){
                        var collectorUser = collectorUser.id;
                        mapOfTeamMembers["quest-" +collectorUser] = true;
                    }
                })
            })
            // check that all the members in mapOfTeamMembers have collected - if they have, call .stop
            var allMembersCollected = true;
            for (var key in mapOfTeamMembers){
                if (mapOfTeamMembers[key] == false){
                    allMembersCollected = false;
                    break
                }
            }
            if (allMembersCollected){
                supplies.stop("All members have collected")
            }
        })
        supplies.on('end', function(collected, reason){

            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;

                // only team members should be getting items
                reactionEmoji.users.forEach(function(user){
                    
                    for (var m in team){
                        var teamUser = team[m]
                        if (!user.bot && teamUser.id == user.id){
                            questFindRewards(message, user, reactionEmoji._emoji.name)
                        }
                    }
                })
            })
            // collected all supplies move the user to the next stage and call self on stage 2
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "timetravel", stage + 1, team, year, channel)
                }
            })
        })
    })
}
// rpg
function handleTimeMachineArtifactStageTwo(message, discordUserId, stage, team, year, channel){
    // send embed that Ghenghis Khan's forces have reached the capital, 
    var questData = {
        questname: "timetravel",
        message: message,
        year: year,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "genghis khan",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "A scroll was found on one of the general's bodies",
            note: "travel to the year 1250 BC to defeat the trojans",
            questline: "timetravelqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("timetravel", questData);
    // travel to the year 1211 and defeat genghis khan before he invades
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "genghisKhan")
        }, 250);
    })
}

function handleTimeMachineArtifactStageThree(message, discordUserId, stage, team, year, channel){
    // save dinosaurs from the asteroid in -65,000,000
    var questData = {
        questname: "timetravel",
        message: message,
        year: year,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("timetravel", questData);

    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 20000);

        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🛀")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            sentMessage.react("💈")
            sentMessage.react("📮")
            sentMessage.react("🔗")
            sentMessage.react("🚽")
            sentMessage.react("🎨")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            var mapOfTeamMembers = {}
            for (var m in team){
                var teamUser = team[m]
                mapOfTeamMembers["quest-" + teamUser.id] = false
            }
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                            }
                        })
                    })
                }
            })

            collector.collected.forEach(function(reaction){
                console.log(reaction);
                reaction.users.forEach(function(collectorUser){
                    if (!collectorUser.bot){
                        var collectorUser = collectorUser.id;
                        mapOfTeamMembers["quest-" +collectorUser] = true;
                    }
                })
            })
            // check that all the members in mapOfTeamMembers have collected - if they have, call .stop
            var allMembersCollected = true;
            for (var key in mapOfTeamMembers){
                if (mapOfTeamMembers[key] == false){
                    allMembersCollected = false;
                    break
                }
            }
            if (allMembersCollected){
                supplies.stop("All members have collected")
            }
        })
        supplies.on('end', function(collected, reason){

            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;

                // only team members should be getting items
                reactionEmoji.users.forEach(function(user){
                    
                    for (var m in team){
                        var teamUser = team[m]
                        if (!user.bot && teamUser.id == user.id){
                            questFindRewards(message, user, reactionEmoji._emoji.name)
                        }
                    }
                })
            })
            // collected all supplies move the user to the next stage and call self on stage 2
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "timetravel", stage + 1, team, year, channel)
                }
            })
        })
    })
}

function handleTimeMachineArtifactStageFour(message, discordUserId, stage, team, year, channel){
    // send embed that the asteroid is within , 
    var questData = {
        questname: "timetravel",
        message: message,
        year: year,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "asteroid",
        questData: questData,
        avatar: "https://i.imgur.com/xTXk6OR.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "Writting was found on a fragment of the asteroid",
            note: "travel to the year 3128 and save the humans from being imprisoned",
            questline: "timetravelqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("timetravel", questData);
    // asteroid RPG
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/xTXk6OR.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        
        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "asteroid")
        }, 5000);
    })
}

function handleTimeMachineArtifactStageFive(message, discordUserId, stage, team, year, channel){
    // save humans in the stranded island in year 3177
    var questData = {
        questname: "timetravel",
        message: message,
        year: year,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "island",
        questData: questData,
        avatar: "http://prntscr.com/i0sx83",
        reward: {
            type: "note" , // could be item
            fieldTitle: "You found carvings on the walls of the wooden cabin",
            note: "travel to the year 3,759,188 and defeat the corrupted overmind",
            questline: "timetravelqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("timetravel", questData);

    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("http://prntscr.com/i0sx83")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        // island RPG
        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "island")
        }, 5000);
    })
}

function handleTimeMachineArtifactStageSix(message, discordUserId, stage, team, year, channel){
    // defeat the corrupted overmind in the year 325, 000, 000
    var questData = {
        questname: "timetravel",
        message: message,
        year: year,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "corruptedOvermind",
        questData: questData,
        avatar: "http://prntscr.com/i0te3y",
        reward: {
            type: "note" , // could be item
            fieldTitle: "Corrupted Overmind Defeated",
            note: "you have defeated the corrupted overmind and slowly fade from current time",
            questline: "timetravelqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("timetravel", questData);

    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("http://prntscr.com/i0te3y")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        
        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "corruptedOvermind")
        }, 5000);
    })
}

/*
** Demonic Artifact Stages
*/

// embed
function handleDemonicArtifactStageOne(message, discordUserId, stage, team, channel){
    var questData = {
        questname: "demonic",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("demonic", questData);
    /*
     -stage 1 = * (mission) all members stand in a star formation (react on spots)
    */
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🛀")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            sentMessage.react("💈")
            sentMessage.react("📮")
            sentMessage.react("🔗")
            sentMessage.react("🚽")
            sentMessage.react("🎨")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            var mapOfTeamMembers = {}
            for (var m in team){
                var teamUser = team[m]
                mapOfTeamMembers["quest-" + teamUser.id] = false
            }
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }else{
                                    // TODO: check that the set of all reactions forms a star
                                    handleRitualStandingMission(mission)
                                }
                            }
                        })
                    })
                }
            })

            collector.collected.forEach(function(reaction){
                console.log(reaction);
                reaction.users.forEach(function(collectorUser){
                    if (!collectorUser.bot){
                        var collectorUser = collectorUser.id;
                        mapOfTeamMembers["quest-" +collectorUser] = true;
                    }
                })
            })
            // check that all the members in mapOfTeamMembers have collected - if they have, call .stop
            var allMembersCollected = true;
            for (var key in mapOfTeamMembers){
                if (mapOfTeamMembers[key] == false){
                    allMembersCollected = false;
                    break
                }
            }
            if (allMembersCollected){
                supplies.stop("All members have collected")
            }
        })
        supplies.on('end', function(collected, reason){

            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;

                // only team members should be getting items
                reactionEmoji.users.forEach(function(user){
                    
                    for (var m in team){
                        var teamUser = team[m]
                        if (!user.bot && teamUser.id == user.id){
                            questFindRewards(message, user, reactionEmoji._emoji.name)
                        }
                    }
                })
            })
            // 
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "demonic", stage + 1, team, channel)
                }
            })
        })
    })
}
// embed
function handleDemonicArtifactStageTwo(message, discordUserId, stage, team, channel){
    var questData = {
        questname: "demonic",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("demonic", questData);
    /*
    -stage 2 = (embed)react to say the summoning ritual in order
    */
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user each reaction is the spot on the clock - TODO: change the above to be 12, all are clock spots
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 360000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                                // TODO: check if everyone has gathered supplies if they have then do supplies.stop
                            }
                        })
                    })
                }
            })
        })
        supplies.on('end', function(collected, reason){
            // 
            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            var reactionCount = 0;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;
                if (reactionEmoji._emoji.name == "🌮"){
                    reactionEmoji.users.forEach(function(user){
                        if (!user.bot && ownerOfTable != user.id){
                            questFindRewards(message, user, "🌮", "taco")
                            reactionCount++;
                        }
                    })
                }
                else if (reactionEmoji._emoji.name == "🍹"){
                    reactionEmoji.users.forEach(function(user){
                        if (!user.bot && ownerOfTable != user.id){
                            questFindRewards(message, user, "🍹", "terrycloth")
                            reactionCount++;
                        }
                    })
                }
                else if (reactionEmoji._emoji.name == "💃🏼"){
                    reactionEmoji.users.forEach(function(user){
                        if (!user.bot && ownerOfTable != user.id){
                            questFindRewards(message, user, "💃🏼", "rock")
                            reactionCount++;
                        }
                    })
                }
            })
            // 
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "demonic", stage + 1, team, channel)
                }
            })
        })

    })
}
// embed
function handleDemonicArtifactStageThree(message, discordUserId, stage, team, channel){
    var questData = {
        questname: "demonic",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("demonic", questData);
    // Gather supplies, collect demonic supplies
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);

        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🛀")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            sentMessage.react("💈")
            sentMessage.react("📮")
            sentMessage.react("🔗")
            sentMessage.react("🚽")
            sentMessage.react("🎨")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            var mapOfTeamMembers = {}
            for (var m in team){
                var teamUser = team[m]
                mapOfTeamMembers["quest-" + teamUser.id] = false
            }
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                            }
                        })
                    })
                }
            })

            collector.collected.forEach(function(reaction){
                console.log(reaction);
                reaction.users.forEach(function(collectorUser){
                    if (!collectorUser.bot){
                        var collectorUser = collectorUser.id;
                        mapOfTeamMembers["quest-" +collectorUser] = true;
                    }
                })
            })
            // check that all the members in mapOfTeamMembers have collected - if they have, call .stop
            var allMembersCollected = true;
            for (var key in mapOfTeamMembers){
                if (mapOfTeamMembers[key] == false){
                    allMembersCollected = false;
                    break
                }
            }
            if (allMembersCollected){
                supplies.stop("All members have collected")
            }
        })
        supplies.on('end', function(collected, reason){

            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;

                // only team members should be getting items
                reactionEmoji.users.forEach(function(user){
                    
                    for (var m in team){
                        var teamUser = team[m]
                        if (!user.bot && teamUser.id == user.id){
                            questFindRewards(message, user, reactionEmoji._emoji.name)
                        }
                    }
                })
            })
            
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "demonic", stage + 1, team, channel)
                }
            })
        })
    })
}
// rpg
function handleDemonicArtifactStageFour(message, discordUserId, stage, team, channel){

    var questData = {
        questname: "demonic",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "legion",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "A scroll was found on one of the general's bodies",
            note: "travel to the year 1250 BC to defeat the trojans",
            questline: "demonicqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("demonic", questData);

    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "legion")
        }, 250);
    })
}
// rpg
function handleDemonicArtifactStageFive(message, discordUserId, stage, team, channel){
    // defeat andromalius
    var questData = {
        questname: "demonic",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "andromalius",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "Andromalius defeated",
            note: "You have defeated Andromalius, you've found the demonic bow of andromalius",
            questline: "demonicqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("demonic", questData);

    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("demonic", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "andromalius")
        }, 250);
    })
}

/*
** Ring Artifact Stages
*/

// embed
function handleRingArtifactStageOne(message, discordUserId, stage, team, proposedTo, channel){
    var questData = {
        questname: "ring",
        message: message,
        proposeTo: proposeTo,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("ring", questData);
    // 
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("ring", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

            // You have proposed to someone - TODO: create the mission
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage - ");
                }
            })
        }, 10000);

    })
}

function handleRingArtifactStageTwo(message, discordUserId, stage, team, giveAmount, giveTo, channel){
    // check that the user has been given 20000 tacos
    // get the mission that the user is in
    var mission = activeMissions["quest-" + discordUserId]
    if (!mission){
        message.channel.send("not in a mission, you must propose to someone")
    }else{
        var haveGivenEnoughTacos = handleTacoGiveMission(giveAmount, giveTo, mission)

        if (haveGivenEnoughTacos){
            var questData = {
                questname: "ring",
                message: message,
                giveAmount: giveAmount,
                stage: stage,
                storyStep: 1
            }
            var descriptionString = exports.questStringBuilder("ring", questData);
            // 
            const embed = new Discord.RichEmbed()
            .setDescription(descriptionString)
            .setThumbnail("https://i.imgur.com/5loQua9.png")
            .setColor(0xFF7A1C)
            message.channel.send({embed})
            .then(function (sentMessage) {
                activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
                var storytell = setTimeout (function(){
                    questData.storyStep = questData.storyStep + 1;            
                    var descriptionString = exports.questStringBuilder("ring", questData);
                    embed.setDescription(descriptionString)
                    sentMessage.edit({embed})
                }, 10000);
                
                profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                    if (error){
                        console.log(error);
                    }else{
                        // TODO: update the mission
                        if (activeQuests[idOfQuest]){
                            delete activeQuests[idOfQuest];
                        }
                        message.channel.send("next stage - commands to married person");
                    }
                })
            })
        }else{
            message.channel.send("you must give more tacos")
        }
    }
}

function handleRingArtifactStageThree(message, discordUserId, stage, team, command, commandTo, channel){
    // check the user has been thanked and sorried
    var mission = activeMissions["quest-" + discordUserId]
    if (!mission){
        message.channel.send("not in a mission, you must propose to someone")
    }else{
        // check that the commands for the mission have been completed
        var haveCompletedCommands = handleCommandToPlayerMission(command, mission, data)

        if (haveCompletedCommands){
            var questData = {
                questname: "ring",
                message: message,
                stage: stage,
                storyStep: 1
            }
            var descriptionString = exports.questStringBuilder("ring", questData);
            
            const embed = new Discord.RichEmbed()
            .setDescription(descriptionString)
            .setThumbnail("https://i.imgur.com/5loQua9.png")
            .setColor(0xFF7A1C)
            message.channel.send({embed})
            .then(function (sentMessage) {
                activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
                var storytell = setTimeout (function(){
                    questData.storyStep = questData.storyStep + 1;            
                    var descriptionString = exports.questStringBuilder("ring", questData);
                    embed.setDescription(descriptionString)
                    sentMessage.edit({embed})
                    profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                        if (error){
                            console.log(error);
                        }else{
                            //TODO: update the mission
                            if (activeQuests[idOfQuest]){
                                delete activeQuests[idOfQuest];
                            }
                            message.channel.send("next stage - wedding embed");
                        }
                    })
                }, 10000);
                
            })
        }else{
            message.channel.send("you must complete the commands required");
        }
    }
}

function handleRingArtifactStageFour(message, discordUserId, stage, team, marriedTo, channel){
    var questData = {
        questname: "ring",
        message: message,
        marriedTo: marriedTo,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("ring", questData);
    // its wedding day, react with emojis, wedding finishes when there is more than 15 guests
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("ring", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);

        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("ring", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🛀")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            sentMessage.react("💈")
            sentMessage.react("📮")
            sentMessage.react("🔗")
            sentMessage.react("🚽")
            sentMessage.react("🎨")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            var mapOfTeamMembers = {}
            for (var m in team){
                var teamUser = team[m]
                mapOfTeamMembers["quest-" + teamUser.id] = false
            }
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                            }
                        })
                    })
                }
            })

            collector.collected.forEach(function(reaction){
                console.log(reaction);
                reaction.users.forEach(function(collectorUser){
                    if (!collectorUser.bot){
                        var collectorUser = collectorUser.id;
                        mapOfTeamMembers["quest-" +collectorUser] = true;
                    }
                })
            })
            // check that all the members in mapOfTeamMembers have collected - if they have, call .stop
            var allMembersCollected = true;
            for (var key in mapOfTeamMembers){
                if (mapOfTeamMembers[key] == false){
                    allMembersCollected = false;
                    break
                }
            }
            if (allMembersCollected){
                supplies.stop("All members have collected")
            }
        })
        supplies.on('end', function(collected, reason){

            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;

                // only team members should be getting items
                reactionEmoji.users.forEach(function(user){
                    
                    for (var m in team){
                        var teamUser = team[m]
                        if (!user.bot && teamUser.id == user.id){
                            questFindRewards(message, user, reactionEmoji._emoji.name)
                        }
                    }
                })
            })
            
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "ring", stage + 1, team, year, channel)
                }
            })
        })
    })
}
// rpg
function handleRingArtifactStageFive(message, discordUserId, stage, team, channel){
    // TODO: this stage should be started via -wedding @user @user
    var questData = {
        questname: "ring",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "evilExes",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "You have defeated your soulmate's evil exes",
            note: "You and your soulmate are now linked by souls, taco gains from one are gained by the other",
            questline: "ringqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("ring", questData);
    // 
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("ring", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("ring", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "evilExes")
        }, 250);
    })
}

/*
** Lincoln Tomb Artifact Stages
*/

// embed
function handleTombArtifactStageOne(message, discordUserId, stage, team, channel){
    var questData = {
        questname: "tomb",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("tomb", questData);
    // gather supplies at the tomb entrance
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🛀")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            sentMessage.react("💈")
            sentMessage.react("📮")
            sentMessage.react("🔗")
            sentMessage.react("🚽")
            sentMessage.react("🎨")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            var mapOfTeamMembers = {}
            for (var m in team){
                var teamUser = team[m]
                mapOfTeamMembers["quest-" + teamUser.id] = false
            }
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                            }
                        })
                    })
                }
            })

            collector.collected.forEach(function(reaction){
                console.log(reaction);
                reaction.users.forEach(function(collectorUser){
                    if (!collectorUser.bot){
                        var collectorUser = collectorUser.id;
                        mapOfTeamMembers["quest-" +collectorUser] = true;
                    }
                })
            })
            // check that all the members in mapOfTeamMembers have collected - if they have, call .stop
            var allMembersCollected = true;
            for (var key in mapOfTeamMembers){
                if (mapOfTeamMembers[key] == false){
                    allMembersCollected = false;
                    break
                }
            }
            if (allMembersCollected){
                supplies.stop("All members have collected")
            }
        })
        supplies.on('end', function(collected, reason){

            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;

                // only team members should be getting items
                reactionEmoji.users.forEach(function(user){
                    
                    for (var m in team){
                        var teamUser = team[m]
                        if (!user.bot && teamUser.id == user.id){
                            questFindRewards(message, user, reactionEmoji._emoji.name)
                        }
                    }
                })
            })
            // collected all supplies move the user to the next stage and call self on stage 2
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "tomb", stage + 1, team, channel)
                }
            })
        })
    })
}
// rpg
function handleTombArtifactStageTwo(message, discordUserId, stage, team, channel){

    var questData = {
        questname: "tomb",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "hounds",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "The door behind you closes shut.",
            note: "Survive the vampire swarm",
            questline: "tombqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("tomb", questData);
    // defeat the hounds inside the first chamber of the tomb
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "hounds")
        }, 250);
    })
}
// rpg
function handleTombArtifactStageThree(message, discordUserId, stage, team, channel){

    var questData = {
        questname: "tomb",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "vampireSwarm",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "You have survived the swarm of vampires",
            note: "Find the secret chamber door marked on your map ",
            questline: "tombqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("tomb", questData);
    // survive the vampire swarm
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "vampireSwarm")
        }, 250);
    })
}
// rpg
function handleTombArtifactStageFour(message, discordUserId, stage, team, channel){
    // defeat the gatekeeper
    var questData = {
        questname: "tomb",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "gateKeeper",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "Enter the secret chamber",
            note: "Discover the secret inside Abraham Lincoln's secret chamber",
            questline: "tombqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("tomb", questData);
    // 
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){ 
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "gateKeeper")
        }, 250);
    })
}
// embed
function handleTombArtifactStageFive(message, discordUserId, stage, team, channel){
    var questData = {
        questname: "tomb",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var descriptionString = exports.questStringBuilder("tomb", questData);
    // click the lever at the same time
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function (sentMessage) {
        activeQuests["quest-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;            
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 10000);
        
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            .addField("Gather supplies", "You may pick up one supply from the list...  ")
            sentMessage.edit({embed})

            sentMessage.react("🏮")
            sentMessage.react("🍱")
            sentMessage.react("📦")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
        }, 20000);
        
        var supplies = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: 60000, max: 1000, maxEmojis: 100, maxUsers: 100 } );
        supplies.on('collect', function(element, collector){
            // remove the reaction if the user already reacted
            console.log(element)
            element.users.forEach(function(user){
                if (!user.bot){
                    var userId = user.id;
                    collector.collected.forEach(function(reaction){
                        console.log(reaction);
                        reaction.users.forEach(function(collectorUser){
                            if (!collectorUser.bot){
                                var collectorUser = collectorUser.id;
                                if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                    // remove the reaction by the user
                                    element.remove(userId)
                                }
                                // TODO: check if everyone has gathered supplies if they have then do supplies.stop
                            }
                        })
                    })
                }
            })
        })
        supplies.on('end', function(collected, reason){
            var leaderOfGroup;
            var leaderOfGroupUsername;
            var idOfQuest;
            var reactionCount = 0;
            collected.forEach(function(reactionEmoji){
                leaderOfGroup = activeQuests["quest-" + reactionEmoji.message.id].id; // discord id of leader
                leaderOfGroupUsername = activeQuests["quest-" + reactionEmoji.message.id].username;
                idOfQuest = "quest-" + reactionEmoji.message.id;
                if (reactionEmoji._emoji.name == "🌮"){
                    reactionEmoji.users.forEach(function(user){
                        if (!user.bot && ownerOfTable != user.id){
                            questFindRewards(message, user, "🌮", "taco")
                            reactionCount++;
                        }
                    })
                }
                else if (reactionEmoji._emoji.name == "🍹"){
                    reactionEmoji.users.forEach(function(user){
                        if (!user.bot && ownerOfTable != user.id){
                            questFindRewards(message, user, "🍹", "terrycloth")
                            reactionCount++;
                        }
                    })
                }
                else if (reactionEmoji._emoji.name == "💃🏼"){
                    reactionEmoji.users.forEach(function(user){
                        if (!user.bot && ownerOfTable != user.id){
                            questFindRewards(message, user, "💃🏼", "rock")
                            reactionCount++;
                        }
                    })
                }
            })
            // Lever has been pulled at the same time, continue on to the next stage
            profileDB.updateQuestlineStage(discordUserId, questData.questname, stage + 1, function(error, updateRes){
                if (error){
                    console.log(error);
                }else{
                    // call self with new stage
                    if (activeQuests[idOfQuest]){
                        delete activeQuests[idOfQuest];
                    }
                    message.channel.send("next stage");
                    exports.questHandler(message, discordUserId, "tomb", stage + 1, team, channel)
                }
            })
        })

    })
}
// rpg
function handleTombArtifactStageSix(message, discordUserId, stage, team, channel){
    // defeat the archvampire 
    var questData = {
        questname: "tomb",
        message: message,
        stage: stage,
        storyStep: 1
    }
    var special = {
        questName: "vampireCouncil",
        questData: questData,
        avatar: "https://i.imgur.com/5loQua9.png",
        reward: {
            type: "note" , // could be item
            fieldTitle: "You have defeated the vampire council",
            note: "You receive Abraham lincolns vampire slaying pike",
            questline: "tombqueststage",
            stageAdvance: stage + 1
        }
    }
    var descriptionString = exports.questStringBuilder("tomb", questData);
    // create rpg event for vampire council
    const embed = new Discord.RichEmbed()
    .setDescription(descriptionString)
    .setThumbnail("https://i.imgur.com/5loQua9.png")
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})
        }, 100);
        
        var storytell = setTimeout (function(){
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("tomb", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

        }, 200);

        var storytell = setTimeout (function(){
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "vampireCouncil")
        }, 250);
    })
}


function artifactStartString(questline, discordUser, mentionedUsers){
    // return the starting quest text
}

function questFindRewards(message, user, emoji){

    var giveRewardTo = user.id;
    var giveRewardToUsername = user.username
    console.log(user.id);

    profileDB.getItemData(function(error, allItemsResponse){
        for (var index in allItemsResponse.data){
            itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
        }
        for (var index in allItemsResponse.data){
            itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
        }

        var ANCIENT_MIN_ROLL = 9920;
        var RARE_MAX_ROLL = 9920;
        var RARE_MIN_ROLL = 9800;
        var UNCOMMON_MAX_ROLL = 9800;
        var UNCOMMON_MIN_ROLL = 8750;
        var COMMON_MAX_ROLL = 8750;
        var UNCOMMON_ITEMS_TO_OBTAIN = 2;
        var COMMON_ITEMS_TO_OBTAIN = 5;

        var allItems = getItemResponse.data
        var commonItems = [];
        var uncommonItems = [];
        var rareItems = [];
        var ancientItems = [];
        
        for (var item in allItems){
            if (allItems[item].itemraritycategory == "common"){
                commonItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "uncommon"){
                uncommonItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "rare"){
                rareItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "ancient"){
                ancientItems.push(allItems[item]);
            }
            else if(allItems[item].itemraritycategory == "amulet"){
                ancientItems.push(allItems[item]);
            }
        }
        
        var itemsObtainedArray = [];
        var rollsCount = 5

        for (var i = 0; i < rollsCount; i++){
            var rarityRoll = Math.floor(Math.random() * 10000) + 1;
            var rarityString = "";

            if(rarityRoll > ANCIENT_MIN_ROLL){
                var itemRoll = Math.floor(Math.random() * ancientItems.length);
                itemsObtainedArray.push(ancientItems[itemRoll])
            }
            else if(rarityRoll > RARE_MIN_ROLL && rarityRoll <= RARE_MAX_ROLL){
                var itemRoll = Math.floor(Math.random() * rareItems.length);
                itemsObtainedArray.push(rareItems[itemRoll]);
            }
            else if (rarityRoll > UNCOMMON_MIN_ROLL && rarityRoll <= UNCOMMON_MAX_ROLL){
                var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                uncommonItems[itemRoll].itemAmount = UNCOMMON_ITEMS_TO_OBTAIN
                itemsObtainedArray.push( uncommonItems[itemRoll] );
            }
            else {
                var itemRoll = Math.floor(Math.random() * commonItems.length);
                commonItems[itemRoll].itemAmount = COMMON_ITEMS_TO_OBTAIN
                itemsObtainedArray.push( commonItems[itemRoll] );
            }
        }

        // timetravel
        if (emoji == "📮" || emoji == "🏯" || emoji == "🏮" ){
            // push a special item?
            // roll for it
            var rarityRoll = Math.floor(Math.random() * 10) + 1;

            if(rarityRoll > 8){
                for (var index in allItems){
                    if (allItems[index].id == TRANSFORMIUM_ID){
                        itemsObtainedArray.push( allItems[index] );
                    }
                }
            }

        }
        // tomb
        else if (emoji == ""){
            var rarityRoll = Math.floor(Math.random() * 10) + 1;

            if(rarityRoll > 8){
                for (var index in allItems){
                    if (allItems[index].id == SILVER_CROSS_ID){
                        itemsObtainedArray.push( allItems[index] );
                    }
                }
            }
    
        }
        // demonic
        else if (emoji == ""){
            
        }
        //wedding
        else if (emoji == ""){
            
        }

        // TODO: print embed of all the items - change these outside of the for loop
        addToUserInventory(giveRewardTo, itemsObtainedArray);
        itemObtainEmbedBuilder(message, itemsObtainedArray, user);
    })
}

function itemObtainEmbedBuilder(message, itemsFound, user){
    // create a quoted message of all the items
    var itemsMessage = ""
    for (var item in itemsFound){
        var itemAmount = itemsFound[item].itemAmount ? itemsFound[item].itemAmount : 1;
        itemsMessage = itemsMessage + "**" +itemAmount + "**x " + "[**" + itemsFound[item].itemraritycategory +"**] " + "**"  + itemsFound[item].itemname + "** - " + itemsFound[item].itemdescription + ", " +
        itemsFound[item].itemslot + ", " + itemsFound[item].itemstatistics + " \n";
    }

    const embed = new Discord.RichEmbed()
    .addField("[" + user.username +"'s Items found] Items found: ", itemsMessage, true)
    .setColor(0xbfa5ff)
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

function playMusicForQuest(channel, questName){
    if (channel){
        voiceChannel = channel
        var ytLink = youtubeLinks[questName]
        if (ytLink){
            voiceChannel.join().then(function(connection){
                stream = ytdl(ytLink, {
                    filter: 'audioonly'
                });
                
                dispatcher = connection.playStream(stream);
                dispatcher.on('end', function() {
                    voiceChannel.leave();
                })
            })
        }
    }
}

var youtubeLinks = {
    genghisKhan: "https://www.youtube.com/watch?v=d2hRTLdvdnk",
    asteroid: "https://www.youtube.com/watch?v=d2hRTLdvdnk",
    island: "https://www.youtube.com/watch?v=d2hRTLdvdnk",
    corruptedOvermind: "https://www.youtube.com/watch?v=d2hRTLdvdnk",
    evilExes: "https://www.youtube.com/watch?v=d2hRTLdvdnk"
}

function checkMissionStatus(missionName, discordUserId, cb){
    if (missionName == "ritual"){
        // handle ritual
    }
}

function handleRitualStandingMission(mission){
    // users should be standing on 5 different places on a clock
    // 1 - 12, if they are standing on ie 12, 2, 5, 7, 10 then activate second step

    // SET OF VALID STAR FORMATIONS - already sorted
    var validRitualForm = [
        [2, 5, 7, 10, 12 ],
        [1, 3, 6, 8, 11 ],
        [2, 4, 7, 9, 12 ],
        [1, 3, 5, 8, 10 ],
        [2, 4, 6, 9, 11 ],
        [3, 5, 7, 10, 12 ],
        [1, 4, 6, 8, 11 ],
        [2, 5, 7, 9, 12],
        [1, 3, 6, 8, 10],
        [2, 4, 7, 9, 11],
        [3, 5, 8, 10, 12],
        [1, 4, 6, 9, 11]
    ]

    function sortNumber(a, b){
        return a - b;
    }

    var missionArr = [5, 2, 7, 12, 10]
    var missionArray = missionArr.sort(sortNumber);
    var missionComplete = true;
    var arrayOfSpots = [] // should be total of 5

    for (var i in missionArray){
        arrayOfSpots.push(missionArray[i]);
    }

    // check the differences between the 5 numbers
    if (arrayOfSpots.length != 5){
        return false;
    }else{
        // check against valid formations (finite)
        var matchedFormGroup = true;
        for (var formGroup in validRitualForm){
            var matchedFormGroup = true;
            var formToCheck = validRitualForm[formGroup]
            // compare each index
            for (var index in formToCheck){
                console.log(formToCheck[index])
                console.log(arrayOfSpots[index])
                if (formToCheck[index] != arrayOfSpots[index]){
                    matchedFormGroup = false;
                    break;
                }
            }
            if (matchedFormGroup){
                return missionComplete;
            }else{
                matchedFormGroup = false;
            }
        }
        if (!matchedFormGroup){
            missionComplete = matchedFormGroup
        }
        return missionComplete;
    }
    

    // TODO: create structure for clock
}

function handleRitualTacoThrowMission(groupArray, groupIds){
    // keep a list of throws

    // users should be throwing their tacos in a specific order
    // 12 throws to 5, 5 throws to 10, 10 throws to 2, 2 throws to 7, 7 throws to 10
    // 12 throws to 7, 7 throws to 2, 2 throws to 10, 10 throws to 5, 5 throws to 10

    var ritualSuccess = false;
    // valid throws based on groupArray ??

    if (!ritualSuccess){
        // reset the throw order to the person that just threw
    }

    return ritualSuccess

    //TODO: create structure that keeps track of possible throws and starting throw
}

function checkValidRitualThrow(thrower, receiver){
    // the thrower and receivers are indexes (1 - 12)

    // this function checks against a list of valid throws
    var validThrow = true;
    if (receiver != expectedRecei){
        
    }
}

function handleTacoGiveMission(giveAmount, giveTo, mission){
    // check that the user has given x tacos to y person
    if ( giveAmount >= mission.tacosToGive && giveTo == mission.proposedTo ){
        // TODO: check the target as well
        return true
    }else{
        if (giveTo == mission.proposedTo){
            mission.tacosToGive = mission.tacosToGive - giveAmount
        }
        return false;
    }
}

function handleCommandToPlayerMission(command, mission, data){
    // check that the user has done x command to y person
    
    // check for mission to have command and countToComplete, count
    // add +1 to count, if count < countToComplete, return false
    if (command == "thank"){
        // TODO: check if there is a target the command has to be done to
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
        
    }
    if (command == "sorry"){
        // TODO: check if there is a target the command has to be done to
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
    }
    if (command == "cook"){
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
    }
    if (command == "prepare"){
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
    }
    if (command == "fetch"){
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
    }
    if (command == "scavenge"){
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
    }
    if (command == "propose"){
        
        if (mission.commandTo && mission.commandTo == data.commandTo){
            mission.count++;
            if (mission.CountToCOmplete > mission.count){
                return false;
            }else{
                return true;
            }
        }else{

        }
    }
    
    // return true or false for complete
}

/*
var check = handleRitualStandingMission(true);
console.log(check);
*/