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

module.exports.updateLastScavengeTime = function(userId, cb) {
    var query = 'update ' + config.profileTable + ' set lastscavangetime=$2 where discordid=$1'
    var lastScavenge = new Date();
    //console.log("new last thank: " + lastThank);
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
    //console.log("new last thank: " + lastThank);
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

module.exports.updateUserTacos = function(userId, tacos, cb) {
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1 where discordid=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [tacos, userId])
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

// update protect
module.exports.updateUserProtect = function(userId, protectNumber, protection , cb) {
    var query = '';
    if (protection == null ){;
        query = 'update ' + config.profileTable + ' set protect=$1 where discordid=$2'
    }
    else{
        query = 'update ' + config.profileTable + ' set protect=protect+$1 where discordid=$2'
    }
    console.log(protectNumber + " before query")
    db.none(query, [protectNumber, userId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'updated protect'
        });
    })
    .catch(function (err) {
        console.log(err);
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
        console.log(err);
        cb(err);
    });
}

module.exports.purchasePickAxe = function(userId, tacosSpent, cb){
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, pickaxe=$3 where discordid=$2'
    console.log(query)
    var lastThank = new Date();
    var selectedPickaxe = "basic"
    if (tacosSpent <= -100 && tacosSpent >= -500){
        // improved Pickaxe should always be between 100 and 500
        selectedPickaxe = "improved";
    }
    else if (tacosSpent <= -500 ){
        selectedPickaxe = "master";
    }
    //console.log("new last thank: " + lastThank);
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
    var query = 'update ' + config.profileTable + ' set tacos=tacos+$1, lastpreparetime=$3, soiledcrops=0 where discordid=$2'
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

module.exports.getTopTenTacoUsers = function(cb) {
  var query = 'select * from ' + config.profileTable + ' order by tacos DESC LIMIT 50'
  db.query(query)
    .then(function (data) {
      //console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved top ten users'
        });
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
}

module.exports.getToplistUsers = function(cb) {
    var query = 'select * from ' + config.profileTable + ' where experience is not null order by experience DESC LIMIT 50'
    db.query(query)
      .then(function (data) {
        //console.log(data);
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

module.exports.updateSingleStatistic = function(userId, columnName, statisticCount, cb){
    // update statistic
    var query = 'update ' + config.statisticsTable + ' set ' + columnName + '=$1 where discordid=$2'
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
        giveCount: 0,
        rocksthrown: 0,
        maxextratacos: 0,
        tailorcount: 0, 
        poisonedtacoscount: 0,
        tacospickedup: 0,
        slotscount: 0,
        soilcount: 0
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

// start a quest line
module.exports.userStartQuest = function(discordUserId, questName, cb){
    var query;
    if (questName == "timetravel"){
        query = 'update ' + config.profileTable + ' set timetravelqueststage=1 where discordid=$1'        
    }
    // do else for all questlines
    db.none(query, [discordUserId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'started quest for demonic'
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

// get specific item via id
module.exports.getItemById = function(itemId, cb) {
  var query = 'select * from ' + config.itemsTable + ' where id =$1'
  console.log(query, [itemId]);
  db.one(query, [itemId])
    .then(function (data) {
      //console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved Item'
        });
    })
    .catch(function (err) {
      console.log(err);
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
    console.log(query, [itemId, itemId2, itemId3]);
    db.query(query, [itemId, itemId2, itemId3])
      .then(function (data) {
        //console.log(data);
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved Item'
          });
      })
      .catch(function (err) {
        console.log(err);
        cb(err);
      });
  }

// store items on user's inventory
module.exports.addNewItemToUser = function(discordId, items, cb) {
    var inventoryItems = [];
    var itemobtaindate = new Date();
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
            inventoryItems.push(inventoryItem);
        }
    }
    
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
        console.log(err);
        cb(err);
    }); 
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
    console.log(query);
    db.none(query)
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'set status for items'
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

module.exports.bulkUpdateItemOwner = function(items, newOwner, cb){
    
        var inventoryItems = []
        for (var item in items){
            var idOfItem = items[item]
            inventoryItems.push({
                status : null,
                discordid: newOwner,
                id : idOfItem
            })
        }
    
        const q = pgp.helpers.update(inventoryItems, ['id', 'discordid', 'status'], config.inventoryTableNoQuotes) + ' WHERE v.id = t.id';
        console.log(q);
        var query = q.replace(/'/g, "");
        
        db.none(query)
        .then(function () {
        cb(null, {
            status: 'success',
            message: 'updated Owner of Items'
            });
        })
        .catch(function (err) {
            console.log(err);
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

// update user's item status
module.exports.updateItemStatus = function(itemId, status, cb){
    var query = 'update ' + config.inventoryTable + ' set status=$1 where id=$2'
    //console.log("new last thank: " + lastThank);
    db.none(query, [status, itemId])
    .then(function () {
    cb(null, {
        status: 'success',
        message: 'set status for item' + itemId
        });
    })
    .catch(function (err) {
        console.log(err);
        cb(err);
    });
}

// get user's inventory
module.exports.getUserItems = function(discordId, cb) {
  var query = 'select * from ' + config.inventoryTable + ' where discordId = $1 AND status is null '
  console.log(query);
  db.query(query, [discordId])
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
// get wear info
module.exports.getUserWearInfo = function(discordId, cb){
    var query = 'select * from ' + config.wearTable + ' where discordId = $1'
    console.log(query);
    db.query(query, [discordId])
      .then(function (data) {
        cb(null, {
            status: 'success',
            data: data,
            message: 'Retrieved user wear info'
          });
      })
      .catch(function (err) {
        console.log(err);
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
    var query = 'insert into '+ config.wearTable + '(discordId, slot1replacing, slot2replacing, slot3replacing)' +
    'values(${discordId}, ${slot1replacing}, ${slot2replacing}, ${slot3replacing} )'
    console.log(query);
    db.none(query, data)
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