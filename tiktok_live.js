const { WebcastPushConnection } = require('tiktok-live-connector');

const tiktokUsername = 'spyd.pato';
let tiktok = new WebcastPushConnection(tiktokUsername);

// Conectar al live
tiktok.connect().then(() => {
    console.log(`✅ Conectado al live de ${tiktokUsername}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// Mostrar los comentarios del chat en la terminal
tiktok.on('chat', data => {
    const rawUsername = data.nickname || data.uniqueId;
    const message = data.comment;

    console.log(`🗨️ ${rawUsername}: ${message}`);
});
