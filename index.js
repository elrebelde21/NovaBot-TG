require("./settings")
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch')
const fs = require('fs');
const path = require('path')
const chalk = require('chalk') 
const { exec } = require('child_process');
const readline = require('readline');
const cfonts = require('cfonts');
const axios = require('axios') 
const { say } = cfonts

let startTime = new Date();

// Reemplaza 'TOKEN_DEL_BOT' con el token que obtuviste de BotFather
const token = '7181826474:AAH4ZhtnlgksLYJDxBCqgpod9gQh3Du4krM';

// Crea un nuevo bot utilizando el token
const conn = new TelegramBot(token, {polling: true});
console.log(`🚀 Iniciando....`) 

//inició del los comando
conn.onText(/\/menu/, (msg) => {
const chatId = msg.chat.id;
const userName = msg.from.first_name; // Obtén el nombre visible del usuario
conn.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."

conn.sendMessage(chatId, `Hola ${userName}`, {
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
conn.onText('ping', async (msg) => {
const chatId = msg.chat.id;
const startTime = performance.now()
const endTime = performance.now();
const pingTime = endTime - startTime;
lastPingTime = pingTime;
conn.sendMessage(chatId, `Pong 🏓: ${pingTime.toFixed(2)} ms`);
});

conn.onText('uptime', (msg) => {
const chatId = msg.chat.id;
conn.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."
    const currentTime = new Date();
    const uptimeInSeconds = Math.floor((currentTime - startTime) / 1000);
    conn.sendMessage(chatId,`🚩 Online: ${formatUptime(uptimeInSeconds)}`);
});
function formatUptime(uptimeInSeconds) {
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

conn.onText(/ia|chagpt/, async (msg) => {
const chatId = msg.chat.id;
const text = msg.text.split(' ')[1]; // Aquí obtienes el texto del mensaje
if (!text) conn.sendMessage(chatId, '⚠️ Por favor, ingresa un texto');
conn.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."
//conn.sendChatAction(chatId, 'record_audio'); //Muestra como "grabando audio"
let gpt = await fetch(global.API('fgmods', '/api/info/openai2', { text }, 'apikey'));        
let res = await gpt.json()
await conn.sendMessage(chatId, res.result)
});

conn.onText(/image/, async (msg) => {
const {googleImage} = require('@bochilteam/scraper') 
  const chatId = msg.chat.id;
  const text = msg.text.split(' ')[1];
conn.sendChatAction(chatId, 'typing'); //Muestra como "escribiendo..."  
  if (!text) {
   conn.sendMessage(chatId, '⚠️ Que esta buscado?');
    return;
  }
  try {
const res = await googleImage(text);
const image = res[Math.floor(Math.random() * res.length)]
const link = image;
  conn.sendPhoto(chatId, link);
  } catch (error) {
    conn.sendMessage(chatId, 'Hubo un error al obtener la imagen.');
  }
});

conn.onText(/tiktok/, async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.split(' ')[1]; // Obtener el texto después de "tiktok"
  if (!text) {
 conn.sendMessage(chatId, '⚠️ Ingresa el enlace de algún video de TikTok');
    return;
  }
  try {
    let res = await fetch(`https://api.alyachan.dev/api/tiktok?url=${text}&apikey=GataDios`);
    let data = await res.json();
  conn.sendVideo(chatId, data.url);
  } catch (error) {
 conn.sendMessage(chatId, 'Hubo un error al obtener el video de TikTok.');
  }
});

conn.onText('start', async (msg) => {
const chatId = msg.chat.id;
const userName = msg.from.first_name;     
conn.sendPhoto(chatId, imagen1, {caption: `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ ┏━━━━━━━━━━━━━━•
┊┃ ┃❐ Hola ${userName}
┊┃ ┃━━━━━━━━━━━━━━•
┊┃ ┃❐ Lista de comando:
┊┃ ┃• /ping
┊┃ ┃• /uptime
┊┃ ┃• /ia
┊┃ ┃• /image
┊┃ ┗━━━━━━━━━━━━━━•
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩ `,
reply_markup: {
inline_keyboard: [
[{ text: 'Prueba', callback_data: 'start' }],
[{ text: 'Velocidad', callback_data: 'ping' }],                    
],
},
});  
});

//Maneja todos los mensajes
conn.on('message', (msg) => {
  //Muestra el mensaje recibido en la consola
console.log(`🟢Mensaje: ${msg.text}`);
});

exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

//--------------------[ UPDATE/CONSOLA ]-----------------------     

let file = require.resolve(__filename) 
fs.watchFile(file, () => { 
fs.unwatchFile(file)
const fileName = path.basename(file)
console.log(chalk.greenBright.bold(`Update '${fileName}'.`)) 
delete require.cache[file] 
require(file) 
})
