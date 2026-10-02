const fs = require('fs') 
const path = require('path')
const chalk = require('chalk') 

//---------[ PROPIETARIO/OWNER ]---------
global.owner = "7170567685", "7170567685" 

global.mods = []
global.premium = []  
global.blockList = []  

//---------[ NOMBRE/INFO ]---------
global.botname = "NovaBot"
global.wm = '𝙽𝚘𝚟𝚊𝙱𝚘𝚝'
global.vs = '1.0.0'

//Iniciar session con tu tokens, obtenerlo desde @BotFather
global.token = "TU_TOKEN_AQUI"

//---------[ APIS GLOBAL ]---------
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]; 
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']; 
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]; 
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']; 
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]; 
global.lolkeysapi = ['GataDios'];  
global.itsrose = ['4b146102c4d500809da9d1ff'];
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.APIs = {
//ApiEmpire: 'https://',
CFROSAPI: 'https://api.cafirexos.com',
nrtm: 'https://fg-nrtm.ddns.net',
fgmods: 'https://api.fgmods.xyz', 
xteam: 'https://api.xteam.xyz',
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',
botcahx: 'https://api.botcahx.biz.id',
ibeng: 'https://api.ibeng.tech/docs',
rose: 'https://api.itsrose.site',
popcat: 'https://api.popcat.xyz',
xcoders: 'https://api-xcoders.site',
vihangayt: 'https://vihangayt.me',
erdwpe: 'https://api.erdwpe.com',
xyroinee: 'https://api.xyroinee.xyz',
nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
'https://api.xteam.xyz': `${keysxteam}`,
'https://api.lolhuman.xyz': 'GataDios',
'https://api.neoxr.my.id': `${keysneoxr}`,
'https://api.zahwazein.xyz': `${keysxxx}`,
'https://api.fgmods.xyz': 'DRLg5kY7', 
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin',
'https://api.ibeng.tech/docs': 'tamvan',
'https://api.itsrose.site': 'Rs-Zeltoria',
'https://api-xcoders.site': 'Frieren',
'https://api.xyroinee.xyz': 'uwgflzFEh6'
};
 
//---------[ STICKERS ]---------
global.packname = "𝐍𝐨𝐯𝐚𝐁𝐨𝐭"
global.author = `${vs}`
 
global.imagen1 = fs.readFileSync('./media/img1.jpg')
global.gataVidMenu = fs.readFileSync('./media/Menuvid1.mp4') 

global.md = 'https://github.com/elrebelde21'
global.yt = 'https://youtube.com/@elrebelde.21'
global.ig = 'https://instagram.com/itschinita_official'
global.fb = 'https://www.facebook.com/groups/872989990425789/'

global.nna = 'https://whatsapp.com/channel/0029VagJ2FF4CrfrS8BoLW2b' //CANAL UPDATE
global.nn2 = 'https://t.me/+iOgJwX4NCSc2ZmI5'
global.nn3 = 'https://t.me/+VtPHIosx_i04ODEx' 


global.info = {
espere: '*⧼ ⏳ ⧽ ┇›* _Espere un momento por favor..._',  
wait: '*⌛ _Cargando | Charging..._ ▬▭▭▭▭▭▭*', 
waitt: '*⌛ _Cargando | Charging..._ ▬▬▭▭▭*', 
waittt: '*⌛ _Cargando | Charging..._ ▬▬▬▬▭▭*', 
waitttt: '*⌛ _Cargando | Charging..._ ▬▬▬▬▬▬▭*', 
result: '*⧼ ✅ ⧽ ┇›* _¡Asombroso! Resultado con éxito._',
warning: '*⧼ ⚠️ ⧽ ┇›* _¡Oh no...! Algo salió mal. Por favor, inténtalo de nuevo._', 
admin: '*⧼ 🛂 ⧽ ┇›* _¡Alto ahí! Este comando o acción es exclusivo para los valientes administradores._',
botAdmin: '*⧼ 😸 ⧽ ┇›* _¡Aviso de permiso! Para usar este comando o acción requiero ser administrador._',
owner: '*⧼ 🔒 ⧽ ┇›* _¡Acceso restringido! Este comando es como un tesoro destinado únicamente a mí líder supremo._',
group: '*⧼ 🔰 ⧽ ┇›* _¡Cuidado! Este comando o acción es de uso sólo para grupos._',
private: '*⧼ 🕵️‍♀️ ⧽ ┇›* _Este comando o acción se desbloquea sólo al privado._',
bot: '*⧼ 👑 ⧽ ┇›* _¡Atención, acceso exclusivo! Este comando está reservado únicamente para mí._',
error: '*⧼ ❌ ⧽ ┇›* _¡Error inesperado, algo salió mal! Intente de nuevo o contacte con mis creadores._', 
limit: '*⧼ ❗ ⧽ ┇›* _¡Oh no! Parece que tus diamantes 💎 se han agotado._',
registra: `\`\`\`¡¡NECESITAS ESTAR REGISTRADO(A) PARA USAR ESTE COMANDO, ESCRIBE #verificar PARA REGISTRARTE!!\`\`\``, 
}

let file = require.resolve(__filename) // Obtener la ruta completa del archivo 
fs.watchFile(file, () => { // Observar cambios en el archivo
fs.unwatchFile(file)
const fileName = path.basename(file) // Nombre del archivo 
console.log(chalk.greenBright.bold(`Update '${fileName}' `)) // Imprimir mensaje en consola
delete require.cache[file] // Eliminar la caché para permitir la actualización de cambios
require(file) // Volvemos a cargar el archivo con los nuevos cambios
})
