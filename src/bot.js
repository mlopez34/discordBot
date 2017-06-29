var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = '';
var db = pgp(connectionString);

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
    if(args[0] === "!test"){
        
    }
    
    if(args[0] === "!grab"){
        if (!usersCookieCount[message.author.username])
        {
            usersCookieCount[message.author.username] = 1
            message.reply(" now has " + usersCookieCount[message.author.username] + " tacos")
        }else{
            getSinglePuppy('Tyler', function(err, res){
                if (err){
                    console.log(err);
                }
                else{
                    message.reply(" now has " + usersCookieCount[message.author.username] + " " + JSON.stringify(res))
                }
            })
        }
        
    }

    if (args[0] === "!give" ){
        if (args[1] != undefined){
            if (!usersCookieCount[message.author.username])
            {
                message.reply(" You have no Tacos, fuck off");
            }else if(usersCookieCount[message.author.username] == 0){
                message.reply(" You have no Tacos, fuck off");
            }
            else{
                let data = {
                    name: "tony",
                    breed: "coolGuy",
                    age: 8,
                    sex: "female"
                }
                createPuppy(data, function(err, res){
                    if (err){
                        console.log(err);
                    }
                    else{
                        console.log(res);
                        message.reply(JSON.stringify(res));
                    }
                })
                usersCookieCount[message.author.username] = usersCookieCount[message.author.username] - 1
                // give +1 to other person
                // 
                message.reply(" is giving a Taco to " + args[1]);
            }
            
        }
    }

    if (args[0] === "!test"){
        let data = {
            name: "test",
            breed: "something",
            age: 100,
            sex: "male", 
            id: 3
        };
        updatePuppy(data, function(err, res){
            if (err){
                console.log(err);
            }
            else{
                console.log(res);
            }
        })
    }

    if (args[0] === "!sfvotes"){
        // make a list of all the current votes
    }
    
});


function getSinglePuppy(data, cb) {
  var pupID = data;
  db.one('select * from "public"."pups" where name = $1', pupID)
    .then(function (data) {
      console.log(data);
      cb(null, {
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
}

function createPuppy(data, cb) {
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    data)
    .then(function () {
      cb({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      cb(err);
    });
}


function updatePuppy(data, cb) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [data.name, data.breed, data.age,
      data.sex, data.id])
    .then(function () {
      cb({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      cb(err);
    });
}


client.login('');



// const embed = new Discord.RichEmbed()
//         .setTitle('This is your title, it can hold 256 characters')
//         .setAuthor('Author Name', 'https://i.imgur.com/lm8s41J.png')
//         /*
//         * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
//         */
//         .setColor(0x00AE86)
//         .setDescription('This is the main body of text, it can hold 2048 characters.')
//         .setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
//         .setImage('http://i.imgur.com/yVpymuV.png')
//         .setThumbnail('http://i.imgur.com/p2qNFag.png')
//         /*
//         * Takes a Date object, defaults to current date.
//         */
//         .setTimestamp()
//         .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
//         .addField('This is a field title, it can hold 256 characters',
//             'This is a field value, it can hold 2048 characters.')
//         /*
//         * Inline fields may not display as inline if the thumbnail and/or image is too big.
//         */
//         .addField('Inline Field', 'They can also be inline.', true)
//         /*
//         * Blank field, useful to create some space.
//         */
//         .addBlankField(true)
//         .addField('Inline Field 3', 'You can have a maximum of 25 fields.', true);

//         message.channel.send({embed});
