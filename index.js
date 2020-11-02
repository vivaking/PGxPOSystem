const prefix = "-";

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

client.on('message', message => {
  if (message.content.startsWith(prefix + "test")){
  message.reply("im here")
  }
})

function eac(file){fs.access(file, fs.constants.F_OK, (err) => {if(err) fs.writeFileSync(file,JSON.stringify({}, null, 4))})}
client.codes = require("./code.json")
client.on("guildMemberAdd", (member) => {
  console.log(member.user.username + " Joined " + member.guild.name);
  if (client.codes[member.guild.id] === undefined) return console.log("Use the setrole command")
  let role = client.codes[member.guild.id].role
  let roletogive = member.guild.roles.get(`${role}`);
  if (!roletogive) return console.log(`please use ${prefix}setrole ROLEMENTION or make sure that the bot role is higher than the auto role`)
  client.guilds.get(`${client.codes[member.guild.id].guild}`).member(member).addRole(roletogive);
  let Hello = client.codes[member.guild.id].message
  if (Hello === null) return;
  member.send(`${Hello}`).catch((err) => console.log(`No message to send! or ${err}`));
});
client.on("message", async message => {
   let messageArray = message.content.split(" ");
  let msg = message;
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (!message.content.startsWith(prefix)) return;
 
  if (cmd === `${prefix}setrole`) {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permission**")
    var role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
    if (!role) return message.channel.send("Please specify a role ...")
    client.codes[message.guild.id] = {
      message: null,
      role: role.id,
      guild: message.guild.id
    }
    fs.writeFile("./code.json", JSON.stringify(client.codes, null, 4), err => {
      console.log(err)
      message.channel.send(`Done!`)
 
    })
  }
 
  if (cmd === `${prefix}removeautorole`) { 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permission**")
    if (client.codes[message.guild.id] === undefined) return message.channel.send("**There's no autorole to delete**")
    delete client.codes[message.guild.id]
    fs.writeFile("./code.json", JSON.stringify(client.codes, null, 4), err => {
      console.log(err)
    })
    message.channel.send("Done! autorole deleted =)")
 
  }
  if (cmd === `${prefix}currentautorole`) { 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permission**")
    if (client.codes[message.guild.id] === undefined) return message.channel.send(`**There's no current autorole use \`${prefix}setrole\` to set one! **`)
  var acode = client.codes[message.guild.id].role;
  let myRole = message.guild.roles.get(acode);
  message.channel.send(`**Current Auto role is:** ${myRole.name}`)
 
}
 
 
if (cmd === `${prefix}setmessage`) { 
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permission**") 
  let azoqzmsg = args.join(" ")
  if (!azoqzmsg) return message.channel.send(`**There is no message ! But if you wish to delete the auto message please use **\`${prefix}dmessage\``)
  if (client.codes[message.guild.id] === undefined) return message.channel.send(`**I\m Sorry but you have to use \`${prefix}setrole\` to be able to use this**`)
  client.codes[message.guild.id].message = azoqzmsg
  fs.writeFile("./code.json", JSON.stringify(client.codes, null, 4), err => {
    console.log(err)
 
    message.channel.send(`Done!`)
 
  })
}
if (cmd === `${prefix}dmessage`) { 
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Dont Have Permission**") 
  if (client.codes[message.guild.id] === undefined) return message.channel.send(`__**Sorry There's no message to deleted**__`)
    delete client.codes[message.guild.id].message
    fs.writeFile("./code.json", JSON.stringify(client.codes, null, 4), err => {
 
      message.channel.send(`Done!`)
 
    })
  }
})

client.on('message', message => {
 if(!message.channel.guild) return; 	 	
 
  if (message.author.bot) return;
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

if (message.content.split(" ")[0].toLowerCase() === prefix + "ban") {
               if(!message.channel.guild) return;
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return;
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return;
  let user = message.mentions.users.first();
  
  if (message.mentions.users.size < 1) return message.reply('**Mention a User**').then(message => message.delete(4000))
  if (!message.guild.member(user)
  .bannable) return message.reply("I Can’t Ban This User").then(message => message.delete(4000))
  message.guild.member(user).ban(7, user);
  if (!log[message.guild.id])
		log[message.guild.id] = {
			onoff: 'Off'
		};
	if (log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(
		c => c.name === `${log[message.guild.id].channel}`
	);
	if (!logChannel) return;
        logChannel.send({embed: new Discord.RichEmbed()
.setTitle('Action : Ban')
.addField(`By:`, `${message.author}`)
.addField(`User:`, `${user.tag}`)
.setColor("#2F3136")});
   
message.channel.send(`** ${user.tag} banned from the server ! :airplane: **  `).then(message => message.delete(10000))
}
});


client.on('message', message => {
    if(message.content.startsWith(prefix + "unmute")){
        if(message.channel.type == "dm" || message.author.bot) return;
        let player = message.mentions.members.first();
        message.delete();
        if(!player) return message.reply(`**Please Select a Member!**`).then(msg => msg.delete(1500));
        message.guild.member(player.user.id).removeRole(message.guild.roles.find('name', "Muted"));
        if (!log[message.guild.id])
		log[message.guild.id] = {
			onoff: 'Off'
		};
	if (log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(
		c => c.name === `${log[message.guild.id].channel}`
	);
	if (!logChannel) return;
        logChannel.send({embed: new Discord.RichEmbed()
.setTitle('Action : Unmute')
.setThumbnail(player.user.avatarURL)
.addField(`By:`, `${message.author}`)
.addField(`User:`, `${player}`)
.setColor("#2F3136")});
        message.reply(`**Done**`).then(msg => msg.delete(1500));
    }
});

const ms = require("ms");
client.on('message',function(message) {
 if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
    let muteRole =  message.guild.roles.find('name', 'Muted');
    let muteMember = message.mentions.members.first();
    let muteReason = messageArray[2];
    let muteDuration = messageArray[3];
 if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {
            
  if (message.author.bot) return;
       if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:true,ADD_REACTIONS:true})));
       if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : You Need `` MANAGE_ROLES ``Permission ');
       if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : I Don’t Have `` MANAGE_ROLES ``Permission ');
       if(!muteMember) return message.channel.send(' Error : ``Mention a User``').then(message => message.delete(4000))
       if(!muteReason) return message.channel.send(' Error : ``Supply a Reason``').then(message => message.delete(4000))
       if(!muteDuration) return message.channel.send(' Error : `` Supply Mute Time `` \n Ex: #mute @user reason 1m ').then(message => message.delete(4000))
       if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send(' Error : `` Invalid Mute Duration``').then(message => message.delete(4000))
   if (!log[message.guild.id])
		log[message.guild.id] = {
			onoff: 'Off'
		};
	if (log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(
		c => c.name === `${log[message.guild.id].channel}`
	);
	if (!logChannel) return;
  const banembed = new Discord.RichEmbed()
  .setAuthor('Action : Muted')
  .setColor("2F3136")
  .setTimestamp()
  .setThumbnail(message.user.avatarURL)
  .addField("User :",  `${muteMember}`)
  .addField("By :", `${message.author}`)
  .addField("Reason :", `${muteReason}`)
  .addField("Time",`${muteDuration}`)
            .setColor('#36393e')
       message.channel.send(`${muteMember} Has Been Muted.`).then(message => message.delete(5000))
   logChannel.send({embed : banembed})
       muteMember.addRole(muteRole);
       muteMember.setMute(true)
       .then(() => { setTimeout(() => {
           muteMember.removeRole(muteRole)
           muteMember.setMute(true)
       }, ms(muteDuration));
       });
   } 
});

client.on('message', message => {
 if(!message.channel.guild) return;
  if (message.author.kick) return;
    if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

if (message.content.split(" ")[0].toLowerCase() === prefix + "kick") {
               if(!message.channel.guild) return;
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return;
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return;
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");

  if (message.mentions.users.size < 1) return message.reply("Mention a User").then(message => message.delete(4000))
  if(!reason) return message.reply ("Supply a Reason").then(message => message.delete(4000))
  if (!message.guild.member(user)
  .bannable) return message.reply("I Can’t Kick This User").then(message => message.delete(4000))

  message.guild.member(user).kick(7, user);
if (!log[message.guild.id])
		log[message.guild.id] = {
			onoff: 'Off'
		};
	if (log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(
		c => c.name === `${log[message.guild.id].channel}`
	);
	if (!logChannel) return;
  const banembed = new Discord.RichEmbed()
  .setThumbnail(message.user.avatarURL)
  .setAuthor('Action : Kick')
  .setColor("2F3136")
  .setTimestamp()
  .addField("User :",  `${user.tag}`)
  .addField("By :", `${message.author.tag}`)
  .addField("Reason :", `${reason}`)
            .setColor('#36393e')
  message.channel.send(`${user.tag} Has Been Kicked`).then(message => message.delete(10000))
  logChannel.send({embed : banembed})
}
});
client.on('message', message => {
  if (message.content.startsWith(prefix + "bot")) { 
     let embed = new Discord.RichEmbed()
     .setColor("#2F3136")
     .setThumbnail(`${client.user.avatarURL}`)
     .setAuthor(client.user.username, client.user.avatarURL)
     .addField("Bot Name", `${client.user.username}`,true)
     .addField("Owner",`<@575806883085156353>`,true)
     .addField("Servers",`${client.guilds.size}`,true)
     .addField("Channels",`${client.channels.size}`,true)
     .addField("Users",`${client.users.size}`,true)
     .addField("Bot Library",`Discord.js`,true)
     .addField("Created On",`${client.readyAt}`)
     .setTimestamp()
     message.channel.send(embed)
     
     }})
const moment = require("moment");
 client.on('message', message => {
	 var prefix ="-";
 if(message.content.startsWith(prefix +"server")){
if(!message.channel.guild) return message.reply(' ');
const millis = new Date().getTime() - message.guild.createdAt.getTime();
const now = new Date();
const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
const days = millis / 1000 / 60 / 60 / 24;
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**🆔 Server ID:**", message.guild.id,true)
.addField("**📅 Created On**", message.guild.createdAt.toLocaleString(),true)
.addField("**👑 Owned by**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,true)
.addField("👥 Members ",`[${message.guild.memberCount}]`,true)
.addField('**💬 Channels **',`**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' text | Voice  '+ `**${message.guild.channels.filter(m => m.type === 'voice').size}** `,true)
.addField("**🌍 Others **" , message.guild.region,true)
.addField("** 🔐 Roles **",`**[${message.guild.roles.size}]** Role `,true)
.setColor('#2F3136')
message.channel.sendEmbed(embed)

}
});

client.on("message",message => {
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar")){
const mention = message.mentions.users.first()

if(!mention) return console.log("") 
let embed = new Discord.RichEmbed()
.setColor("#2F3136")
.setAuthor(`${mention.username}#${mention.discriminator}`,`${mention.avatarURL}`) 
.setTitle("Avatar Link")
.setURL(`${mention.avatarURL}`)
.setImage(`${mention.avatarURL}`)
.setFooter(`Requested By ${message.author.tag}`,`${message.author.avatarURL}`)    
    message.channel.send(embed)
}
})

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar server")) {
    let doma = new Discord.RichEmbed()
    .setColor("#2F3136")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle("Avatar Link")
    .setURL(message.guild.iconURL)
    .setImage(message.guild.iconURL)
    .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(doma)
  } else if(message.content.startsWith(prefix + "avatar")) {
    let args = message.content.split(" ")[1]
var avt = args || message.author.id;    
    client.fetchUser(avt).then(user => {
     avt = user;
  let embed = new Discord.RichEmbed() 
  .setColor("#2F3136")
  .setAuthor(`${avt.tag}`, avt.avatarURL)
  .setTitle("Avatar Link")
  .setURL(avt.avatarURL)
  .setImage(avt.avatarURL)
  .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
  message.channel.send(embed) 
    })
  }
})



client.on('message', message => {  
    if (message.author.bot) return; 
    if (message.content.startsWith(prefix + 'clear')) { 
    if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
     if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`** You don't have Premissions!**`);
     if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`**I don't have Permission!**`);
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.reply(`** The number can't be more than **100** .**`).then(messages => messages.delete(5000))
    if(!messagecount) args = '100';
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages)).then(msgs => {
    message.channel.send(`** Done , Deleted messages.**`).then(messages => messages.delete(5000));
    })
  }
});
const config = JSON.parse(fs.readFileSync('./jsons/config.json', "UTF8"));
const guildconfig = JSON.parse(fs.readFileSync('./jsons/limits.json', "UTF8"));
client.on('message', message => {
    if(message.content.startsWith(prefix + "settings")){
        message.channel.send({embed: new Discord.RichEmbed().setTitle(`PGxProtection Commands`).setThumbnail(client.user.avatarURL).setDescription(`**${prefix}settings config - To see the limits configuration\n${prefix}setroleclimit <number> - To change the roles create limit\n${prefix}setroledlimit <number> - To change the roles delete limit\n${prefix}setchannelclimit <number> - To change the channels create limit\n${prefix}setchanneldlimit <number> - To change the channel delete limit\n${prefix}setbanslimit <number> - To change the bans limit**`).setFooter('Powered By: PGxPO').setColor("#2F3136")});
    }
    if(message.content.startsWith(prefix + "settings config")){
        if(!guildconfig[message.guild.id]) guildconfig[message.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        message.channel.send({embed: new Discord.RichEmbed().setTitle(`PGxProtection`).setThumbnail(client.user.avatarURL).addField(`» RoleCreateLimit:`, guildconfig[message.guild.id].roleCreateLimit, true).addField(`» RoleDeleteLimit:`, guildconfig[message.guild.id].roleDeleteLimit, true).addField(`» ChannelCreateLimit:`, guildconfig[message.guild.id].channelCreateLimit, true).addField(`» ChannelDeleteLimit:`, guildconfig[message.guild.id].channelDeleteLimit, true).addField(`» BansLimit:`, guildconfig[message.guild.id].BansLimit, true).setFooter('Powered By: PGxPO').setColor("#2F3136")});
    }
    if(message.content.startsWith(prefix + "setroleclimit")){
        if(!guildconfig[message.guild.id]) guildconfig[message.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        let args = message.content.split(" ")[1];
        if(!args) return message.reply(`**Please put the number!**`);
        if(!isNaN(args)){
            guildconfig[message.guild.id].roleCreateLimit = args;
            message.reply(`**Changes saved!**`);
            gcfgsave();
        } else message.reply(`**Please put the number**`);
    }
    if(message.content.startsWith(prefix + "setroledlimit")){
        if(!guildconfig[message.guild.id]) guildconfig[message.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        if(!message.guild.member(message.author.id).roles.find('name', "ByPass")) return;
        let args = message.content.split(" ")[1];
        if(!args) return message.reply(`**Please put the number!**`);
        if(!isNaN(args)){
            guildconfig[message.guild.id].roleDeleteLimit = args;
            message.reply(`**Changes saved!**`);
            gcfgsave();
        } else message.reply(`**Please put the number!**`);
    }
    if(message.content.startsWith(prefix + "setchannelclimit")){
        if(!guildconfig[message.guild.id]) guildconfig[message.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        if(!message.guild.member(message.author.id).roles.find('name', "ByPass")) return;
        let args = message.content.split(" ")[1];
        if(!args) return message.reply(`**Please put the number!**`);
        if(!isNaN(args)){
            guildconfig[message.guild.id].channelCreateLimit = args;
            message.reply(`**Changes saved!**`);
            gcfgsave();
        } else message.reply(`**Please put the number!**`);
    }
    if(message.content.startsWith(prefix + "setchanneldlimit")){
        if(!guildconfig[message.guild.id]) guildconfig[message.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        let args = message.content.split(" ")[1];
        if(!args) return message.reply(`**Please put the number**`);
        if(!isNaN(args)){
            guildconfig[message.guild.id].channelDeleteLimit = args;
            message.reply(`**Changes saved!**`);
            gcfgsave();
        } else message.reply(`**Please put the number**`);
    }
    if(message.content.startsWith(prefix + "setbanslimit")){
        if(!guildconfig[message.guild.id]) guildconfig[message.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        if(!message.guild.member(message.author.id).roles.find('name', "ByPass")) return;
        let args = message.content.split(" ")[1];
        if(!args) return message.reply(`**Please put the number!**`);
        if(!isNaN(args)){
            guildconfig[message.guild.id].channelDeleteLimit = args;
            message.reply(`**Changes saved!**`);
            gcfgsave();
        } else message.reply(`**Please put the number!**`);
    }
});

client.on('roleCreate', async r => {
    const user = await r.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    const entry = user.executor;
    if(!config[entry.id]) config[entry.id] = {
        roleCreate: 0,
        roleDelete: 0,
        channelCreate: 0,
        channelDelete: 0,
        bans: 0
    }
    if(!guildconfig[r.guild.id]) guildconfig[r.guild.id] = {
        roleCreateLimit: 3,
        roleDeleteLimit: 3,
        channelCreateLimit: 3,
        channelDeleteLimit: 3,
        BansLimit: 3
    }
    config[entry.id].roleCreate++;
    if(config[entry.id].roleCreate > guildconfig[r.guild.id].roleCreateLimit){
        entry.ban(`By: PGxProtection | RoleCreate Limit`);
        config[entry.id].roleCreate = 0;
    }
    cfgsave();
    gcfgsave();
});

client.on('roleDelete', async r => {
    const user = await r.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    const entry = user.executor;
    if(!config[entry.id]) config[entry.id] = {
        roleCreate: 0,
        roleDelete: 0,
        channelCreate: 0,
        channelDelete: 0,
        bans: 0
    }
    if(!guildconfig[r.guild.id]) guildconfig[r.guild.id] = {
        roleCreateLimit: 3,
        roleDeleteLimit: 3,
        channelCreateLimit: 3,
        channelDeleteLimit: 3,
        BansLimit: 3
    }
    config[entry.id].roleDelete++;
    if(config[entry.id].roleDelete > guildconfig[r.guild.id].roleDeleteLimit){
        entry.ban(`By: PGxProtection | RoleDelete Limit`);
        config[entry.id].roleDelete = 0;
    }
    cfgsave();
    gcfgsave();
});

client.on('channelCreate', async r => {
    const user = await r.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
    const entry = user.executor;
    if(!config[entry.id]) config[entry.id] = {
        roleCreate: 0,
        roleDelete: 0,
        channelCreate: 0,
        channelDelete: 0,
        bans: 0
    }
    if(!guildconfig[r.guild.id]) guildconfig[r.guild.id] = {
        roleCreateLimit: 3,
        roleDeleteLimit: 3,
        channelCreateLimit: 3,
        channelDeleteLimit: 3,
        BansLimit: 3
    }
    config[entry.id].channelCreate++;
    if(config[entry.id].channelCreate > guildconfig[r.guild.id].channelCreateLimit){
        entry.ban(`By: PGxProtection | ChannelCreate Limit`);
        config[entry.id].channelCreate = 0;
    }
    cfgsave();
    gcfgsave();
});

client.on('channelDelete', async r => {
    const user = await r.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
    const entry = user.executor;
    if(!config[entry.id]) config[entry.id] = {
        roleCreate: 0,
        roleDelete: 0,
        channelCreate: 0,
        channelDelete: 0,
        bans: 0
    }
    if(!guildconfig[r.guild.id]) guildconfig[r.guild.id] = {
        roleCreateLimit: 3,
        roleDeleteLimit: 3,
        channelCreateLimit: 3,
        channelDeleteLimit: 3,
        BansLimit: 3
    }
    config[entry.id].channelDelete++;
    if(config[entry.id].channelDelete > guildconfig[r.guild.id].channelDeleteLimit){
        entry.ban(`By: PGxProtection | ChannelDelete Limit`);
        config[entry.id].channelDelete = 0;
    }
    cfgsave();
    gcfgsave();
});

client.on('guildMemberRemove', async r => {
    const entry1 = await r.guild.fetchAuditLogs().then(audit => audit.entries.first());
    if(entry1.action === "MEMBER_BAN_ADD"){
        const entry2 = await r.guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit.entries.first());
        const entry = entry2.executor;
        if(!config[entry.id]) config[entry.id] = {
            roleCreate: 0,
            roleDelete: 0,
            channelCreate: 0,
            channelDelete: 0,
            bans: 0
        }
        if(!guildconfig[r.guild.id]) guildconfig[r.guild.id] = {
            roleCreateLimit: 3,
            roleDeleteLimit: 3,
            channelCreateLimit: 3,
            channelDeleteLimit: 3,
            BansLimit: 3
        }
        config[entry.id].bans++;
        if(config[entry.id].bans > guildconfig[r.guild.id].BansLimit){
            entry.ban(`By: PGxProtection | Ban Limit`);
            config[entry.id].bans = 0;
        }
        cfgsave();
        gcfgsave();
    }
});

function cfgsave(){
    fs.writeFileSync('./jsons/config.json', JSON.stringify(config, null, 4), function(e){
        if(e) throw e;
    });
}
function gcfgsave(){
    fs.writeFileSync('./jsons/limits.json', JSON.stringify(guildconfig, null, 4), function(e){
        if(e) throw e;
    });
}


client.on('message',message=>{
    const auto = require('./auto.json')
    if(!auto) return console.log(`**هناك خطأ في ملف الرد للبوت**`)
    let args = message.content.split(' ')
    if(message.content.startsWith(prefix + 'reply-add')){
        if(!message.guild) return;
        if(message.author.bot) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
          if(!args[1]) return message.channel.send(`**${prefix}reply-add msg reply**`)
        if(!args[2]) return message.channel.send(`**${prefix}auto msg reply**`)
        auto[args[1]+message.guild.id] = {
            msg : args[1],
            guild : message.guild.id,
            reply : args[2]
        }
        fs.writeFile('auto.json',JSON.stringify(auto,null,5),err=>{
            console.error(err);
        })
        message.channel.send(`**:white_check_mark: Auto reply added**`)
    }
    if(message.content.startsWith(prefix + 'reply-remove')){
        if(!message.guild) return;
        if(message.author.bot) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        if(!args[1]) return message.channel.send(`**${prefix}reply-remove Message**`)
        if(!auto[args[1]+message.guild.id]) return message.channel.send(`**:negative_squared_cross_mark:  I can't find a reply**`)
        delete auto[args[1]+message.guild.id]
        fs.writeFile('auto.json',JSON.stringify(auto,null,5),err=>{
            console.error(err);
        })
        message.channel.send(`**:white_check_mark: Reply deleted**`)
    }
    let king  = message.content
    if(!auto[king+message.guild.id]) return;
    if(king == auto[king+message.guild.id].msg) return message.channel.send(auto[king+message.guild.id].reply)
})

client.on("message", message => {
      const invitelink4 = "https://discord.com/api/oauth2/authorize?client_id=756636181143486464&permissions=8&scope=bot";
    const cmdlink4 = "https://pgxposystem.com/commands";
    const supportlink4 = "https://discord.gg/pgxpo";
 if (message.content === "-help commands") {
  const embed = new Discord.RichEmbed() 
          .setAuthor('PGxPO Commands List', `${client.user.avatarURL}`)
.setColor("#2F3136")
.setDescription(`[invite bot](${invitelink4})`)
       .addField("**Support**" ,`[Join Server Support.](${supportlink4})`,)
       .addField("**Core**" ,`\`support\`, \`ping\``)
  .addField("**Admin Commands :lock:**" ,`\`role\`, \`ban\` \`kick\`,\n \`clear\`,\`mute\`,\`warn\`,\n \`removewarn\`,\`move\`,\`unban\`,\n \`lock\`,\`unlock\`,\`prefix\`,\`warnlist\`,\`unmute\``)
  .addField("**General Commands :sparkles:**" ,`\`avatar\` , \`roleinfo\`, \`botinfo\`, \`id\`,\`server\`, \`rank\`, \`user\`, \`8ball\`,`)
  .addField("**Ticket Commands :envelope:**",`\`ticket-setup\``)
  .addField("**Economy Commands :credit_card:**" ,`\`coins\`, \`claim\`\`transfer\``)
  .addField("**Giveaway Commands :tada:**" ,`\`start\`, \`gend\`, \`groll\``,)
  .addField("**Auto Replies Commands :notepad_spiral:**",`\`reply-add\`, \`reply-remove\`,`)
  .addField("**Music Commands :headphones:**" ,`\`play\`, \`join\`, \`leave\`,\n \`skip\`, \`stop\`, \`loop\`,\n \`resume\`, \`queue\`, \`pause\`, \`vol\``,)
  .addField("**Protection Commands :shield:**",`\`settings\`, \`settings config\``)
  .addField("**Auto Roles Commands :notepad_spiral:**",`\`setrole\`, \`removeautorole\`,\`currentautorole\`,\n \`setmessage\`,\`dmessage\`,`)
      .setThumbnail(`${client.user.avatarURL}`)
        .setImage('https://cdn.discordapp.com/attachments/755733707842912297/757970038925033573/RegularInexperiencedCero-size_restricted.gif')
        .setURL('https://discord.gg/pgxpo')
  .setFooter(message.guild.name, message.guild.iconURL);
   message.channel.sendEmbed(embed)
    
   }
   });

client.on('message', message => {
  const supportlink4 = "https://discord.gg/Tfdetmqryv";
  if (message.content.startsWith(prefix + "support")) {
    const embed = new Discord.RichEmbed()
    .setColor("#2F3136")
    .setDescription(`**[Click Me](${supportlink4})**`)
    .setTimestamp()
     .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(embed)
  }
})

client.on("message", message => {
	var prefix = "-";
	var args = message.content.split(' ').slice(1); 
	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !msg.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('**You Dont Have Permission**');
	if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
		} 
	} 
});



var AsciiTable = require('ascii-data-table').default
client.on('message', message =>{

    if(message.content == "-roles"){
        var 
        ros=message.guild.roles.size,
        data = [['Rank', 'RoleName']]
        for(let i =0;i<ros;i++){
            if(message.guild.roles.array()[i].id !== message.guild.id){
         data.push([i,`${message.guild.roles.filter(r => r.position == ros-i).map(r=>r.name)}`])
        }}
        let res = AsciiTable.table(data)

        message.channel.send(`**\`\`\`xl\n${res}\`\`\`**`);
    }
});


let antibots = JSON.parse(fs.readFileSync('./antibots.json' , 'utf8'));
  client.on('message', message => {
    
      if(message.content.startsWith(prefix + "antibots on")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'On',
  }
  message.channel.send(`**:white_check_mark: Anti bots join mode is enabled**`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
    
          })

  client.on('message', message => {
    if(message.content.startsWith(prefix + "antibots off")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'Off',
  }
  message.channel.send(`**:x: Anti bots mode is disabled**`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
  
          })    
  
  client.on("guildMemberAdd", member => {
    if(!antibots[member.guild.id]) antibots[member.guild.id] = {
  onoff: 'Off'
  }
    if(antibots[member.guild.id].onoff === 'Off') return;
  if(member.user.bot) return member.kick()
  })
  
  fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
  .catch(err => {
  console.error(err);
  });
  
  })
   client.on("message", message => {
      const invitelink4 = "https://discord.com/api/oauth2/authorize?client_id=756636181143486464&permissions=8&scope=bot";
    const cmdlink4 = "https://pgxposystem.com/commands";
    const supportlink4 = "https://discord.gg/Peca9q4";
	var prefix = "-";
 if (message.content === "-help") {
  const embed = new Discord.RichEmbed() 
          .setAuthor('PGxPO', `${client.user.avatarURL}`)
.setColor("#2F3136")
.setDescription("Use:**-help** `<commands/alias/category>` for details")
        .addField("Invite Me" ,`[Click Here](${invitelink4}) to add me to your server`,true)
       .addField("Support" ,`[Click Here](${supportlink4}) If you need help? join support server`,true)
      .setThumbnail(`${client.user.avatarURL}`)
        .setImage('https://cdn.discordapp.com/attachments/755733707842912297/757970038925033573/RegularInexperiencedCero-size_restricted.gif')
        .setURL('https://discord.gg/2fgMnkd')
  .setFooter(message.guild.name, message.guild.iconURL);
   
   message.channel.sendEmbed(embed)
    
   }
   }); 

const warndb = JSON.parse(fs.readFileSync("./warndb.json")) //SpyCodes ™ ©

let maxwarns = 3; 
let warncmd = `${prefix}warn` 
let warnscmd = `${prefix}warns` 
let removewarnscmd = `${prefix}removewarns` 
let maxwarnscmd = `${prefix}maxwarns`
let permission = `MANAGE_GUILD` 
 
client.on("message", message => {   
let cmd = message.content.toLowerCase().split(" ")[0]
if(cmd == warncmd){
if(!message.guild.member(message.author).hasPermission(permission))
return message.channel.send("**:x: You Need `"+permission+"` Permission**")
let user = message.mentions.users.first()
if(!user) return message.channel.send("**:x: I Can't Find This Member !\nUsage: `"+prefix+"warn @user reason`**")
let reason = message.content.split(" ").slice(2).join(" ");
message.channel.send("**:white_check_mark: `"+user.username+"` Warned!**")
user.send("**Your Have Been Warned !\nReason: `"+reason+"`\nServer: `"+message.guild.name+"`**")
if (!warndb[user.id])
warndb[user.id] = {warns: 0};
warndb[user.id].warns++;
fs.writeFile("./warndb.json", JSON.stringify(warndb), err => {
if (err) console.log(err)})
if (warndb[user.id].warns == maxwarns) {
message.guild.member(user).ban()
return message.channel.send("**`"+user.username+"` Has Been Banned From The Server.! Reason: Reash Max Warns `"+maxwarns+"` Warn**")
user.send("**You Have been Banned!\nReason: Reash Max Warns `"+maxwarns+"` Warn\nServer: `"+message.guild.name+"`**")
}
}
if(cmd == warnscmd){
if(!message.guild.member(message.author).hasPermission(permission))
return message.channel.send("**:x: You Need `"+permission+"` Permission**")
let user = message.mentions.users.first()
if(!user) return message.channel.send("**:x: I Can't Find This Member !\nUsage: `"+prefix+"warns @user`**")
if (!warndb[user.id])
warndb[user.id] = {warns: 0};
fs.writeFile("./warndb.json", JSON.stringify(warndb), err => {
if (err) console.log(err)})
message.channel.send("**:white_check_mark: `"+user.username+"` Have `"+warndb[user.id].warns+"` Warns!**");
}// SpyCodes ™ ©
if(cmd == removewarnscmd){
if(!message.guild.member(message.author).hasPermission(permission))
return message.channel.send("**:x: You Need `"+permission+"` Permission**")
let user = message.mentions.users.first()
if(!user) return message.channel.send("**:x: I Can't Find This Member !\nUsage: `"+prefix+"removewarns @user`**")
let reason = message.content.split(" ").slice(2).join(" ");
message.channel.send("**:white_check_mark: `"+user.username+"` Removed `"+warndb[user.id].warns+"` Warn!**")
user.send("**You Have Been Removed `"+warndb[user.id].warns+"` Warn!\nServer: `"+message.guild.name+"`**")
if (!warndb[user.id])
warndb[user.id] = {warns: 0};
warndb[user.id] = {warns: 0};
fs.writeFile("./warndb.json", JSON.stringify(warndb), err => {
if (err) console.log(err)})
}
if(cmd == maxwarnscmd){
if(!message.guild.member(message.author).hasPermission(permission))
return message.channel.send("**:x: You Need `"+permission+"` Permission**")
message.channel.send("**:white_check_mark: The Max Warns Is `"+maxwarns+"` Warn!**")
}
})

const log = JSON.parse(fs.readFileSync('./log.json' , 'utf8'));
client.on('message', message => {
	if (!message.channel.guild) return;
	let room = message.content.split(' ').slice(1);
	let findroom = message.guild.channels.find(r => r.name == room);
	if (message.content.startsWith(prefix + 'setlog')) {
		if (!message.channel.guild)
			return message.reply('**Dear, this is only for servers**');
		if (!message.member.hasPermission('MANAGE_GUILD'))
			return message.channel.send('**Sorry But You Dont Have Permission**');
		if (!room) return message.channel.send('**Please Write Room Name**');
		if (!findroom)
			return message.channel.send('**Please Write Room Name**');
		let embed = new Discord.RichEmbed()
    .setColor('#2F3136')
			.setTitle('**Setup has been successful**')
			.addField('Room Name:', `${room}`)
			.addField('By:', `${message.author}`)
			.setThumbnail(message.author.avatarURL)
			.setFooter(`${client.user.username}`);
		message.channel.sendEmbed(embed);
		log[message.guild.id] = {
			channel: room,
			onoff: 'On'
		};
		fs.writeFile('./log.json', JSON.stringify(log), err => {
			if (err) console.error(err);
		});
	}
});

client.on('message', message => {
	if (message.content.startsWith(prefix + 'log')) {
		if (!message.channel.guild)
			return message.reply('**Dear, this is only for servers**');
		if (!message.member.hasPermission('MANAGE_GUILD'))
			return message.channel.send('**Sorry But You Dont Have Permission**');
		if (!log[message.guild.id])
			log[message.guild.id] = {
				onoff: 'Off'
			};
		if (log[message.guild.id].onoff === 'Off')
			return [
				message.channel.send(`**The log Is \`𝐎𝐍\` !**`),
				(log[message.guild.id].onoff = 'On')
			];
		if (log[message.guild.id].onoff === 'On')
			return [
				message.channel.send(`**The log Is \`𝐎𝐅𝐅\` !**`),
				(log[message.guild.id].onoff = 'Off')
			];
		fs.writeFile('./log.json', JSON.stringify(log), err => {
			if (err)
				console.error(err).catch(err => {
					console.error(err);
				});
		});
	}
});

client.on('messageDelete', message => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES'))
		return;
	if (!log[message.guild.id])
		log[message.guild.id] = {
			onoff: 'Off'
		};
	if (log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(
		c => c.name === `${log[message.guild.id].channel}`
	);
	if (!logChannel) return;

	let messageDelete = new Discord.RichEmbed()
				.setAuthor(message.author.tag,message.author.avatarURL)
		.setColor('#2F3136')
		.setDescription(`**:wastebasket: Message sent by <@${message.author.id}> deleted in ${message.channel} .**  
${message}`)
		.setTimestamp()
		.setFooter(message.guild.name, message.guild.iconURL);

	logChannel.send(messageDelete);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.author.bot) return;
	if (!oldMessage.channel.type === 'dm') return;
	if (!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS'))
		return;
	if (!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES'))
		return;
	if (!log[oldMessage.guild.id])
		log[oldMessage.guild.id] = {
			onoff: 'Off'
		};
	if (log[oldMessage.guild.id].onoff === 'Off') return;
	var logChannel = oldMessage.guild.channels.find(
		c => c.name === `${log[oldMessage.guild.id].channel}`
	);
	if (!logChannel) return;

	if (oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
		.setAuthor(oldMessage.author.tag,oldMessage.author.avatarURL)
		.setColor('#2F3136')
		.setDescription(`**:pencil2: Message sent by <@${oldMessage.author.id}> edited in ${oldMessage.channel}.** 
**Old**\`\`\`${oldMessage}\`\`\`**New**\`\`\`${newMessage}\`\`\``)
		.setTimestamp()
		.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

	logChannel.send(messageUpdate);
});


client.on('roleCreate', role => {
	if (!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	if (!log[role.guild.id])
		log[role.guild.id] = {
			onoff: 'Off'
		};
	if (log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(
		c => c.name === `${log[role.guild.id].channel}`
	);
	if (!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		let roleCreate = new Discord.RichEmbed()
			.setAuthor(role.guild.name, role.guild.iconURL)
		.setColor('#2F3136')
			.setDescription(`:family_mmb: \`\`${role.name}\`\` **role has been created.** `)
      .addField("**Responsible Moderator:** ",`<@${userID}>`)
			.setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
		logChannel.send(roleCreate);
	});
});

client.on('roleDelete', role => {
	if (!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	if (!log[role.guild.id])
		log[role.guild.id] = {
			onoff: 'Off'
		};
	if (log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(
		c => c.name === `${log[role.guild.id].channel}`
	);
	if (!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
			.setAuthor(role.guild.name, role.guild.iconURL)
			.setDescription(`:family_mmb: \`\`${role.name}\`\` **role has been deleted.** `)
      .addField("**Responsible Moderator:** ",`<@${userID}>`)
			.setColor('#2F3136')
			.setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)

		logChannel.send(roleDelete);
	});
});


client.on('roleUpdate', (oldRole, newRole) => {
	if (!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG'))
		return;
	if (!log[oldRole.guild.id])
		log[oldRole.guild.id] = {
			onoff: 'Off'
		};
	if (log[oldRole.guild.id].onoff === 'Off') return;
	var logChannel = oldRole.guild.channels.find(
		c => c.name === `${log[oldRole.guild.id].channel}`
	);
	if (!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if (oldRole.name !== newRole.name) {
			if (log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateName = new Discord.RichEmbed()
      .setAuthor(oldRole.guild.name, oldRole.guild.iconURL)
				.setThumbnail(newRole)
				.setColor('#2F3136')
				.setDescription(`**:family_mmb: \`${newRole.name}\` role has been updated.**`)
				.addField("**Old name** ",`${oldRole.name}`,true)
        .addField("**New name** ",`${newRole.name}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
        .setTimestamp()
				.setFooter(oldRole.guild.name, oldRole.guild.iconURL);

			logChannel.send(roleUpdateName);
		}
		if (oldRole.hexColor !== newRole.hexColor) {
			if (oldRole.hexColor === '#000000') {
				var oldColor = '`0`';
			} else {
				var oldColor = oldRole.hexColor;
			}
			if (newRole.hexColor === '#000000') {
				var newColor = '`0`';
			} else {
				var newColor = newRole.hexColor;
			}
			if (log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateColor = new Discord.RichEmbed()
			.setAuthor(newRole.guild.name, newRole.guild.iconURL)
				.setColor('#2F3136')
				.setDescription(`**:family_mmb: \`${oldRole.name}\` role has been updated.**`)
				.addField("**Old color:** ",`${oldColor}`,true)
        .addField("**New color:** ",`${newColor}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
        .setTimestamp()
				.setFooter(newRole.guild.name, newRole.guild.iconURL);

			logChannel.send(roleUpdateColor);
		}
	});
});

client.on('channelCreate', channel => {
	if (!channel.guild) return;
	if (!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG'))
		return;
	if (!log[channel.guild.id])
		log[channel.guild.id] = {
			onoff: 'Off'
		};
	if (log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(
		c => c.name === `${log[channel.guild.id].channel}`
	);
	if (!logChannel) return;

	if (channel.type === 'text') {
		var roomType = 'Text';
	} else if (channel.type === 'voice') {
		var roomType = 'Voice';
	} else if (channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
	.setAuthor(channel.guild.name, channel.guild.iconURL)
			.setDescription(`:house:  **Channel Created:** \`\`${channel.name}\`\` `)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,)
			.setColor('#2F3136')
			.setTimestamp()
			.setFooter(client.user.username, client.user.avatarURL)
		logChannel.send(channelCreate);
	});
});

client.on('channelDelete', channel => {
	if (!channel.guild) return;
	if (!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG'))
		return;
	if (!log[channel.guild.id])
		log[channel.guild.id] = {
			onoff: 'Off'
		};
	if (log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(
		c => c.name === `${log[channel.guild.id].channel}`
	);
	if (!logChannel) return;

	if (channel.type === 'text') {
		var roomType = 'Text';
	} else if (channel.type === 'voice') {
		var roomType = 'Voice';
	} else if (channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setAuthor(channel.guild.name, channel.guild.iconURL)
			.setDescription(`:house:  **Channel Deleted:** \`\`${channel.name}\`\` `)
      .addField("**Responsible Moderator:** ",`<@${userID}>`)
			.setColor('#2F3136')
			.setTimestamp()
			.setFooter(client.user.username, client.user.avatarURL)

		logChannel.send(channelDelete);
	});
});

client.on('channelUpdate', (oldChannel, newChannel) => {
	if (!oldChannel.guild) return;
	if (!log[oldChannel.guild.id])
		log[oldChannel.guild.id] = {
			onoff: 'Off'
		};
	if (log[oldChannel.guild.id].onoff === 'Off') return;
	var logChannel = oldChannel.guild.channels.find(
		c => c.name === `${log[oldChannel.guild.id].channel}`
	);
	if (!logChannel) return;

	if (oldChannel.type === 'text') {
		var channelType = 'Text';
	} else if (oldChannel.type === 'voice') {
		var channelType = 'Voice';
	} else if (oldChannel.type === 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if (oldChannel.name !== newChannel.name) {
			let newName = new Discord.RichEmbed()
				.setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL)
			.setDescription(`:house:  **Channel Updated:** \`\`${oldChannel.name}\`\` `)
      .addField("**Old name** ",`${oldChannel.name}`,true)
      .addField("**New name** ",`${newChannel.name}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setColor('#2F3136')
			.setTimestamp()
			.setFooter(client.user.username, client.user.avatarURL)

			logChannel.send(newName);
		}
		if (oldChannel.topic !== newChannel.topic) {
			if (log[oldChannel.guild.id].onoff === 'Off') return;
			let newTopic = new Discord.RichEmbed()
			.setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL)
			.setDescription(`:house:  **Channel Updated:** \`\`${oldChannel.name}\`\` `)
      .addField("**Old Topic** ",`${oldChannel.topic ||'NULL'}`,true)
      .addField("**New Topic** ",`${newChannel.topic ||'NULL'}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setColor('#2F3136')
			.setTimestamp()
			.setFooter(client.user.username, client.user.avatarURL)

			logChannel.send(newTopic);
		}
	});
});

client.on('guildBanAdd', (guild, user) => {
	if (!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	if (!log[guild.id])
		log[guild.id] = {
			onoff: 'Off'
		};
	if (log[guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(
		c => c.name === `${log[guild.id].channel}`
	);
	if (!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if (userID === client.user.id) return;

		let banInfo = new Discord.RichEmbed()
    .setAuthor(user.username, userAvatar)
.setThumbnail(userAvatar)
			.setDescription(`:airplane: <@${user.id}>   **banned from the server.** `)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setColor('#2F3136')
			.setTimestamp()
      .setFooter(guild.name, guild.iconURL);
		logChannel.send(banInfo);
	});
});


client.on('guildBanRemove', (guild, user) => {
	if (!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	if (!log[guild.id])
		log[guild.id] = {
			onoff: 'Off'
		};
	if (log[guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(
		c => c.name === `${log[guild.id].channel}`
	);
	if (!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if (userID === client.user.id) return;

		let unBanInfo = new Discord.RichEmbed()
    .setAuthor(user.username, userAvatar)
		.setThumbnail(userAvatar)
		.setColor('#2F3136')
		.setDescription(`**:airplane_arriving: <@${user.id}> unbanned.**`)
    .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	});
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	if (!oldMember.guild) return;
	if (!log[oldMember.guild.id])
		log[oldMember.guild.id] = {
			onoff: 'Off'
		};
	if (log[oldMember.guild.id].onoff === 'Off') return;
	var logChannel = oldMember.guild.channels.find(
		c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
	);
	if (!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if (oldMember.nickname !== newMember.nickname) {
			if (oldMember.nickname === null) {
				var oldNM = '`Same as his name`';
			} else {
				var oldNM = oldMember.nickname;
			}
			if (newMember.nickname === null) {
				var newNM = '`Same as his name`';
			} else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
      .setAuthor(oldMember.user.username, oldMember.user.avatarURL)
    .setThumbnail(userAvatar)
			.setDescription(`${oldMember} 's nickname has been changed.`)
      .addField("**Old Nickname :** ",`${oldNM||'NULL'}`,true)
      .addField("**New Nickname :** ",`${newNM||'NULL'}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setColor('#2F3136')
			.setTimestamp()
      .setFooter(userTag, userAvatar);

			logChannel.send(updateNickname);
		}
		if (oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles
				.filter(r => !oldMember.roles.has(r.id))
				.first();
			if (!log[oldMember.guild.id])
				log[oldMember.guild.id] = {
					onoff: 'Off'
				};
			if (log[oldMember.guild.id].onoff === 'Off') return;
			let roleAdded = new Discord.RichEmbed()
		   .setAuthor(userTag, userAvatar)
    .setThumbnail(userAvatar)
			.setDescription(`:writing_hand: <@${oldMember.user.id}> **has been updated.**`)
      .addField("**Roles:**",`:white_check_mark: ${role.name}`,)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,)
			.setColor('#2F3136')
			.setTimestamp()
				.setFooter(userTag, userAvatar);

			logChannel.send(roleAdded);
		}
		if (oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles
				.filter(r => !newMember.roles.has(r.id))
				.first();
			if (!log[oldMember.guild.id])
				log[oldMember.guild.id] = {
					onoff: 'Off'
				};
			if (log[(oldMember, newMember.guild.id)].onoff === 'Off') return;
			let roleRemoved = new Discord.RichEmbed()
	   .setAuthor(userTag, userAvatar)
    .setThumbnail(userAvatar)
			.setDescription(`:writing_hand: <@${oldMember.user.id}> **has been updated.**`)
      .addField("**Roles:**",`:no_entry: ${role.name}`,)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,)
			.setColor('#2F3136')
			.setTimestamp()
				.setFooter(userTag, userAvatar);


			logChannel.send(roleRemoved);
		}
	});
	if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
		if (!log[oldMember.guild.id])
			log[oldMember.guild.id] = {
				onoff: 'Off'
			};
		if (log[(oldMember, newMember.guild.id)].onoff === 'Off') return;
		let newOwner = new Discord.RichEmbed()
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('#2F3136')
			.setDescription(`:house: Guild Updated: <@${oldMember.user.id}> `)
			      .addField("**Old Owner:**",`${oldMember.user.id}`,)
            .addField("**New Owner:**",`${newMember.user.id}`,)
      .setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL);
    
    
		logChannel.send(newOwner);
	}
});
client.on("guildMemberAdd", member => {
	if (!log[member.guild.id])
		log[member.guild.id] = {
			onoff: 'Off'
		};
	if (log[(member, member.guild.id)].onoff === 'Off') return;
	var logChannel = member.guild.channels.find(
		c => c.name === `${log[(member, member.guild.id)].channel}`
	);
	if (!logChannel) return;
   
      member.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;
        
      var embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
      
    .setDescription(`${member} **joined the server.** \n`)
      .addField(":timer: Age of account:", `\`${moment(member.createdAt).format("D/M/YYYY h:mm a ")}\``)
      .setTimestamp()
				.setFooter(userTag, userAvatar)
        .setColor("#2F3136")
      logChannel.send({ embed: embed });
    })
 });

 client.on("guildMemberRemove", member => {
	if (!log[member.guild.id])
		log[member.guild.id] = {
			onoff: 'Off'
		};
	if (log[(member, member.guild.id)].onoff === 'Off') return;
	var logChannel = member.guild.channels.find(
		c => c.name === `${log[(member, member.guild.id)].channel}`
	);
	if (!logChannel) return;
   
      member.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;
        
      var embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
      
    .setDescription(`${member} **left.**`)
      .setTimestamp()
				.setFooter(userTag, userAvatar)
        .setColor("#2F3136")
      logChannel.send({ embed: embed });
    })
 });
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
	if (!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG'))
		return;
	if (!log[voiceOld.guild.id])
		log[voiceOld.guild.id] = {
			onoff: 'Off'
		};
	if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
	var logChannel = voiceOld.guild.channels.find(
		c => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
	);
	if (!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new Discord.RichEmbed()
      .setAuthor(userTag, userAvatar)
      .setColor('#2F3136')
       .setDescription(`**Voice state of ${voiceOld} has been updated.**`)
        .addField("**:microphone2: Server Mute:** ",`**True**`,)
        .addField("**Responsible Moderator:** ",`<@${userID}>`,)
				.setTimestamp()
				.setFooter(userTag, userAvatar);
      
      logChannel.send(serverMutev);
		}
		if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
			if (!log[voiceOld.guild.id])
				log[voiceOld.guild.id] = {
					onoff: 'Off'
				};
			if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
			let serverUnmutev = new Discord.RichEmbed()
      .setAuthor(userTag, userAvatar)
      .setColor('#2F3136')
				.setDescription(`**Voice state of ${voiceOld} has been updated.**`)
        .addField("**:microphone2: Server Mute:** ",`**False**`,)
        .addField("**Responsible Moderator:** ",`<@${userID}>`,)
				.setTimestamp()
				.setFooter(userTag, userAvatar);


			logChannel.send(serverUnmutev);
		}
		if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
			if (!log[voiceOld.guild.id])
				log[voiceOld.guild.id] = {
					onoff: 'Off'
				};
			if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
			let serverDeafv = new Discord.RichEmbed()
		      .setAuthor(userTag, userAvatar)
      .setColor('#2F3136')
				.setDescription(`**Voice state of ${voiceOld} has been updated.**`)
        .addField("**:speaker: Server Deafen :** ",`True`,)
        .addField("**Responsible Moderator:** ",`<@${userID}>`,)
				.setTimestamp()
				.setFooter(userTag, userAvatar);

			logChannel.send(serverDeafv);
		}
		if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
			if (!log[voiceOld.guild.id])
				log[voiceOld.guild.id] = {
					onoff: 'Off'
				};
			if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
			let serverUndeafv = new Discord.RichEmbed()
				.setAuthor(userTag, userAvatar)
      .setColor('#2F3136')
				.setDescription(`**Voice state of ${voiceOld} has been updated.**`)
        .addField("**:speaker: Server Deafen :** ",`False`,)
        .addField("**Responsible Moderator:** ",`<@${userID}>`,)
				.setTimestamp()
				.setFooter(userTag, userAvatar);

			logChannel.send(serverUndeafv);
		}
	});

	if (
		voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
		voiceNew.voiceChannel &&
		voiceOld.voiceChannel != null
	) {
		if (!log[voiceOld.guild.id])
			log[voiceOld.guild.id] = {
				onoff: 'Off'
			};
	if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
    .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
      .setColor('#2F3136')
				.setDescription(`**${voiceOld} switched voice channel \`\`${voiceOld.voiceChannel.name}\`\` => \`\`${voiceNew.voiceChannel.name}.\`\`**`)
				.setTimestamp()
    .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
		logChannel.send(voiceLeave);
	}
  if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
	 {
		if (!log[voiceOld.guild.id])
			log[voiceOld.guild.id] = {
				onoff: 'Off'
			};
	if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
    .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
      .setColor('#2F3136')
		.setDescription(`${voiceOld} **left voice channel** \`\`${voiceOld.voiceChannel.name}\`\`.`)
				.setTimestamp()
    .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
		logChannel.send(voiceLeave);
	}
    }
  if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
	 {
		if (!log[voiceOld.guild.id])
			log[voiceOld.guild.id] = {
				onoff: 'Off'
			};
	if (log[(voiceOld, voiceOld.guild.id)].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
    .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
      .setColor('#2F3136')
		.setDescription(`${voiceOld} **joined voice channel** \`\`${voiceNew.voiceChannel.name}\`\`.`)
				.setTimestamp()
    .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
		logChannel.send(voiceLeave);
	}
}});


client.on('guildUpdate', (oldGuild, newGuild) => {
if (!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if (!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	if (!log[oldGuild.id])
		log[oldGuild.id] = {
			onoff: 'Off'
		};
	if (log[oldGuild.id].onoff === 'Off') return;
	var logChannel = oldGuild.channels.find(
		c => c.name === `${log[oldGuild.id].channel}`
	);
	if (!logChannel) return;

	oldGuild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldGuild.name !== newGuild.name) {
			let guildName = new Discord.RichEmbed()
			.setThumbnail(userAvatar)
			.setColor('#2F3136')
      .setAuthor(newGuild.name, oldGuild.iconURL)
			.setDescription(`:house:  **Guild Updated:** \`${newGuild.name}\``)
        .addField("**Old Name** ",`${oldGuild.name ||'NULL'}`,true)
      .addField("**New Name** ",`${newGuild.name ||'NULL'}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setTimestamp()
			.setFooter(newGuild.name, oldGuild.iconURL)

			logChannel.send(guildName)
		}
		if(oldGuild.region !== newGuild.region) {
			let guildRegion = new Discord.RichEmbed()
			.setThumbnail(userAvatar)
			.setColor('#2F3136')
      .setAuthor(oldGuild.name, oldGuild.iconURL)
      .setDescription(`:house:  **Guild Updated:** \`${newGuild.region}\``)
        .addField("**Old Region** ",`${oldGuild.region ||'NULL'}`,true)
      .addField("**New Region** ",`${newGuild.region ||'NULL'}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(guildRegion);
		}
		if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
			if(oldGuild.verificationLevel === 0) {
				var oldVerLvl = 'Very Easy';
			}else
			if(oldGuild.verificationLevel === 1) {
				var oldVerLvl = 'Easy';
			}else
			if(oldGuild.verificationLevel === 2) {
				var oldVerLvl = 'Medium';
			}else
			if(oldGuild.verificationLevel === 3) {
				var oldVerLvl = 'Hard';
			}else
			if(oldGuild.verificationLevel === 4) {
				var oldVerLvl = 'Very Hard';
			}

			if(newGuild.verificationLevel === 0) {
				var newVerLvl = 'Very Easy';
			}else
			if(newGuild.verificationLevel === 1) {
				var newVerLvl = 'Easy';
			}else
			if(newGuild.verificationLevel === 2) {
				var newVerLvl = 'Medium';
			}else
			if(newGuild.verificationLevel === 3) {
				var newVerLvl = 'Hard';
			}else
			if(newGuild.verificationLevel === 4) {
				var newVerLvl = 'Very Hard';
			}

			let verLog = new Discord.RichEmbed()
      .setThumbnail(userAvatar)
			.setColor('#2F3136')
      .setAuthor(oldGuild.name, oldGuild.iconURL)
      .setDescription(`:house:  **Guild Updated:** \`${oldVerLvl}\``)
        .addField("**Old Verification** ",`${oldVerLvl ||'NULL'}`,true)
      .addField("**New Verification** ",`${newVerLvl ||'NULL'}`,true)
      .addField("**Responsible Moderator:** ",`<@${userID}>`,true)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(verLog);
		}
	})
});

client.login(process.env.token);
