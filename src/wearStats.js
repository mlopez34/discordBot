'use strict'
var profileDB = require("./profileDB.js")

var THANK_BASE_SECONDS = 7200;
var SORRY_BASE_SECONDS = 21600;
var SCAVENGE_BASE_SECONDS = 3600;
var FETCH_BASE_SECONDS = 10800;
var COOK_BASE_SECONDS = 86400;
var PREPARE_BASE_SECONDS = 172800;

module.exports.statsObjectBuilder = function(message, slot1Data, slot2Data, slot3Data, userData, slot1active, slot2active, slot3active, userAmuletData){
    // calculate the stats that the user has accumulated with all the items
    // thank, sorry, cook, prepare
    // cdr, extra tacos chance, extra tacos
    var userItemStats = {}; 
    var userLevel = userData.userLevel;
    var fetchCount = userData.fetchCount;
    var fetchCD = userData.fetchCD;

    var thankCommandCDR = [];
    var thankCommandExtraTacos = [];
    var thankCommandExperience = [];
    var thankGuaranteedTacos = []

    var sorryCommandCDR = [];
    var sorryCommandExtraTacos = [];
    var sorryCommandExperience = [];
    var sorryGuaranteedTacos = []

    var cookCommandCDR = [];
    var cookCommandExtraTacos = [];
    var cookCommandExperience = [];
    var cookGuaranteedTacos = []

    var prepareCommandCDR = [];
    var prepareCommandExtraTacos = []
    var prepareCommandExperience = [];
    var prepareGuaranteedTacos = [];
    // if the user has sprinting shoes (1000 rep), insert prepareCommandCDR here
    if ( userData.hasSprintingShoes){
        var cdrCalculateBySprintingShoes = userLevel
        prepareCommandCDR.push(cdrCalculateBySprintingShoes);
    }

    var fetchCommandCDR = [];
    var fetchCommandExtraTacos = []
    var fetchCommandExperience = [];
    var fetchGuaranteedTacos = [];
    // special stat for fetch
    var fetchCommandTacosTimesCdHours = [];
    var fetchCommandTacosTimesCDChance = []

    var scavengeCommandCDR = [];
    var scavengeCommandExtraTacos = []
    var scavengeCommandExperience = [];
    var scavengeGuaranteedTacos = []

    var rpgSuccessExtraTacos = []
    var rpgSuccessExtraExperience = []
    var rpgSuccessGuaranteedTacos = []

    var slotsWinExtraTacos = []
    var slotsWinExtraExperience = []
    var slotsWinGuaranteedTacos = []


    if (slot1Data && slot1active){
        if (slot1Data.command && slot1Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor( slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel))  || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosPairToCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosPairToCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "cook"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;
            
            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosPairToCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosPairToCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ] ) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var extraTacosTimesCD = (slot1Data.tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (slot1Data.tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = slot1Data.tacostimescdhourschance + (slot1Data.tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosPairToCalculate);
            fetchCommandExperience.push(experienceCalculate);
            fetchGuaranteedTacos.push(guaranteedTacoChanceCalculate);
            // used for special stat for fetch
            fetchCommandTacosTimesCdHours.push(extraTacosTimesCD);
            fetchCommandTacosTimesCDChance.push(extraTacosTimesCDChance);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "scavenge"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosPairToCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
        if (slot1Data.command && slot1Data.command.toLowerCase() == "rpg"){
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            rpgSuccessExtraTacos.push(extraTacosPairToCalculate);
            rpgSuccessExtraExperience.push(experienceCalculate);
            rpgSuccessGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "slots"){
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]), aboveTacoSlots: slot1Data.abovetacoslots }
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            slotsWinExtraTacos.push(extraTacosPairToCalculate);
            slotsWinExtraExperience.push(experienceCalculate);
            slotsWinGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
    }

    if (slot2Data && slot2active){
        if (slot2Data.command && slot2Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosPairToCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosPairToCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosPairToCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosPairToCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var extraTacosTimesCD = (slot2Data.tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (slot2Data.tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = slot2Data.tacostimescdhourschance + (slot2Data.tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosPairToCalculate);
            fetchCommandExperience.push(experienceCalculate);
            fetchGuaranteedTacos.push(guaranteedTacoChanceCalculate);
            // special stat for fetch
            fetchCommandTacosTimesCdHours.push(extraTacosTimesCD);
            fetchCommandTacosTimesCDChance.push(extraTacosTimesCDChance);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "scavenge"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosPairToCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "rpg"){
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            rpgSuccessExtraTacos.push(extraTacosPairToCalculate);
            rpgSuccessExtraExperience.push(experienceCalculate);
            rpgSuccessGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "slots"){
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]), aboveTacoSlots: slot2Data.abovetacoslots }
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            slotsWinExtraTacos.push(extraTacosPairToCalculate);
            slotsWinExtraExperience.push(experienceCalculate);
            slotsWinGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
    }

    if (slot3Data && slot3active){
        if (slot3Data.command && slot3Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosPairToCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosPairToCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosPairToCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosPairToCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var extraTacosTimesCD = (slot3Data.tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (slot3Data.tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = slot3Data.tacostimescdhourschance + (slot3Data.tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }            
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosPairToCalculate);
            fetchCommandExperience.push(experienceCalculate);
            fetchGuaranteedTacos.push(guaranteedTacoChanceCalculate);
            // special stat for fetch
            fetchCommandTacosTimesCdHours.push(extraTacosTimesCD);
            fetchCommandTacosTimesCDChance.push(extraTacosTimesCDChance);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "scavenge"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosPairToCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
        if (slot3Data.command && slot3Data.command.toLowerCase() == "rpg"){
            // var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            // scavengeCommandCDR.push(cdrCalculate);
            rpgSuccessExtraTacos.push(extraTacosPairToCalculate);
            rpgSuccessExtraExperience.push(experienceCalculate);
            rpgSuccessGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "slots"){
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]), aboveTacoSlots: slot3Data.abovetacoslots }
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            slotsWinExtraTacos.push(extraTacosPairToCalculate);
            slotsWinExtraExperience.push(experienceCalculate);
            slotsWinGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
    }

    for (var amulet in userAmuletData){
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "thank"){
            var cdrCalculate = userAmuletData[amulet].itembasecdr + (userAmuletData[amulet].itemcdrperlevel * userLevel)
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = (userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0)) * userAmuletData[amulet].count 
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosPairToCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "sorry"){
            var cdrCalculate = userAmuletData[amulet].itembasecdr + (userAmuletData[amulet].itemcdrperlevel * userLevel)
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = (userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0) ) * userAmuletData[amulet].count 
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosPairToCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = userAmuletData[amulet].itembasecdr + (userAmuletData[amulet].itemcdrperlevel * userLevel)
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = (userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0) )  * userAmuletData[amulet].count 
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosPairToCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "prepare"){
            var cdrCalculate = userAmuletData[amulet].itembasecdr + (userAmuletData[amulet].itemcdrperlevel * userLevel)
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = ( userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0) )  * userAmuletData[amulet].count 
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosPairToCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "fetch"){
            var cdrCalculate = userAmuletData[amulet].itembasecdr + (userAmuletData[amulet].itemcdrperlevel * userLevel)
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var experienceCalculate = (userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0) )  * userAmuletData[amulet].count 
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var extraTacosTimesCD = (userAmuletData[amulet].tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (userAmuletData[amulet].tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = userAmuletData[amulet].tacostimescdhourschance + (userAmuletData[amulet].tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }            
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosPairToCalculate);
            fetchCommandExperience.push(experienceCalculate);
            fetchGuaranteedTacos.push(guaranteedTacoChanceCalculate);
            // special stat for fetch
            fetchCommandTacosTimesCdHours.push(extraTacosTimesCD);
            fetchCommandTacosTimesCDChance.push(extraTacosTimesCDChance);
        }
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "scavenge"){
            var cdrCalculate = userAmuletData[amulet].itembasecdr + (userAmuletData[amulet].itemcdrperlevel * userLevel)
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = ( userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0) )  * userAmuletData[amulet].count 
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosPairToCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "rpg"){
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]) }
            var experienceCalculate = userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            rpgSuccessExtraTacos.push(extraTacosPairToCalculate);
            rpgSuccessExtraExperience.push(experienceCalculate);
            rpgSuccessGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (userAmuletData[amulet].command && userAmuletData[amulet].command.toLowerCase() == "slots"){
            var extraTacosCalculate = userAmuletData[amulet].itembaseextratacos + (userAmuletData[amulet].itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = userAmuletData[amulet].itembasetacochance + (userAmuletData[amulet].itemtacochanceperlevel * userLevel);
            var extraTacosPairToCalculate = { extraTacos: extraTacosCalculate, tacoChance: getPercentage([ extraTacoChanceCalculate ]), aboveTacoSlots: userAmuletData[amulet].abovetacoslots }
            var experienceCalculate = userAmuletData[amulet].experiencegain + ((Math.floor(userAmuletData[amulet].experienceonlevel / userAmuletData[amulet].experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = userAmuletData[amulet].guaranteedtacos;

            slotsWinExtraTacos.push(extraTacosPairToCalculate);
            slotsWinExtraExperience.push(experienceCalculate);
            slotsWinGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        
    }

    thankCommandCDR.sort().reverse();
    thankCommandExtraTacos.sort().reverse();
    thankCommandExperience.sort().reverse();
    thankGuaranteedTacos.sort().reverse();

    sorryCommandCDR.sort().reverse();
    sorryCommandExtraTacos.sort().reverse();
    sorryCommandExperience.sort().reverse();
    sorryGuaranteedTacos.sort().reverse();

    cookCommandCDR.sort().reverse();
    cookCommandExtraTacos.sort().reverse();
    cookCommandExperience.sort().reverse();
    cookGuaranteedTacos.sort().reverse();

    prepareCommandCDR.sort().reverse();
    prepareCommandExtraTacos.sort().reverse();
    prepareCommandExperience.sort().reverse();
    prepareGuaranteedTacos.sort().reverse();

    fetchCommandCDR.sort().reverse();
    fetchCommandExtraTacos.sort().reverse();
    fetchCommandExperience.sort().reverse();
    fetchGuaranteedTacos.sort().reverse();

    fetchCommandTacosTimesCdHours.sort().reverse();
    fetchCommandTacosTimesCDChance.sort().reverse();

    scavengeCommandCDR.sort().reverse();
    scavengeCommandExtraTacos.sort().reverse();
    scavengeCommandExperience.sort().reverse();
    scavengeGuaranteedTacos.sort().reverse();

    rpgSuccessExtraTacos.sort().reverse();
    rpgSuccessExtraExperience.sort().reverse();
    rpgSuccessGuaranteedTacos.sort().reverse();

    slotsWinExtraTacos.sort().reverse();
    slotsWinExtraExperience.sort().reverse();
    slotsWinGuaranteedTacos.sort().reverse();

    // have all the arrays populated with the data now  create the string for individual commands

    var thankCommandCDRPercentage = getPercentage(thankCommandCDR);
    var thankCommandExperienceGain = getTotal(thankCommandExperience);
    var thankCommandGuaranteedTacos = getTotal(thankGuaranteedTacos);

    userItemStats.thankCommandCDRPercentage = thankCommandCDRPercentage;
    userItemStats.thankCommandExtraTacos = thankCommandExtraTacos
    userItemStats.thankCommandExperienceGain = thankCommandExperienceGain;
    userItemStats.thankCommandGuaranteedTacos = thankCommandGuaranteedTacos;

    // console.log(thankCommandCDRPercentage)
    // console.log(thankCommandExtraTacos)
    // console.log(thankCommandExperienceGain);
    // console.log(thankCommandGuaranteedTacos);

    var sorryCommandCDRPercentage = getPercentage(sorryCommandCDR);
    var sorryCommandExperienceGain = getTotal(sorryCommandExperience);
    var sorryCommandGuaranteedTacos = getTotal(sorryGuaranteedTacos);

    userItemStats.sorryCommandCDRPercentage = sorryCommandCDRPercentage;
    userItemStats.sorryCommandExtraTacos = sorryCommandExtraTacos
    userItemStats.sorryCommandExperienceGain = sorryCommandExperienceGain;
    userItemStats.sorryCommandGuaranteedTacos = sorryCommandGuaranteedTacos;

    // console.log(sorryCommandCDRPercentage)
    // console.log(sorryCommandExtraTacos)
    // console.log(sorryCommandExperienceGain);
    // console.log(sorryCommandGuaranteedTacos);

    var cookCommandCDRPercentage = getPercentage(cookCommandCDR);
    var cookCommandExperienceGain = getTotal(cookCommandExperience);
    var cookCommandGuaranteedTacos = getTotal(cookGuaranteedTacos);

    userItemStats.cookCommandCDRPercentage = cookCommandCDRPercentage;
    userItemStats.cookCommandExtraTacos = cookCommandExtraTacos
    userItemStats.cookCommandExperienceGain = cookCommandExperienceGain;
    userItemStats.cookCommandGuaranteedTacos = cookCommandGuaranteedTacos;

    // console.log(cookCommandCDRPercentage)
    // console.log(cookCommandExtraTacos)
    // console.log(cookCommandExtraTacosChancePercentage)
    // console.log(cookCommandExperienceGain);
    
    var prepareCommandCDRPercentage = getPercentage(prepareCommandCDR);
    var prepareCommandExperienceGain = getTotal(prepareCommandExperience);
    var prepareCommandGuaranteedTacos = getTotal(prepareGuaranteedTacos);

    userItemStats.prepareCommandCDRPercentage = prepareCommandCDRPercentage;
    userItemStats.prepareCommandExtraTacos = prepareCommandExtraTacos
    userItemStats.prepareCommandExperienceGain = prepareCommandExperienceGain;
    userItemStats.prepareCommandGuaranteedTacos = prepareCommandGuaranteedTacos;

    // console.log(prepareCommandCDRPercentage)
    // console.log(prepareCommandExtraTacos)
    // console.log(prepareCommandExtraTacosChancePercentage)
    // console.log(prepareCommandExperienceGain);

    var fetchCommandCDRPercentage = getPercentage(fetchCommandCDR);
    var fetchCommandExperienceGain = getTotal(fetchCommandExperience);
    var fetchCommandGuaranteedTacos = getTotal(fetchGuaranteedTacos);
    var fetchCommandTacosTimesCDChancePercentage = getPercentage(fetchCommandTacosTimesCDChance);
    var fetchCommandTacosTimesCDHours = getTotal(fetchCommandTacosTimesCdHours)

    userItemStats.fetchCommandCDRPercentage = fetchCommandCDRPercentage;
    userItemStats.fetchCommandExtraTacos = fetchCommandExtraTacos
    userItemStats.fetchCommandExperienceGain = fetchCommandExperienceGain;
    userItemStats.fetchCommandGuaranteedTacos = fetchCommandGuaranteedTacos;
    // special fetch stat
    userItemStats.fetchCommandTacosTimesCDChancePercentage = fetchCommandTacosTimesCDChancePercentage
    userItemStats.fetchCommandTacosTimesCDHours = fetchCommandTacosTimesCDHours;

    // console.log(fetchCommandCDRPercentage)
    // console.log(fetchCommandExtraTacos)
    // console.log(fetchCommandExtraTacosChancePercentage);
    // console.log(fetchCommandExperienceGain);
    // console.log(fetchCommandTacosTimesCDChancePercentage);
    // console.log(fetchCommandTacosTimesCDHours);

    var scavengeCommandCDRPercentage = getPercentage(scavengeCommandCDR);
    var scavengeCommandExperienceGain = getTotal(scavengeCommandExperience);
    var scavengeCommandGuaranteedTacos = getTotal(scavengeGuaranteedTacos);

    userItemStats.scavengeCommandCDRPercentage = scavengeCommandCDRPercentage;
    userItemStats.scavengeCommandExtraTacos = scavengeCommandExtraTacos
    userItemStats.scavengeCommandExperienceGain = scavengeCommandExperienceGain;
    userItemStats.scavengeCommandGuaranteedTacos = scavengeCommandGuaranteedTacos;


    // console.log(scavengeCommandCDRPercentage)
    // console.log(scavengeCommandExtraTacos)
    // console.log(scavengeCommandExtraTacosChancePercentage)
    // console.log(scavengeCommandExperienceGain);
    // console.log("user item stats ! " + JSON.stringify(userItemStats, null, 2));

    //////// RPG

    var rpgSuccessExtraExperienceGain = getTotal(rpgSuccessExtraExperience);
    var rpgGuaranteedTacos = getTotal(rpgSuccessGuaranteedTacos);

    userItemStats.rpgSuccessExtraTacos = rpgSuccessExtraTacos
    userItemStats.rpgSuccessExtraExperienceGain = rpgSuccessExtraExperienceGain;
    userItemStats.rpgSuccessGuaranteedTacos = rpgGuaranteedTacos;

    //////// SLOTS

    var slotsWinExperienceGain = getTotal(slotsWinExtraExperience);
    var slotsGuaranteedTacos = getTotal(slotsWinGuaranteedTacos);

    userItemStats.slotsWinExtraTacos = slotsWinExtraTacos
    userItemStats.slotsWinExperienceGain = slotsWinExperienceGain;
    userItemStats.slotsWinGuaranteedTacos = slotsGuaranteedTacos;

    console.log(userItemStats)
    return userItemStats;
}
module.exports.amuletsStringBuilder = function(userAmuletData){
    // name the amulets
    var amuletString = "";
    for (var i = userAmuletData.length - 1; i >= 0; i--){
        amuletString = amuletString + userAmuletData[i].emoji + " " + userAmuletData[i].itemname +" x" + userAmuletData[i].count + "\n"
    }
    return amuletString;
}

module.exports.statsStringBuilder = function(message, userItemStats){
    
    var thankCommandString = "";
    var sorryCommandString = "";
    var cookCommandString = "";
    var prepareCommandString = "";
    var fetchCommandString = "";
    var scavengeCommandString = "";
    var rpgSuccessString = "";
    var slotsWinString = "";
    var statsString = "";
    
    if (userItemStats.thankCommandCDRPercentage){
        thankCommandString = thankCommandString + "Thank Cooldown Reduction: " + (userItemStats.thankCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.thankCommandExtraTacos){
        if (userItemStats.thankCommandExtraTacos.length > 0){
            for (var pair in userItemStats.thankCommandExtraTacos){
                if ( userItemStats.thankCommandExtraTacos[pair].extraTacos > 0 ){
                    thankCommandString = thankCommandString + "On Thank +Tacos: " + userItemStats.thankCommandExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.thankCommandExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.thankCommandExperienceGain){
        thankCommandString = thankCommandString + "On Thank +Experience: " + userItemStats.thankCommandExperienceGain + " \n"
    }
    if (userItemStats.thankCommandGuaranteedTacos){
        thankCommandString = thankCommandString + "On Thank +Guaranteed Tacos (100% chance): " + userItemStats.thankCommandGuaranteedTacos + " \n"
    }

    if (userItemStats.sorryCommandCDRPercentage){
        sorryCommandString = sorryCommandString + "Sorry cooldown reduction: " + (userItemStats.sorryCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.sorryCommandExtraTacos){
        if (userItemStats.sorryCommandExtraTacos.length > 0){
            for (var pair in userItemStats.sorryCommandExtraTacos){
                if ( userItemStats.sorryCommandExtraTacos[pair].extraTacos > 0 ){
                    sorryCommandString = sorryCommandString + "On Sorry +Tacos: " + userItemStats.sorryCommandExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.sorryCommandExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }    
            }
        }
    }
    if (userItemStats.sorryCommandExperienceGain){
        sorryCommandString = sorryCommandString + "On Sorry +Experience: " + userItemStats.sorryCommandExperienceGain + " \n"
    }
    if (userItemStats.sorryCommandGuaranteedTacos){
        sorryCommandString = sorryCommandString + "On Sorry +Guaranteed Tacos (100% chance): " + userItemStats.sorryCommandGuaranteedTacos + " \n"
    }

    if (userItemStats.cookCommandCDRPercentage){
        cookCommandString = cookCommandString + "Cook cooldown reduction: " + (userItemStats.cookCommandCDRPercentage * 100).toFixed(0) +  "% \n"
    }
    if (userItemStats.cookCommandExtraTacos){
        if (userItemStats.cookCommandExtraTacos.length > 0){
            for (var pair in userItemStats.cookCommandExtraTacos){
                if ( userItemStats.cookCommandExtraTacos[pair].extraTacos > 0 ){
                    cookCommandString = cookCommandString + "On Cook +Tacos: " + userItemStats.cookCommandExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.cookCommandExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.cookCommandExperienceGain){
        cookCommandString = cookCommandString + "On Cook +Experience: " + userItemStats.cookCommandExperienceGain + " \n"
    }
    if (userItemStats.cookCommandGuaranteedTacos){
        cookCommandString = cookCommandString + "On Cook +Guaranteed Tacos (100% chance): " + userItemStats.cookCommandGuaranteedTacos + " \n"
    }
    
    if (userItemStats.prepareCommandCDRPercentage){
        prepareCommandString = prepareCommandString + "Prepare cooldown reduction: " + (userItemStats.prepareCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.prepareCommandExtraTacos){
        if (userItemStats.prepareCommandExtraTacos.length > 0){
            for (var pair in userItemStats.prepareCommandExtraTacos){
                if ( userItemStats.prepareCommandExtraTacos[pair].extraTacos > 0 ){
                    prepareCommandString = prepareCommandString + "On Prepare +Tacos: " + userItemStats.prepareCommandExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.prepareCommandExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.prepareCommandExperienceGain){
        prepareCommandString = prepareCommandString + "On Prepare +Experience: " + userItemStats.prepareCommandExperienceGain + " \n"
    }
    if (userItemStats.prepareCommandGuaranteedTacos){
        prepareCommandString = prepareCommandString + "On Prepare +Guaranteed Tacos (100% chance): " + userItemStats.prepareCommandGuaranteedTacos + " \n"
    }

    if (userItemStats.fetchCommandCDRPercentage){
        fetchCommandString = fetchCommandString + "Fetch cooldown reduction: " + (userItemStats.fetchCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.fetchCommandExtraTacos){
        if (userItemStats.fetchCommandExtraTacos.length > 0){
            for (var pair in userItemStats.fetchCommandExtraTacos){
                if ( userItemStats.fetchCommandExtraTacos[pair].extraTacos > 0 ){
                    fetchCommandString = fetchCommandString + "On Fetch +Tacos: " + userItemStats.fetchCommandExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.fetchCommandExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.fetchCommandExperienceGain){
        fetchCommandString = fetchCommandString + "On Fetch +Experience: " + userItemStats.fetchCommandExperienceGain + " \n"
    }
    if (userItemStats.fetchCommandGuaranteedTacos){
        fetchCommandString = fetchCommandString + "On Fetch +Guaranteed Tacos (100% chance): " + userItemStats.fetchCommandGuaranteedTacos + " \n"
    }
    // special fetch stat
    if (userItemStats.fetchCommandTacosTimesCDHours){
        fetchCommandString = fetchCommandString + "On Fetch +Tacos x Fetch : " + userItemStats.fetchCommandTacosTimesCDHours + " \n"
    }
    if (userItemStats.fetchCommandTacosTimesCDChancePercentage){
        fetchCommandString = fetchCommandString + "On Fetch +Tacos x Fetch Chance : " + (userItemStats.fetchCommandTacosTimesCDChancePercentage * 100).toFixed(0) + "% \n"
    }

    if (userItemStats.scavengeCommandCDRPercentage){
        scavengeCommandString = scavengeCommandString + "Scavenge cooldown reduction: " + (userItemStats.scavengeCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.scavengeCommandExtraTacos){
        if (userItemStats.scavengeCommandExtraTacos.length > 0){
            for (var pair in userItemStats.scavengeCommandExtraTacos){
                if ( userItemStats.scavengeCommandExtraTacos[pair].extraTacos > 0 ){
                    scavengeCommandString = scavengeCommandString + "On Scavenge +Tacos: " + userItemStats.scavengeCommandExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.scavengeCommandExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.scavengeCommandExperienceGain){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Experience: " + userItemStats.scavengeCommandExperienceGain + " \n"
    }
    if (userItemStats.scavengeCommandGuaranteedTacos){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Guaranteed Tacos (100% chance): " + userItemStats.scavengeCommandGuaranteedTacos + " \n"
    }

    /// RPG
    
    if (userItemStats.rpgSuccessExtraTacos){
        if (userItemStats.rpgSuccessExtraTacos.length > 0){
            for (var pair in userItemStats.rpgSuccessExtraTacos){
                if ( userItemStats.rpgSuccessExtraTacos[pair].extraTacos > 0 ){
                    rpgSuccessString = rpgSuccessString + "On RPG Success +Tacos: " + userItemStats.rpgSuccessExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.rpgSuccessExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.rpgSuccessExtraExperienceGain){
        rpgSuccessString = rpgSuccessString + "On RPG Success +Experience: " + userItemStats.rpgSuccessExtraExperienceGain + " \n"
    }
    if (userItemStats.rpgSuccessGuaranteedTacos){
        rpgSuccessString = rpgSuccessString + "On RPG Success +Guaranteed Tacos (100% chance): " + userItemStats.rpgSuccessGuaranteedTacos + " \n"
    }

    /// SLOTS
    
    if (userItemStats.slotsWinExtraTacos){
        if (userItemStats.slotsWinExtraTacos.length > 0){
            for (var pair in userItemStats.slotsWinExtraTacos){
                if ( userItemStats.slotsWinExtraTacos[pair].extraTacos > 0 ){
                    slotsWinString = slotsWinString + "On Slots Win +Tacos: " + userItemStats.slotsWinExtraTacos[pair].extraTacos + " Chance: " + (userItemStats.slotsWinExtraTacos[pair].tacoChance * 100).toFixed(0) + "% \n"
                }
            }
        }
    }
    if (userItemStats.slotsWinExperienceGain){
        slotsWinString = slotsWinString + "On Slots Win +Experience: " + userItemStats.slotsWinExperienceGain + " \n"
    }
    if (userItemStats.slotsWinGuaranteedTacos){
        slotsWinString = slotsWinString + "On Slots Win +Guaranteed Tacos (100% chance): " + userItemStats.slotsWinGuaranteedTacos + " \n"
    }

    statsString = statsString + thankCommandString;
    statsString = statsString + sorryCommandString;
    statsString = statsString + cookCommandString;
    statsString = statsString + prepareCommandString;
    statsString = statsString + fetchCommandString;
    statsString = statsString + scavengeCommandString;
    statsString = statsString + rpgSuccessString;
    statsString = statsString + slotsWinString

    // console.log(statsString);
    return statsString;
}

function getPercentage(statArray){
    var total = 0;
    var sum = 1.0
    for (var stat in statArray){
        total = total + (sum * (statArray[stat] / 100))
        sum = 1.0 - total;
    }

    return total;
}

function getTotal(statArray){
    var total = 0;
    for (var stat in statArray){
        total = total + statArray[stat];
    }
    return total;
}

module.exports.slotStringBuilder = function(message, slotData, slotActive){
    // create the string for the slot from the item provided
    var slotStr = "";
    // append the look of the string
    if (slotData && slotData.id){
        // the data came back with a response
        var itembasecdr = slotData.itembasecdr
        var itembasetacochance = slotData.itembasetacochance
        var itembaseextratacos = slotData.itembaseextratacos
        var itemcdrperlevel = slotData.itemcdrperlevel
        var itemtacochanceperlevel = slotData.itemtacochanceperlevel
        var itemextratacosperlevel = slotData.itemextratacosperlevel
        var experiencegain = slotData.experiencegain
        // the experience gain per level is experienceonlevel / experiencegainperlevel  - so 1 / 3 means 1 experience every 3 levels
        var experienceonlevel = slotData.experienceonlevel
        var experiencegainperlevel = slotData.experiencegainperlevel
        var guarantedTacos = slotData.guaranteedtacos;
        // fetch special stat
        var tacostimescdhours = slotData.tacostimescdhours
        var tacostimescdhourschance = slotData.tacostimescdhourschance
        var tacostimescdhourschanceperlevel = slotData.tacostimescdhourschanceperlevel

        var command = slotData.command
        var emoji = "";
        slotStr = slotStr + "**Item Name:** " + slotData.itemname +  " - " + slotData.itemslot + "\n**Item Stats:** ";
        if (command){
            slotStr = slotStr + "\n   On: " + emoji + " **" + slotData.command + "**"
        }
        if (itembasecdr){
            slotStr = slotStr + "\n   Base cooldown reduction: " + slotData.itembasecdr + "%"
        }
        if (itembaseextratacos){
            slotStr = slotStr + "\n   Extra tacos: " + slotData.itembaseextratacos
        }
        if (itembasetacochance){
            slotStr = slotStr + "\n   Chance: " + slotData.itembasetacochance + "%"
        }
        if (itemcdrperlevel){
            slotStr = slotStr + "\n   Cooldown reduction per level: " + slotData.itemcdrperlevel + "%"
        }
        if (itemtacochanceperlevel){
            slotStr = slotStr + "\n   +Chance at tacos per level: " + slotData.itemtacochanceperlevel + "%"
        }
        if (itemextratacosperlevel){
            slotStr = slotStr + "\n   +Tacos per level: " + slotData.itemextratacosperlevel
        }
        if (experiencegain){
            slotStr = slotStr + "\n   +Experience : " + slotData.experiencegain
        }
        if (experienceonlevel){
            slotStr = slotStr + "\n   +Experience Per Level : " + (slotData.experienceonlevel / slotData.experiencegainperlevel).toFixed(2)
        }
        if (guarantedTacos){
            slotStr = slotStr + "\n   +Guaranteed Tacos (100% chance) : " + slotData.guaranteedtacos
        }
        if (tacostimescdhours){
            slotStr = slotStr + "\n   +Tacos x Fetch Amount : " + slotData.tacostimescdhours
        }
        if (tacostimescdhourschance){
            slotStr = slotStr + "\n   +Tacos x Fetch CD x User Level Base : " + slotData.tacostimescdhourschance
        }
        if (tacostimescdhourschanceperlevel){
            slotStr = slotStr + "\n   +Tacos x Fetch Amount Chance Per Level : " + slotData.tacostimescdhourschanceperlevel
        }
        return slotStr
    }
    else{
        return slotStr
    }
}

function calculateIndividualPairExtraTacos(extraTacosChancePairs, extraParams){

    var extraTacos = 0;
    for (var index in extraTacosChancePairs){
        if (extraParams && extraParams.userBid){
            var pair = extraTacosChancePairs[index];

            if (extraParams.userBid >= pair.aboveTacoSlots){
                var extraTacosToRollOver = 1000 - (pair.tacoChance * 1000);
                var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

                if (extraTacosRoll > extraTacosToRollOver){
                    extraTacos = extraTacos + extraTacosChancePairs[index].extraTacos;
                }
            }
        }else{
            var pair = extraTacosChancePairs[index];
            var extraTacosToRollOver = 1000 - (pair.tacoChance * 1000);
            var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

            if (extraTacosRoll > extraTacosToRollOver){
                extraTacos = extraTacos + extraTacosChancePairs[index].extraTacos;
            }
        }   
        
    }
    return extraTacos;
}

module.exports.calculateExtraTacos = function(userItemStats, command, extraParams){
    // use the command to figure out the extra tacos, calculate the extra tacos gained
    var extraTacos = 0;

    if (command == "thank"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.thankCommandExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );

        var thankCommandGuaranteedTacos = userItemStats.thankCommandGuaranteedTacos;
        if (thankCommandGuaranteedTacos){
            extraTacos = extraTacos + thankCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "sorry"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.sorryCommandExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );

        var sorryCommandGuaranteedTacos = userItemStats.sorryCommandGuaranteedTacos;
        if (sorryCommandGuaranteedTacos){
            extraTacos = extraTacos + sorryCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "cook"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.cookCommandExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );

        var cookCommandGuaranteedTacos = userItemStats.cookCommandGuaranteedTacos;
        if (cookCommandGuaranteedTacos){
            extraTacos = extraTacos + cookCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "prepare"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.prepareCommandExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );

        var prepareCommandGuaranteedTacos = userItemStats.prepareCommandGuaranteedTacos;
        if (prepareCommandGuaranteedTacos){
            extraTacos = extraTacos + prepareCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "fetch"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.fetchCommandExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );

        var fetchCommandGuaranteedTacos = userItemStats.fetchCommandGuaranteedTacos;
        if (fetchCommandGuaranteedTacos){
            extraTacos = extraTacos + fetchCommandGuaranteedTacos;
        }
        // calculate fetch special stat
        var extraTacosTimesCDRChance = userItemStats.fetchCommandTacosTimesCDChancePercentage ? userItemStats.fetchCommandTacosTimesCDChancePercentage : 0
        var extraTacosTimesFetchCommand = userItemStats.fetchCommandTacosTimesCDHours ? userItemStats.fetchCommandTacosTimesCDHours : 0
        var extraTacosToRollOver = 1000 - (extraTacosTimesCDRChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;
        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = extraTacos +  extraTacosTimesFetchCommand;
        }

        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "scavenge"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.scavengeCommandExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );
        
        var scavengeCommandGuaranteedTacos = userItemStats.scavengeCommandGuaranteedTacos;
        if (scavengeCommandGuaranteedTacos){
            extraTacos = extraTacos + scavengeCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }

    else if (command == "rpg"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.rpgSuccessExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs );
        
        var rpgSuccessGuaranteedTacos = userItemStats.rpgSuccessGuaranteedTacos;
        if (rpgSuccessGuaranteedTacos){
            extraTacos = extraTacos + rpgSuccessGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }

    else if (command == "slots"){
        // roll for extra tacos
        var extraTacosChancePairs = userItemStats.slotsWinExtraTacos;
        extraTacos = extraTacos + calculateIndividualPairExtraTacos( extraTacosChancePairs, extraParams );
        
        var slotsWinGuaranteedTacos = userItemStats.slotsWinGuaranteedTacos;
        if (slotsWinGuaranteedTacos){
            extraTacos = extraTacos + slotsWinGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else{
        return extraTacos
    }

}

module.exports.calculateSecondsReduced = function (userItemStats, command){
    // use the command to figure out the CDR we are looking for
    // for each command
    var secondsReduced = 0;

    if (command == "thank"){
        var commandBaseTimeInSeconds = THANK_BASE_SECONDS;
        secondsReduced = commandBaseTimeInSeconds * userItemStats.thankCommandCDRPercentage;
        return secondsReduced
    }
    else if (command == "sorry"){
        var commandBaseTimeInSeconds = SORRY_BASE_SECONDS;
        secondsReduced = commandBaseTimeInSeconds * userItemStats.sorryCommandCDRPercentage;
        return secondsReduced
    }
    else if (command == "cook"){
        var commandBaseTimeInSeconds = COOK_BASE_SECONDS;
        secondsReduced = commandBaseTimeInSeconds * userItemStats.cookCommandCDRPercentage;
        return secondsReduced
    }
    else if (command == "prepare"){
        var commandBaseTimeInSeconds = PREPARE_BASE_SECONDS;
        secondsReduced = commandBaseTimeInSeconds * userItemStats.prepareCommandCDRPercentage;
        return secondsReduced
    }
    else if (command == "fetch"){
        var commandBaseTimeInSeconds = FETCH_BASE_SECONDS;
        secondsReduced = commandBaseTimeInSeconds * userItemStats.fetchCommandCDRPercentage;
        return secondsReduced
    }
    else if (command == "scavenge"){
        var commandBaseTimeInSeconds = SCAVENGE_BASE_SECONDS;
        secondsReduced = commandBaseTimeInSeconds * userItemStats.scavengeCommandCDRPercentage;
        return secondsReduced
    }
    else{
        return secondsReduced;
    }
}

module.exports.getUserWearingStats = function(message, discordUserId, userData, cb){
    profileDB.getItemData(function(err, getItemResponse){
        if (err){
            // console.log(err);
        }
        else{
            var allItems = getItemResponse.data
            // all possible amulet items
            var amuletItemsById = {};
            for (var item in allItems){
                if (allItems[item].itemraritycategory == "amulet"){
                    amuletItemsById[allItems[item].id] = allItems[item];
                }
            }
            // get user's Items
            profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                if (err){
                    console.log(err);
                }
                else{
                    // console.log(inventoryResponse.data);
                    // get all the data for each item
                    var itemsInInventoryCountMap = {};
                    var itemsMapbyId = {};
                    for (var item in inventoryResponse.data){
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] ){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                        }else{
                            // 
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                        }
                    }
                    // have items mapped by id and items in inventory
                    // check if i have any of all the possible amulet items
                    var userAmuletData = []
                    for (var amulet in amuletItemsById){
                        var idToCheck = amuletItemsById[amulet].id;
                        if (itemsInInventoryCountMap[idToCheck]){
                            var amuletToAdd = amuletItemsById[amulet]
                            amuletToAdd.count = itemsInInventoryCountMap[idToCheck]
                            userAmuletData.push(amuletItemsById[amulet]);
                        }
                    }
                    profileDB.getUserWearInfo(discordUserId, function(getWearErr, getWearRes){
                        if (getWearErr){
                            // console.log(getWearErr);
                        }
                        else{
                            // console.log(getWearRes);
                            // get the item info by calling items table
                            if (getWearRes.data.length > 0){
                                var slot1Id = getWearRes.data[0].slot1itemid;
                                var slot2Id = getWearRes.data[0].slot2itemid;
                                var slot3Id = getWearRes.data[0].slot3itemid;
                
                                var slot1activeDate = getWearRes.data[0].activate1date;
                                var slot2activeDate = getWearRes.data[0].activate2date;
                                var slot3activeDate = getWearRes.data[0].activate3date;
                                var slot1active = false;
                                var slot2active = false;
                                var slot3active = false;
                                var now = new Date();
                                now.setMinutes(now.getMinutes() + 1);
                                if (now > slot1activeDate){
                                    slot1active = true;
                                }
                                if (now > slot2activeDate){
                                    slot2active = true
                                }
                                if (now > slot3activeDate){
                                    slot3active = true
                                }
                
                                // console.log(slot1Id);
                                profileDB.getItemByIdsWear(slot1Id, slot2Id, slot3Id, function(error, itemResponse){
                                    if (error){
                                        // console.log(error);
                                    }
                                    else{
                                        // console.log(itemResponse);
                                        var slot1Item;
                                        var slot2Item;
                                        var slot3Item;
                                        for (var slotItem in itemResponse.data){
                                            if (itemResponse.data[slotItem].id == slot1Id){
                                                slot1Item = itemResponse.data[slotItem]
                                            }
                                            if (itemResponse.data[slotItem].id == slot2Id){
                                                slot2Item = itemResponse.data[slotItem]
                                            }
                                            if (itemResponse.data[slotItem].id == slot3Id){
                                                slot3Item = itemResponse.data[slotItem]
                                            }
                                        }
                                        var userItemStats = exports.statsObjectBuilder(message, slot1Item, slot2Item, slot3Item, userData, slot1active, slot2active, slot3active, userAmuletData);
                                        cb(null, userItemStats);
                                    }
                                })
                            }
                            else if (userAmuletData.length > 0){
                                var userItemStats = exports.statsObjectBuilder(message, null, null, null, userData, null, null, null, userAmuletData);
                                cb(null, userItemStats);
                            }
                            else{
                                var userItemStats = {};
                                userItemStats.thankCommandCDRPercentage = 0;
                                userItemStats.thankCommandExtraTacos = []
                                userItemStats.thankCommandExperienceGain = 0
                                userItemStats.thankCommandGuaranteedTacos = 0
                
                                userItemStats.sorryCommandCDRPercentage = 0;
                                userItemStats.sorryCommandExtraTacos = []
                                userItemStats.sorryCommandExperienceGain = 0
                                userItemStats.sorryCommandGuaranteedTacos = 0
                            
                                userItemStats.cookCommandCDRPercentage = 0;
                                userItemStats.cookCommandExtraTacos = []
                                userItemStats.cookCommandExperienceGain = 0
                                userItemStats.cookCommandGuaranteedTacos = 0
                            
                                userItemStats.prepareCommandCDRPercentage = 0;
                                userItemStats.prepareCommandExtraTacos = []
                                userItemStats.prepareCommandExperienceGain = 0
                                userItemStats.prepareCommandGuaranteedTacos = 0
                            
                                userItemStats.fetchCommandCDRPercentage = 0;
                                userItemStats.fetchCommandExtraTacos = []
                                userItemStats.fetchCommandExperienceGain = 0
                                userItemStats.fetchCommandGuaranteedTacos = 0
                                        
                                userItemStats.scavengeCommandCDRPercentage = 0;
                                userItemStats.scavengeCommandExtraTacos = []
                                userItemStats.scavengeCommandExperienceGain = 0
                                userItemStats.scavengeCommandGuaranteedTacos = 0

                                // RPG
                                userItemStats.rpgSuccessExtraTacos = []
                                userItemStats.rpgSuccessExtraExperienceGain = 0
                                userItemStats.rpgSuccessGuaranteedTacos = 0
                                // SLOTS
                                userItemStats.slotsWinExtraTacos = []
                                userItemStats.slotsWinExperienceGain = 0
                                userItemStats.slotsWinGuaranteedTacos = 0
                            
                                cb(null, userItemStats);
                            }
                        }
                    })
                }
            })
        }
    })
}