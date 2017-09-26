'use strict'
var profileDB = require("./profileDB.js")

var THANK_BASE_MINUTES = 120;
var SORRY_BASE_MINUTES = 360;
var SCAVENGE_BASE_MINUTES = 60;
var FETCH_BASE_MINUTES = 60;
var COOK_BASE_MINUTES = 1440;
var PREPARE_BASE_MINUTES = 2880;

module.exports.statsObjectBuilder = function(message, slot1Data, slot2Data, slot3Data, userData, slot1active, slot2active, slot3active){
    // calculate the stats that the user has accumulated with all the items

    // per command
    // thank, sorry, cook, prepare
    // cdr, extra tacos chance, extra tacos
    var userItemStats = {}; 
    var userLevel = userData.userLevel;
    var fetchCount = userData.fetchCount;
    var fetchCD = userData.fetchCD;

    var thankCommandCDR = [];
    var thankCommandExtraTacosChance = [];
    var thankCommandExtraTacos = [];
    var thankCommandExperience = [];
    var thankGuaranteedTacos = []

    var sorryCommandCDR = [];
    var sorryCommandExtraTacosChance = [];
    var sorryCommandExtraTacos = [];
    var sorryCommandExperience = [];
    var sorryGuaranteedTacos = []

    var cookCommandCDR = [];
    var cookCommandExtraTacosChance = []
    var cookCommandExtraTacos = [];
    var cookCommandExperience = [];
    var cookGuaranteedTacos = []

    var prepareCommandCDR = [];
    var prepareCommandExtraTacosChance = []
    var prepareCommandExtraTacos = []
    var prepareCommandExperience = [];
    var prepareGuaranteedTacos = []

    var fetchCommandCDR = [];
    var fetchCommandExtraTacosChance = []
    var fetchCommandExtraTacos = []
    var fetchCommandExperience = [];
    var fetchGuaranteedTacos = [];
    // special stat for fetch
    var fetchCommandTacosTimesCdHours = [];
    var fetchCommandTacosTimesCDChance = []

    var scavengeCommandCDR = [];
    var scavengeCommandExtraTacosChance = []
    var scavengeCommandExtraTacos = []
    var scavengeCommandExperience = [];
    var scavengeGuaranteedTacos = []


    if (slot1Data && slot1active){
        if (slot1Data.command && slot1Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor( slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel))  || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosCalculate);
            thankCommandExtraTacosChance.push(extraTacoChanceCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosCalculate);
            sorryCommandExtraTacosChance.push(extraTacoChanceCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "cook"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;
            
            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosCalculate);
            cookCommandExtraTacosChance.push(extraTacoChanceCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosCalculate);
            prepareCommandExtraTacosChance.push(extraTacoChanceCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var extraTacosTimesCD = (slot1Data.tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (slot1Data.tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = slot1Data.tacostimescdhourschance + (slot1Data.tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosCalculate);
            fetchCommandExtraTacosChance.push(extraTacoChanceCalculate);
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
            var experienceCalculate = slot1Data.experiencegain + ((Math.floor(slot1Data.experienceonlevel / slot1Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot1Data.guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosCalculate);
            scavengeCommandExtraTacosChance.push(extraTacoChanceCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
    }

    if (slot2Data && slot2active){
        if (slot2Data.command && slot2Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosCalculate);
            thankCommandExtraTacosChance.push(extraTacoChanceCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosCalculate);
            sorryCommandExtraTacosChance.push(extraTacoChanceCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosCalculate);
            cookCommandExtraTacosChance.push(extraTacoChanceCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosCalculate);
            prepareCommandExtraTacosChance.push(extraTacoChanceCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var extraTacosTimesCD = (slot2Data.tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (slot2Data.tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = slot2Data.tacostimescdhourschance + (slot2Data.tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosCalculate);
            fetchCommandExtraTacosChance.push(extraTacoChanceCalculate);
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
            var experienceCalculate = slot2Data.experiencegain + ((Math.floor(slot2Data.experienceonlevel / slot2Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot2Data.guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosCalculate);
            scavengeCommandExtraTacosChance.push(extraTacoChanceCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
    }

    if (slot3Data && slot3active){
        if (slot3Data.command && slot3Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosCalculate);
            thankCommandExtraTacosChance.push(extraTacoChanceCalculate);
            thankCommandExperience.push(experienceCalculate);
            thankGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosCalculate);
            sorryCommandExtraTacosChance.push(extraTacoChanceCalculate);
            sorryCommandExperience.push(experienceCalculate);
            sorryGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosCalculate);
            cookCommandExtraTacosChance.push(extraTacoChanceCalculate);
            cookCommandExperience.push(experienceCalculate);
            cookGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosCalculate);
            prepareCommandExtraTacosChance.push(extraTacoChanceCalculate);
            prepareCommandExperience.push(experienceCalculate);
            prepareGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var extraTacosTimesCD = (slot3Data.tacostimescdhours * fetchCount)
            var extraTacosTimesCDChance = 0
            if (slot3Data.tacostimescdhourschanceperlevel) {
                extraTacosTimesCDChance = slot3Data.tacostimescdhourschance + (slot3Data.tacostimescdhourschanceperlevel * userLevel + fetchCD)
            }            
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosCalculate);
            fetchCommandExtraTacosChance.push(extraTacoChanceCalculate);
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
            var experienceCalculate = slot3Data.experiencegain + ((Math.floor(slot3Data.experienceonlevel / slot3Data.experiencegainperlevel * userLevel)) || 0);
            var guaranteedTacoChanceCalculate = slot3Data.guaranteedtacos;

            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosCalculate);
            scavengeCommandExtraTacosChance.push(extraTacoChanceCalculate);
            scavengeCommandExperience.push(experienceCalculate);
            scavengeGuaranteedTacos.push(guaranteedTacoChanceCalculate);
        }
    }

    thankCommandCDR.sort().reverse();
    thankCommandExtraTacosChance.sort().reverse();
    thankCommandExtraTacos.sort().reverse();
    thankCommandExperience.sort().reverse();
    thankGuaranteedTacos.sort().reverse();

    sorryCommandCDR.sort().reverse();
    sorryCommandExtraTacosChance.sort().reverse();
    sorryCommandExtraTacos.sort().reverse();
    sorryCommandExperience.sort().reverse();
    sorryGuaranteedTacos.sort().reverse();

    cookCommandCDR.sort().reverse();
    cookCommandExtraTacosChance.sort().reverse();
    cookCommandExtraTacos.sort().reverse();
    cookCommandExperience.sort().reverse();
    cookGuaranteedTacos.sort().reverse();

    prepareCommandCDR.sort().reverse();
    prepareCommandExtraTacosChance.sort().reverse();
    prepareCommandExtraTacos.sort().reverse();
    prepareCommandExperience.sort().reverse();
    prepareGuaranteedTacos.sort().reverse();

    fetchCommandCDR.sort().reverse();
    fetchCommandExtraTacosChance.sort().reverse();
    fetchCommandExtraTacos.sort().reverse();
    fetchCommandExperience.sort().reverse();
    fetchGuaranteedTacos.sort().reverse();

    fetchCommandTacosTimesCdHours.sort().reverse();
    fetchCommandTacosTimesCDChance.sort().reverse();

    scavengeCommandCDR.sort().reverse();
    scavengeCommandExtraTacosChance.sort().reverse();
    scavengeCommandExtraTacos.sort().reverse();
    scavengeCommandExperience.sort().reverse();
    scavengeGuaranteedTacos.sort().reverse();

    // have all the arrays populated with the data now  create the string for individual commands

    var thankCommandCDRPercentage = getPercentage(thankCommandCDR);
    var thankCommandExtraTacosChancePercentage = getPercentage(thankCommandExtraTacosChance);
    var thankCommandExtraTacos = getTotal(thankCommandExtraTacos);
    var thankCommandExperienceGain = getTotal(thankCommandExperience);
    var thankCommandGuaranteedTacos = getTotal(thankGuaranteedTacos);

    userItemStats.thankCommandCDRPercentage = thankCommandCDRPercentage;
    userItemStats.thankCommandExtraTacosChancePercentage = thankCommandExtraTacosChancePercentage
    userItemStats.thankCommandExtraTacos = thankCommandExtraTacos
    userItemStats.thankCommandExperienceGain = thankCommandExperienceGain;
    userItemStats.thankCommandGuaranteedTacos = thankCommandGuaranteedTacos;

    console.log(thankCommandCDRPercentage)
    console.log(thankCommandExtraTacosChancePercentage)
    console.log(thankCommandExtraTacos)
    console.log(thankCommandExperienceGain);
    console.log(thankCommandGuaranteedTacos);

    var sorryCommandCDRPercentage = getPercentage(sorryCommandCDR);
    var sorryCommandExtraTacosChancePercentage = getPercentage(sorryCommandExtraTacosChance);
    var sorryCommandExtraTacos = getTotal(sorryCommandExtraTacos);
    var sorryCommandExperienceGain = getTotal(sorryCommandExperience);
    var sorryCommandGuaranteedTacos = getTotal(sorryGuaranteedTacos);

    userItemStats.sorryCommandCDRPercentage = sorryCommandCDRPercentage;
    userItemStats.sorryCommandExtraTacosChancePercentage = sorryCommandExtraTacosChancePercentage
    userItemStats.sorryCommandExtraTacos = sorryCommandExtraTacos
    userItemStats.sorryCommandExperienceGain = sorryCommandExperienceGain;
    userItemStats.sorryCommandGuaranteedTacos = sorryCommandGuaranteedTacos;

    console.log(sorryCommandCDRPercentage)
    console.log(sorryCommandExtraTacosChancePercentage)
    console.log(sorryCommandExtraTacos)
    console.log(sorryCommandExperienceGain);
    console.log(sorryCommandGuaranteedTacos);

    var cookCommandCDRPercentage = getPercentage(cookCommandCDR);
    var cookCommandExtraTacos = getTotal(cookCommandExtraTacos);
    var cookCommandExtraTacosChancePercentage = getPercentage(cookCommandExtraTacosChance);
    var cookCommandExperienceGain = getTotal(cookCommandExperience);
    var cookCommandGuaranteedTacos = getTotal(cookGuaranteedTacos);

    userItemStats.cookCommandCDRPercentage = cookCommandCDRPercentage;
    userItemStats.cookCommandExtraTacos = cookCommandExtraTacos
    userItemStats.cookCommandExtraTacosChancePercentage = cookCommandExtraTacosChancePercentage
    userItemStats.cookCommandExperienceGain = cookCommandExperienceGain;
    userItemStats.cookCommandGuaranteedTacos = cookCommandGuaranteedTacos;

    console.log(cookCommandCDRPercentage)
    console.log(cookCommandExtraTacos)
    console.log(cookCommandExtraTacosChancePercentage)
    console.log(cookCommandExperienceGain);
    
    var prepareCommandCDRPercentage = getPercentage(prepareCommandCDR);
    var prepareCommandExtraTacos = getTotal(prepareCommandExtraTacos);
    var prepareCommandExtraTacosChancePercentage = getPercentage(prepareCommandExtraTacosChance);
    var prepareCommandExperienceGain = getTotal(prepareCommandExperience);
    var prepareCommandGuaranteedTacos = getTotal(prepareGuaranteedTacos);

    userItemStats.prepareCommandCDRPercentage = prepareCommandCDRPercentage;
    userItemStats.prepareCommandExtraTacos = prepareCommandExtraTacos
    userItemStats.prepareCommandExtraTacosChancePercentage = prepareCommandExtraTacosChancePercentage
    userItemStats.prepareCommandExperienceGain = prepareCommandExperienceGain;
    userItemStats.prepareCommandGuaranteedTacos = prepareCommandGuaranteedTacos;

    console.log(prepareCommandCDRPercentage)
    console.log(prepareCommandExtraTacos)
    console.log(prepareCommandExtraTacosChancePercentage)
    console.log(prepareCommandExperienceGain);

    var fetchCommandCDRPercentage = getPercentage(fetchCommandCDR);
    var fetchCommandExtraTacos = getTotal(fetchCommandExtraTacos);
    var fetchCommandExtraTacosChancePercentage = getPercentage(fetchCommandExtraTacosChance);
    var fetchCommandExperienceGain = getTotal(fetchCommandExperience);
    var fetchCommandGuaranteedTacos = getTotal(fetchGuaranteedTacos);
    var fetchCommandTacosTimesCDChancePercentage = getPercentage(fetchCommandTacosTimesCDChance);
    var fetchCommandTacosTimesCDHours = getTotal(fetchCommandTacosTimesCdHours)

    userItemStats.fetchCommandCDRPercentage = fetchCommandCDRPercentage;
    userItemStats.fetchCommandExtraTacos = fetchCommandExtraTacos
    userItemStats.fetchCommandExtraTacosChancePercentage = fetchCommandExtraTacosChancePercentage
    userItemStats.fetchCommandExperienceGain = fetchCommandExperienceGain;
    userItemStats.fetchCommandGuaranteedTacos = fetchCommandGuaranteedTacos;
    // special fetch stat
    userItemStats.fetchCommandTacosTimesCDChancePercentage = fetchCommandTacosTimesCDChancePercentage
    userItemStats.fetchCommandTacosTimesCDHours = fetchCommandTacosTimesCDHours;

    console.log(fetchCommandCDRPercentage)
    console.log(fetchCommandExtraTacos)
    console.log(fetchCommandExtraTacosChancePercentage);
    console.log(fetchCommandExperienceGain);
    console.log(fetchCommandTacosTimesCDChancePercentage);
    console.log(fetchCommandTacosTimesCDHours);

    var scavengeCommandCDRPercentage = getPercentage(scavengeCommandCDR);
    var scavengeCommandExtraTacos = getTotal(scavengeCommandExtraTacos);
    var scavengeCommandExtraTacosChancePercentage = getPercentage(scavengeCommandExtraTacosChance);
    var scavengeCommandExperienceGain = getTotal(scavengeCommandExperience);
    var scavengeCommandGuaranteedTacos = getTotal(scavengeGuaranteedTacos);

    userItemStats.scavengeCommandCDRPercentage = scavengeCommandCDRPercentage;
    userItemStats.scavengeCommandExtraTacos = scavengeCommandExtraTacos
    userItemStats.scavengeCommandExtraTacosChancePercentage = scavengeCommandExtraTacosChancePercentage
    userItemStats.sacengeCommandExperienceGain = scavengeCommandExperienceGain;
    userItemStats.scavengeCommandGuaranteedTacos = scavengeCommandGuaranteedTacos;


    console.log(scavengeCommandCDRPercentage)
    console.log(scavengeCommandExtraTacos)
    console.log(scavengeCommandExtraTacosChancePercentage)
    console.log(scavengeCommandExperienceGain);
    console.log("user item stats ! " + JSON.stringify(userItemStats, null, 2));
    return userItemStats;
}


module.exports.statsStringBuilder = function(message, userItemStats){
    
    var thankCommandString = "";
    var sorryCommandString = "";
    var cookCommandString = "";
    var prepareCommandString = "";
    var fetchCommandString = "";
    var scavengeCommandString = "";
    var statsString = "";
    
    if (userItemStats.thankCommandCDRPercentage){
        thankCommandString = thankCommandString + "Thank Cooldown Reduction: " + (userItemStats.thankCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.thankCommandExtraTacosChancePercentage){
        thankCommandString = thankCommandString + "On Thank +Tacos Chance: " + (userItemStats.thankCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.thankCommandExtraTacos){
        thankCommandString = thankCommandString + "On Thank +Tacos: " + userItemStats.thankCommandExtraTacos + " \n"
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
    if (userItemStats.sorryCommandExtraTacosChancePercentage){
        sorryCommandString = sorryCommandString + "On Sorry +Tacos Chance: " + (userItemStats.sorryCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.sorryCommandExtraTacos){
        sorryCommandString = sorryCommandString + "On Sorry +Tacos: " + userItemStats.sorryCommandExtraTacos + " \n"
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
    if (userItemStats.cookCommandExtraTacosChancePercentage){
        cookCommandString = cookCommandString + "On Cook +Tacos Chance: " + (userItemStats.cookCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.cookCommandExtraTacos){
        cookCommandString = cookCommandString + "On Cook +Tacos: " + userItemStats.cookCommandExtraTacos + " \n"
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
    if (userItemStats.prepareCommandExtraTacosChancePercentage){
        prepareCommandString = prepareCommandString + "On Prepare +Tacos Chance: " + (userItemStats.prepareCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.prepareCommandExtraTacos){
        prepareCommandString = prepareCommandString + "On Prepare +Tacos: " + userItemStats.prepareCommandExtraTacos + " \n"
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
    if (userItemStats.fetchCommandExtraTacosChancePercentage){
        fetchCommandString = fetchCommandString + "On Fetch +Tacos Chance: " + (userItemStats.fetchCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.fetchCommandExtraTacos){
        fetchCommandString = fetchCommandString + "On Fetch +Tacos: " + userItemStats.fetchCommandExtraTacos + " \n"
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
    if (userItemStats.scavengeCommandExtraTacosChancePercentage){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Tacos Chance: " + (userItemStats.scavengeCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.scavengeCommandExtraTacos){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Tacos: " + userItemStats.scavengeCommandExtraTacos + " \n"
    }
    if (userItemStats.scavengeCommandExperienceGain){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Experience: " + userItemStats.scavengeCommandExperienceGain + " \n"
    }
    if (userItemStats.scavengeCommandGuaranteedTacos){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Guaranteed Tacos (100% chance): " + userItemStats.scavengeCommandGuaranteedTacos + " \n"
    }

    statsString = statsString + thankCommandString;
    statsString = statsString + sorryCommandString;
    statsString = statsString + cookCommandString;
    statsString = statsString + prepareCommandString;
    statsString = statsString + fetchCommandString;
    statsString = statsString + scavengeCommandString;

    console.log(statsString);
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

module.exports.calculateExtraTacos = function(userItemStats, command){
    // use the command to figure out the extra tacos, calculate the extra tacos gained
    var extraTacos = 0;

    if (command == "thank"){
        // roll for extra tacos
        var extraTacosChance = userItemStats.thankCommandExtraTacosChancePercentage;
        var extraTacosToRollOver = 1000 - (extraTacosChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = userItemStats.thankCommandExtraTacos;
        }

        var thankCommandGuaranteedTacos = userItemStats.thankCommandGuaranteedTacos;
        if (thankCommandGuaranteedTacos){
            extraTacos = extraTacos + thankCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "sorry"){
        // roll for extra tacos
        var extraTacosChance = userItemStats.sorryCommandExtraTacosChancePercentage;
        var extraTacosToRollOver = 1000 - (extraTacosChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = userItemStats.sorryCommandExtraTacos;
        }

        var sorryCommandGuaranteedTacos = userItemStats.sorryCommandGuaranteedTacos;
        if (sorryCommandGuaranteedTacos){
            extraTacos = extraTacos + sorryCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "cook"){
        // roll for extra tacos
        var extraTacosChance = userItemStats.cookCommandExtraTacosChancePercentage;
        var extraTacosToRollOver = 1000 - (extraTacosChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = userItemStats.cookCommandExtraTacos;
        }

        var cookCommandGuaranteedTacos = userItemStats.cookCommandGuaranteedTacos;
        if (cookCommandGuaranteedTacos){
            extraTacos = extraTacos + cookCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "prepare"){
        // roll for extra tacos
        var extraTacosChance = userItemStats.prepareCommandExtraTacosChancePercentage;
        var extraTacosToRollOver = 1000 - (extraTacosChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = userItemStats.prepareCommandExtraTacos;
        }

        var prepareCommandGuaranteedTacos = userItemStats.prepareCommandGuaranteedTacos;
        if (prepareCommandGuaranteedTacos){
            extraTacos = extraTacos + prepareCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "fetch"){
        // roll for extra tacos
        var extraTacosChance = userItemStats.fetchCommandExtraTacosChancePercentage;
        var extraTacosToRollOver = 1000 - (extraTacosChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = userItemStats.fetchCommandExtraTacos;
        }

        var fetchCommandGuaranteedTacos = userItemStats.fetchCommandGuaranteedTacos;
        if (fetchCommandGuaranteedTacos){
            extraTacos = extraTacos + fetchCommandGuaranteedTacos;
        }
        // calculate fetch special stat
        var extraTacosTimesCDRChance = userItemStats.fetchCommandTacosTimesCDChancePercentage ? userItemStats.fetchCommandTacosTimesCDChancePercentage : 0
        var extraTacosTimesFetchCommand = userItemStats.fetchCommandTacosTimesCDHours ? userItemStats.fetchCommandTacosTimesCDHours : 0
        extraTacosToRollOver = 1000 - (extraTacosTimesCDRChance * 1000);
        extraTacosRoll = Math.floor(Math.random() * 1000) + 1;
        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = extraTacos +  extraTacosTimesFetchCommand;
        }

        // return the extra tacos gained
        return extraTacos;
    }
    else if (command == "scavenge"){
        // roll for extra tacos
        var extraTacosChance = userItemStats.scavengeCommandExtraTacosChancePercentage;
        var extraTacosToRollOver = 1000 - (extraTacosChance * 1000);
        var extraTacosRoll = Math.floor(Math.random() * 1000) + 1;

        if (extraTacosRoll > extraTacosToRollOver){
            extraTacos = userItemStats.scavengeCommandExtraTacos;
        }
        
        var scavengeCommandGuaranteedTacos = userItemStats.scavengeCommandGuaranteedTacos;
        if (scavengeCommandGuaranteedTacos){
            extraTacos = extraTacos + scavengeCommandGuaranteedTacos;
        }
        // return the extra tacos gained
        return extraTacos;
    }
    else{
        return extraTacos
    }

}

module.exports.calculateMinutesReduced = function (userItemStats, command){
    // use the command to figure out the CDR we are looking for
    // for each command
    var minutesReduced = 0;

    if (command == "thank"){
        var commandBaseTimeInMinutes = THANK_BASE_MINUTES;
        minutesReduced = commandBaseTimeInMinutes * userItemStats.thankCommandCDRPercentage;
        return minutesReduced
    }
    else if (command == "sorry"){
        var commandBaseTimeInMinutes = SORRY_BASE_MINUTES;
        minutesReduced = commandBaseTimeInMinutes * userItemStats.sorryCommandCDRPercentage;
        return minutesReduced
    }
    else if (command == "cook"){
        var commandBaseTimeInMinutes = COOK_BASE_MINUTES;
        minutesReduced = commandBaseTimeInMinutes * userItemStats.cookCommandCDRPercentage;
        return minutesReduced
    }
    else if (command == "prepare"){
        var commandBaseTimeInMinutes = PREPARE_BASE_MINUTES;
        minutesReduced = commandBaseTimeInMinutes * userItemStats.prepareCommandCDRPercentage;
        return minutesReduced
    }
    else if (command == "fetch"){
        var commandBaseTimeInMinutes = FETCH_BASE_MINUTES;
        minutesReduced = commandBaseTimeInMinutes * userItemStats.fetchCommandCDRPercentage;
        return minutesReduced
    }
    else if (command == "scavenge"){
        var commandBaseTimeInMinutes = SCAVENGE_BASE_MINUTES;
        minutesReduced = commandBaseTimeInMinutes * userItemStats.scavengeCommandCDRPercentage;
        return minutesReduced
    }
    else{
        return minutesReduced;
    }
}

module.exports.getUserWearingStats = function(message, discordUserId, userData, cb){

    profileDB.getUserWearInfo(discordUserId, function(getWearErr, getWearRes){
        if (getWearErr){
            console.log(getWearErr);
        }
        else{
            console.log(getWearRes);
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

                console.log(slot1Id);
                profileDB.getItemByIdsWear(slot1Id, slot2Id, slot3Id, function(error, itemResponse){
                    if (error){
                        console.log(error);
                    }
                    else{
                        console.log(itemResponse);
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
                        console.log(slot1Item);
                        console.log(slot2Item);
                        console.log(slot3Item);
                        var slot1String = exports.slotStringBuilder(message, slot1Item)
                        var slot2String = exports.slotStringBuilder(message, slot2Item)
                        var slot3String = exports.slotStringBuilder(message, slot3Item)

                        var userItemStats = exports.statsObjectBuilder(message, slot1Item, slot2Item, slot3Item, userData, slot1active, slot2active, slot3active);
                        cb(null, userItemStats);
                    }
                })
            }
            else{
                var userItemStats = {};
                userItemStats.thankCommandCDRPercentage = 0;
                userItemStats.thankCommandExtraTacosChancePercentage = 0
                userItemStats.thankCommandExtraTacos = 0
                userItemStats.thankCommandExperienceGain = 0
                userItemStats.thankCommandGuaranteedTacos = 0

                userItemStats.sorryCommandCDRPercentage = 0;
                userItemStats.sorryCommandExtraTacosChancePercentage = 0
                userItemStats.sorryCommandExtraTacos = 0
                userItemStats.sorryCommandExperienceGain = 0
                userItemStats.sorryCommandGuaranteedTacos = 0
            
                userItemStats.cookCommandCDRPercentage = 0;
                userItemStats.cookCommandExtraTacos = 0
                userItemStats.cookCommandExtraTacosChancePercentage = 0
                userItemStats.cookCommandExperienceGain = 0
                userItemStats.cookCommandGuaranteedTacos = 0
            
                userItemStats.prepareCommandCDRPercentage = 0;
                userItemStats.prepareCommandExtraTacos = 0
                userItemStats.prepareCommandExtraTacosChancePercentage = 0
                userItemStats.prepareCommandExperienceGain = 0
                userItemStats.prepareCommandGuaranteedTacos = 0
            
                userItemStats.fetchCommandCDRPercentage = 0;
                userItemStats.fetchCommandExtraTacos = 0
                userItemStats.fetchCommandExtraTacosChancePercentage = 0
                userItemStats.fetchCommandExperienceGain = 0
                userItemStats.fetchCommandGuaranteedTacos = 0
                        
                userItemStats.scavengeCommandCDRPercentage = 0;
                userItemStats.scavengeCommandExtraTacos = 0
                userItemStats.scavengeCommandExtraTacosChancePercentage = 0
                userItemStats.scavengeCommandExperienceGain = 0
                userItemStats.scavengeCommandGuaranteedTacos = 0
            
                cb(null, userItemStats);
            }
        }
    })
}