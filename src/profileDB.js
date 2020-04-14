'use strict'
var config = require("./config.js");
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = config.database;
var db = pgp(connectionString);

module.exports.getUserProfileData = function(discordId, cb) {
  var query = 'select * from ' + config.profileTable + ' where discordId = $1'
  db.one(query, [discordId])
    .then(function (data) {
      //// console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      // console.log(err);
      cb(err);
    });
}

module.exports.createUserProfile = function(data, cb) {
  var query = 'insert into '+ config.profileTable + '(discordId, tacos, birthdate, lastthanktime, lastsorrytime, lastcooktime, lastscavangetime, tacostands, welcomed, lastpreparetime, pickaxe, map, phone)' +
      'values(${discordId}, ${tacos}, ${birthdate}, ${lastthanktime},  ${lastsorrytime}, ${lastcooktime}, ${lastscavangetime}, ${tacostands}, ${welcomed}, ${lastpreparetime}, ${pickaxe}, ${map}, ${phone})'
  db.none(query, data)
    .then(function () {
        var d = {
            discordId : data.discordId,
            slot1replacing: false,
            slot2replacing: false,
            slot3replacing: false,
            slot4replacing: false
        }
        exports.createUserStatistics(data.discordId, null, null, function(createError, statsSuccess){
            if(createError){
                console.log(createError);
            }else{
                console.log(statsSuccess)
            }
        })
        exports.createUserWearInfo(d, function(e, r){
            // create stable, greenhouse, temple 
            var s = {
                discordId : data.discordId,
                stablelevel: 1
            }
            exports.createUserStableInfo(s, function(e, r){
                var g = {
                    discordId : data.discordId,
                    greenhouselevel: 1,
                    plotsofland: 9
                }
                exports.createUserGreenHouseInfo(g, function(e, r){
                    var t = {
                        discordId : data.discordId,
                        templelevel: 1
                    }
                    exports.createUserTempleInfo(t, function(e, r){
                        var r = {
                            discordId : data.discordId,
                            currentarea: "meadows"
                        }
                        exports.createRpgProfile(r, function(e, r){
                            var f = {
                                discordId: data.discordId,
                                tulips: 0,
                                roses: 0,
                                evergreens: 0,
                                cacti: 0,
                                palms: 0,
                                blossoms: 0,
                                apples: 0,
                                sunflowers: 0,
                                hibiscuses: 0,
                                bananas: 0,
                                pears: 0,
                                tangerines: 0,
                                eggplants: 0
                            }
                            exports.createFruitsProfile(f, function(e, r){
                                if (e){
                                    console.log(e)
                                    cb(e)
                                }else{
                                    cb(null, {
                                        status: 'success',
                                        message: 'Inserted one user'
                                    });
                                }
                            })
                        })
                    })
                })
            })
        })
    })
    .catch(function (err) {
      cb(err);
    });
}

module.exports.getGuildData = function(guildId, cb) {
    var query = 'select * from ' + config.activityTable + ' where guildId = $1'
    db.one(query, [guildId])
    .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved ONE guild'
            });
        })
        .catch(function (err) {
            // console.log(err);
            cb(err);
    });
}

module.exports.createGuildProfile = function(data, cb) {
    var query = 'insert into '+ config.activityTable + '(guildId)' +
        'values(${guildId})'
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'Inserted one guild'
        });
    })
    .catch(function (err) {
    cb(err);
    });
}

module.exports.createUserActivity = function(data) {
    var query = 'insert into '+ config.userActivityTable + '(guildId, discordid, username, command, message)' +
        'values(${guildId}, ${discordId}, ${username}, ${command}, ${message})'
    db.none(query, data)
    .then(function () {
    console.log( {
        status: 'success',
        message: 'Inserted one command activity'
        });
    })
    .catch(function (err) {
        console.log(err);
    });
}

module.exports.updateUserTacosThank = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastthanktime=$3 where discordid=$2'
    var lastThank = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastThank])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosEarly = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, earlyadopt=$3 where discordid=$2'
    db.none(query, [tacos, userId, true])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserBurritos = function(userId, burritos, cb){
    var query = 'update ' + config.profileTable + ' set burritos=burritos+$1 where discordid=$2'
    db.none(query, [ burritos, userId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated burritos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserDaily = function(userId, burritosGained, tacosGained, streakReset, firstBurritos, cb) {
    var query = ""
    if (streakReset){
        if (firstBurritos){
            query = 'update ' + config.profileTable + ' set tacos=tacos+$1, burritos=$3, lastdailytime=$4, votestreak=0 where discordid=$2'
        }else{
            query = 'update ' + config.profileTable + ' set tacos=tacos+$1, burritos=burritos+$3, lastdailytime=$4, votestreak=0 where discordid=$2'
        }
    }else{
        if (firstBurritos){
            query = 'update ' + config.profileTable + ' set tacos=tacos+$1, burritos=$3, lastdailytime=$4, votestreak=1 where discordid=$2'
        }else{
            query = 'update ' + config.profileTable + ' set tacos=tacos+$1, burritos=burritos+$3, lastdailytime=$4, votestreak=votestreak+1 where discordid=$2'
        }
    }
    var lastVote = new Date();
    db.none(query, [tacosGained, userId, burritosGained, lastVote])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosPresent = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastpresenttime=$3 where discordid=$2'
    var lastPresent = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastPresent])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.reduceCommandCooldownByHour = function(userId, command, userProfile, secondsToReduceByPotion, cb) {
    var commandProperty = undefined;
    // calculate 1 hour less than current date of the command
    var newDate = undefined;
    if (command == "scavenge"){
        commandProperty = "lastscavangetime"
        var currentCommandTime = userProfile.lastscavangetime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));        
        }
    }else if (command == "cook"){
        commandProperty = "lastcooktime"
        var currentCommandTime = userProfile.lastcooktime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));
        }                
    }else if (command == "RPG"){
        commandProperty = "lastrpgtime"
        var currentCommandTime = userProfile.lastrpgtime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));                
        }
    }else if (command == "thank"){
        commandProperty = "lastthanktime"
        var currentCommandTime = userProfile.lastthanktime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));                
        }
    }else if (command == "sorry"){
        commandProperty = "lastsorrytime"
        var currentCommandTime = userProfile.lastsorrytime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));                
        }
    }else if (command == "prepare"){
        commandProperty = "lastpreparetime"
        var currentCommandTime = userProfile.lastpreparetime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));                
        }
    }else if (command == "fetch"){
        commandProperty = "lastfetchtime"
        var currentCommandTime = userProfile.lastfetchtime;
        if (!currentCommandTime){
            cb(null, { status: 'success', message: 'reduced cooldown' } );
        }else{
            newDate = new Date(currentCommandTime.setSeconds(currentCommandTime.getSeconds() - secondsToReduceByPotion));                        
        }
    }
    if (newDate){
        var query = 'update ' + config.profileTable + ' set ' + commandProperty + '=$2 where discordid=$1'

        //// console.log("new last thank: " + lastThank);
        db.none(query, [userId, newDate])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'reduced cooldown'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
}

module.exports.updateUserRPGBuff = function(userId, itemid, buffHours, cb) {
    var query = 'update ' + config.profileTable + ' set rpgbuffitemid=$1, rpgbuffactivatetime=$3 where discordid=$2'
    var activateTime = new Date();
    activateTime = new Date(activateTime.setHours(activateTime.getHours() + buffHours))
    db.none(query, [itemid, userId, activateTime])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added RPG buff'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosTrickOrTreat = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lasttrickortreattime=$3 where discordid=$2'
    var lasttrickortreattime = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lasttrickortreattime])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateMarriedToId = function(userId, marriedToId, cb) {
    var query = 'update ' + config.profileTable + ' set marriedtoid=$1, lastmarriage=$3 where discordid=$2'
    var lastmarriage = new Date();
    db.none(query, [marriedToId, userId, lastmarriage])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'udpated marriage'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.obtainCasserole = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set casserole=true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added casserole'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.obtainSprintingShoes = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set sprintingshoes=true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added sprinting shoes'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.obtainHolyCandle = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set holycandle=true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added holy candle'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.obtainLaboratoryAccessCard = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set laboratoryaccesscard=true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added laboratoryaccesscard'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.obtainPandorasBox = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set pandorasbox=true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added pandorasbox'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosSorry = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastsorrytime=$3 where discordid=$2'
    var lastThank = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastThank])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosCook = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastcooktime=$3 where discordid=$2'
    var lastCook = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, lastCook])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

//fetch
module.exports.updateUserTacosFetch = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastfetchtime=$3 where discordid=$2'
    var lastFetch = new Date();
    db.none(query, [tacos, userId, lastFetch])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos fetch'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosStableFetch = function(userId, tacos, stableSlot, cb) {
    var query;
    if (stableSlot == 5){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2;\n'
        query = query + 'update ' + config.stablesTable + ' set stableslot5lastfetchtime=$3 where discordid=$2;'
    }else if (stableSlot == 4){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2;\n'
        query = query + 'update ' + config.stablesTable + ' set stableslot4lastfetchtime=$3 where discordid=$2;'
    }else if (stableSlot == 3){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2;\n'
        query = query + 'update ' + config.stablesTable + ' set stableslot3lastfetchtime=$3 where discordid=$2;'
    }else if (stableSlot == 2){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2;\n'
        query = query + 'update ' + config.stablesTable + ' set stableslot2lastfetchtime=$3 where discordid=$2;'
    }else if (stableSlot == 1){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2;\n'
        query = query + 'update ' + config.stablesTable + ' set stableslot1lastfetchtime=$3 where discordid=$2;'
    }
    var lastFetch = new Date();
    db.none(query, [tacos, userId, lastFetch])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos stable fetch'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateLastScavengeTime = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set lastscavangetime=$2 where discordid=$1'
    var lastScavenge = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [userId, lastScavenge])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated lastscavengetime'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateLastRpgTime = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set lastrpgtime=$2 where discordid=$1'
    var lastRpg = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [userId, lastRpg])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated lastrpgtime'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserTacosWelcome = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, welcomed=$3 where discordid=$2'
    var welcomed = true;
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, welcomed])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateUserTacos = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateCurrentChallenge = function(userId, challengeNum, cb) {
    var query = 'update ' + config.profileTable + ' set currentchallenge=$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [challengeNum, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added currentchallenge'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateCurrentChallengeKeystone = function(userId, keystoneNum, challengeId, cb) {
    var query = 'update ' + config.userRpgProfileTable + ' set ' + challengeId + '=$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [keystoneNum, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added keystone + 1'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateUserRpgArea = function(userId, area, updatetraveltime, cb) {
    var query;
    if (updatetraveltime){
        var query = 'update ' + config.userRpgProfileTable + ' set currentarea=$1,lasttraveltime=$3 where discordid=$2'
    }else{
        var query = 'update ' + config.userRpgProfileTable + ' set currentarea=$1 where discordid=$2'
    }
    var lasttraveltime = new Date()
    db.none(query, [area, userId, lasttraveltime])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'changed location for user'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateUserTacosGive = function(userId, tacoAmount, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacoAmount, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateUserTacosThrow = function(userId, tacoAmount, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacoAmount, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateUserPasta = function( userId, pastaTacoCost, pasta, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, pasta=$3 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [pastaTacoCost, userId, pasta])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.createLetter = function(userId, letter, username, cb){
    let letterCreateTime = new Date()
    let data = {
        userId: userId,
        letter: letter,
        letterCreateTime: letterCreateTime,
        creatorUsername: username
    }
    var query = 'insert into '+ config.lettersTable + '(discordid, letter, lettercreatetime, creatorusername)' +
    'values(${userId}, ${letter}, ${letterCreateTime}, ${creatorUsername})'
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added letter into the twisting nether'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

// update protect
module.exports.updateUserProtect = function(userId, protectNumber, protection , cb) {
    var query = '';
    if (protection == null ){;
        query = 'update ' + config.profileTable + ' set protect=$1 where discordid=$2'
    }
    else{
        query = 'update ' + config.profileTable + ' set protect=protect+$1 where discordid=$2'
    }
    // console.log(protectNumber + " before query")
    db.none(query, [protectNumber, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated protect'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}
// update pet
module.exports.updateUserPet = function(userId, pet, petName, threedaysAgo, cb) {
    var query = 'update ' + config.profileTable + ' set pet=$1, petname=$3, lastfetchtime=$4 where discordid=$2'
    db.none(query, [pet, userId, petName, threedaysAgo])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated pet'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateStablePet = function(userId, pet, petName, stableSlot, threedaysAgo, cb) {
    var query;
    if (stableSlot == 1){
        query = 'update ' + config.stablesTable + ' set stableslot1pet=$1, stableslot1name=$3, stableslot1lastfetchtime=$4 where discordid=$2'
    }else if (stableSlot == 2){
        query = 'update ' + config.stablesTable + ' set stableslot2pet=$1, stableslot2name=$3, stableslot2lastfetchtime=$4 where discordid=$2'
    }else if (stableSlot == 3){
        query = 'update ' + config.stablesTable + ' set stableslot3pet=$1, stableslot3name=$3, stableslot3lastfetchtime=$4 where discordid=$2'
    }else if (stableSlot == 4){
        query = 'update ' + config.stablesTable + ' set stableslot4pet=$1, stableslot4name=$3, stableslot4lastfetchtime=$4 where discordid=$2'
    }else if (stableSlot == 5){
        query = 'update ' + config.stablesTable + ' set stableslot5pet=$1, stableslot5name=$3, stableslot5lastfetchtime=$4 where discordid=$2'
    }else{
        cb("failed")
    }
    db.none(query, [pet, userId, petName, threedaysAgo])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated pet'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.purchasePickAxe = function(userId, tacosSpent, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, pickaxe=$3 where discordid=$2'
    // console.log(query)
    var selectedPickaxe = "basic"
    if (tacosSpent <= -5000 && tacosSpent >= -15000){
        // improved Pickaxe should always be between 100 and 500
        selectedPickaxe = "improved";
    }
    else if (tacosSpent <= -50000 && tacosSpent >= -5000000){
        selectedPickaxe = "master";
    }
    else if (tacosSpent <= -5000000 && tacosSpent >= -50000000){
        selectedPickaxe = "ethereal";
    }
    else if (tacosSpent <= -50000000 && tacosSpent >= -500000000){
        selectedPickaxe = "zeus";
    }
    //// console.log("new last thank: " + lastThank);
    db.none(query, [tacosSpent, userId, selectedPickaxe])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'purchased pickaxe'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.collectedRewards = function(userId, cb){
    var query = 'update ' + config.profileTable + ' set collectedrewards=true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'collected rewards'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.purchaseBuilding = function(userId, tacosSpent, building, cb){
    var query;
    if (building == "stable"){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1, stable=true where discordid=$2'

    }else if (building == "greenhouse"){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1, greenhouse=true where discordid=$2'

    }else if (building == "temple"){
        query = 'update ' + config.profileTable + ' set tacos=tacos+$1, temple=true where discordid=$2'
    }
    
    db.none(query, [tacosSpent, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'purchased ' + building
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.purchaseHacksaw = function(userId, tacosSpent, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, hacksaw=true where discordid=$2'
    
    db.none(query, [tacosSpent, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'purchased hacksaw'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.purchaseTacoStand = function(userId, tacosSpent, currentTacoStands, cb){
    // console.log(currentTacoStands);
    let tacoStand = 1;
    if (currentTacoStands){
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacostands=tacostands+$3 where discordid=$2'
        // console.log(query)
        var lastThank = new Date();
        //// console.log("new last thank: " + lastThank);
        db.none(query, [tacosSpent, userId, tacoStand])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added taco stand'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
    else{
        
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacostands=$3 where discordid=$2'
        // console.log(query)
        var lastThank = new Date();
        //// console.log("new last thank: " + lastThank);
        db.none(query, [tacosSpent, userId, tacoStand])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added taco stand'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
}

module.exports.setZoneComplete = function(userId, zoneid, cb) {
    var query = 'update ' + config.userRpgProfileTable + ' set ' + zoneid + '= true where discordid=$1'
    db.none(query, [userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'zone completed'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.rpgAreaIncreaseCompletion = function(userId, areatoincrease, currentareacompletion, enemiesCount, cb){
    // null or 0
    if (currentareacompletion){
        var query = 'update ' + config.userRpgProfileTable + ' set ' + areatoincrease + '=' + areatoincrease + '+$2 where discordid=$1'
        db.none(query, [ userId, enemiesCount ])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added area completion'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }else{
        var query = 'update ' + config.userRpgProfileTable + ' set '+ areatoincrease + '=$2 where discordid=$1'
        db.none(query, [ userId, enemiesCount])
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'added area completion'
            });
        })
        .catch(function (err) {
            cb(err);
        });
    }
}

module.exports.prepareTacos = function(userId, tacosToPrepare, cb){
    // update tacos and lastprepare
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastpreparetime=$3, soiledcrops=0 where discordid=$2'
    var lastprepare = new Date();
    //// console.log("new last thank: " + lastThank);
    db.none(query, [ tacosToPrepare, userId, lastprepare ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.getTopTenTacoUsers = function(cb) {
  var query = 'select * from ' + config.profileTable + ' order by tacos DESC LIMIT 1000'
  db.query(query)
    .then(function (data) {
      //// console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved top ten users'
        });
    })
    .catch(function (err) {
      // console.log(err);
      cb(err);
    });
}

module.exports.getToplistUsers = function(cb) {
    var query = 'select * from ' + config.profileTable + ' where experience is not null order by experience DESC LIMIT 1000'
    db.query(query)
    .then(function (data) {
    //// console.log(data);
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved top ten experience'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.getServerSettings = function(cb) {
    var query = 'select * from ' + config.serverSettingsTable + ' LIMIT 50000'
    db.query(query)
    .then(function (data) {
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved server settings'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.getGuildSettings = function(guildId, cb) {
    var query = 'select * from ' + config.serverSettingsTable + ' where guildid=$1'
    db.one(query, [guildId])
    .then(function (data) {
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved guild settings'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.muteChannelInGuild = function(guildId, channelId, mute, cb){
    var query;
    if (mute){
        query = 'update ' + config.serverSettingsTable + ' set mutedchannels = mutedchannels || $1::bigint where guildid=$2'
    }else{
        var query = 'update ' + config.serverSettingsTable + ' set mutedchannels = array_remove(mutedchannels, $1) where guildid=$2'
    }
    db.none(query, [ channelId, guildId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.enableChannelInGuild = function(guildId, channelId, enable, cb){

    var query;
    if (enable){
        query = 'update ' + config.serverSettingsTable + ' set enabledchannels = enabledchannels || $1::bigint where guildid=$2'
    }else{
        var query = 'update ' + config.serverSettingsTable + ' set enabledchannels = array_remove(enabledchannels, $1) where guildid=$2'
    }
    db.none(query, [ channelId, guildId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.rpgDisableChannelInGuild = function(guildId, channelId, disable, cb){

    var query;
    if (disable){
        query = 'update ' + config.serverSettingsTable + ' set rpgdisabledchannels = rpgdisabledchannels || $1::bigint where guildid=$2'
    }else{
        var query = 'update ' + config.serverSettingsTable + ' set rpgdisabledchannels = array_remove(rpgdisabledchannels, $1) where guildid=$2'
    }
    db.none(query, [ channelId, guildId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.rpgOnlyChannelInGuild = function(guildId, channelId, rpgonly, cb){

    var query;
    if (rpgonly){
        query = 'update ' + config.serverSettingsTable + ' set rpgonlychannels = rpgonlychannels || $1::bigint where guildid=$2'
    }else{
        var query = 'update ' + config.serverSettingsTable + ' set rpgonlychannels = array_remove(rpgdisabledchannels, $1) where guildid=$2'
    }
    db.none(query, [ channelId, guildId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.setGuildPrefix = function(guildId, prefix, cb){

    var query = 'update ' + config.serverSettingsTable + ' set prefix = $1 where guildid=$2'

    db.none(query, [ prefix, guildId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.createGuildSettingsProfile = function(data, cb) {
    var createDate = new Date();
    data.createdate = createDate
    var query = 'insert into '+ config.serverSettingsTable + '(guildid, createdate)' +
        'values(${guildid}, ${createdate})'
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'Inserted one guild'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.getRpgTopList = function(cb) {
var query = 'select *  from ' + config.profileTable + ' where rpgpoints is not null ORDER BY currentchallenge DESC NULLS LAST, rpgpoints DESC NULLS LAST LIMIT 1000'
db.query(query)
    .then(function (data) {
    //// console.log(data);
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved top ten rpgpoints'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateAchievements = function(discordUserId, achievement, cb){
    // update statistic
    var query = 'update ' + config.profileTable + ' set achievements = achievements || $1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [ achievement, discordUserId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateStatistics = function(userId, columnName, statisticCount, cb){
    // update statistic
    var query = 'update ' + config.statisticsTable + ' set ' + columnName + '=' + columnName + '+$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [ statisticCount, userId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateSingleStatistic = function(userId, columnName, statisticCount, cb){
    // update statistic
    var query = 'update ' + config.statisticsTable + ' set ' + columnName + '=$1 where discordid=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [ statisticCount, userId ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added statistic'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.createRpgStatistics = function(rpgStatData, cb){
    if (!rpgStatData.user2){
        rpgStatData.user2 = null
        rpgStatData.user2stats = null
    }
    if (!rpgStatData.user3){
        rpgStatData.user3 = null
        rpgStatData.user3stats = null
    }
    if (!rpgStatData.user4){
        rpgStatData.user4 = null
        rpgStatData.user4stats = null
    }
    if (!rpgStatData.user5){
        rpgStatData.user5 = null
        rpgStatData.user5stats = null
    }
    var query = 'insert into '+ config.rpgStatisticsTable + '(user1, user1stats, user2, user2stats, user3, user3stats, user4, user4stats, user5, user5stats, enemies, averagelevel, xp, rewards, success, challenge, keystone )' +
        'values(${user1}, ${user1stats}, ${user2}, ${user2stats}, ${user3}, ${user3stats}, ${user4},  ${user4stats}, ${user5}, ${user5stats}, ${enemies}, ${averagelevel}, ${xp}, ${rewards}, ${success}, ${challenge}, ${keystone})'
    db.none(query, rpgStatData)
    .then(function () {
        cb(null, {
            status: 'success',
            message: 'Inserted one user into rpg statistics'
            });
        })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.createUserStatistics = function(userId, columnName, statisticCount, cb) {
    var userStatistics = {
        discordId: userId,
        thankCount: 0,
        sorryCount: 0,
        welcomeCount: 0,
        scavengeCount: 0,
        thrownAtCount: 0,
        thrownToCount: 0,
        giveCount: 0,
        rocksthrown: 0,
        maxextratacos: 0,
        tailorcount: 0, 
        poisonedtacoscount: 0,
        tacospickedup: 0,
        slotscount: 0,
        soilcount: 0,
        polishcount: 0
    }
    if (columnName){
        userStatistics[columnName] = statisticCount;
    }
    
    var query = 'insert into '+ config.statisticsTable + '(discordId, thankCount, sorryCount, welcomeCount, scavengeCount, thrownAtCount, thrownToCount, giveCount, rocksthrown, maxextratacos, tailorcount, poisonedtacoscount, tacospickedup, slotscount, soilcount )' +
        'values(${discordId}, ${thankCount}, ${sorryCount}, ${welcomeCount},  ${scavengeCount}, ${thrownAtCount}, ${thrownToCount}, ${giveCount}, ${rocksthrown}, ${maxextratacos}, ${tailorcount}, ${poisonedtacoscount}, ${tacospickedup}, ${slotscount}, ${soilcount})'
    db.none(query, userStatistics)
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'Inserted one user'
            });
        })
        .catch(function (err) {
        cb(err);
        });
}

module.exports.checkStatistics = function(discordId, cb){
    var query = 'select * from ' + config.statisticsTable + ' where discordId = $1'
    db.one(query, [discordId])
    .then(function (data) {
      //// console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      // console.log(err);
      cb(err);
    });
}

// start a quest line
module.exports.userStartQuest = function(discordUserId, questName, cb){
    var query;
    if (questName == "timetravel"){
        query = 'update ' + config.profileTable + ' set timetravelqueststage=1 where discordid=$1'        
    }else if (questName == "demonic"){
        query = 'update ' + config.profileTable + ' set demonicqueststage=1 where discordid=$1'        
    }else if (questName == "tomb"){
        query = 'update ' + config.profileTable + ' set tombqueststage=1 where discordid=$1'        
    }else if (questName == "ring"){
        query = 'update ' + config.profileTable + ' set ringqueststage=1 where discordid=$1'        
    }else if (questName == "escape"){
        query = 'update ' + config.profileTable + ' set escapequeststage=1 where discordid=$1'        
    }
    // do else for all questlines
    db.none(query, [discordUserId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'started quest for ' + questName
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateQuestlineStage = function(discordUserId, questline, stage, cb){
    var query;
    if (questline == "timetravel"){
        query = 'update ' + config.profileTable + ' set timetravelqueststage=$2 where discordid=$1'        
    }
    else if (questline == "demonic"){
        query = 'update ' + config.profileTable + ' set demonicqueststage=$2 where discordid=$1'        
    }
    else if (questline == "tomb"){
        query = 'update ' + config.profileTable + ' set tombqueststage=$2 where discordid=$1'        
    }
    else if (questline == "ring"){
        query = 'update ' + config.profileTable + ' set ringqueststage=$2 where discordid=$1'        
    }
    // do else for all questlines
    db.none(query, [discordUserId, stage])
    .then(function () {
    cb(null, {
        status: 'success',
        message: questline + " stage:" + stage
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// get items from itemsTable
module.exports.getItemData = function(cb) {
  var query = 'select * from ' + config.itemsTable
  // console.log(query);
  db.query(query)
    .then(function (data) {
      //// console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved All Items'
        });
    })
    .catch(function (err) {
      // console.log(err);
      cb(err);
    });
}

module.exports.getItemRecipes = function(cb) {
    var query = 'select * from ' + config.recipesTable
    // console.log(query);
    db.query(query)
      .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All recipes'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

module.exports.getUpgradeRequirements = function(cb) {
    var query = 'select * from ' + config.upgradeTable
    db.query(query)
    .then(function (data) {
    //// console.log(data);
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved All upgrade reqs'
        });
    })
    .catch(function (err) {
    // console.log(err);
    cb(err);
    });
}

// get specific item via id
module.exports.getItemById = function(itemId, cb) {
  var query = 'select * from ' + config.itemsTable + ' where id =$1'
  // console.log(query, [itemId]);
  db.one(query, [itemId])
    .then(function (data) {
      //// console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved Item'
        });
    })
    .catch(function (err) {
      // console.log(err);
      cb(err);
    });
}

// get specific item via ids for wear
module.exports.getItemByIdsWear = function(itemId, itemId2, itemId3, cb) {
    if (!itemId){
        itemId = 0
    }
    if (!itemId2){
        itemId2 = 0;
    }
    if (!itemId3){
        itemId3 = 0;
    }
    var query = 'select * from ' + config.itemsTable + ' where id =$1 or id = $2 or id = $3'
    // console.log(query, [itemId, itemId2, itemId3]);
    db.query(query, [itemId, itemId2, itemId3])
      .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved Item'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
  }

// store items on user's inventory
module.exports.addNewItemToUser = function(discordId, items, cb) {
    var inventoryItems = [];
    var itemobtaindate = new Date();
    let isArmament = false
    for (var item in items){
        if (items[item].itemAmount && items[item].itemAmount > 1){
            // insert more than 1 item
            for (var i = 0; i < items[item].itemAmount; i++){
                var inventoryItem = {
                    discordid: discordId,
                    itemid: items[item].id,
                    itemobtaindate: itemobtaindate
                }
                inventoryItems.push(inventoryItem);
            }
        }
        else{
            var inventoryItem = {
                discordid: discordId,
                itemid: items[item].id,
                itemobtaindate: itemobtaindate
            }
            if (items[item].armamentforitemid){
                inventoryItem.armamentforitemid = items[item].armamentforitemid
                inventoryItem.hpplus = items[item].hpplus
                inventoryItem.adplus = items[item].adplus
                inventoryItem.mdplus = items[item].mdplus
                inventoryItem.armorplus = items[item].armorplus
                inventoryItem.spiritplus = items[item].spiritplus
                inventoryItem.critplus = items[item].critplus
                inventoryItem.luckplus = items[item].luckplus
                isArmament = true
            }
            inventoryItems.push(inventoryItem);
        }
    }

    if (isArmament){
        var values = new Inserts('${discordid}, ${itemid} ,${itemobtaindate} ,${armamentforitemid} ,${hpplus} ,${adplus} ,${mdplus} ,${armorplus} ,${spiritplus} ,${critplus} ,${luckplus}', inventoryItems); // using Inserts as a type;
        db.none('INSERT INTO '  + config.inventoryTable + '(discordid, itemid, itemobtaindate, armamentforitemid, hpplus, adplus, mdplus, armorplus, spiritplus, critplus, luckplus) VALUES $1', values)
        .then(function (data) {
            cb(null, {
                status: 'success',
                data: data,
                message: 'added Item to users inventory'
            });
        })
        .catch(function (err) {
            // console.log(err);
            cb(err);
        }); 
    }else{
        var values = new Inserts('${discordid}, ${itemid} ,${itemobtaindate}', inventoryItems); // using Inserts as a type;
        db.none('INSERT INTO '  + config.inventoryTable + '(discordid, itemid, itemobtaindate) VALUES $1', values)
        .then(function (data) {
            cb(null, {
                status: 'success',
                data: data,
                message: 'added Item to users inventory'
            });
        })
        .catch(function (err) {
            // console.log(err);
            cb(err);
        }); 
    }
    
    
}

module.exports.bulkUpdateItemStatus = function(items, status, cb){

    var inventoryItems = []
    for (var item in items){
        var idOfItem = items[item].id
        inventoryItems.push({
            status : status,
            id : idOfItem
        })
    }

    const query = pgp.helpers.update(inventoryItems, ['id', 'status'], config.inventoryTableNoQuotes) + ' WHERE v.id = t.id';
    // console.log(query);
    db.none(query)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'set status for items'
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.bulkUpdateItemOwner = function(items, newOwner, cb){
    
        var inventoryItems = []
        for (var item in items){
            var idOfItem = items[item];
            inventoryItems.push({
                discordid: newOwner,
                id : idOfItem
            })
        }
    
        const q = pgp.helpers.update(inventoryItems, ['id', 'discordid'], config.inventoryTableNoQuotes) + ' WHERE v.id = t.id';
        // console.log(q);
        var query = q.replace(/'/g, "");
        
        db.none(query)
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'updated Owner of Items'
            });
        })
        .catch(function (err) {
            // console.log(err);
            cb(err);
        });
    }

module.exports.addUserReputation = function(discordId, reputationNumber, currentReputation, cb){
    var query = "";
    if (currentReputation == null){
        // reputation is zero - just set reputation to reputationNumber
        query = 'update ' + config.profileTable + ' set reputation=$1 where discordid=$2'
    }
    else{
        query = 'update ' + config.profileTable + ' set reputation=reputation+$1 where discordid=$2'
    }
    db.none(query, [reputationNumber, discordId])
    .then(function () {
        cb(null, {
            status: 'success',
            message: 'added reputation'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserReputation = function(discordId, reputationStatus, cb){
    var query = 'update ' + config.profileTable + ' set repstatus=$1 where discordid=$2'
    db.none(query, [reputationStatus, discordId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated reputation'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}
// update user soiledcrops
module.exports.updateUserSoiledCrops = function(discordId, soiledCrops, currentSoiledCrops, cb){
    var query = ""
    if (!currentSoiledCrops){
        query = 'update ' + config.profileTable + ' set soiledcrops=$1 where discordid=$2'
    }
    else{
        query = 'update ' + config.profileTable + ' set soiledcrops=soiledcrops+$1 where discordid=$2'
    }
    db.none(query, [soiledCrops, discordId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated soiledcrops'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.buyFlask = function(discordId, currentFlask, flaskCostForUser, cb){
    var query = ""
    var flask = 1;
    var flaskCost = flaskCostForUser;
    if (!currentFlask){
        query = 'update ' + config.profileTable + ' set flasks=$1, tacos=tacos-$3 where discordid=$2'
    }
    else{
        query = 'update ' + config.profileTable + ' set flasks=flasks+$1, tacos=tacos-$3 where discordid=$2'
    }
    db.none(query, [flask, discordId, flaskCost])
    .then(function () {
        cb(null, {
            status: 'success',
            message: 'added flask'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.consumeFlask = function(discordId, cb){
    var flask = 1;
    var query = 'update ' + config.profileTable + ' set flasks=flasks-$1 where discordid=$2'
    db.none(query, [flask, discordId])
    .then(function () {
        cb(null, {
            status: 'success',
            message: 'removed flask'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserRPGExperience = function(rpgpoints, rpglevel, userId, firstRPGExperienceGain, tacoRewards, cb){
    var query= "";
    if (!firstRPGExperienceGain){
        if (tacoRewards){
            query = 'update ' + config.profileTable + ' set tacos=tacos+$4, rpgpoints=$1, rpglevel=$3 where discordid=$2'
        }else{
            query = 'update ' + config.profileTable + ' set rpgpoints=$1, rpglevel=$3 where discordid=$2'
        }
    }
    else{
        if (tacoRewards){
            query = 'update ' + config.profileTable + ' set tacos=tacos+$4, rpgpoints=rpgpoints+$1, rpglevel=$3 where discordid=$2'
        }else{
            query = 'update ' + config.profileTable + ' set rpgpoints=rpgpoints+$1, rpglevel=$3 where discordid=$2'
        }
    }
    db.none(query, [rpgpoints, userId, rpglevel, tacoRewards])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added rpg experience'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserExperience = function(experience, level, userId, firstExperienceGain, tacoRewards, cb){
    var query= "";
    if (!firstExperienceGain){
        if (tacoRewards){
            query = 'update ' + config.profileTable + ' set tacos=tacos+$4, experience=$1, level=$3 where discordid=$2'
        }else{
            query = 'update ' + config.profileTable + ' set experience=$1, level=$3 where discordid=$2'
        }
    }
    else{
        if (tacoRewards){
            query = 'update ' + config.profileTable + ' set tacos=tacos+$4, experience=experience+$1, level=$3 where discordid=$2'
        }else{
            query = 'update ' + config.profileTable + ' set experience=experience+$1, level=$3 where discordid=$2'
        }
    }
    db.none(query, [experience, userId, level, tacoRewards])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added experience'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateRpgPoints = function(discordUserId, rpgPoints, firstRpgGain, cb){
    var query;
    if (!firstRpgGain){
        query = 'update ' + config.profileTable + ' set rpgpoints=$1 where discordid=$2'
    }
    else{
        query = 'update ' + config.profileTable + ' set rpgpoints=rpgpoints+$1 where discordid=$2'
    }
    db.none(query, [rpgPoints, discordUserId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added rpgpoints'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// update user's item status
module.exports.updateItemStatus = function(itemId, status, cb){
    var query = 'update ' + config.inventoryTable + ' set status=$1 where id=$2'
    //// console.log("new last thank: " + lastThank);
    db.none(query, [status, itemId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'set status for item' + itemId
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

module.exports.updateMarketItemSold = function(item, newOwner, cb){
    var itemId = item[0]
    var status = null
    var query = 'update ' + config.inventoryTable + ' set status=$1, discordid=$3,currentbid=$1,buyout=$1,currentbiduserid=$1,auctionenddate=$1,auctioncreatorchannel=$1,lastbidchannel=$1 where id=$2'
    db.none(query, [status, itemId, newOwner])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'set new owner for item: ' + itemId
        });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

// get market items
module.exports.getMarketItems = function(cb) {
    var query = 'select * from ' + config.inventoryTable + ' where status = $1 ORDER BY auctionenddate desc LIMIT 1000'
    // console.log(query);
    db.query(query, [ "market" ])
    .then(function (data) {
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved All User Items'
        });
    })
    .catch(function (err) {
    // console.log(err);
    cb(err);
    });
}

module.exports.unsoldMarketItem = function(itemId, cb){
    var status = null
    var query = 'update ' + config.inventoryTable + ' set status=$1, currentbid=$1, buyout=$1, currentbiduserid=$1,auctionenddate=$1,auctioncreatorchannel=$1,lastbidchannel=$1 where id=$2'
    db.none(query, [status, itemId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'reset market item' + itemId
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.postItemToMarket = function(params, cb){
    var status = "market"
    var buyout = params.buyout
    var currentbid = params.currentbid
    var creatorchannel = params.creatorchannel
    var auctionEndDate = params.auctionenddate
    var itemId = params.id
    
    var query = 'update ' + config.inventoryTable + ' set status=$1, currentbid=$3, buyout=$4,auctionenddate=$5,auctioncreatorchannel=$6 where id=$2'
    db.none(query, [status, itemId, currentbid, buyout , auctionEndDate, creatorchannel ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'posted market item' + itemId
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.bidOnMarketItem = function(params, cb){
    var currentbid = params.currentbid
    var bidderId = params.currentbiduserid
    var bidderChannel =  params.lastHighestbidderchannel
    var itemId = params.itemId

    var query = 'update ' + config.inventoryTable + ' set currentbid=$2,currentbiduserid=$3, lastbidchannel=$4 where id=$1'
    db.none(query, [itemId, currentbid, bidderId, bidderChannel ])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'posted market item' + itemId
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// get user's inventory
module.exports.getUserItems = function(discordId, cb) {
  var query = 'select * from ' + config.inventoryTable + ' where discordId = $1 AND status is null ORDER BY id DESC '
  // console.log(query);
  db.query(query, [discordId])
    .then(function (data) {
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved All User Items'
        });
    })
    .catch(function (err) {
      // console.log(err);
      cb(err);
    });
}

// get user's inventory by RARITY
module.exports.getUserItemsByRarity = function(discordId, rarity, cb) {
    var query = 'SELECT userinventorytable.* ' +
    'FROM ' + config.inventoryTable + ' AS userinventorytable ' +
    'INNER JOIN ' + config.itemsTable + ' AS itemstable ' +
    'ON userinventorytable.itemid = itemstable.id ' +
    'WHERE userinventorytable.discordId = $1 AND userinventorytable.status is null AND itemstable.itemraritycategory = $2'
    'ORDER BY userinventorytable.id DESC'
    
    if (rarity == "artifact"){
        // include artifact recipe
        query = 'SELECT userinventorytable.* ' +
        'FROM ' + config.inventoryTable + ' AS userinventorytable ' +
        'INNER JOIN ' + config.itemsTable + ' AS itemstable ' +
        'ON userinventorytable.itemid = itemstable.id ' +
        'WHERE userinventorytable.discordId = $1 AND userinventorytable.status is null AND ( itemstable.itemraritycategory = $2 OR itemstable.itemraritycategory = \'artifact+\')'
        'ORDER BY userinventorytable.id DESC'
    }
    // console.log(query);
    db.query(query, [discordId, rarity])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        console.log(err);
        cb(err);
      });
  }

// get user's inventory by RARITY
module.exports.getUserItemsByShortname = function(discordId, shortname, limit, cb) {
    var query = 'SELECT userinventorytable.* ' +
    'FROM ' + config.inventoryTable + ' AS userinventorytable ' +
    'INNER JOIN ' + config.itemsTable + ' AS itemstable ' +
    'ON userinventorytable.itemid = itemstable.id ' +
    'WHERE userinventorytable.discordId = $1 AND userinventorytable.status is null AND itemstable.itemshortname = $2'
    'ORDER BY userinventorytable.id DESC' +
    'LIMIT $3' 
    
    // console.log(query);
    db.query(query, [discordId, shortname, limit])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
  }

  module.exports.getUserItemsByShortnameForCombine = function(discordId, shortname, limit, cb) {
    var query = 'SELECT userinventorytable.* ' +
    'FROM ' + config.inventoryTable + ' AS userinventorytable ' +
    'INNER JOIN ' + config.itemsTable + ' AS itemstable ' +
    'ON userinventorytable.itemid = itemstable.id ' +
    'WHERE userinventorytable.discordId = $1 AND userinventorytable.status is null AND (itemstable.itemshortname = $2 OR itemstable.itemraritycategory = \'artifact+\')'
    'ORDER BY userinventorytable.id DESC' +
    'LIMIT $3' 
    
    // console.log(query);
    db.query(query, [discordId, shortname, limit])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
  }

module.exports.getUserItemsForRpg = function(discordId, cb) {
    // 'AND itemid > 12' was added since commons and uncommons arent needed for this call
    var query = 'select id, itemid, armamentforitemid, hpplus, adplus, mdplus, armorplus, spiritplus, critplus, luckplus from ' + config.inventoryTable + ' where discordId = $1 AND status is null AND itemid > 12 ORDER BY id DESC '
    // console.log(query);
    db.query(query, [discordId])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
  }

module.exports.getUserItemsForArmaments = function(discordId, cb) {
    var query = 'select * from ' + config.inventoryTable + ' where discordId = $1 AND (status is null OR status = \'wearing\') ORDER BY id DESC '
    // console.log(query);
    db.query(query, [discordId])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

module.exports.getUserArmamentForItem = function(discordId, itemid, cb) {
    var query = 'select * from ' + config.inventoryTable + ' where discordId = $1 AND armamentforitemid = $2 ORDER BY id DESC '
    // console.log(query);
    db.query(query, [discordId, itemid])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

// items for iteminfo
module.exports.getUserItemsForInfo = function(discordId, cb) {
    var query = 'select * from ' + config.inventoryTable + ' where discordId = $1 AND (status is null OR status = \'wearing\' ) ORDER BY id DESC '
    // console.log(query);
    db.query(query, [discordId])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved All User Items'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}
// get wear info
module.exports.getUserWearInfo = function(discordId, cb){
    var query = 'select * from ' + config.profileTable + ',' + config.wearTable + ',' + config.templeTable + ',' + config.greenhouseTable + ',' + config.stablesTable + ' where ' + config.profileTable + '.discordId = $1 AND ' + config.wearTable + '.discordId = $1 AND ' + config.templeTable + '.discordId = $1 AND ' + config.greenhouseTable + '.discordId = $1 AND ' + config.stablesTable + '.discordId = $1'

    // console.log(query);
    db.query(query, [discordId])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved user wear info'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

// update wear info
module.exports.updateUserWearInfo = function(discordId, slot, itemslot, itemid, itemuserid, activateDate, replacingCurrentSlot, cb){
    var query = "";
    if (slot == 1){
        query = 'update ' + config.wearTable + ' set slot1slot=$2, slot1itemid=$3, slot1useritemid=$4, activate1date=$6, slot1replacing=$7 where discordid=$5'
    }
    if (slot == 2){
        query = 'update ' + config.wearTable + ' set slot2slot=$2, slot2itemid=$3, slot2useritemid=$4, activate2date=$6, slot2replacing=$7 where discordid=$5'
    }
    if (slot == 3){
        query = 'update ' + config.wearTable + ' set slot3slot=$2, slot3itemid=$3, slot3useritemid=$4, activate3date=$6, slot3replacing=$7 where discordid=$5'
    }
    if (slot == 4){
        query = 'update ' + config.wearTable + ' set slot4slot=$2, slot4itemid=$3, slot4useritemid=$4, activate4date=$6, slot4replacing=$7 where discordid=$5'
    }
    if (slot == 5){
        query = 'update ' + config.wearTable + ' set slot5slot=$2, slot5itemid=$3, slot5useritemid=$4, activate5date=$6, slot5replacing=$7 where discordid=$5'
    }
    if (slot == 6){
        query = 'update ' + config.wearTable + ' set slot6slot=$2, slot6itemid=$3, slot6useritemid=$4, activate6date=$6, slot6replacing=$7 where discordid=$5'
    }
    if (slot == 7){
        query = 'update ' + config.wearTable + ' set slot7slot=$2, slot7itemid=$3, slot7useritemid=$4, activate7date=$6, slot7replacing=$7 where discordid=$5'
    }
    db.none(query, [slot, itemslot, itemid, itemuserid, discordId, activateDate, replacingCurrentSlot])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated wear info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// update wear info
module.exports.takeOffWear = function(discordId, slot, cb){
    var query = "";
    if (slot == 1){
        query = 'update ' + config.wearTable + ' set slot1slot=null, slot1itemid=null, slot1useritemid=null where discordid=$1'
    }
    if (slot == 2){
        query = 'update ' + config.wearTable + ' set slot2slot=null, slot2itemid=null, slot2useritemid=null where discordid=$1'
    }
    if (slot == 3){
        query = 'update ' + config.wearTable + ' set slot3slot=null, slot3itemid=null, slot3useritemid=null where discordid=$1'
    }
    if (slot == 4){
        query = 'update ' + config.wearTable + ' set slot4slot=null, slot4itemid=null, slot4useritemid=null where discordid=$1'
    }
    if (slot == 5){
        query = 'update ' + config.wearTable + ' set slot5slot=null, slot5itemid=null, slot5useritemid=null where discordid=$1'
    }
    if (slot == 6){
        query = 'update ' + config.wearTable + ' set slot6slot=null, slot6itemid=null, slot6useritemid=null where discordid=$1'
    }
    if (slot == 7){
        query = 'update ' + config.wearTable + ' set slot7slot=null, slot7itemid=null, slot7useritemid=null where discordid=$1'
    }
    db.none(query, [discordId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated wear info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// create wear info
module.exports.createUserWearInfo = function(data, cb){
    var query = 'insert into '+ config.wearTable + '(discordId, slot1replacing, slot2replacing, slot3replacing, slot4replacing)' +
    'values(${discordId}, ${slot1replacing}, ${slot2replacing}, ${slot3replacing}, ${slot4replacing} )'
    // console.log(query);
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'created wear info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// create stable info
module.exports.createUserStableInfo = function(data, cb){
    var query = 'insert into '+ config.stablesTable + '(discordId, stablelevel)' +
    'values(${discordId}, ${stablelevel} )'
    // console.log(query);
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'created stable info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// create greenhouse info
module.exports.createUserGreenHouseInfo = function(data, cb){
    var query = 'insert into '+ config.greenhouseTable + '(discordId, greenhouselevel, plotsofland)' +
    'values(${discordId}, ${greenhouselevel}, ${plotsofland} )'
    // console.log(query);
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'created greenhouse info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// create temple info
module.exports.createUserTempleInfo = function(data, cb){
    var query = 'insert into '+ config.templeTable + '(discordId, templelevel)' +
    'values(${discordId}, ${templelevel} )'
    // console.log(query);
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'created temple info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}
// create rpg profile
module.exports.createRpgProfile = function(data, cb){
    var query = 'insert into '+ config.userRpgProfileTable + '(discordId, currentarea)' +
    'values(${discordId}, ${currentarea} )'
    // console.log(query);
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'created rpg info'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

// create fruits profile
module.exports.createFruitsProfile = function(data, cb){
    var query = 'insert into '+ config.userFruitTable + '(discordId, tulips, roses, evergreens, cacti, palms, blossoms, apples, sunflowers, hibiscuses, bananas, pears, tangerines, eggplants)' +
    'values(${discordId}, ${tulips}, ${roses}, ${evergreens}, ${cacti}, ${palms}, ${blossoms}, ${apples}, ${sunflowers}, ${hibiscuses}, ${bananas}, ${pears}, ${tangerines}, ${eggplants})'
    // console.log(query);
    db.none(query, data)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'created fruit profile'
        });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.getUserRpgProfleData = function(discordId, cb){
    var query = 'select * from ' + config.userRpgProfileTable + ',' + config.profileTable + ' where ' + config.userRpgProfileTable + '.discordId = $1 AND ' + config.profileTable + '.discordId = $1'
    console.log(query)
    db.one(query, [discordId])
      .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved ONE user rpg profile'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

module.exports.getStableData = function(discordId, cb){
    var query = 'SELECT * ' +
    'FROM ' + config.profileTable + ' AS stabletable ' +
    'INNER JOIN ' + config.stablesTable + ' AS profiletable ' +
    'ON stabletable.discordid = profiletable.discordid ' + 
    'WHERE profiletable.discordid = $1'

    console.log(query)
    db.one(query, [discordId])
      .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved ONE user stables'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

module.exports.getTempleData = function(discordId, cb){
    var query = 'select * from ' + config.templeTable + ',' + config.profileTable + ' where ' + config.templeTable + '.discordId = $1 AND ' + config.profileTable + '.discordId = $1'
    console.log(query)
    db.one(query, [discordId])
      .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved ONE user temple'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

module.exports.updateTempleRecipes = function(userId, recipeInfo, cb) {
    // templecraft1id	templecraft2id	templecraft3id	
    var recipeColumns = []
    for (var column in recipeInfo){
        recipeColumns.push(column)
    }
    if (recipeColumns.length > 0){
        const query = pgp.helpers.update(recipeInfo, recipeColumns, config.templeTableNoQuotes) + ' WHERE discordid = ' + userId;
        db.none(query)
        .then(function () {
            cb(null, { status: 'success', message: 'updated columns in temple' });
        })
        .catch(function (err) {
            cb(err);
        });
    }else{
        cb("no columns");
    }
    
}

module.exports.getGreenHouseData = function(discordId, cb){
    var query = 'select * from ' + config.greenhouseTable + ',' + config.profileTable + ' where ' + config.greenhouseTable + '.discordId = $1 AND ' + config.profileTable + '.discordId = $1'
    console.log(query)
    db.one(query, [discordId])
      .then(function (data) {
        //// console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved ONE user greenhouse'
          });
      })
      .catch(function (err) {
        // console.log(err);
        cb(err);
      });
}

module.exports.updatePlotInfo = function(userId, plotInfo, cb) {
    // plotsofland	lastharvest	timesharvested	plotsoflanditemid	plotsoflandplantid
    var plotColumns = []
    for (var column in plotInfo){
        plotColumns.push(column)
    }
    const query = pgp.helpers.update(plotInfo, plotColumns, config.greenhouseTableNoQuotes) + ' WHERE discordid = ' + userId;
    db.none(query)
    .then(function () {
        cb(null, { status: 'success', message: 'updated columns in greenhouse' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.upgradeGreenHouse = function(userId, cb) {
    var lastupgrade = new Date();
    var query = 'update ' + config.greenhouseTable + ' set greenhouselevel=greenhouselevel+1,lastgreenhouseupgrade=$2 where discordid=$1'
    db.none(query, [userId, lastupgrade])
    .then(function () {
        cb(null, { status: 'success', message: 'upgraded greenhouse' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.upgradeStable = function(userId, cb) {
    var lastupgrade = new Date();
    var query = 'update ' + config.stablesTable + ' set stablelevel=stablelevel+1,laststableupgrade=$2 where discordid=$1'
    db.none(query, [userId, lastupgrade])
    .then(function () {
        cb(null, { status: 'success', message: 'upgraded stable' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.upgradeTemple = function(userId, cb) {
    var lastupgrade = new Date();
    var query = 'update ' + config.templeTable + ' set templelevel=templelevel+1,lasttempleupgrade=$2 where discordid=$1'
    db.none(query, [userId, lastupgrade])
    .then(function () {
        cb(null, { status: 'success', message: 'upgraded temple' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.getFruitData = function(discordId, cb){
    var query = 'select * from ' + config.userFruitTable + ',' + config.profileTable + ' where ' + config.userFruitTable + '.discordId = $1 AND ' + config.profileTable + '.discordId = $1'
    console.log(query)
    db.one(query, [discordId])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved ONE user greenhouse'
          });
      })
      .catch(function (err) {
        cb(err);
      });
}

// update a single fruit column in fruits table
module.exports.updateUserFruits = function(userId, fruit, fruitcount, cb) {
    var query = 'update ' + config.userFruitTable + ' set $3=$3+$1 where discordid=$2'
    db.none(query, [fruitcount, userId, fruit])
    .then(function () {
        cb(null, { status: 'success', message: 'added fruits' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateUserCommandToggle = function(userId, command, channelId, toggle, cb) {
    var query = 'update ' + config.profileTable + ' set ' + command + 'toggle=$3, ' + command + 'togglechannel = $4 where discordid=$2'
    db.none(query, [ command, userId, toggle, channelId ])
    .then(function () {
        cb(null, { status: 'success', message: 'added command toggle' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.updateCommandNextReminder = function(userId, command, nextReminder, cb) {
    var query = 'update ' + config.profileTable + ' set ' + command + 'nextreminder=$3 where discordid=$2'
    db.none(query, [ command, userId, nextReminder ])
    .then(function () {
        cb(null, { status: 'success', message: 'updated command next reminder' });
    })
    .catch(function (err) {
        cb(err);
    });
}

module.exports.getRemindersForUsers = function(cb) {
    var query = 'select * from ' + config.profileTable + ' where scavengetoggle = true OR thanktoggle = true OR sorrytoggle = true OR fetchtoggle = true OR harvesttoggle = true OR cooktoggle = true OR preparetoggle = true OR dailytoggle = true'
    db.query(query, [ ])
    .then(function (data) {
    cb(null, {
        status: 'success',
        data: data,
        message: 'Retrieved All users with reminders'
        });
    })
    .catch(function (err) {
    // console.log(err);
    cb(err);
    });
}

module.exports.bulkupdateUserFruits = function(userId, fruits, increment, cb){
    
    var fruitNames = []
    var columnSymbol = increment ? '+' : '-'
    for (var fruit in fruits){
        fruitNames.push(
        {
            name: fruit,
            init: c => c.name + columnSymbol + c.value,
            mod: ':raw'
        })
    }
    const Column = pgp.helpers.ColumnSet(fruitNames)
    const query = pgp.helpers.update(fruits, Column, config.userFruitTableNoQuotes) + ' WHERE discordid = ' + userId

    db.none(query)
    .then(function () {
        cb(null, { status: 'success', message: 'updated columns' });
    })
    .catch(function (err) {
        // console.log(err);
        cb(err);
    });
}

// get hacksaw, and improvements

// rpg keystone unlock 1 - x

// feed pet

// train pet

// update plant slot

// create cake??

// obtain shears

// Concatenates an array of objects or arrays of values, according to the template,
// to use with insert queries. Can be used either as a class type or as a function.
//
// template = formatting template string
// data = array of either objects or arrays of values
function Inserts(template, data) {
    if (!(this instanceof Inserts)) {
        return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
        return data.map(d=>'(' + pgp.as.format(template, d) + ')').join();
    };
}
