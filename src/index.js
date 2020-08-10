var config = require("./config.js");
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');

Manager.spawn(3);
Manager.on('launch', shard => console.log(`- Spawned shard ${shard.id} -`)); // Optional
