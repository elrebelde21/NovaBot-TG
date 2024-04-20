const fs = require('fs').promises;
const path = require('path');

const databasePath = path.join(__dirname, '..', 'database.json')
let database;

async function loadDatabase() {
    try {
        const data = await fs.readFile(databasePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('El archivo database.json no existe. Se creará uno nuevo.');
            return {};
        }
        throw err;
    }
}

async function saveDatabase() {
    try {
        const data = JSON.stringify(database, null, 2);
        await fs.writeFile(databasePath, data);
        console.log('Base de datos guardada correctamente.');
    } catch (err) {
        console.error('Error al guardar la base de datos:', err);
    }
}

async function addUser(userId, username) {
    if (!database[userId]) {
        database[userId] = { username: username };
        await saveDatabase();
        console.log('Nuevo usuario agregado:', userId, username);
    } else {
        console.log('El usuario ya existe en la base de datos:', userId, username);
    }
}

async function initializeDatabase() {
    database = await loadDatabase();
}

module.exports = { addUser, initializeDatabase };
