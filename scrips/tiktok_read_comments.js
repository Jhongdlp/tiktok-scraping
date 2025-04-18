const { WebcastPushConnection } = require('tiktok-live-connector');
const googleTTS = require('google-tts-api');
const player = require('play-sound')();

const tiktokUsername = 'elnixjo_'; // Cambia esto por el nombre de usuario de TikTok que quieras seguir
let tiktok = new WebcastPushConnection(tiktokUsername);

// Cola de mensajes
let speechQueue = [];
let isSpeaking = false;

// Función para hablar el siguiente mensaje
function playNextInQueue() {
    if (speechQueue.length === 0) {
        isSpeaking = false;
        return;
    }

    isSpeaking = true;
    const text = speechQueue.shift();

    const url = googleTTS.getAudioUrl(text, {
        lang: 'es',
        slow: false,
        host: 'https://translate.google.com',
    });

    player.play(url, (err) => {
        if (err) {
            console.error('❌ Error al reproducir:', err);
        }
        // Esperar a que termine para reproducir el siguiente
        playNextInQueue();
    });
}

// Agregar mensaje a la cola
function speakText(text) {
    speechQueue.push(text);
    if (!isSpeaking) {
        playNextInQueue();
    }
}

// Conexión al live
tiktok.connect().then(() => {
    console.log(`✅ Conectado al live de ${tiktokUsername}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// Capturar comentarios
tiktok.on('chat', data => {
    const username = data.nickname || data.uniqueId;
    const message = data.comment;

    const fullMessage = `${username} dice: ${message}`;
    console.log(`🗨️ ${fullMessage}`);
    speakText(fullMessage);
});
