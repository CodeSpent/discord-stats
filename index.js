const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});

bot.login(config.token);

// Log stats-bot in to the server and set status
bot.on("ready", async () => {
console.log(`${bot.user.username} has logged on.`)
bot.user.setActivity('Half Life 3', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);

// Get our server
const guild = bot.guilds.get('388093207575134208');

// Get our stats channels
const totalUsers = bot.channels.get('470358845751951361');
const onlineUsers = bot.channels.get('470366354222874665');
const codeMonkeys = bot.channels.get('470358906225295391');

// Check every 1 hours (voir rate limit) for changes
setInterval(function() {
  console.log('Getting stats update..')

  //Get actual counts
  var userCount = guild.memberCount;
  var onlineCount = guild.members.filter(m => m.presence.status === 'online').size
  var coderCount = guild.roles.get('388102002695077888').members.size;
  
  // Log counts for debugging
  console.log("Total Users: " + userCount);
  console.log("Online Users: " + onlineCount);
  console.log("Coders: " + coderCount);

  // Set channel names
  totalUsers.setName("Total Users: " + userCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  onlineUsers.setName("Online Users: " + onlineCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  codeMonkeys.setName("Coders: " + coderCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);
  }, 1000 * 60 * 60);
});

bot.on('message', async message => {
  if(message.author.bot) return;

  let prefix = config.prefix;
  let messageBody = message.content.split(" ");
  let command = messageBody[0];


  if(command == `${prefix}code`){
    let repo = new Discord.RichEmbed()
    .setDescription("Stats Bot Repository")
    .setColor("#00FF00")
    .addField("Github", "https://github.com/CodeSpent/discord-stats");
 

    return message.channel.send(repo);
  }
});



