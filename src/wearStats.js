'use strict'
var profileDB = require("./profileDB.js")

var THANK_BASE_MINUTES = 120;
var SORRY_BASE_MINUTES = 360;
var SCAVENGE_BASE_MINUTES = 60;
var FETCH_BASE_MINUTES = 60;
var COOK_BASE_MINUTES = 1440;
var PREPARE_BASE_MINUTES = 2880;

module.exports.statsObjectBuilder = function(message, slot1Data, slot2Data, slot3Data, userLevel, slot1active, slot2active, slot3active){
    // calculate the stats that the user has accumulated with all the items

    // per command
    // thank, sorry, cook, prepare
    // cdr, extra tacos chance, extra tacos
    var userItemStats = {}; 

    var thankCommandCDR = [];
    var thankCommandExtraTacosChance = [];
    var thankCommandExtraTacos = [];

    var sorryCommandCDR = [];
    var sorryCommandExtraTacosChance = [];
    var sorryCommandExtraTacos = [];

    var cookCommandCDR = [];
    var cookCommandExtraTacosChance = []
    var cookCommandExtraTacos = []

    var prepareCommandCDR = [];
    var prepareCommandExtraTacosChance = []
    var prepareCommandExtraTacos = []

    var fetchCommandCDR = [];
    var fetchCommandExtraTacosChance = []
    var fetchCommandExtraTacos = []

    var scavengeCommandCDR = [];
    var scavengeCommandExtraTacosChance = []
    var scavengeCommandExtraTacos = []

    if (slot1Data && slot1active){
        if (slot1Data.command && slot1Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            
            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosCalculate);
            thankCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            
            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosCalculate);
            sorryCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "cook"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosCalculate);
            cookCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            
            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosCalculate);
            prepareCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            
            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosCalculate);
            fetchCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot1Data.command && slot1Data.command.toLowerCase() == "scavenge"){
            var cdrCalculate = slot1Data.itembasecdr + (slot1Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot1Data.itembaseextratacos + (slot1Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot1Data.itembasetacochance + (slot1Data.itemtacochanceperlevel * userLevel);
            
            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosCalculate);
            scavengeCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
    }

    if (slot2Data && slot2active){
        if (slot2Data.command && slot2Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            
            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosCalculate);
            thankCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            
            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosCalculate);
            sorryCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            
            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosCalculate);
            cookCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            
            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosCalculate);
            prepareCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            
            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosCalculate);
            fetchCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot2Data.command && slot2Data.command.toLowerCase() == "scavenge"){
            var cdrCalculate = slot2Data.itembasecdr + (slot2Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot2Data.itembaseextratacos + (slot2Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot2Data.itembasetacochance + (slot2Data.itemtacochanceperlevel * userLevel);
            
            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosCalculate);
            scavengeCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
    }

    if (slot3Data && slot3active){
        if (slot3Data.command && slot3Data.command.toLowerCase() == "thank"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            
            thankCommandCDR.push(cdrCalculate);
            thankCommandExtraTacos.push(extraTacosCalculate);
            thankCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "sorry"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            
            sorryCommandCDR.push(cdrCalculate);
            sorryCommandExtraTacos.push(extraTacosCalculate);
            sorryCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "cook"){
            // the command affects cook
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            
            cookCommandCDR.push(cdrCalculate);
            cookCommandExtraTacos.push(extraTacosCalculate);
            cookCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "prepare"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            
            prepareCommandCDR.push(cdrCalculate);
            prepareCommandExtraTacos.push(extraTacosCalculate);
            prepareCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "fetch"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            
            fetchCommandCDR.push(cdrCalculate);
            fetchCommandExtraTacos.push(extraTacosCalculate);
            fetchCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
        if (slot3Data.command && slot3Data.command.toLowerCase() == "scavenge"){
            var cdrCalculate = slot3Data.itembasecdr + (slot3Data.itemcdrperlevel * userLevel)
            var extraTacosCalculate = slot3Data.itembaseextratacos + (slot3Data.itemextratacosperlevel * userLevel)
            var extraTacoChanceCalculate = slot3Data.itembasetacochance + (slot3Data.itemtacochanceperlevel * userLevel);
            
            scavengeCommandCDR.push(cdrCalculate);
            scavengeCommandExtraTacos.push(extraTacosCalculate);
            scavengeCommandExtraTacosChance.push(extraTacoChanceCalculate);
        }
    }

    thankCommandCDR.sort().reverse();
    thankCommandExtraTacosChance.sort().reverse();
    thankCommandExtraTacos.sort().reverse();

    sorryCommandCDR.sort().reverse();
    sorryCommandExtraTacosChance.sort().reverse();
    sorryCommandExtraTacos.sort().reverse();

    cookCommandCDR.sort().reverse();
    cookCommandExtraTacosChance.sort().reverse();
    cookCommandExtraTacos.sort().reverse();

    prepareCommandCDR.sort().reverse();
    prepareCommandExtraTacosChance.sort().reverse();
    prepareCommandExtraTacos.sort().reverse();

    fetchCommandCDR.sort().reverse();
    fetchCommandExtraTacosChance.sort().reverse();
    fetchCommandExtraTacos.sort().reverse();

    scavengeCommandCDR.sort().reverse();
    scavengeCommandExtraTacosChance.sort().reverse();
    scavengeCommandExtraTacos.sort().reverse();

    // have all the arrays populated with the data now  create the string for individual commands

    var thankCommandCDRPercentage = getPercentage(thankCommandCDR);
    var thankCommandExtraTacosChancePercentage = getPercentage(thankCommandExtraTacosChance);
    var thankCommandExtraTacos = getTotal(thankCommandExtraTacos);

    userItemStats.thankCommandCDRPercentage = thankCommandCDRPercentage;
    userItemStats.thankCommandExtraTacosChancePercentage = thankCommandExtraTacosChancePercentage
    userItemStats.thankCommandExtraTacos = thankCommandExtraTacos

    console.log(thankCommandCDRPercentage)
    console.log(thankCommandExtraTacosChancePercentage)
    console.log(thankCommandExtraTacos)

    var sorryCommandCDRPercentage = getPercentage(sorryCommandCDR);
    var sorryCommandExtraTacosChancePercentage = getPercentage(sorryCommandExtraTacosChance);
    var sorryCommandExtraTacos = getTotal(sorryCommandExtraTacos);

    userItemStats.sorryCommandCDRPercentage = sorryCommandCDRPercentage;
    userItemStats.sorryCommandExtraTacosChancePercentage = sorryCommandExtraTacosChancePercentage
    userItemStats.sorryCommandExtraTacos = sorryCommandExtraTacos

    console.log(sorryCommandCDRPercentage)
    console.log(sorryCommandExtraTacosChancePercentage)
    console.log(sorryCommandExtraTacos)

    var cookCommandCDRPercentage = getPercentage(cookCommandCDR);
    var cookCommandExtraTacos = getTotal(cookCommandExtraTacos);
    var cookCommandExtraTacosChancePercentage = getPercentage(cookCommandExtraTacosChance);

    userItemStats.cookCommandCDRPercentage = cookCommandCDRPercentage;
    userItemStats.cookCommandExtraTacos = cookCommandExtraTacos
    userItemStats.cookCommandExtraTacosChancePercentage = cookCommandExtraTacosChancePercentage

    console.log(cookCommandCDRPercentage)
    console.log(cookCommandExtraTacos)
    console.log(cookCommandExtraTacosChancePercentage)
    
    var prepareCommandCDRPercentage = getPercentage(prepareCommandCDR);
    var prepareCommandExtraTacos = getTotal(prepareCommandExtraTacos);
    var prepareCommandExtraTacosChancePercentage = getPercentage(prepareCommandExtraTacosChance);
    userItemStats.prepareCommandCDRPercentage = prepareCommandCDRPercentage;
    userItemStats.prepareCommandExtraTacos = prepareCommandExtraTacos
    userItemStats.prepareCommandExtraTacosChancePercentage = prepareCommandExtraTacosChancePercentage

    console.log(prepareCommandCDRPercentage)
    console.log(prepareCommandExtraTacos)
    console.log(prepareCommandExtraTacosChancePercentage)

    var fetchCommandCDRPercentage = getPercentage(fetchCommandCDR);
    var fetchCommandExtraTacos = getTotal(fetchCommandExtraTacos);
    var fetchCommandExtraTacosChancePercentage = getPercentage(fetchCommandExtraTacosChance);

    userItemStats.fetchCommandCDRPercentage = fetchCommandCDRPercentage;
    userItemStats.fetchCommandExtraTacos = fetchCommandExtraTacos
    userItemStats.fetchCommandExtraTacosChancePercentage = fetchCommandExtraTacosChancePercentage


    console.log(fetchCommandCDRPercentage)
    console.log(fetchCommandExtraTacos)
    console.log(fetchCommandExtraTacosChancePercentage)

    var scavengeCommandCDRPercentage = getPercentage(scavengeCommandCDR);
    var scavengeCommandExtraTacos = getTotal(scavengeCommandExtraTacos);
    var scavengeCommandExtraTacosChancePercentage = getPercentage(scavengeCommandExtraTacosChance);

    userItemStats.scavengeCommandCDRPercentage = scavengeCommandCDRPercentage;
    userItemStats.scavengeCommandExtraTacos = scavengeCommandExtraTacos
    userItemStats.scavengeCommandExtraTacosChancePercentage = scavengeCommandExtraTacosChancePercentage


    console.log(scavengeCommandCDRPercentage)
    console.log(scavengeCommandExtraTacos)
    console.log(scavengeCommandExtraTacosChancePercentage)
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

    if (userItemStats.sorryCommandCDRPercentage){
        sorryCommandString = sorryCommandString + "Sorry cooldown reduction: " + (userItemStats.sorryCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.sorryCommandExtraTacosChancePercentage){
        sorryCommandString = sorryCommandString + "On Sorry +Tacos Chance: " + (userItemStats.sorryCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.sorryCommandExtraTacos){
        sorryCommandString = sorryCommandString + "On Sorry +Tacos: " + userItemStats.sorryCommandExtraTacos + " \n"
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
    
    if (userItemStats.prepareCommandCDRPercentage){
        prepareCommandString = prepareCommandString + "Prepare cooldown reduction: " + (userItemStats.prepareCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.prepareCommandExtraTacosChancePercentage){
        prepareCommandString = prepareCommandString + "On Prepare +Tacos Chance: " + (userItemStats.prepareCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.prepareCommandExtraTacos){
        prepareCommandString = prepareCommandString + "On Prepare +Tacos: " + userItemStats.prepareCommandExtraTacos + " \n"
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

    if (userItemStats.scavengeCommandCDRPercentage){
        scavengeCommandString = scavengeCommandString + "Scavenge cooldown reduction: " + (userItemStats.scavengeCommandCDRPercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.scavengeCommandExtraTacosChancePercentage){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Tacos Chance: " + (userItemStats.scavengeCommandExtraTacosChancePercentage * 100).toFixed(0) + "% \n"
    }
    if (userItemStats.scavengeCommandExtraTacos){
        scavengeCommandString = scavengeCommandString + "On Scavenge +Tacos: " + userItemStats.scavengeCommandExtraTacos + " \n"
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
        var command = slotData.command
        var emoji = "";
        if (slotActive){
            slotStr = slotStr + " **[ACTIVE]** \n"
        }
        slotStr = slotStr + "**Item Name:** " + slotData.itemname +  "\n**Item Slot:** " + slotData.itemslot + "\n**Item Stats:** ";
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
        else{
            extraTacos = 0;
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
        else{
            extraTacos = 0;
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
        else{
            extraTacos = 0;
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
        else{
            extraTacos = 0;
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
        else{
            extraTacos = 0;
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
        else{
            extraTacos = 0;
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

module.exports.getUserWearingStats = function(message, discordUserId, userLevel, cb){

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

                        var userItemStats = exports.statsObjectBuilder(message, slot1Item, slot2Item, slot3Item, userLevel, slot1active, slot2active, slot3active);
                        cb(null, userItemStats);
                    }
                })
            }
            else{
                var userItemStats = {};
                userItemStats.thankCommandCDRPercentage = 0;
                userItemStats.thankCommandExtraTacosChancePercentage = 0
                userItemStats.thankCommandExtraTacos = 0

                userItemStats.sorryCommandCDRPercentage = 0;
                userItemStats.sorryCommandExtraTacosChancePercentage = 0
                userItemStats.sorryCommandExtraTacos = 0
            
                userItemStats.cookCommandCDRPercentage = 0;
                userItemStats.cookCommandExtraTacos = 0
                userItemStats.cookCommandExtraTacosChancePercentage = 0
            
                userItemStats.prepareCommandCDRPercentage = 0;
                userItemStats.prepareCommandExtraTacos = 0
                userItemStats.prepareCommandExtraTacosChancePercentage = 0
            
                userItemStats.fetchCommandCDRPercentage = 0;
                userItemStats.fetchCommandExtraTacos = 0
                userItemStats.fetchCommandExtraTacosChancePercentage = 0
                        
                userItemStats.scavengeCommandCDRPercentage = 0;
                userItemStats.scavengeCommandExtraTacos = 0
                userItemStats.scavengeCommandExtraTacosChancePercentage = 0
            
                cb(null, userItemStats);
            }
        }
    })
}