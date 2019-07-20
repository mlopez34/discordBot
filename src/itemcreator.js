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

// create items with predetermined names
let slots = [
    "weapon",
    "legs",
    "chest",
    "hands",
    "feet",
    "wrist",
    "waist",
    "finger",
    "shoulders",
    "head",
    "neck"
]

let slotNames = {
    weapon: ["Staff", "Wand", "Sword", "Baton", "Revolver", "Dagger", "Handcannon"],
    legs: [ "Leggings", "Legguards"],
    chest: ["Chainmail", "Breastplate"],
    hands: ["Gloves", "Handguards"],
    feet: ["Boots", "Sandals"],
    wrist: ["Wristbands", "Cuffs"],
    waist: ["Belt", "Waistguard"],
    finger: ["Ring"],
    shoulders: ["Shoulderpads", "Pauldrons"],
    head: ["Helmet", "Mask"],
    neck: ["Necklace"]
}

let ofTheNamesRares = [
    "Beast",
    "Whale",
    "Eagle",
    "Bear",
    "Monkey",
    "Wolf",
    "Rabbit",
    "Cheetah",
    "Fox",
    "Tiger",
    "Horse",
    "Lion"
]

let ofTheNamesAncients = [
    "Cobra",
    "Hydra",
    "Silverback",
    "Scorpion",
    "Chimera",
    "Sphinx",
    "Centaur",
    "Phoenix",
    "Minotaur",
    "Dragon",
    "Leviathan"
]

let abilitiesToUse = {
  // list of abilities
  phys: [
    "assist",
    "impale",
    "recuperate",
    "poke",
    "smash",
    "uppercut",
    "slash",
    "whirlwind",
    "shoot",
    "plasmabeam",
    "pumped",
    "tackle",

  ],
  mag: [
    "nourish",
    "tacoheal",
    "sanctuary",
    "orchatasip",
    "elixir",
    "curse",
    "flameblast",
    "poison",
    "iceshards",
    "shock",
    "meditate",
    "guac",


  ],
  support: [
    "cocoon",
    "paralyze",
    "bandaid",
    "tacowall",
    "shield",
    "barrier",
    "protect",
    "empower",
    "haste",
    "revive",
    "freeze",
    "scold",
    "cripple",
    "weaken",
    
  ],
  tank: [
    "recover",
    "shell",
    "slash",
    "tacoheal",
    "tacoheal",
    "rockthrow",
    "rockthrow",
    "drain",
    "drain",
    "assist",
    "assist",
    "overload"

  ]
}

let specialAbilitiesToUse = {
  phys: [
    "headshot",
    "execute",
    "decapitate",
    "earthquake",
    "cramp"
  ],
  mag: [
    "replenish",
    "megaelixir",
    "flare",
    "storm",
    "doom"
  ],
  tank: [
    "replenish",
    "charge"
  ]
}

let zonesByLevel = {
  1: [
    "prarie",
    "woods",
    "undergroundtunnels",

  ],
  2: [
    "grandcanyon",
    "crystalpeak",
    "matamoros",
    "tadrartacacus",

  ],
  3: [
    "costademarfil",
    "patagonia",
    "yosemite",
    "tokyo",
    "johannesburg",
    "london",

  ],
  4: [
    "mounteverest",
    "aconcagua",
    "pikecreek",
    "sahara",
    "newyork",
    "chicago",
    "elbert",

  ],
  5: [
    "panama",
    "emeraldeve",
    "gabrielshorn",
    "monsargaeus",
    "marecrisium",
    "neoseoul",
    "villissnelius"
  ]
}

// each of these is = 1 in total statValue
// 210 HP is = 10 stat value
let statValues = {
    hp: 21,
    ad: 10,
    md: 10,
    armor: 55,
    spirit: 55,
    crit: 5
}

let statValuesByLevelRare = {
    1: 10, //10
    2: 14, //20
    3: 18, //25
    4: 22, //30
    5: 26, //35
}

let statValuesByLevelAncient = {
    1: 15, //10
    2: 20, //20
    3: 25, //25
    4: 30, //30
    5: 35, //35
}
// may not use these
let statValuesByLevelArtifact = {
    1: 25,
    2: 30,
    3: 35,
    4: 40,
    5: 45,
}

let uniqueNamesMap = {}

let slotCounts = {
    "weapon": 0,
    "legs": 0,
    "chest": 0,
    "hands": 0,
    "feet": 0,
    "wrist": 0,
    "waist": 0,
    "finger": 0,
    "shoulders": 0,
    "head": 0,
    "neck": 0
}

// OR just go through each slot, each slot name, and each rarity and create one for each

// for (var i = 0; i < 300; i++){
//     var indexOfSlot = Math.floor(Math.random() * slots.length);
//     let slotToUse = slots[indexOfSlot]
//     let indexOfSlotName = Math.floor(Math.random() * slotNames[slotToUse].length);
//     let slotName = slotNames[slotToUse][indexOfSlotName]
//     let indexSlotSecondName = Math.floor(Math.random() * ofTheNamesAncients.length);
//     let slotSecondName = ofTheNamesAncients[indexSlotSecondName]
//     slotCounts[slotToUse] = slotCounts[slotToUse] + 1
//     console.log(slotName + " of the " + slotSecondName + " -- " + slotToUse)
// }
let countOfAllItems = 0
let CURRENT_ID_IN_DB = 386
for (var i in slots){
  let slotIndex = slots[i]
  for (var s in slotNames[slotIndex]){
    let sName = slotNames[slotIndex][s]
    for (var n in ofTheNamesRares){
      let lName = ofTheNamesRares[n]
      // decide if phys, magic, tank
      let typeRoll = Math.floor(Math.random() * 3)
      let type = ""
      if (typeRoll == 0){
        type = "magic"
      }else if (typeRoll == 1){
        type = "phys"
      }else if (typeRoll == 2){
        type = "tank"
      }
      let currentItemStats = {
        levelreq: 10,
        hp: 0,
        magic: 0,
        phys: 0,
        armor: 0,
        spirit: 0,
        crit: 0,
      }
      let itemLevelReqIndex = Math.floor(Math.random() * 5) + 1
      currentItemStats.levelreq = itemLevelReqIndex
      currentItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      currentItemStats.combinetoid = currentItemStats.id + 1
      let maxStatValue = statValuesByLevelRare[itemLevelReqIndex]
      // then provide stats to the item
      if (type == "magic"){
        currentItemStats.phys = 10
        // get hp, magic, armor, spirit, crit
        let hpRoll = Math.floor(Math.random() * (statValues.hp * (maxStatValue / 2) ) ) + statValues.hp
        let magicRoll = Math.floor(Math.random() * (statValues.md * (maxStatValue / 2) ) ) + statValues.md
        let armorRoll = Math.floor(Math.random() * (statValues.armor * (maxStatValue / 2) ) ) + statValues.armor
        let spiritRoll = Math.floor(Math.random() * (statValues.spirit * (maxStatValue / 2) ) ) + statValues.spirit
        let critRoll = Math.floor(Math.random() * (statValues.crit * (maxStatValue / 2) ) ) + statValues.crit
        currentItemStats.hp = hpRoll
        currentItemStats.magic = magicRoll
        currentItemStats.armor = armorRoll
        currentItemStats.spirit = spiritRoll
        currentItemStats.crit = critRoll
        let ability1Roll = Math.floor(Math.random() *  abilitiesToUse.mag.length)
        let ability2Roll = Math.floor(Math.random() *  abilitiesToUse.support.length)
        currentItemStats.ability1 = abilitiesToUse.mag[ability1Roll]
        currentItemStats.ability2 = abilitiesToUse.support[ability2Roll]
      }
      if (type == "phys"){
        currentItemStats.magic = 10
        let hpRoll = Math.floor(Math.random() * (statValues.hp * (maxStatValue / 2) ) ) + statValues.hp
        let physRoll = Math.floor(Math.random() * (statValues.ad * (maxStatValue / 2) ) ) + statValues.ad
        let armorRoll = Math.floor(Math.random() * (statValues.armor * (maxStatValue / 2) ) ) + statValues.armor
        let spiritRoll = Math.floor(Math.random() * (statValues.spirit * (maxStatValue / 2) ) ) + statValues.spirit
        let critRoll = Math.floor(Math.random() * (statValues.crit * (maxStatValue / 2) ) ) + statValues.crit
        currentItemStats.hp = hpRoll
        currentItemStats.phys = physRoll
        currentItemStats.armor = armorRoll
        currentItemStats.spirit = spiritRoll
        currentItemStats.crit = critRoll
        let ability1Roll = Math.floor(Math.random() *  abilitiesToUse.phys.length)
        let ability2Roll = Math.floor(Math.random() *  abilitiesToUse.support.length)
        // get hp, phys, armor, spirit, crit
        currentItemStats.ability1 = abilitiesToUse.phys[ability1Roll]
        currentItemStats.ability2 = abilitiesToUse.support[ability2Roll]
      } 
      if (type == "tank"){
        currentItemStats.phys = 10
        currentItemStats.magic = 10
        // get hp, armor, spirit, crit
        let hpRoll = Math.floor(Math.random() * (statValues.hp * (maxStatValue / 1.5) ) ) + statValues.hp
        let armorRoll = Math.floor(Math.random() * (statValues.armor * (maxStatValue / 1.5) ) ) + statValues.armor
        let spiritRoll = Math.floor(Math.random() * (statValues.spirit * (maxStatValue / 1.5) ) ) + statValues.spirit
        let critRoll = Math.floor(Math.random() * (statValues.crit * (maxStatValue / 2) ) ) + statValues.crit
        currentItemStats.hp = hpRoll
        currentItemStats.armor = armorRoll
        currentItemStats.spirit = spiritRoll
        currentItemStats.crit = critRoll
        let ability1Roll = Math.floor(Math.random() *  abilitiesToUse.tank.length)
        let ability2Roll = Math.floor(Math.random() *  abilitiesToUse.support.length)
        currentItemStats.ability1 = abilitiesToUse.tank[ability1Roll]
        currentItemStats.ability2 = abilitiesToUse.support[ability2Roll]
      }
      // calculate the stat value of the item
      currentItemStats.totalvalue = calculateStatValue(currentItemStats)
      let zoneRoll = Math.floor(Math.random() * zonesByLevel[itemLevelReqIndex].length)
      currentItemStats.zone = zonesByLevel[itemLevelReqIndex][zoneRoll]
      // adjust the stats based on the total value / stat actual value, so stat value of 40 but actual value of 25 = 40 / 25 = 1.6, divide all the stats by 1.6
      let adjustValue = currentItemStats.totalvalue / maxStatValue
      currentItemStats = adjustStatValues(currentItemStats, adjustValue, type)
      currentItemStats.totalvalue = calculateStatValue(currentItemStats)
      // console.log(sName + " of the " + lName + " -- " + slotIndex)
      // console.log(currentItemStats)
      createInsertQuery(currentItemStats, sName + " of the " + lName, slotIndex, "rare", (lName + sName).toLowerCase() )
      countOfAllItems++

      // create improved version
      let improvedItemStats = JSON.parse(JSON.stringify(currentItemStats))
      if (type == "magic"){
        let specAbilityRoll = Math.floor(Math.random() *  specialAbilitiesToUse.mag.length)
        improvedItemStats.specialability = specialAbilitiesToUse.mag[specAbilityRoll]
      }else if (type == "phys"){
        let specAbilityRoll = Math.floor(Math.random() *  specialAbilitiesToUse.phys.length)
        improvedItemStats.specialability = specialAbilitiesToUse.phys[specAbilityRoll]
      }else if (type == "tank"){
        let specAbilityRoll = Math.floor(Math.random() *  specialAbilitiesToUse.tank.length)
        improvedItemStats.specialability = specialAbilitiesToUse.tank[specAbilityRoll]
      }

      improvedItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      improvedItemStats.combinetoid = improvedItemStats.id + 1
      improvedItemStats.hp = Math.floor(improvedItemStats.hp + (improvedItemStats.hp * .55))
      improvedItemStats.magic = Math.floor(improvedItemStats.magic + (improvedItemStats.magic * .7))
      improvedItemStats.phys = Math.floor(improvedItemStats.phys + (improvedItemStats.phys * .7))
      improvedItemStats.armor = Math.floor(improvedItemStats.armor + (improvedItemStats.armor * .30))
      improvedItemStats.spirit = Math.floor(improvedItemStats.spirit + (improvedItemStats.spirit * .30))
      improvedItemStats.crit = Math.floor(improvedItemStats.crit + (improvedItemStats.crit * .33))
      improvedItemStats.totalvalue = calculateStatValue(improvedItemStats)
      let improvedMaxStatValue = maxStatValue + ( maxStatValue * .4)
      let improvedadjustValue = improvedItemStats.totalvalue /  ( improvedMaxStatValue )
      improvedItemStats = adjustStatValues(improvedItemStats, improvedadjustValue, type)
      improvedItemStats.totalvalue = calculateStatValue(improvedItemStats)
      //console.log(improvedItemStats)
      createInsertQuery(improvedItemStats, "Improved " + sName + " of the " + lName, slotIndex, "rare+", (lName + sName + "improved").toLowerCase() )
      countOfAllItems++
      // create refined version
      let refinedItemStats = JSON.parse(JSON.stringify(improvedItemStats))
      refinedItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      refinedItemStats.combinetoid = refinedItemStats.id + 1
      refinedItemStats.hp = Math.floor(refinedItemStats.hp + (refinedItemStats.hp * .55))
      refinedItemStats.magic = Math.floor(refinedItemStats.magic + (refinedItemStats.magic * .7))
      refinedItemStats.phys = Math.floor(refinedItemStats.phys + (refinedItemStats.phys * .7))
      refinedItemStats.armor = Math.floor(refinedItemStats.armor + (refinedItemStats.armor * .30))
      refinedItemStats.spirit = Math.floor(refinedItemStats.spirit + (refinedItemStats.spirit * .30))
      refinedItemStats.crit = Math.floor(refinedItemStats.crit + (refinedItemStats.crit * .33))
      refinedItemStats.totalvalue = calculateStatValue(refinedItemStats)
      let refinedMaxStatValue = improvedMaxStatValue + ( improvedMaxStatValue * .4)
      let refinedadjustValue = refinedItemStats.totalvalue /  ( refinedMaxStatValue )
      refinedItemStats = adjustStatValues(refinedItemStats, refinedadjustValue, type)
      refinedItemStats.totalvalue = calculateStatValue(refinedItemStats)
      //console.log(refinedItemStats)
      createInsertQuery(refinedItemStats, "Refined " + sName + " of the " + lName, slotIndex, "rare++", (lName + sName + "refined").toLowerCase() )
      countOfAllItems++
      // create master version
      let masterItemStats = JSON.parse(JSON.stringify(refinedItemStats))
      delete masterItemStats.combinetoid
      masterItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      masterItemStats.hp = Math.floor(masterItemStats.hp + (masterItemStats.hp * .55))
      masterItemStats.magic = Math.floor(masterItemStats.magic + (masterItemStats.magic * .7))
      masterItemStats.phys = Math.floor(masterItemStats.phys + (masterItemStats.phys * .7))
      masterItemStats.armor = Math.floor(masterItemStats.armor + (masterItemStats.armor * .30))
      masterItemStats.spirit = Math.floor(masterItemStats.spirit + (masterItemStats.spirit * .30))
      masterItemStats.crit = Math.floor(masterItemStats.crit + (masterItemStats.crit * .33))
      masterItemStats.totalvalue = calculateStatValue(masterItemStats)
      let masterMaxStatValue = refinedMaxStatValue + ( refinedMaxStatValue * .4)
      let masteradjustValue = masterItemStats.totalvalue /  ( masterMaxStatValue )
      masterItemStats = adjustStatValues(masterItemStats, masteradjustValue, type)
      masterItemStats.totalvalue = calculateStatValue(masterItemStats)
      //console.log(masterItemStats)
      createInsertQuery(masterItemStats, "Master " + sName + " of the " + lName, slotIndex, "rare+++", (lName + sName + "master").toLowerCase() )
      countOfAllItems++
      
    }
    for (var n in ofTheNamesAncients){
      let lName = ofTheNamesAncients[n]
      let typeRoll = Math.floor(Math.random() * 3)
      let type = ""
      if (typeRoll == 0){
        type = "magic"
      }else if (typeRoll == 1){
        type = "phys"
      }else if (typeRoll == 2){
        type = "tank"
      }
      let currentItemStats = {
        levelreq: 10,
        hp: 0,
        magic: 0,
        phys: 0,
        armor: 0,
        spirit: 0,
        crit: 0,
      }
      let itemLevelReqIndex = Math.floor(Math.random() * 5) + 1
      currentItemStats.levelreq = itemLevelReqIndex
      currentItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      currentItemStats.combinetoid = currentItemStats.id + 1
      let maxStatValue = statValuesByLevelAncient[itemLevelReqIndex]
      // then provide stats to the item
      if (type == "magic"){
        currentItemStats.phys = 10
        // get hp, magic, armor, spirit, crit
        let hpRoll = Math.floor(Math.random() * (statValues.hp * (maxStatValue / 2) ) ) + statValues.hp
        let magicRoll = Math.floor(Math.random() * (statValues.md * (maxStatValue / 2) ) ) + statValues.md
        let armorRoll = Math.floor(Math.random() * (statValues.armor * (maxStatValue / 2) ) ) + statValues.armor
        let spiritRoll = Math.floor(Math.random() * (statValues.spirit * (maxStatValue / 2) ) ) + statValues.spirit
        let critRoll = Math.floor(Math.random() * (statValues.crit * (maxStatValue / 2) ) ) + statValues.crit
        currentItemStats.hp = hpRoll
        currentItemStats.magic = magicRoll
        currentItemStats.armor = armorRoll
        currentItemStats.spirit = spiritRoll
        currentItemStats.crit = critRoll
        let ability1Roll = Math.floor(Math.random() *  abilitiesToUse.mag.length)
        let ability2Roll = Math.floor(Math.random() *  abilitiesToUse.support.length)
        let specAbilityRoll = Math.floor(Math.random() *  specialAbilitiesToUse.mag.length)
        currentItemStats.ability1 = abilitiesToUse.mag[ability1Roll]
        currentItemStats.ability2 = abilitiesToUse.support[ability2Roll]
        currentItemStats.specialability = specialAbilitiesToUse.mag[specAbilityRoll]
      }
      if (type == "phys"){
        currentItemStats.magic = 10
        let hpRoll = Math.floor(Math.random() * (statValues.hp * (maxStatValue / 2) ) ) + statValues.hp
        let physRoll = Math.floor(Math.random() * (statValues.ad * (maxStatValue / 2) ) ) + statValues.ad
        let armorRoll = Math.floor(Math.random() * (statValues.armor * (maxStatValue / 2) ) ) + statValues.armor
        let spiritRoll = Math.floor(Math.random() * (statValues.spirit * (maxStatValue / 2) ) ) + statValues.spirit
        let critRoll = Math.floor(Math.random() * (statValues.crit * (maxStatValue / 2) ) ) + statValues.crit
        currentItemStats.hp = hpRoll
        currentItemStats.phys = physRoll
        currentItemStats.armor = armorRoll
        currentItemStats.spirit = spiritRoll
        currentItemStats.crit = critRoll
        let ability1Roll = Math.floor(Math.random() *  abilitiesToUse.phys.length)
        let ability2Roll = Math.floor(Math.random() *  abilitiesToUse.support.length)
        let specAbilityRoll = Math.floor(Math.random() *  specialAbilitiesToUse.phys.length)
        // get hp, phys, armor, spirit, crit
        currentItemStats.ability1 = abilitiesToUse.phys[ability1Roll]
        currentItemStats.ability2 = abilitiesToUse.support[ability2Roll]
        currentItemStats.specialability = specialAbilitiesToUse.phys[specAbilityRoll]
      } 
      if (type == "tank"){
        currentItemStats.phys = 10
        currentItemStats.magic = 10
        // get hp, armor, spirit, crit
        let hpRoll = Math.floor(Math.random() * (statValues.hp * (maxStatValue / 1.5) ) ) + statValues.hp
        let armorRoll = Math.floor(Math.random() * (statValues.armor * (maxStatValue / 1.5) ) ) + statValues.armor
        let spiritRoll = Math.floor(Math.random() * (statValues.spirit * (maxStatValue / 1.5) ) ) + statValues.spirit
        let critRoll = Math.floor(Math.random() * (statValues.crit * (maxStatValue / 2) ) ) + statValues.crit
        currentItemStats.hp = hpRoll
        currentItemStats.armor = armorRoll
        currentItemStats.spirit = spiritRoll
        currentItemStats.crit = critRoll
        let ability1Roll = Math.floor(Math.random() *  abilitiesToUse.tank.length)
        let ability2Roll = Math.floor(Math.random() *  abilitiesToUse.support.length)
        let specAbilityRoll = Math.floor(Math.random() *  specialAbilitiesToUse.tank.length)
        currentItemStats.ability1 = abilitiesToUse.tank[ability1Roll]
        currentItemStats.ability2 = abilitiesToUse.support[ability2Roll]
        currentItemStats.specialability = specialAbilitiesToUse.tank[specAbilityRoll]
      }
      // calculate the stat value of the item
      currentItemStats.totalvalue = calculateStatValue(currentItemStats)
      let zoneRoll = Math.floor(Math.random() * zonesByLevel[itemLevelReqIndex].length)
      currentItemStats.zone = zonesByLevel[itemLevelReqIndex][zoneRoll]
      // adjust the stats based on the total value / stat actual value, so stat value of 40 but actual value of 25 = 40 / 25 = 1.6, divide all the stats by 1.6
      let adjustValue = currentItemStats.totalvalue / maxStatValue
      currentItemStats = adjustStatValues(currentItemStats, adjustValue, type)
      currentItemStats.totalvalue = calculateStatValue(currentItemStats)
      //console.log(sName + " of the " + lName + " -- " + slotIndex)
      //console.log(currentItemStats)
      createInsertQuery(currentItemStats, sName + " of the " + lName, slotIndex, "ancient", (lName + sName).toLowerCase() )
      countOfAllItems++
      // create improved version
      let improvedItemStats = JSON.parse(JSON.stringify(currentItemStats))
      improvedItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      improvedItemStats.combinetoid = improvedItemStats.id + 1
      improvedItemStats.hp = Math.floor(improvedItemStats.hp + (improvedItemStats.hp * .55))
      improvedItemStats.magic = Math.floor(improvedItemStats.magic + (improvedItemStats.magic * .7))
      improvedItemStats.phys = Math.floor(improvedItemStats.phys + (improvedItemStats.phys * .7))
      improvedItemStats.armor = Math.floor(improvedItemStats.armor + (improvedItemStats.armor * .30))
      improvedItemStats.spirit = Math.floor(improvedItemStats.spirit + (improvedItemStats.spirit * .30))
      improvedItemStats.crit = Math.floor(improvedItemStats.crit + (improvedItemStats.crit * .33))
      improvedItemStats.totalvalue = calculateStatValue(improvedItemStats)
      let improvedMaxStatValue = maxStatValue + ( maxStatValue * .55)
      let improvedadjustValue = improvedItemStats.totalvalue /  ( improvedMaxStatValue )
      improvedItemStats = adjustStatValues(improvedItemStats, improvedadjustValue, type)
      improvedItemStats.totalvalue = calculateStatValue(improvedItemStats)
      //console.log(improvedItemStats)
      createInsertQuery(improvedItemStats, "Improved " + sName + " of the " + lName, slotIndex, "ancient+", (lName + sName + "improved").toLowerCase() )
      countOfAllItems++

      // create refined version
      let refinedItemStats = JSON.parse(JSON.stringify(improvedItemStats))
      refinedItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      refinedItemStats.combinetoid = refinedItemStats.id + 1
      refinedItemStats.hp = Math.floor(refinedItemStats.hp + (refinedItemStats.hp * .55))
      refinedItemStats.magic = Math.floor(refinedItemStats.magic + (refinedItemStats.magic * .7))
      refinedItemStats.phys = Math.floor(refinedItemStats.phys + (refinedItemStats.phys * .7))
      refinedItemStats.armor = Math.floor(refinedItemStats.armor + (refinedItemStats.armor * .30))
      refinedItemStats.spirit = Math.floor(refinedItemStats.spirit + (refinedItemStats.spirit * .30))
      refinedItemStats.crit = Math.floor(refinedItemStats.crit + (refinedItemStats.crit * .33))
      refinedItemStats.totalvalue = calculateStatValue(refinedItemStats)
      let refinedMaxStatValue = improvedMaxStatValue + ( improvedMaxStatValue * .55)
      let refinedadjustValue = refinedItemStats.totalvalue /  ( refinedMaxStatValue )
      refinedItemStats = adjustStatValues(refinedItemStats, refinedadjustValue, type)
      refinedItemStats.totalvalue = calculateStatValue(refinedItemStats)
      //console.log(refinedItemStats)
      createInsertQuery(refinedItemStats, "Refined " + sName + " of the " + lName, slotIndex, "ancient++", (lName + sName + "refined").toLowerCase() )
      countOfAllItems++
      // create master version
      let masterItemStats = JSON.parse(JSON.stringify(refinedItemStats))
      masterItemStats.id = countOfAllItems + CURRENT_ID_IN_DB
      delete masterItemStats.combinetoid
      masterItemStats.hp = Math.floor(masterItemStats.hp + (masterItemStats.hp * .55))
      masterItemStats.magic = Math.floor(masterItemStats.magic + (masterItemStats.magic * .7))
      masterItemStats.phys = Math.floor(masterItemStats.phys + (masterItemStats.phys * .7))
      masterItemStats.armor = Math.floor(masterItemStats.armor + (masterItemStats.armor * .30))
      masterItemStats.spirit = Math.floor(masterItemStats.spirit + (masterItemStats.spirit * .30))
      masterItemStats.crit = Math.floor(masterItemStats.crit + (masterItemStats.crit * .33))
      masterItemStats.totalvalue = calculateStatValue(masterItemStats)
      let masterMaxStatValue = refinedMaxStatValue + ( refinedMaxStatValue * .55)
      let masteradjustValue = masterItemStats.totalvalue /  ( masterMaxStatValue )
      masterItemStats = adjustStatValues(masterItemStats, masteradjustValue, type)
      masterItemStats.totalvalue = calculateStatValue(masterItemStats)
      //console.log(masterItemStats)
      createInsertQuery(masterItemStats, "Master " + sName + " of the " + lName, slotIndex, "ancient+++", (lName + sName + "master").toLowerCase() )
      countOfAllItems++
    }
  }
}

function calculateStatValue(currentItemStats ){
  let totalStatValue = 0
  totalStatValue = totalStatValue + currentItemStats.hp / statValues.hp
  totalStatValue = totalStatValue + currentItemStats.magic / statValues.md
  totalStatValue = totalStatValue + currentItemStats.phys / statValues.ad
  totalStatValue = totalStatValue + currentItemStats.armor / statValues.armor
  totalStatValue = totalStatValue + currentItemStats.spirit / statValues.spirit
  return totalStatValue
}

function adjustStatValues(currentItemStats, adjustValue, type){
  if (type == "magic"){
    currentItemStats.hp = Math.ceil(currentItemStats.hp / adjustValue)
    currentItemStats.magic = Math.ceil(currentItemStats.magic / adjustValue)
    currentItemStats.armor = Math.ceil(currentItemStats.armor / adjustValue)
    currentItemStats.spirit = Math.ceil(currentItemStats.spirit / adjustValue)
  }else if (type == "phys"){
    currentItemStats.hp = Math.ceil(currentItemStats.hp / adjustValue)
    currentItemStats.phys = Math.ceil(currentItemStats.phys / adjustValue)
    currentItemStats.armor = Math.ceil(currentItemStats.armor / adjustValue)
    currentItemStats.spirit = Math.ceil(currentItemStats.spirit / adjustValue)
  }else if (type == "tank"){
    currentItemStats.hp = Math.ceil(currentItemStats.hp / adjustValue)
    currentItemStats.armor = Math.ceil(currentItemStats.armor / adjustValue)
    currentItemStats.spirit = Math.ceil(currentItemStats.spirit / adjustValue)
  }
  
  return currentItemStats
}

function createInsertQuery(currentItemStats, itemName, itemSlot, rarity, itemshortname){
  let itemlevelreq = currentItemStats.levelreq
  if (currentItemStats.levelreq == 5){
    itemlevelreq = 45
  }else if (currentItemStats.levelreq == 4){
    itemlevelreq = 36
  }
  else if (currentItemStats.levelreq == 3){
    itemlevelreq = 27
  }
  else if (currentItemStats.levelreq == 2){
    itemlevelreq = 18
  }
  else if (currentItemStats.levelreq == 1){
    itemlevelreq = 9
  }
  if (rarity == "rare"){
    let insertQuery = 'INSERT into "public"."itemsdev"(id, itemname, itemdescription, itemslot, itemstatistics, itemraritycategory, itemraritypercentage, command, itemshortname, hpplus, attackdmgplus, magicdmgplus, armorplus, spiritplus, luckplus, ability1, ability2, itemlevelrequirement, rpglevelrequirement, findinzone, combinetoid )\n'
    insertQuery = insertQuery + 'values( ' + currentItemStats.id + ', \'' + itemName + '\', \'' + itemName + '\', \'' + itemSlot + '\', \'rpg item\', \'' + rarity + '\', 0, \'cook\', \'' + itemshortname + '\', ' + currentItemStats.hp + ', ' + currentItemStats.phys + ', ' + currentItemStats.magic + ', ' + currentItemStats.armor + ', ' + currentItemStats.spirit + ', ' + currentItemStats.crit + ', \'' + currentItemStats.ability1 + '\', \'' + currentItemStats.ability2 + '\', ' + itemlevelreq + ', ' + itemlevelreq  + ', \'' + currentItemStats.zone + '\', ' + currentItemStats.combinetoid + ');'
    console.log(insertQuery)
  }else if (rarity == "ancient"){
    let insertQuery = 'INSERT into "public"."itemsdev"(id, itemname, itemdescription, itemslot, itemstatistics, itemraritycategory, itemraritypercentage, command, itemshortname, hpplus, attackdmgplus, magicdmgplus, armorplus, spiritplus, luckplus, ability1, ability2, specialability, itemlevelrequirement, rpglevelrequirement, findinzone, combinetoid )\n'
    insertQuery = insertQuery + 'values( ' + currentItemStats.id + ', \'' + itemName + '\', \'' + itemName + '\', \'' + itemSlot + '\', \'rpg item\', \'' + rarity + '\', 0, \'cook\', \'' + itemshortname + '\', ' + currentItemStats.hp + ', ' + currentItemStats.phys + ', ' + currentItemStats.magic + ', ' + currentItemStats.armor + ', ' + currentItemStats.spirit + ', ' + currentItemStats.crit + ', \'' + currentItemStats.ability1 + '\', \'' + currentItemStats.ability2 + '\', \'' + currentItemStats.specialability + '\', ' + itemlevelreq + ', ' + itemlevelreq  + ', \'' + currentItemStats.zone + '\', ' + currentItemStats.combinetoid + ');'
    console.log(insertQuery)
  }else{
    let insertQuery = 'INSERT into "public"."itemsdev"(id, itemname, itemdescription, itemslot, itemstatistics, itemraritycategory, itemraritypercentage, command, itemshortname, hpplus, attackdmgplus, magicdmgplus, armorplus, spiritplus, luckplus, ability1, ability2, specialability, itemlevelrequirement, rpglevelrequirement, combinetoid )\n'
    insertQuery = insertQuery + 'values( ' + currentItemStats.id + ', \'' + itemName + '\', \'' + itemName + '\', \'' + itemSlot + '\', \'rpg item\', \'' + rarity + '\', 0, \'cook\', \'' + itemshortname + '\', ' + currentItemStats.hp + ', ' + currentItemStats.phys + ', ' + currentItemStats.magic + ', ' + currentItemStats.armor + ', ' + currentItemStats.spirit + ', ' + currentItemStats.crit + ', \'' + currentItemStats.ability1 + '\', \'' + currentItemStats.ability2 + '\', \'' + currentItemStats.specialability + '\', ' + itemlevelreq + ', ' + itemlevelreq  + ', ' + (currentItemStats.combinetoid || null) + ');'
    console.log(insertQuery)
  }
  
}

console.log(countOfAllItems)
