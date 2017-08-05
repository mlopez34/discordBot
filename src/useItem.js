'use strict'
var profileDB = require("./profileDB.js");
// functions for using each item

module.exports.useRock = function(message, mentionedUserId, rockToUse, cb){
    //use the rock at the user
    // create the roll
    var successThrowRockRoll = Math.floor(Math.random() * 100) + 1;
    var knockTacoOff = false;
    if (successThrowRockRoll > 1){
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
        })
    }
    else{
        console.log(successThrowRockRoll)
        cb("failed")
    }
    
    // update inventory

    // update tacos for mentioned user
}

module.exports.usePieceOfWood = function(message, mentionedUser){
    // update inventory

    // update tacos for mentioned user
}

module.exports.itemValidate = function (item){
    var valid = true;
    if (item.status == "used"){
        valid = false;
    }
    return valid;
}