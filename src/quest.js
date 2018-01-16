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
        // TODO: set timeout on the text
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

module.exports.questStringBuilder = function(questname, questData){
    if (questname == "timetravel"){
        if (questData.stage == 1){
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
    }
    if (questname == "tomb"){
        // enter tomb
        if (questData.stage == 1){
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
        }
    }
    if (questname == "demonic"){
        // 
        if (questData.stage == 1){
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
        }
    }
    if (questname == "ring"){
        // propose
        if (questData.stage == 1){
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
        }
        // defeat the fifth evil ex
        else if (questData.stage == 6){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
        // defeat the sixth evil ex
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
        // defeat the seventh evil ex
        else if (questData.stage == 8){
            if (questData && questData.storyStep == 1){
                return questData.message.author.username + ", "
            }
        }
    }
    else{
        return "Travel with 4 other companions back in time and save the Jin Dynasty";
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
        handleTombArtifact(message, discordUserId, stageInQuest, team, year, channel)
    }
    else if (questline == "demonic"){
        // handle demonic
        handleDemonicArtifact(message, discordUserId, stageInQuest, team, year, channel)
    }
    else if (questline == "ring"){
        // handle evilexes
        handleRingArtifact(message, discordUserId, stageInQuest, team, year, channel)
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
    else if (Stage == 5){
        // travel to the year 3,189 and free the humans that are being held hostage in a remote island
        handleTimeMachineArtifactStageFive(message, discordUserId, stage, team, year, channel)
    }
    else if (Stage == 6){
        // travel to the year 3,250,000 and defeat the corrupted overmind
        handleTimeMachineArtifactStageSix(message, discordUserId, stage, team, year, channel)
    }
}

function handleTombArtifact(message, discordUserId, stage, team, year, channel){
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
        handleTombArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 2){
        // create special encounter with hounds
        handleTombArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 3){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleTombArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 4){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleTombArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 5){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleTombArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
}

function handleDemonicArtifact(stage, discordUserId){
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

function handleRingArtifact(stage, discordUserId){
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
        handleRingArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 2){
        handleRingArtifactStageTwo(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 3){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleRingArtifactStageThree(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 4){
        // travel to the year -65,000,000 and save the dinosaurs from the meteor
        handleRingArtifactStageFour(message, discordUserId, stage, team, year, channel)
    }
    else if (Stage == 5){
        // travel to the year 3,189 and free the humans that are being held hostage in a remote island
        handleRingArtifactStageFive(message, discordUserId, stage, team, year, channel)
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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
        // TODO: add reaction event where user finds 
        var storytell = setTimeout (function(){ 
            questData.storyStep = questData.storyStep + 1;
            var descriptionString = exports.questStringBuilder("timetravel", questData);
            embed.setDescription(descriptionString)
            sentMessage.edit({embed})

            var idOfQuest;

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

        }, 20000);
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
    // travel to the year 1211 and defeat genghis khan before he invades
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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

/*
** Ring Artifact Stages
*/

// embed
function handleRingArtifactStageOne(message, discordUserId, stage, team, year, channel){
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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

function handleRingArtifactStageTwo(message, discordUserId, stage, team, year, channel){
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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

function handleRingArtifactStageThree(message, discordUserId, stage, team, year, channel){
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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

function handleRingArtifactStageFour(message, discordUserId, stage, team, year, channel){
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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
function handleRingArtifactStageFive(message, discordUserId, stage, team, year, channel){
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

/*
** Lincoln Tomb Artifact Stages
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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
            //sentMessage.react("🛋️")
            sentMessage.react("🚪")
            sentMessage.react("🏯")
            //sentMessage.react("🏚️")
            //sentMessage.react("🕳️")
            //sentMessage.react("🗄️")
            //sentMessage.react("⚰️")
            sentMessage.react("🎨")
        }, 20000);
        // reactions for user
        // porcelain vase, kitchen table, wooden box, chair, wardrobe, interrogation room, 
        // cellar, irrigation ditch, blacksmith toolbox, coffin, art gallery
        
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
            // TODO: hand out the supplies to each team member
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


function artifactStartString(questline, discordUser, mentionedUsers){
    // return the starting quest text
}

function questFindRewards(message, user, emoji, reward){
    // each of these ids will receive 1 taco, 1 xp, or 1 rock
    var giveRewardTo = user.id;
    var giveRewardToUsername = user.username
    console.log(user.id);
    if (reward === "taco"){
        profileDB.updateUserTacos(giveRewardTo, 2, function(err, res){
            if (err){
                console.log(err);
                message.channel.send(err);
            }else{
                console.log(res);
            }
        })
    }
    else if (reward === "terrycloth" || reward === "rock"){
        profileDB.getItemData(function(err, getItemResponse){
            if (err){
                console.log(err);
            }
            else{
                var itemsObtainedArray = [];
                if (reward === "terrycloth"){
                    // ID of terry cloth
                    for (var index in getItemResponse.data){
                        if (getItemResponse.data[index].id == TERRY_CLOTH_ITEM_ID){
                            itemsObtainedArray.push( getItemResponse.data[index] );
                            break;
                        }
                    }
                }
                else if (reward === "rock"){
                    for (var index in getItemResponse.data){
                        if (getItemResponse.data[index].id == ROCK_ITEM_ID){
                            itemsObtainedArray.push( getItemResponse.data[index] );
                            break;
                        }
                    }
                }
                addToUserInventory(giveRewardTo, itemsObtainedArray);
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

function playMusicForQuest(channel, questName){
    if (channel){
        voiceChannel = channel
        var ytLink = youtubeLinks[questName]
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

var youtubeLinks = {
    genghisKhan: "https://www.youtube.com/watch?v=d2hRTLdvdnk",
    asteroid: "https://www.youtube.com/watch?v=d2hRTLdvdnk",
    island: "https://www.youtube.com/watch?v=d2hRTLdvdnk"
}

function checkMissionStatus(missionName, discordUserId, cb){
    if (missionName == "ritual"){
        // handle ritual
    }
}

function handleRitualStandingMission(mission){
    // users should be standing on 5 different places on a clock
    // 1 - 12, if they are standing on ie 12, 2, 5, 7, 10 then activate second step

    // TODO: create structure for clock
}

function handleRitualTacoThrowMission(){
    // users should be throwing their tacos in a specific order
    // 12 throws to 5, 5 throws to 10, 10 throws to 2, 2 throws to 7, 7 throws to 10
    // 12 throws to 7, 7 throws to 2, 2 throws to 10, 10 throws to 5, 5 throws to 10

    //TODO: create structure that keeps track of possible throws and starting throw
}

function handleTacoGiveMission(giveAmount, mission){
    // check that the user has given x tacos to y person
    if (giveAmount >= mission.tacosToGive){
        // TODO: check the target as well
        return true
    }else{
        return false;
    }
}

function handleCommandToPlayerMission(command, mission, data){
    // check that the user has done x command to y person
    
    // check for mission to have command and countToComplete, count
    // add +1 to count, if count < countToComplete, return false
    if (command == "thank"){
        // TODO: check if there is a target the command has to be done to
        mission.count++;
        if (mission.CountToCOmplete > mission.count){
            return false;
        }else{
            return true;
        }
    }
    if (command == "sorry"){
        // TODO: check if there is a target the command has to be done to
        mission.count++;
        if (mission.CountToCOmplete > mission.count){
            return false;
        }else{
            return true;
        }
    }
    if (command == "cook"){
        mission.count++;
        if (mission.CountToCOmplete > mission.count){
            return false;
        }else{
            return true;
        }
    }
    if (command == "prepare"){
        mission.count++;
        if (mission.CountToCOmplete > mission.count){
            return false;
        }else{
            return true;
        }
    }
    if (command == "fetch"){
        mission.count++;
        if (mission.CountToCOmplete > mission.count){
            return false;
        }else{
            return true;
        }
    }
    if (command == "scavenge"){
        mission.count++;
        if (mission.CountToCOmplete > mission.count){
            return false;
        }else{
            return true;
        }
    }
    if (command == "propose"){
        
        if (mission.targetToProposeTo == data.TargetToProposeTo){
            return false;
        }else{
            return true;
        }
    }
    
    // return true or false for complete
}
