const { WebcastPushConnection } = require('tiktok-live-connector');

// 👤 Nombre de usuario del live (sin @)
const tiktokUsername = 'adibah.humairah';  // cámbialo por el que quieras

// 📡 Crear la conexión
let connection = new WebcastPushConnection(tiktokUsername);

// ✅ Conectarse al live
connection.connect().then(() => {
    console.log(`✅ Conectado al live de ${tiktokUsername}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// 🎁 Escuchar eventos de regalos
connection.on('gift', data => {
    const sender = data.nickname || data.uniqueId;
    const giftName = data.giftName;
    const giftCount = data.repeatCount || 1;
    const diamondValue = data.diamondCount || 0;

    console.log(`🎁 ${sender} envió ${giftCount} x ${giftName} (${diamondValue} diamantes c/u)`);
});
