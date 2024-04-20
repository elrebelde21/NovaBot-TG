require("./settings")
const { bot, all_Data, printMessages, printMessageError } = require('./lib/print')
const TelegramBot = require('node-telegram-bot-api')
const { exec } = require('child_process')
const { Telegraf } = require('telegraf')
const readline = require('readline')
const fetch = require('node-fetch')
const cfonts = require('cfonts')
const chalk = require('chalk') 
const path = require('path')
const fs = require('fs')
const { say } = cfonts

//const bot = new TelegramBot(token, { polling: { allowed_updates: ['message'] } }) // recibir todos los mensajes (puede ocasionar saturación)
//const bot = new TelegramBot(token, { polling: true }) // Recibir solo mensajes de llamada

//let chatId
//let userName

//welcome
bot.on('new_chat_members', (msg) => {
    const chatId = msg.chat.id;
    const newUser = msg.new_chat_member.first_name;
    const date = new Date(msg.date * 1000); // Convertir la fecha Unix a fecha legible
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Formato de fecha DD/MM/AAAA
    const formattedTime = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`; // Formato de hora HH:MM
    const chatTitle = msg.chat.title; // Nombre del grupo
    const chatDescription = msg.chat.description; // Descripción del grupo

bot.sendPhoto(chatId, imagen1, {caption: `╭┈⊰ ${chatTitle} ⊰┈ ✦\n┊✨ BIENVENIDO(A)!!\n┊💖 @${newUser}\n┊🔖Fecha: ${formattedDate}\n┊🕕 Hora: ${formattedTime}\n┊📄 LEA LA DESCRIPCIÓN DEL GRUPO\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✦\n${chatDescription}`});
});

bot.on('left_chat_member', (msg) => {
    const chatId = msg.chat.id;
    const leftUser = msg.left_chat_member.first_name;
    bot.sendPhoto(chatId, imagen1, {caption: `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰\n┊ @${leftUser}\n┊ NO FUE DIGNO(A) DE ESTAR AQUÍ!! 🌟\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰`});
}); 

bot.onText(/^\/start/, function(msg){
const chatId = msg.chat.id
const userName = msg.from.first_name
bot.sendPhoto(chatId, imagen1, {caption: `◈ Bienvenido a mi bot 
*˚₊·˚₊· ͟͟͞͞➳❥ @${userName}
*☆═━┈◈ ╰ ${vs} ㎇ ╯ ◈┈━═☆*
*│* 
*╰ ㊂ ▸▸ _Lista de comando:_ ◂◂*
*│* ┊
*│* ┊▸ ❥ /ping
*│* ┊▸ ❥ /uptime
*│* ┊▸ ❥ /grupos
*│* ┊▸ ❥ /ia
*│* ┊▸ ❥ /chatgpt
*│* ┊▸ ❥ /gemini
*│* ┊▸ ❥ /image
*│* ┊▸ ❥ /google
*│* ┊▸ ❥ /yts
*│* ┊▸ ❥ /tiktok
*│* ┊▸ ❥ /instagram
*│* ┊▸ ❥ /facebook
*│* ┊▸ ❥ /ig
*│* ┊▸ ❥ /twiter 
*│* ┊▸ ❥ /letra
*│* ┊▸ ❥ /x
*│* ┊▸ ❥ /wallpaper
*│* ┊▸ ❥ /pinterest
*│* ┊▸ ❥ /admins
*│* ┊▸ ❥ /report
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
 ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ `,
reply_markup: {
inline_keyboard: [
[{ text: 'Prueba', callback_data: 'start' }],
[{ text: 'Velocidad', callback_data: 'ping' }],                    
],
},
});  
})

let startTime = new Date()
console.log(`🚀 Iniciando....`) 

//inició del los comando
bot.onText(/\/menu/, (msg) => {
const chatId = msg.chat.id;
const userName = msg.from.first_name; // Obtén el nombre visible del usuario

bot.sendMessage(chatId, `Hola @${userName}`, {
reply_markup: {
inline_keyboard: [
[{ text: 'Prueba', callback_data: 'start' }],
[{ text: 'Velocidad', callback_data: 'ping' }],                    
],
},
});
//Otra manera de poner botones
/*conn.sendMessage(chatId, `Hola ${userName}`, {
    reply_markup: {
      keyboard: [
        ['/start', 'Opción 2']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });*/
});

let lastPingTime = 0;
bot.onText('ping', async (msg) => {
const chatId = msg.chat.id;
bot.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."
const startTime = performance.now()
const endTime = performance.now();
const pingTime = endTime - startTime;
lastPingTime = pingTime;
bot.sendMessage(chatId, `Pong 🏓: ${pingTime.toFixed(2)} ms`);
});

bot.onText('uptime', (msg) => {
const chatId = msg.chat.id;
bot.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."
    const currentTime = new Date();
    const uptimeInSeconds = Math.floor((currentTime - startTime) / 1000);
    bot.sendMessage(chatId,`🚩 Online: ${formatUptime(uptimeInSeconds)}`);
});
function formatUptime(uptimeInSeconds) {
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

bot.onText(/grupos/, async (msg) => {
const chatId = msg.chat.id;
let str = `💕 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊(𝘼) 𝘼 𝙇𝙊𝙎 𝙂𝙍𝙐𝙋𝙊𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎

💞 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇 𝙂𝙍𝙊𝙐𝙋𝙎
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙏𝙚 𝙞𝙣𝙫𝙞𝙩𝙤 𝙖 𝙦𝙪𝙚 𝙩𝙚 𝙪𝙣𝙖𝙨 𝙖 𝙡𝙖 𝘾𝙤𝙢𝙪𝙣𝙞𝙙𝙖𝙙 𝙂𝙖𝙩𝙖𝘽𝙤𝙩. ✨ 𝙏𝙚𝙣 𝙪𝙣 𝙗𝙪𝙚𝙣 𝙢𝙤𝙢𝙚𝙣𝙩𝙤 𝙚 𝙞𝙣𝙩𝙚𝙧𝙖𝙘𝙘𝙞𝙤𝙣𝙖 𝙘𝙤𝙣 𝙉𝙤𝙨𝙤𝙩𝙧𝙤𝙨. 😸

𝙄 𝙞𝙣𝙫𝙞𝙩𝙚 𝙮𝙤𝙪 𝙩𝙤 𝙟𝙤𝙞𝙣 𝙩𝙝𝙚 𝙂𝙖𝙩𝙖𝘽𝙤𝙩 𝘾𝙤𝙢𝙢𝙪𝙣𝙞𝙩𝙮. 💫 𝙃𝙖𝙫𝙚 𝙖 𝙜𝙤𝙤𝙙 𝙩𝙞𝙢𝙚 𝙖𝙣𝙙 𝙞𝙣𝙩𝙚𝙧𝙖𝙘𝙩 𝙬𝙞𝙩𝙝 𝙪𝙨. 😼
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𓃠 𝗩𝗲𝗿𝘀𝗶𝗼́𝗻 𝗱𝗲: ${wm}
➥ ${vs}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✅ 𝙂𝙍𝙐𝙋𝙊 𝙊𝙁𝙄𝘾𝙄𝘼𝙇 ${wm}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
**✨ Informate de las novedades!!!**
🐈 ${nna}\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🐈 ${nn2}\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🐈 ${nn3}\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
**Por favor, no ingresar con números de Bots, y mantener el respeto.**\n
**Please, do not enter with Bot numbers, and maintain respect.**`.trim()
bot.sendVideo(chatId, gataVidMenu, { caption: str });
});

bot.onText(/\/admins|admintradores/, (msg) => {
const chatId = msg.chat.id;
const text = msg.text
//Obtener la lista de miembros del grupo
bot.getChatAdministrators(chatId).then((administrators) => {

let oi = `**MENSAJE :** ${text}` 
let taggedUsers = '';
administrators.forEach((admin) => { 
const username = admin.user.username;
if (username) {
taggedUsers += `⎔ @${username}\n`;
}});
bot.sendMessage(chatId, `**⊱ ──── 《.⋅ 🐈 ⋅.》 ──── ⊰**
ෆ **NOTIFICACIÓN PARA ADMINS**
ෆ ${oi}
**⊱ ──── 《.⋅ ${vs} ⋅.》 ──── ⊰**

${taggedUsers}

**⛔ PRESENCIA DE ADMINS. ⛔**`);
}).catch((error) => {
console.error('⚠️ Ocurrió un error:', error);
});
}); 

bot.onText(/ia|chatgpt/, async (msg) => {
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; // Aquí obtienes el texto del mensaje
if (!text) bot.sendMessage(chatId, '⚠️ Por favor, ingresa un texto');
bot.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."
//conn.sendChatAction(chatId, 'record_audio'); //Muestra como "grabando audio"
let gpt = await fetch(global.API('fgmods', '/api/info/openai2', { text }, 'apikey'));        
let res = await gpt.json()
await bot.sendMessage(chatId, res.result)
});

bot.onText(/gemini/, async (msg) => {
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; // Aquí obtienes el texto del mensaje
if (!text) bot.sendMessage(chatId, '⚠️ Por favor, ingresa un texto');
bot.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."

//Programa la eliminación del mensaje.
bot.sendMessage(chatId, '🚀 Ya voy con tu perdidos').then((sentMessage) => {
const messageId = sentMessage.message_id;
setTimeout(() => {
bot.deleteMessage(chatId, messageId);
}, 5000)});

let gpt = await fetch(global.API('fgmods', '/api/info/gemini', { text }, 'apikey'));
let res = await gpt.json()
await bot.sendMessage(chatId, res.result)
});

bot.onText(/google|Google/, async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.split(' ')[1]; // Obtener el texto después de "tiktok"
if (!text) return bot.sendMessage(chatId, '⚠️ Que esta buscando?');  
let google = require('google-it')
google({'query': text}).then(res => {
let teks = `💫  RESULTADOS: ${text}\n\n`
for (let g of res) {
teks += `• 𝐓𝐈𝐓𝐔𝐋𝐎: ${g.title}\n`
teks += `• 𝐃𝐄𝐒𝐂: ${g.snippet}\n`
teks += `• 𝐋𝐈𝐍𝐊: ${g.link}\n\n✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧\n\n`
} 
bot.sendMessage(chatId, teks);
});
}); 

bot.onText(/image|imagen/, async (msg) => {
const {googleImage} = require('@bochilteam/scraper') 
  const chatId = msg.chat.id;
  const text = msg.text.split(' ')[1]
  if (!text) {
   bot.sendMessage(chatId, '⚠️ Que esta buscado?');
    return;
  }
   try {
const res = await googleImage(text);
const image = res[Math.floor(Math.random() * res.length)]
const link = image;
  bot.sendPhoto(chatId, link);
  } catch (error) {
    bot.sendMessage(chatId, 'Hubo un error al obtener la imagen.');
  }
});

bot.onText('yts', async (msg) => {
const yts = require('yt-search') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, '⚠️ que esta buscando?');
  let results = await yts(text)
let tes = results.videos
let teks = tes.map(v => `📌 𝗧𝗜́𝗧𝗨𝗟𝗢 ${v.title}
⌚ 𝗗𝗨𝗥𝗔𝗖𝗜𝗢́𝗡: ${v.timestamp}
📆 𝗙𝗘𝗖𝗛𝗔: ${v.ago}
👀 𝗩𝗜𝗦𝗧𝗔: ${v.views.toLocaleString()}
🔗 𝗟𝗜𝗡𝗞: ${v.url}
`.trim()).join('\n________________________\n\n')
bot.sendMessage(chatId, teks);
});

bot.onText(/tiktok/, async (msg) => {
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; //Obtener el texto después de "tiktok"
if (!text) return bot.sendMessage(chatId, '⚠️ Ingresa el enlace de algún video de TikTok');
try {
bot.sendMessage(chatId, `╰⊱❕⊱ **INFORMACIÓN** ⊱❕⊱╮\n\n𝙋𝙍𝙊𝙉𝙏𝙊 𝙏𝙀𝙉𝘿𝙍𝘼 𝙀𝙇 𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙏𝙄𝙆𝙏𝙊𝙆 😸\n𝙎𝙊𝙊𝙉 𝙒𝙄𝙇𝙇 𝙃𝘼𝙑𝙀 𝙏𝙃𝙀 𝙏𝙄𝙆𝙏𝙊𝙆 𝙑𝙄𝘿𝙀𝙊 🥳`)    
let res = await fetch(`https://delirius-api-oficial.vercel.app/api/tiktok?url=${text}`)
let data = await res.json()
const videoInfo = data.data;
const videoTitle = videoInfo.title;
const videoUrl = videoInfo.meta.media[0].org;
bot.sendVideo(chatId, videoUrl, { caption: `⛱️ 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 : 𝙐𝙎𝙀𝙍𝙉𝘼𝙈𝙀:\n${videoTitle}\n\n${wm}`});
} catch (error) {
bot.sendMessage(chatId, '⚠️ Hubo un error al obtener el video de TikTok.');
}
});

bot.onText(/facebook/, async (msg, match) => {
const {savefrom, facebookdl, facebookdlv2} = require('@bochilteam/scraper') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
const videoUrl = match[1]; // Obtener el enlace del mensaje
if (!text) return bot.sendMessage(chatId, `𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙍 𝙀𝙇 𝙑𝙄𝘿𝙀𝙊\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n/facebook https://www.facebook.com/watch?v=636541475139\n\n𝙀𝙉𝙏𝙀𝙍 𝘼 𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆 𝙇𝙄𝙉𝙆 𝙏𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙏𝙃𝙀 𝙑𝙄𝘿𝙀𝙊\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n/facebook https://fb.watch/dcXq_0CaHi/`);
try {
await bot.sendMessage(chatId,  `╰⊱❕⊱ **INFORMACIÓN** ⊱❕⊱╮\n\n𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊, 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝙎𝙐 𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆\n\n𝙒𝘼𝙄𝙏 𝘼 𝙈𝙊𝙈𝙀𝙉𝙏, 𝙔𝙊𝙐𝙍 𝙑𝙄𝘿𝙀𝙊 𝙄𝙎 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙄𝙉𝙂`) 
const {result} = await facebookdl(text).catch(async (_) => await facebookdlv2(text)).catch(async (_) => await savefrom(text));
for (const {url, isVideo} of result.reverse()) await bot.sendVideo(chatId, url, { caption: `✅ 𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆\n${wm}`});
} catch (error) {
bot.sendMessage(chatId, `⚠️ Hubo un error\n\n${error}`);
console.log(error)}
});

bot.onText(/twiter|tw|x/, async (msg, match) => {
const fg = require('api-dylux') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, `[ ⚠️ ] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙏𝙒𝙄𝙏𝙏𝙀𝙍 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙍 𝙎𝙐 𝙑𝙄𝘿𝙀𝙊\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n/twiter https://twitter.com/Animalesybichos/status/1564616107159330816?t=gKqUsstvflSp7Dhpe_nmDg&s=19*\n\n𝙀𝙉𝙏𝙀𝙍 𝘼 𝙏𝙒𝙄𝙏𝙏𝙀𝙍  𝙇𝙄𝙉𝙆 𝙏𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙔𝙊𝙐𝙍 𝙑𝙄𝘿𝙀𝙊\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n/x https://twitter.com/Animalesybichos/status/1564616107159330816?t=gKqUsstvflSp7Dhpe_nmDg&s=19*`) 
let { SD, HD, desc, thumb, audio } = await fg.twitter(text)
bot.sendVideo(chatId, HD, { caption: `✨ 𝘾𝘼𝙇𝙄𝘿𝘼𝘿 : 𝙌𝙐𝘼𝙇𝙄𝙏𝙔 » ${HD}\n✨ 𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝘾𝙄𝙊́𝙉 : 𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝙏𝙄𝙊𝙉 » ${desc}\n\n${wm}`});
});

bot.onText(/instagram|ig/, async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, '⚠️ link del Instagram');
let res = await fetch(global.API('fgmods', '/api/downloader/igdl', { url: text }, 'apikey'))
if (!res.ok) throw `Error` 
let data = await res.json()

bot.onText(/prueba/, async (msg, match) => {
const fg = require('api-dylux') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, '⚠️ link del Instagram');
let res = await fg.igstory(text)
  for (let { url, type } of res.results) {
  bot.sendPhoto(chatId, url) 
  //conn.sendFile(m.chat, url, 'igstory.bin', `✅ Historia de *${res.username}*`, m)
  }
});

//Envía el mensaje principal
bot.sendMessage(chatId, '🚀 Aguarde un momento').then((sentMessage) => {
const messageId = sentMessage.message_id;

for (let item of data.result) {
bot.sendVideo(chatId, item.url)}

bot.editMessageText('Completado ✅', {chat_id: chatId, message_id: messageId})
});
});   

bot.onText(/letra/, async (msg, match) => {
const fg = require('api-dylux') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId,  `𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉𝘼 𝘾𝘼𝙉𝘾𝙄𝙊𝙉 𝙋𝘼𝙍𝘼 𝙊𝘽𝙏𝙀𝙉𝙀𝙍 𝙇𝘼 𝙇𝙀𝙏𝙍𝘼\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n/letra Runaway*\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙎𝙊𝙉𝙂 𝙏𝙊 𝙂𝙀𝙏 𝙏𝙃𝙀 𝙇𝙔𝙍𝙄𝘾𝙎\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n/letra Billie Eilish bored`) 
 let res = await fg.lyrics(text);
 let mes = `𝙏𝙄𝙏𝙐𝙇𝙊 | 𝙏𝙄𝙏𝙇𝙀:
💚 ${res.title}

𝘼𝙐𝙏𝙊𝙍(𝘼) | 𝘼𝙐𝙏𝙃𝙊𝙍:
💜 ${res.artist}

𝙇𝙀𝙏𝙍𝘼 | 𝙇𝙀𝙏𝙏𝙀𝙍:
🧡 ${res.lyrics}`;
bot.sendMessage(chatId, mes, {image: res.thumb}) 
//bot.sendPhoto(chatId, res.thumb) 
});

bot.onText(/\/attp/, (msg, match) => {
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, 'Por favor envía la imagen que deseas convertir en sticker.');
let link = `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${match[1]}`
bot.sendSticker(chatId, link)
});

bot.onText(/pinterest/, async (msg) => {
const { pinterest } = require('@bochilteam/scraper') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, '𝙐𝙎𝙀 𝘿𝙀 𝙇𝘼 𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 𝙈𝘼𝙉𝙀𝙍𝘼\n/pinterest Gata\n\n𝙐𝙎𝙀 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙇𝙄𝙆𝙀 𝙏𝙃𝙄𝙎\n/pinterest Cat');
const json = await pinterest(text)
await bot.sendPhoto(chatId, pickRandom(json), { caption: `💞 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤 | 𝙍𝙚𝙨𝙪𝙡𝙩: ${text}`})
});

bot.onText(/wallpaper/, async (msg) => {
const fg = require('api-dylux') 
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; 
if (!text) return bot.sendMessage(chatId, '𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙇𝘼 𝙋𝘼𝙇𝘼𝘽𝙍𝘼 𝘾𝙇𝘼𝙑𝙀 𝙋𝘼𝙍𝘼 𝘽𝙐𝙎𝘾𝘼𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n/wallpaper Luna\n\n𝙏𝙔𝙋𝙀 𝙏𝙃𝙀 𝙆𝙀𝙔𝙒𝙊𝙍𝘿 𝙏𝙊 𝙎𝙀𝘼𝙍𝘾𝙃\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n/wallpaper Universe.');
let res = await fg.wallpaper(text);
let re = pickRandom(res);
await bot.sendPhoto(chatId, re)
});

bot.onText(/report|reporte/, async (msg) => {
  const chatId = msg.chat.id;
const text = msg.text
const userName = msg.from.first_name;  
if (!text) return bot.sendMessage(chatId, '⚠️ *INGRESE EL COMANDO CON FALLOS*\n\n*EJEMPLO:* el /ping no funciona');
await bot.sendMessage("7170567685", `╭━━〔 \`REPORTE | REPORT\` 〕━━⬣\n┃\n┃✿ Usuario | User:\n┃⇢ @${userName}\n┃\n┃✿ Mensaje | Text:\n┃: ${text}\n╰━━━〔 \`${vs}\` 〕━━━⬣`);
bot.sendMessage(chatId, `🚩 El reporte fue enviando a mi propietario`) 
});
     
          //no nada     
/*bot.onText(/\/coins/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Lógica para asignar puntos al usuario en la página web host
  try {
    const response = await fetch('https://tu_pagina_host.com/asignar_puntos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, points: 10 }), // Ejemplo: asignar 10 puntos al usuario
    });
    const data = await response.json();

    // Enviar mensaje al usuario con el resultado
    bot.sendMessage(chatId, `👌 Suerte 🍀 has recibos ${data.totalPoints}`);
  } catch (error) {
    console.error('Error al asignar puntos:', error);
    bot.sendMessage(chatId, 'Ocurrió un error al asignar puntos. Inténtalo de nuevo más tarde.');
  }
});*/
          
bot.onText('update', (msg) => {
const { exec, spawn, execSync } =  require("child_process")// Función 'execSync' del módulo 'child_process' para ejecutar comandos en el sistema operativo 
const chatId = msg.chat.id
const ROwner = global.owner
if (!ROwner) return bot.sendMessage(chatId, info.owner);
let updatee = execSync('git pull origin master https://github.com/GataNina-Li/GataBot-TG.git')
bot.sendMessage(chatId, updatee.toString())
});

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

function getRandom(ext) {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

bot.on('polling_error', printMessageError)
bot.on('message', printMessages)

//Manejar errores
bot.on('polling_error', (error) => {
bot.sendMessage("7170567685", `Hola Creador/desarrollador, parece haber un error, por favor arreglarlo 🥲\n\n${error}`) 
console.log(error);
});

bot.on('polling_error', (error) => {
bot.sendMessage("7170567685", `Hola Creador/desarrollador, parece haber un error, por favor arreglarlo 🥲\n\n${error}`) 
console.log(error);
}); 

bot.on('audio', (msg) => {
if (msg.audio) {
if (msg.audio.mime_type === 'audio/ogg') {
console.log(`
(AUDIO DE VOZ) ${msg.audio.duration} [${msg.audio.file_size}] (id: ${msg.audio.file_id})
`.trim())
} else {
console.log(`
(ARCHIVO - AUDIO) ${msg.audio.duration} [${msg.audio.file_size}] (id: ${msg.audio.file_id})
Título: ${msg.audio.title}
Artista: ${msg.audio.performer}
Tipo: ${msg.audio.mime_type}
Reenviado: ${msg.forward_from ? true : false}
`.trim())
}}
})

//--------------------[ UPDATE/CONSOLA ]-----------------------     

let file = require.resolve(__filename) 
fs.watchFile(file, () => { 
fs.unwatchFile(file)
const fileName = path.basename(file)
console.log(chalk.greenBright.bold(`Update '${fileName}'.`)) 
delete require.cache[file] 
require(file) 
})



