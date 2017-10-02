var rpg = require("./rpg.js")
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var dispatcher = null
var voiceChannel = null

var activeQuests = {};

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
        // handle stage
        var year = dataUsedInQuest.year;
        handleTimeMachineArtifact(message, discordUserId, stageInQuest, team, year, channel)
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

function handleTimeMachineArtifact(message, discordUserId, stage, team, year, channel){
    /*
    time travel with time machine = different years specify different embeds ?
    */
    if (stage == 1){
        handleTimeMachineArtifactStageOne(message, discordUserId, stage, team, year, channel)
    }
    else if (stage == 2){
        handleTimeMachineArtifactStageTwo(message, discordUserId, stage, team, year, channel)
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
    .setThumbnail(message.author.avatarURL)
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
    .setThumbnail(message.author.avatarURL)
    .setColor(0xFF7A1C)
    message.channel.send({embed})
    .then(function(sentMessage){
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
            rpg.rpgInitialize(message, special);
            playMusicForQuest(channel, "genghisKhan")
        }, 25000);
    })
}

function handleTimeMachineArtifactStageThree(message, discordUserId, stage, team, year, channel){

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
    genghisKhan: "https://www.youtube.com/watch?v=d2hRTLdvdnk"
}