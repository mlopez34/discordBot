/// settings for each server and their channels
// a server can set their command prefix, default is -
// only admins can use these commands or bot owner
// setprefix [prefix]
// mention prefixreset, resets to -

// mute - no responses at all (overries below)
// unmute - responds to any command in the channel 

// enable - responds to ONLY these channels listed (overrides below) - if this array is empty then all channels work
// disable - remove from enabled channels

// rpgenable - responds to rpg commands in the channel
// rpgdisable - does not respond to rpg commands in the channel

// rpgonly - responds to only rpg commands in the channel no other regular commands
// rpgonlydisable - removed from list of only responding to rpg commands

// servers default are - all channels can use bender and rpg (unmute, rpgenable)
// when rpgdisable then the channel cannot use rpg commands
// when rpgonly the channel can only use rpg commands


////// TODO: create profileDB queries for all gets and updates
/// add settings commands to bot.js, add a mention command as well
/// test initializes
/// test for new servers
/// test for individual settings
/// test with combination of settings
/// test different prefixes
/// change config.commandstring in all files to be the server's command string



var profileDB = require("./profileDB.js");
var config = require("./config.js");
var mapOfGuilds = {}

module.exports.getServerSettings = function(guildId){
    return mapOfGuilds[guildId]
}

module.exports.getGuildPrefix = function(guildId){
    let guildSettings = exports.getServerSettings(guildId)
    if (guildSettings && guildSettings.prefix){
        return guildSettings.prefix
    }else{
        return config.commandString
    }
}

function setGuildPrefix(guildId, prefix){
    if (!mapOfGuilds[guildId]){
        let guild = {
            guildId: guildId,
            prefix: prefix
        }
        initializeGuildSettings(guild)
    }else{
        mapOfGuilds[guildId].prefix = prefix
    }
}

module.exports.initializeServerSettings = function(cb){
    //get all the server settings
    profileDB.getServerSettings(function(err, res){
        if (err){
            console.log(err)
        }else{
            // create map of settings for the servers
            // table has list of muted channels
            let guilds = res.data
            for (var g in guilds){
                handleGuildSettings(guilds[g])
            }
            cb(null, "done")
            console.log("Guild Settings Initialized")
        }
    })
}

function handleGuildSettings(guild){
    if (!mapOfGuilds[guild.guildid]){
        initializeGuildSettings(guild)
    }else{
        // guild exists in map, just modify
    }
}

/// muted / unmuted
function removeChannelFromMuted(guildId, channelId){
    if (mapOfGuilds[guildId]){
        let index = mapOfGuilds[guildId].mutedChannels.indexOf(channelId)
        if ( index != -1 ){
            mapOfGuilds[guildId].mutedChannels.splice(index, 1)
        }
    }
}

function addChannelToMuted(guildId, channelId){
    if (mapOfGuilds[guildId]){
        mapOfGuilds[guildId].mutedChannels.push(channelId)
    }
}

/// enabled / disabled
function removeChannelFromEnabled(guildId, channelId){
    if (mapOfGuilds[guildId]){
        let index = mapOfGuilds[guildId].enabledChannels.indexOf(channelId)
        if ( index != -1 ){
            mapOfGuilds[guildId].enabledChannels.splice(index, 1)
        }
    }
}

function addChannelToEnabled(guildId, channelId){
    if (mapOfGuilds[guildId]){
        mapOfGuilds[guildId].enabledChannels.push(channelId)
    }
}


/// rpgdisabled / rpgenabled
function removeChannelFromRPGDisabled(guildId, channelId){
    if (mapOfGuilds[guildId]){
        let index = mapOfGuilds[guildId].rpgdisabledChannels.indexOf(channelId)
        if ( index != -1 ){
            mapOfGuilds[guildId].rpgdisabledChannels.splice(index, 1)
        }
    }
}

function addChannelToRPGDisabled(guildId, channelId){
    if (mapOfGuilds[guildId]){
        mapOfGuilds[guildId].rpgdisabledChannels.push(channelId)
    }
}

// rpgonly / rpgonlydisabled
function removeChannelFromRPGOnly(guildId, channelId){
    if (mapOfGuilds[guildId]){
        let index = mapOfGuilds[guildId].rpgonlyChannels.indexOf(channelId)
        if ( index != -1 ){
            mapOfGuilds[guildId].rpgonlyChannels.splice(index, 1)
        }
    }
}

function addChannelToRPGOnly(guildId, channelId){
    if (mapOfGuilds[guildId]){
        mapOfGuilds[guildId].rpgonlyChannels.push(channelId)
    }
}

function initializeGuildSettings(guild){
    mapOfGuilds[guild.guildid] = {
        mutedChannels: [],
        enabledChannels: [],
        prefix: null,
        rpgonlyChannels: [],
        rpgdisabledChannels: []
    }
    for (var muted in guild.mutedchannels){
        mapOfGuilds[guild.guildid].mutedChannels.push( guild.mutedchannels[muted] )
    }
    for (var e in guild.enabledchannels){
        mapOfGuilds[guild.guildid].enabledChannels.push( guild.enabledchannels[e] )
    }
    for (var c in guild.rpgonlychannels){
        mapOfGuilds[guild.guildid].rpgonlyChannels.push( guild.rpgonlychannels[c] )
    }
    for (var c in guild.rpgdisabledchannels){
        mapOfGuilds[guild.guildid].rpgdisabledChannels.push( guild.rpgdisabledchannels[c] )
    }
    mapOfGuilds[guild.guildid].prefix = guild.prefix ? guild.prefix : null
}

// can i speak here?
module.exports.canBotRespondToCommandInChannel = function(typeOfCommand, guildId, channelId){
    if (mapOfGuilds[guildId].mutedChannels 
    && mapOfGuilds[guildId].mutedChannels.indexOf(channelId) > -1){
        // bot is muted here completely
        return false
    }else{
        if (typeOfCommand == "settings"){
            return true
        }
        if (typeOfCommand == "rpg"){
            if (mapOfGuilds[guildId].enabledChannels 
            && mapOfGuilds[guildId].enabledChannels.length > 0){
                // server has specified only certain channels to work for bender
                if (mapOfGuilds[guildId].enabledChannels 
                && mapOfGuilds[guildId].enabledChannels.indexOf(channelId) > -1){
                    // this is one of those channels - but can i speak rpg here?
                    if ( mapOfGuilds[guildId].rpgdisabledChannels
                    && (mapOfGuilds[guildId].rpgdisabledChannels.indexOf(channelId) == -1
                    || mapOfGuilds[guildId].rpgonlyChannels.indexOf(channelId) > -1) ){
                        // can speak rpg here
                        return true
                    }else{
                        return false
                    }
                }else{
                    // not an enabled channel
                    return false
                }
            }else{
                // no anabled channels, all channels work
                return true
            }
        }else if (typeOfCommand == "regular"){
            if (mapOfGuilds[guildId].enabledChannels 
            && mapOfGuilds[guildId].enabledChannels.length > 0){
                // server has specified only certain channels to work for bender
                if (mapOfGuilds[guildId].enabledChannels 
                && mapOfGuilds[guildId].enabledChannels.indexOf(channelId) > -1){
                    if ( mapOfGuilds[guildId].rpgonlyChannels 
                    && mapOfGuilds[guildId].rpgonlyChannels.indexOf(channelId) > -1 ){
                        // rpg only channel, ignore regular
                        return false
                    }else{
                        return true
                    }
                }else{
                    // not an enabled channel
                    return false
                }
            }else{
                // no anabled channels, all channels work
                return true
            }
        }
    }
}

module.exports.settingsCommand = function(message, args){
    if (args && args.length > 1){
        // -settings prefix !
        if (args[1].toLowerCase() == "setprefix"){
            exports.setPrefixCommand(message, args)
        }
        if (args[1].toLowerCase() == "resetprefix"
        || (args.length > 2 && args[2].toLowerCase() == "resetprefix")){
            exports.resetPrefixCommand(message)
        }
        if (args[1].toLowerCase() == "mute"){
            exports.muteInChannelCommand(message)
        }
        if (args[1].toLowerCase() == "unmute"){
            exports.unmuteInChannelCommand(message)
        }
        if (args[1].toLowerCase() == "enable"){
            exports.enableInChannelCommand(message)
        }
        if (args[1].toLowerCase() == "disable"){
            exports.disableInChannelCommand(message)
        }
        if (args[1].toLowerCase() == "rpgdisable"){
            exports.rpgDisableCommand(message)
        }
        if (args[1].toLowerCase() == "rpgenable"){
            exports.rpgEnableCommand(message)
        }

        if (args[1].toLowerCase() == "rpgonly"){
            exports.rpgOnlyEnableCommand(message)
        }
        if (args[1].toLowerCase() == "rpgonlydisable"){
            exports.rpgOnlyDisableCommand(message)
        }
    }
}

module.exports.createGuildProfile = function(guildId, cb){
    // add to database
    // add to memory
    let guild = {
        guildId: guildId
    }
    profileDB.createGuildSettingsProfile(guild, function(gE, gD){
        if (gE){
            console.log(gE)
            cb(gE)
        }else{
            console.log("created guild settings")
            cb(null, gD)  
        }
    })
    handleGuildSettings(guild)
}

// mute / unmute
module.exports.muteInChannelCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.muteInChannelCommand(message)
                }
            })
        }else{
            let guild = res.data
            if (!guild.mutedchannels 
            ||  (guild.mutedchannels && guild.mutedchannels.indexOf(channelId) == -1)){
                addChannelToMuted(guildId, channelId)
                // also update the database
                profileDB.muteChannelInGuild(guildId, channelId, true, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully muted bender in the channel
                        message.channel.send(":x: I will NOT respond to commands here!")
                    }
                })
            }
        }
    })
}

module.exports.unmuteInChannelCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.unmuteInChannelCommand(message)
                }
            })
        }else{
            let guild = res.data
            let index = guild.mutedchannels ? guild.mutedchannels.indexOf(channelId) : -1
            if ( index != -1 ){
                // channel is currently muted, unmute the channel
                removeChannelFromMuted(guildId, channelId)
                // also update the database - remove the channelId from array
                profileDB.muteChannelInGuild(guildId, channelId, false, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully unmuted bender in the channel
                        message.channel.send(":ballot_box_with_check:  I will now respond to commands here!")
                    }
                })
            }
        }
    })
}

// enable / disable

module.exports.enableInChannelCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.enableInChannelCommand(message)
                }
            })
        }else{
            let guild = res.data
            if (!guild.enabledchannels
            || (guild.enabledchannels && guild.enabledchannels.indexOf(channelId) == -1 )){
                addChannelToEnabled(guildId, channelId)
                // also update the database
                profileDB.enableChannelInGuild(guildId, channelId, true, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully enabled bender in the channel - no other channels will work
                        message.channel.send(":ballot_box_with_check:  Enabled Bender here! only enabled channels will work now")
                    }
                })
            }
        }
    })
}

module.exports.disableInChannelCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.disableInChannelCommand(message)
                }
            })
        }else{
            let guild = res.data
            let index = guild.enabledchannels?  guild.enabledchannels.indexOf(channelId) : -1
            if ( index != -1 ){
                removeChannelFromEnabled(guildId, channelId)
                // also update the database - remove the channelId from array
                profileDB.enableChannelInGuild(guildId, channelId, false, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully unmuted bender in the channel
                        message.channel.send(":x: Bender disabled here! Only Enabled channels will work, if no enabled channels then all channels will work by default")
                    }
                })
            }
        }
    })
}

// rpg disable/enable
module.exports.rpgDisableCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.rpgDisableCommand(message)
                }
            })
        }else{
            let guild = res.data
            if (!guild.rpgdisabledchannels
            || (guild.rpgdisabledchannels && guild.rpgdisabledchannels.indexOf(channelId) == -1)){
                addChannelToRPGDisabled(guildId, channelId)
                // also update the database
                profileDB.rpgDisableChannelInGuild(guildId, channelId, true, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully rpg disabled bender in channel
                        message.channel.send(":x: I will NOT respond to RPG commands here!")
                    }
                })
            }
        }
    })
}

module.exports.rpgEnableCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.rpgEnableCommand(message)
                }
            })
        }else{
            let guild = res.data
            let index = guild.rpgdisabledchannels ? guild.rpgdisabledchannels.indexOf(channelId) : -1
            if ( index != -1 ){
                // channel is currently muted, unmute the channel
                removeChannelFromRPGDisabled(guildId, channelId)
                // also update the database - remove the channelId from array
                profileDB.rpgDisableChannelInGuild(guildId, channelId, false, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully rpg enabled bender in channel
                        message.channel.send(":ballot_box_with_check:  I will now respond to RPG commands here!")
                    }
                })
            }
        }
    })
}

// rpgonly / rpgonlydisable
module.exports.rpgOnlyEnableCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.rpgOnlyEnableCommand(message)
                }
            })
        }else{
            let guild = res.data
            if (!guild.rpgonlychannels
            || ( guild.rpgonlychannels && guild.rpgonlychannels.indexOf(channelId) == -1)){
                addChannelToRPGOnly(guildId, channelId)
                // also update the database
                profileDB.rpgOnlyChannelInGuild(guildId, channelId, true, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully rpg disabled bender in channel
                        message.channel.send(":ballot_box_with_check: I will now respond to RPG ONLY commands here!")
                    }
                })
            }
        }
    })
}

module.exports.rpgOnlyDisableCommand = function(message){
    let guildId = message.channel.guild.id
    let channelId = message.channel.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.rpgOnlyDisableCommand(message)
                }
            })
        }else{
            let guild = res.data
            let index = guild.rpgonlychannels ? guild.rpgonlychannels.indexOf(channelId) : -1
            if ( index != -1 ){
                // channel is currently muted, unmute the channel
                removeChannelFromRPGOnly(guildId, channelId)
                // also update the database - remove the channelId from array
                profileDB.rpgOnlyChannelInGuild(guildId, channelId, false, function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        // successfully rpg enabled bender in channel
                        message.channel.send(":x: I will NOT respond to RPG ONLY commands here!")
                    }
                })
            }
        }
    })
}

// prefix
module.exports.setPrefixCommand = function(message, args){
    let guildId = message.channel.guild.id
    let prefix;
    if (args && args.length > 2){
        prefix = args[2] // -settings prefix !
        profileDB.getGuildSettings(guildId, function(err, res){
            if (err){
                console.log(err)
                exports.createGuildProfile(guildId, function(err, res){
                    if(err){
                        console.log(err)
                    }else{
                        exports.setPrefixCommand(message)
                    }
                })
            }else{
                if (prefix && prefix.length > 0 && prefix.length < 10){
                    profileDB.setGuildPrefix(guildId, prefix, function(err, res){
                        if (err){
                            console.log(err)
                        }else{
                            //successfully changed prefix
                            message.channel.send(":ballot_box_with_check: Successfully updated the guild's prefix to: `" + prefix +"`")
                        }
                    })
                    setGuildPrefix(guildId, prefix)
                }else if (prefix && prefix.length > 10){
                    message.channel.send("The prefix is too long")
                }
            }
        })
    }
}

module.exports.resetPrefixCommand = function(message){
    let guildId = message.channel.guild.id
    profileDB.getGuildSettings(guildId, function(err, res){
        if (err){
            console.log(err)
            exports.createGuildProfile(guildId, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    exports.resetPrefixCommand(message)
                }
            })
        }else{
            profileDB.setGuildPrefix(guildId, null, function(err, res){
                if (err){
                    console.log(err)
                }else{
                    //successfully reset prefix
                    message.channel.send(":ballot_box_with_check: Successfully reset the guild's prefix! The prefix is now: `" +config.commandString + "`")
                }
            })
            setGuildPrefix(guildId, null)
        }
    })
}