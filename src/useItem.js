'use strict'
var profileDB = require("./profileDB.js");
var reputation = require("./reputation.js")
// functions for using each item

module.exports.useRock = function(message, mentionedUserId, rockToUse, tacosInUse, cb){
    //use the rock at the user
    // create the roll
    var successThrowRockRoll = Math.floor(Math.random() * 100) + 1;
    var knockTacoOff = false;
    if (successThrowRockRoll > 1){
        knockTacoOff = true
    }
    // console.log(successThrowRockRoll)
    // get the mentionedUser's inventory
    if (mentionedUserId && knockTacoOff){
        profileDB.getUserProfileData( mentionedUserId, function(err, getProfileResponse) {
            if(err){
                 // user does not exist
                 // console.log(err);
                 cb(err);
            }
            else{
                var protection = getProfileResponse.data.protect;
                // if protection then drop protection by 1
                if (protection && protection > 0){
                    profileDB.updateUserProtect(mentionedUserId, -1, protection, function(updateerr, updateResponse) {
                        if (updateerr){
                            // console.log(updateerr);
                            cb(updateerr);
                        }
                        else{
                            // console.log(updateResponse);
                            profileDB.updateItemStatus(rockToUse.id, "used", function(updateRockStatusErr, updateRockStatusRes){
                                if (updateRockStatusErr){
                                    // console.log(updateRockStatusErr);
                                    cb(updateRockStatusErr);
                                }
                                else{
                                    // console.log(updateRockStatusRes);
                                    cb(null, "protection")
                                }
                            })
                        }
                    })
                }
                else if (!protection || getProfileResponse.data.protect == 0){
                    // user has no protecton, drop tacos
                    // update the mentioned user's tacos if they have tacos to drop
                    if (getProfileResponse.data.tacos > 0){
                        profileDB.updateUserTacos(mentionedUserId, -1, function(updateerr, updateResponse) {
                            if (updateerr){
                                // console.log(updateerr);
                                cb(updateerr);
                            }
                            else{
                                // console.log(updateResponse);
                                // update users Inventory - remove a rock - mark the rock as used
                                profileDB.updateItemStatus(rockToUse.id, "used", function(updateRockStatusErr, updateRockStatusRes){
                                    if (updateRockStatusErr){
                                        // console.log(updateRockStatusErr);
                                        cb(updateRockStatusErr);
                                    }
                                    else{
                                        // console.log(updateRockStatusRes);
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
        // console.log(successThrowRockRoll)
        cb("failed")
    }
}

module.exports.usePieceOfWood = function(message, discordUserId, piecesOfWoodToUse, cb){
    // update inventory
    if (piecesOfWoodToUse.length == 5){
        profileDB.getUserProfileData(discordUserId, function(getProfileErr, getProfileRes){
            if (getProfileErr){
                // console.log(getProfileErr);
            }
            else{
                var protection = getProfileRes.data.protect;
                // console.log("protection " + protection);
                if (protection == null){
                    // console.log("protection is null!")
                }
                // update protect for the user
                profileDB.updateUserProtect(discordUserId, 3, protection, function(updateerr, updateResponse) {
                    if (updateerr){
                        // console.log(updateerr);
                        cb(updateerr);
                    }
                    else{
                        // console.log(updateResponse);
                        // update user inventory
                        profileDB.bulkUpdateItemStatus(piecesOfWoodToUse, "used", function(updateBulkErr, updateBulkRes){
                            if (updateBulkErr){
                                // console.log(updateBulkErr);
                                cb(updateBulkErr);
                            }
                            else{
                                // console.log(updateBulkRes);
                                cb(null, "success")
                            }
                        })
                    }
                })
            }
        })
       
    }
}

module.exports.useTerryCloth =  function(message, discordUserId, terryClothToUse, listOfRares, cb){
    if (terryClothToUse.length == 5){
        // roll 20% is a rare
        var rollTerryClothRare = Math.floor(Math.random() * 100) + 1;
        // console.log(rollTerryClothRare);
        if (rollTerryClothRare >= 95){
            // add a rare item to user's inventory from all the rares
            // roll for a rare
            // console.log(listOfRares);
            var indexOfRare = Math.floor(Math.random() * listOfRares.length);
            var rareWon = [listOfRares[indexOfRare]];
            profileDB.addNewItemToUser(discordUserId, rareWon, function(error, response){
                if (error){
                    // console.log("couldnt add item");
                    cb("error");
                }
                else{
                    // added item, use the terry cloths
                    profileDB.bulkUpdateItemStatus(terryClothToUse, "used", function(updateBulkErr, updateBulkRes){
                        if (updateBulkErr){
                            // console.log(updateBulkErr);
                            cb(updateBulkErr);
                        }
                        else{
                            // console.log(updateBulkRes);
                            cb(null, rareWon);
                        }
                    })
                }
            });
        }
        else if (rollTerryClothRare >= 60){
            // add tacos to user
            profileDB.updateUserTacos(discordUserId, 5, function(tacosError, tacosRes){
                if (tacosError){
                    // console.log(tacosError);
                    cb(tacosError);
                }
                else{
                    // console.log(tacosRes);
                    profileDB.bulkUpdateItemStatus(terryClothToUse, "used", function(updateBulkErr, updateBulkRes){
                        if (updateBulkErr){
                            // console.log(updateBulkErr);
                            cb(updateBulkErr);
                        }
                        else{
                            // console.log(updateBulkRes);
                            cb(null, 5)
                        }
                    })
                }
            })
            
        }
        else{
            // add tacos to user
            profileDB.updateUserTacos(discordUserId, 2, function(tacosError, tacosRes){
                if (tacosError){
                    // console.log(tacosError);
                    cb(tacosError);
                }
                else{
                    // console.log(tacosRes);
                    profileDB.bulkUpdateItemStatus(terryClothToUse, "used", function(updateBulkErr, updateBulkRes){
                        if (updateBulkErr){
                            // console.log(updateBulkErr);
                            cb(updateBulkErr);
                        }
                        else{
                            // console.log(updateBulkRes);
                            cb(null, 2)
                        }
                    })
                }
            })
        }
    }
}

module.exports.useSodaCan = function(message, discordUserId, sodaCansToUse, cb){
    // update reputation
    var REP_GAIN_PER_CAN = 1;
    reputation.gainReputation(message, discordUserId, (REP_GAIN_PER_CAN * sodaCansToUse.length) , function(error, response){
        if (error){
            // console.log(error);
            cb(error);
        }
        else{
            // gained rep successfully
            // console.log(response);
            // use the item
            profileDB.bulkUpdateItemStatus( sodaCansToUse, "used", function(updateSodaCanStatusErr, updateSodaCanStatusRes ){
                if (updateSodaCanStatusErr){
                    // console.log(updateSodaCanStatusErr);
                    cb(updateSodaCanStatusErr);
                }
                else{
                    // console.log(updateSodaCanStatusRes);
                    cb(null, response);
                }
            })
        }
    })
}

module.exports.useSoil = function(message, discordUserId, soilToUse, cb){
    // use soil, update the user's soiledcrops by +1, update user's inventory as used
    if (discordUserId && soilToUse){
        profileDB.getUserProfileData(discordUserId, function(getProfileErr, getProfileRes){
            if (getProfileErr){
                // console.log(getProfileErr);
                cb(getProfileErr);
            }
            else{
                var currentCropsSoiled = getProfileRes.data.soiledcrops;
                var soiledCrops = soilToUse.length;
                profileDB.updateUserSoiledCrops(discordUserId, soiledCrops, currentCropsSoiled, function(error, response){
                    if (error){
                        // console.log(error);
                        cb(error);
                    }
                    else{
                        // console.log(response);
                        // use the item
                        profileDB.bulkUpdateItemStatus(soilToUse, "used", function(updateSodaCanStatusErr, updateSodaCanStatusRes){
                            if (updateSodaCanStatusErr){
                                // console.log(updateSodaCanStatusErr);
                                cb(updateSodaCanStatusErr);
                            }
                            else{
                                // console.log(updateSodaCanStatusRes);
                                var cropsCount;
                                if (currentCropsSoiled){
                                    cropsCount = currentCropsSoiled + soiledCrops;
                                }
                                else{
                                    cropsCount = soiledCrops;
                                }
                                cb(null, cropsCount)
                            }
                        })
                    }
                })
            }
        })
    }
    else{
        cb("failed");
    }
}

module.exports.useBasedOnShortName = function(message, discordid, itemshortname, userInventoryCountMap, userInventory, cb){
    // get all items, map by itemshortname as key, if it matches an item then use the item
    profileDB.getItemData(function(error, allItemsResponse){
        if (error){
            // console.log(error);
            cb("failed");
        }
        else{
            var itemsMapbyName = {};
            for (var index in allItemsResponse.data){
                itemsMapbyName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
            }
            // 
            if (itemsMapbyName[itemshortname]){
                // item exists, use the item and remove from user inventory
                if (itemshortname == "adventurer"
                    || itemshortname == "culinary"
                    || itemshortname == "roleplaying"
                    || itemshortname == "wild"
                    || itemshortname == "satisfying"
                    || itemshortname == "guilt"
                    || itemshortname == "productivity"){
                    // use a potion from inventory
                    var idOfItemToUse = itemsMapbyName[itemshortname].id;
                    var itemInInventoryCount = userInventoryCountMap[idOfItemToUse]
                    // look for an item in my inventory that has the above id
                    if (itemInInventoryCount > 0){
                        var potionToUse = undefined;
                        for (var item in userInventory){
                            // check the rock hasnt been used
                            var validItem = exports.itemValidate(userInventory[item]);
                            if (validItem){
                                // item hasnt been added to be counted, add it as 1
                                if (userInventory[item].itemid == idOfItemToUse){
                                    potionToUse = userInventory[item];
                                    break;
                                }
                            }
                        }
                        // use the potion
                        if (potionToUse){
                            profileDB.updateItemStatus(potionToUse.id, "used", function(updatePotionErr, updatePotionRes){
                                if (updatePotionErr){
                                    cb(updatePotionErr);
                                }
                                else{
                                    // used the potion, reduce the command that the potion affects by 1 hour
                                    reduceCommandCooldown(discordid, itemsMapbyName[itemshortname].command, function(reduceErr, reduceRes){
                                        if (reduceErr){
                                            message.channel.send("Something went wrong, call 911")
                                            cb("failed");
                                        }else{
                                            message.channel.send( message.author + " used a **" + itemsMapbyName[itemshortname].itemname + "**, they reduced their " + itemsMapbyName[itemshortname].command + " command cooldown by `1 hour`");                                                                
                                            cb(null, "success")
                                        }
                                    })
                                }
                            })
                        }else{
                            cb("failed")
                        }
                    }else{
                        cb("failed");
                    }
                }
            }else{
                cb("failed");
            }
        }
    })
}

function reduceCommandCooldown(discordUserId, command, cb){
    profileDB.getUserProfileData(discordUserId, function(err, profileRes){
        if (err){
            console.log(err);
            cb(err);
        }else{
            var userProfile = profileRes.data;

            profileDB.reduceCommandCooldownByHour(discordUserId, command, userProfile, function(err, res){
                if (err){
                    cb(err);
                }else{
                    cb(null, "success");
                }
            })
        }
    })
    
}

module.exports.useUncommons = function(message, discordid, uncommons, cb){
    if (discordid && uncommons.length > 0){
        profileDB.bulkUpdateItemStatus(uncommons, "used", function(updateBulkErr, updateBulkRes){
            if (updateBulkErr){
                // console.log(updateBulkErr);
                cb(updateBulkErr);
            }
            else{
                // console.log(updateBulkRes);
                cb(null, "success")
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

module.exports.itemNotWearing = function (item){
    var valid = true;
    if (item.status == "wearing"){
        valid = false;
    }
    return valid;
}