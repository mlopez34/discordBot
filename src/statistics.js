var config = require("./config.js");
var profileDB = require("./profileDB.js");

module.exports.statisticsManage = function(discordUserId, columnName, statisticCount, cb) { 
    // if exists update otherwise create
    profileDB.checkStatistics(discordUserId, function(err, res){
        if (err){
            // user doesnt exist, create it
            profileDB.createUserStatistics(discordUserId, columnName, statisticCount, function(err, statSuccess){
                if (err){
                    console.log(err);
                }
                else{
                    // check achievements??
                    cb(null, statSuccess)
                }
            })
        }
        else{
            // update user
            profileDB.updateStatistics(discordUserId, columnName, statisticCount, function(err, statSuccess){
                if (err){
                    console.log(err);
                }
                else{
                    // check achievements??
                    cb(null, statSuccess)
                }
            })
        }
    })
}