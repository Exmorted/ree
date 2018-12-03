const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("YOU HAVE NO POWER HERE");
  //let muterole = message.guild.roles.find(`name`, "muted");
  let muterole = message.guild.roles.find(r=>r.name === "muted")
  //start of create role
message.reply("Test")
  if(!muterole){
    message.reply("works lole")
    try{
      muterole = await message.guild.roles.create({
        data:{
        name: "muted",
        color: "#000000",
        permissions:[]
      }
    })

      message.guild.channels.forEach(async (channel, id) => {
        try{
       await channel.overwritePermissions({
           permissionOverwrites: [
               {
                   id: message.author.id,
                   deny: ["SEND_MESSAGES"],
               },
           ],
           reason: "Needed to change permissions"
       })
   } catch(error) {
       console.log(error);
   };
 })
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("hvor længe?");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
}
catch(error) {
    console.log(error);
};

//end of module


module.exports.help = {

  name: "tempmute"
}
