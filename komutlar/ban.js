const Discord = require('discord.js');
const fs = require('fs');

const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

  let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

  const db = require('quick.db');
  

    
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(' Bu komutu kullanabilmek için "\`Üyeleri Engelle\`" yetkisine sahip olmalısın!');//Frenzy - Krossz

  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  
  if (db.has(`log_${message.guild.id}`) === false) return message.channel.send(` Mod log kanalı ayarlanmamış ayarlamak için | \`${prefix}modlog #kanal\``);//Frenzy - Krossz
  let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`));
  if (message.mentions.users.size < 1) return message.channel.send('Lütfen yasaklamak istediğiniz kullanıcıyı etiketleyin!');
  if (reason.length < 1) return message.channel.send('Lütfen sebep giriniz!');
  if (user.id === message.author.id) return message.channel.send('Kendini yasaklayamazsın!');

  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .addField('İşlem', 'Sunucudan Yasaklama')
  .addField('Yasaklanan Üye', `${user.tag} (${user.id})`)//Frenzy - Krossz
  .addField('Yasaklayan Yetkili', `${message.author.username}#${message.author.discriminator}`)//Frenzy - Krossz
  .addField('Yasaklanma Sebebi', "```" + reason + "```")//Frenzy - Krossz
  modlog.send(embed);
  user.send(`**${message.guild.name}** Adlı Sunucuda Yaptığınız Olumsuz Davranışlardan Dolayı Yasaklandınız! \n Yetkilinin girdiği sebep: **${reason}**`)
  

  message.guild.member(user).ban();
  
  message.channel.send(`Kullanıcı başarıyla banlandı!`)//Frenzy - Krossz

  
};

exports.config = {
  name: 'yasakla',
  aliases: ['ban','yasakla','banla']
};
//Frenzy - Krossz