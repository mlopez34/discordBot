'use strict'
var profileDB = require("./profileDB.js");
// functions for using each item

module.exports.useRock = function(message, mentionedUserId, rockToUse, cb){
    //use the rock at the user
    // create the roll
    var successThrowRockRoll = Math.floor(Math.random() * 100) + 1;
    var knockTacoOff = false;
    if (successThrowRockRoll > 10){
        knockTacoOff = true
    }
    console.log(successThrowRockRoll)
    // get the mentionedUser's inventory
    if (mentionedUserId && knockTacoOff){
        profileDB.getUserProfileData( mentionedUserId, function(err, getProfileResponse) {
            if(err){
                 // user does not exist
                 console.log(err);
                 cb(err);
            }
            else{
                var protection = getProfileResponse.data.protect;
                // if protection then drop protection by 1
                if (protection && protection > 0){
                    profileDB.updateUserProtect(mentionedUserId, -1, protection, function(updateerr, updateResponse) {
                        if (updateerr){
                            console.log(updateerr);
                            cb(updateerr);
                        }
                        else{
                            console.log(updateResponse);
                            cb(null, "protection")
                        }
                    })
                }
                else if (!protection || getProfileResponse.data.protect == 0){
                    // user has no protecton, drop tacos
                    // update the mentioned user's tacos if they have tacos to drop
                    if (getProfileResponse.data.tacos > 0){
                        profileDB.updateUserTacos(mentionedUserId, -1, function(updateerr, updateResponse) {
                            if (updateerr){
                                console.log(updateerr);
                                cb(updateerr);
                            }
                            else{
                                console.log(updateResponse);
                                // update users Inventory - remove a rock - mark the rock as used
                                profileDB.updateItemStatus(rockToUse.id, "used", function(updateRockStatusErr, updateRockStatusRes){
                                    if (updateRockStatusErr){
                                        console.log(updateRockStatusErr);
                                        cb(updateRockStatusErr);
                                    }
                                    else{
                                        console.log(updateRockStatusRes);
                                        cb(null, "success")
                                    }
                                })
                            }
                        })
                    }
                    else{
                        cb("user doesn't have tacos to drop");
                    }
                }
            }
        })
    }
    else{
        console.log(successThrowRockRoll)
        cb("failed")
    }
}

module.exports.usePieceOfWood = function(message, discordUserId, piecesOfWoodToUse, cb){
    // update inventory
    if (piecesOfWoodToUse.length == 5){
        profileDB.getUserProfileData(discordUserId, function(getProfileErr, getProfileRes){
            if (getProfileErr){
                console.log(getProfileErr);
            }
            else{
                var protection = getProfileRes.data.protect;
                console.log("protection " + protection);
                if (protection == null){
                    console.log("protection is null!")
                }
                // update protect for the user
                profileDB.updateUserProtect(discordUserId, 2, protection, function(updateerr, updateResponse) {
                    if (updateerr){
                        console.log(updateerr);
                        cb(updateerr);
                    }
                    else{
                        console.log(updateResponse);
                        // update user inventory
                        profileDB.bulkUpdateItemStatus(piecesOfWoodToUse, "used", function(updateBulkErr, updateBulkRes){
                            if (updateBulkErr){
                                console.log(updateBulkErr);
                                cb(updateBulkErr);
                            }
                            else{
                                console.log(updateBulkRes);
                                cb(null, "success")
                            }
                        })
                    }
                })
            }
        })
       
    }
}

module.exports.itemValidate = function (item){
    var valid = true;
    if (item.status == "used"){
        valid = false;
    }
    return valid;
}