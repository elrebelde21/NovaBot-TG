const { addUser, initializeDatabase } = require('./database')
const TelegramBot = require('node-telegram-bot-api')
const { Telegraf } = require('telegraf')

const token = global.token
const bot = new TelegramBot(token, { 
    polling: { 
        allowed_updates: [
            "message",
            "edited_message",
            "channel_post",
            "edited_channel_post",
            "inline_query",
            "chosen_inline_result",
            "callback_query",
            "shipping_query",
            "pre_checkout_query",
            "poll",
            "poll_answer",
            "my_chat_member",
            "chat_member"
        ] 
    } 
})
//const bot = new TelegramBot(process.env.token);

initializeDatabase() 
bot.on('message', async (msg) => {
await addUser(msg.from.id, msg.from.first_name)   
})

function printMessageError(error) {
console.log(error)
}

async function printMessages(msg) {
let chatInfo, chatName
const { chatId, userName, userId, chatType, messageId, date, text, entities, replyToMessage, photo, caption } = await all_Data(msg)
if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel') {
chatInfo = await bot.getChat(chatId)
chatName = chatInfo.title
}
console.log(`
---------------------
Hora: ${new Date().toLocaleTimeString('es-EC', { localeMatcher: 'lookup', hour12: false })} - Servidor (${new Date().toLocaleTimeString()})
Enviado: ${new Date(date * 1000).toLocaleString()}
${chatName ? `${chatType}: ${chatName} (${chatId})` : `Tipo de Chat: ${chatType} (${chatId})`}
Usuario: ${userName} (${userId})
--------------------
${JSON.stringify(entities)}
${text ? `--------------------\n${text}` : ''}`.trim())
}

module.exports = { bot, all_Data, printMessages, printMessageError }

async function all_Data(msg) {
// En caso de que sean undefined
const defaultInfo = "Información no encontrada"
return {
chatId: msg.chat.id || defaultInfo, // ID del chat
userName: msg.from.first_name || defaultInfo, // nombre de usuario
userId: msg.from.id || defaultInfo, // ID de usuario 
chatType: msg.chat.type || defaultInfo, // Tipo de Chat (private, group, supergroup, channel)
messageId: msg.message_id || defaultInfo, // ID del mensaje
date: msg.date || defaultInfo, // Fecha y hora en que se envió el mensaje
text: msg.text || defaultInfo, // Texto del usuario
entities: msg.entities || defaultInfo, // Un arreglo de objetos de entidades
replyToMessage: msg.reply_to_message || defaultInfo, // Si el mensaje es una respuesta a otro mensaje, este campo contendrá información sobre el mensaje al que responde
photo: msg.photo || defaultInfo, // Si el mensaje es una foto
caption: msg.caption || defaultInfo // Si el mensaje tiene un pie de foto, contendrá el texto del pie de foto
}}
