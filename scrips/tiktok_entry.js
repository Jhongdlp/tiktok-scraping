const { WebcastPushConnection } = require('tiktok-live-connector');

const tiktokUsername = 'elnixjo_';
let connection = new WebcastPushConnection(tiktokUsername);

// Lista para almacenar usuarios únicos
const usuariosUnicos = new Set();

// Conectar al live
connection.connect().then(() => {
    console.log(`✅ Conectado al live de ${tiktokUsername}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// Evento: cuando alguien entra al live
connection.on('member', data => {
    const username = data.nickname || data.uniqueId || 'Usuario desconocido';

    // Si el usuario aún no está en la lista, lo agregamos e imprimimos
    if (!usuariosUnicos.has(username)) {
        usuariosUnicos.add(username);
        console.log(`👋 ${username} entró al live por primera vez`);
    }
});
