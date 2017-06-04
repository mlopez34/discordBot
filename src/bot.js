const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', function(err) {
    if (err){
        console.log(err);
    } 
    console.log('The bot is online');  
});

var usersCookieCount = {};
var sfGame = {}

client.on('message', function(message){
    var args = message.content.split(" ");
    console.log(args);
    
    if(args[0] === "!grab"){
        if (!usersCookieCount[message.author.username])
        {
            usersCookieCount[message.author.username] = 1;
        }else{
            usersCookieCount[message.author.username] = usersCookieCount[message.author.username] + 1
        }
        message.reply(" now has " + usersCookieCount[message.author.username] + " Cookies xdddd")
    }

    if (args[0] === "!give" ){
        if (args[1] != undefined){
            if (!usersCookieCount[message.author.username])
            {
                message.reply(" You have no cookies, fuck off");
            }else if(usersCookieCount[message.author.username] == 0){
                message.reply(" You have no cookies, fuck off");
            }
            else{
                usersCookieCount[message.author.username] = usersCookieCount[message.author.username] - 1
                // give +1 to other person
                // 
                message.reply(" is giving a Cookie to " + args[1])
            }
            
        }
    }

    if (args[0] === "!sf new"){
        // new game of spy fail
        sfGame.status = "in progress"
        sfGame.votes = {}
    }
    if (args[0] === "!vote"){
        if (sfGame.status && sfGame.status === "in progress"){
            if (!sfGame.votes[args[1]]){
                sfGame.votes[args[1]] = 1;
            }
            if (sfGame.votes[args[1]]){
                sfGame.votes[args[1]] = sfGame.votes[args[1]] + 1;
            }
        }
    }

    if (args[0] === "!sfvotes"){
        // make a list of all the current votes
    }
    
});

client.login('');
