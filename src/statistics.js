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
            // get user statistic first if the statistic is null then updated it as =
            var columnStatistic = res.data[columnName];
            console.log("column statistic: " + columnStatistic + " column name: " + columnName );
            if (columnStatistic){
                // if it exists just update as normal
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
            else{
                profileDB.updateSingleStatistic(discordUserId, columnName, statisticCount, function(err, statSuccess){
                    if (err){
                        console.log(err);
                    }
                    else{
                        // check achievements??
                        cb(null, statSuccess)
                    }
                })
            }
        }
    })
}