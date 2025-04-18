const { WebcastPushConnection } = require('tiktok-live-connector');

const tiktokUsername = 'adibah.humairah';
let connection = new WebcastPushConnection(tiktokUsername);

// Conectar al live
connection.connect().then(() => {
    console.log(`✅ Conectado al live de ${tiktokUsername}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// Evento: cuando alguien comparte el live
connection.on('share', data => {
    const username = data.nickname || data.uniqueId || 'Usuario desconocido';
    console.log(`🔁 ${username} compartió el live`);
});
