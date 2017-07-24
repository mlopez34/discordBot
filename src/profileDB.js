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
      //console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
}

module.exports.createUserProfile = function(data, cb) {
  var query = 'insert into '+ config.profileTable + '(discordId, tacos, birthdate, lastthanktime, lastsorrytime, lastcooktime, lastscavangetime, tacostands, welcomed, lastpreparetime, pickaxe, map, phone)' +
      'values(${discordId}, ${tacos}, ${birthdate}, ${lastthanktime},  ${lastsorrytime}, ${lastcooktime}, ${lastscavangetime}, ${tacostands}, ${welcomed}, ${lastpreparetime}, ${pickaxe}, ${map}, ${phone})'
  db.none(query, data)
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

module.exports.updateUserTacosThank = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastthanktime=$3 where discordid=$2'
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
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

module.exports.updateUserTacosSorry = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastsorrytime=$3 where discordid=$2'
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
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
    //console.log("new last thank: " + lastThank);
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

module.exports.updateUserTacosWelcome = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, welcomed=$3 where discordid=$2'
    var welcomed = true;
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId, welcomed])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.updateUserTacosGive = function(userId, tacoAmount, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacoAmount, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.updateUserTacosThrow = function(userId, tacoAmount, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacoAmount, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.updateUserPasta = function( userId, pastaTacoCost, pasta, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, pasta=$3 where discordid=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [pastaTacoCost, userId, pasta])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'added tacos'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.purchasePickAxe = function(userId, tacosSpent, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, pickaxe=$3 where discordid=$2'
    console.log(query)
    var lastThank = new Date();
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacosSpent, userId, "basic"])
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

module.exports.purchaseTacoStand = function(userId, tacosSpent, currentTacoStands, cb){
    console.log(currentTacoStands);
    let tacoStand = 1;
    if (currentTacoStands){
        var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, tacostands=tacostands+$3 where discordid=$2'
        console.log(query)
        var lastThank = new Date();
        //console.log("new last thank: " + lastThank);
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
        console.log(query)
        var lastThank = new Date();
        //console.log("new last thank: " + lastThank);
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

module.exports.prepareTacos = function(userId, tacosToPrepare, cb){
    // update tacos and lastprepare
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastpreparetime=$3 where discordid=$2'
    var lastprepare = new Date();
    //console.log("new last thank: " + lastThank);
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

module.exports.updateAchievements = function(discordUserId, achievement, cb){
    // update statistic
    var query = 'update ' + config.profileTable + ' set achievements = achievements || $1 where discordid=$2'
    //console.log("new last thank: " + lastThank);
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
    //console.log("new last thank: " + lastThank);
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

module.exports.createUserStatistics = function(userId, columnName, statisticCount, cb) {
    var userStatistics = {
        discordId: userId,
        thankCount: 0,
        sorryCount: 0,
        welcomeCount: 0,
        scavengeCount: 0,
        thrownAtCount: 0,
        thrownToCount: 0,
        giveCount: 0
    }
  userStatistics[columnName] = statisticCount
  var query = 'insert into '+ config.statisticsTable + '(discordId, thankCount, sorryCount, welcomeCount, scavengeCount, thrownAtCount, thrownToCount, giveCount)' +
      'values(${discordId}, ${thankCount}, ${sorryCount}, ${welcomeCount},  ${scavengeCount}, ${thrownAtCount}, ${thrownToCount}, ${giveCount})'
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
      //console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
}

// get items
module.exports.getItemData = function(cb) {
  var query = 'select * from ' + config.itemsTable
  console.log(query);
  db.query(query)
    .then(function (data) {
      //console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved All Items'
        });
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
}

// store items on user's inventory