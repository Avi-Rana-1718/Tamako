const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

let Discord = require("discord.js");
let client = new Discord.Client;

client.on("ready", () => {
  console.log("ready");
  client.user.setPresence({ activity: { name: "!help" } });
});

const prefix ="!";
const api = require('gogoanime-xp');

client.on("message", async (message) => {

if (message.content == `${prefix}help`) {
  message.channel.send("__**Commands**__\nPrefix:`!`\n`help`\n`anime <args>`\n`advance <args>`\n**args**: anime name with `-` instead of spaces.")
}

if (message.content.includes(`${prefix}anime`)) {
const precom = `${prefix}anime`;
    	const args = message.content.slice(precom.length).trim().split(" ");
	const command = args.shift().toLowerCase();
  //ANIME DATA SERVR
    api.search(command)
  .then(res => {
    var count = Object.keys(res[0].episodes).length;
    console.log(count);
var title = res[0].id;
  //ANIME INFO
    let info = new Discord.MessageEmbed()
    .setTitle(res[0].title)
    .setDescription(res[0].synopsis)
    .setThumbnail(res[0].img)
    .setColor("#E41F7B")
    message.channel.send(info);
  //EPISODE LENGTH
  let epembed = new Discord.MessageEmbed()
  .setDescription(`Which episode do you want to play? ${count} episodes found.`)
          .setFooter('Specific the episode number')
          .setTimestamp()
          .setColor("#E41F7B")
      message.channel.send(epembed);

  const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
          var ep = message.content;

  api.animeEpisodeHandler(`${title}-episode-${ep}`)
  .then(info =>{
const output = `${title}`;
console.log(`${command}-episode-${ep}`)
console.log(output);

api.search(output)
  .then(data =>{
  let pembed = new Discord.MessageEmbed()
    .setTitle(`**${data[0].title}**`)
    .setDescription(`Episode ${ep}\n**Watch**: [Link](https://avi-rana-1718.github.io/Tamako?src=${info[0].servers[2].iframe}&title=${title}&ep=${ep})`)
      .setColor("#E41F7B")
    .setTimestamp()
    message.channel.send(pembed)

 }).catch(() => message.channel.send("Error | Episode not found."));
        });
});
    }).catch(() => message.channel.send("`Error` | Invalid search"));
}
// PLAY EPISODE

  //Advance
  if (message.content.includes(`${prefix}advance`)) {
  
const advcommand = `!advance`;
    	const advarg = message.content.slice(advcommand.length).trim().split(" ");
        const advinput = advarg.shift().toLowerCase();
    console.log(advinput);
  
 api.animeEpisodeHandler(advinput)
  .then(res =>{
  const advoutput = advinput.split("-episode-");
api.search(advoutput[0])
  .then(data =>{
    var title = data[0].title.replace(/ /g,"-");
  let advembed = new Discord.MessageEmbed()
      .addFields(
        {name:`${res[0].servers[0].name}`, value:`${res[0].servers[0].iframe}`},
        {name:`${res[0].servers[1].name}`, value:`${res[0].servers[1].iframe}`},
        {name:`${res[0].servers[2].name}`, value:`${res[0].servers[2].iframe}`},
        {name:`${res[0].servers[3].name}`, value:`${res[0].servers[3].iframe}`},
        {name:`${res[0].servers[4].name}`, value:`${res[0].servers[4].iframe}`},
)
      .setColor("#E41F7B")
    .setTimestamp()
    message.channel.send(advembed);
  }).catch(() => message.channel.send("`Error` | Episode not found."));


  });
        }
  });

  client.login(process.env.token);