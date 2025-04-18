const { WebcastPushConnection } = require('tiktok-live-connector');
const googleTTS = require('google-tts-api');
const player = require('play-sound')();
const readline = require('readline');
const { spawn } = require('child_process');

const tiktokUsername = 'elnixjo_'; // Cambia esto por el nombre de usuario de TikTok que quieras seguir
let tiktok = new WebcastPushConnection(tiktokUsername);

// Cola de mensajes
let speechQueue = [];
let isSpeaking = false;
let currentAudioProcess = null;
let skipCurrent = false;

// Capturar teclas 'm' para mutear y 'q' para cerrar el script
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'm') {
        console.log('🔇 Mensaje silenciado manualmente.');
        skipCurrent = true;
        if (currentAudioProcess) {
            currentAudioProcess.kill(); // Detiene el audio actual
        }
    }
    if (key.name === 'q') {
        console.log('🛑 Cerrando el script...');
        tiktok.disconnect(); // Desconectar del live
        process.exit(0); // Finaliza el script
    }
});

// Función para hablar el siguiente mensaje
function playNextInQueue() {
    if (speechQueue.length === 0) {
        isSpeaking = false;
        return;
    }

    isSpeaking = true;
    skipCurrent = false;
    const text = speechQueue.shift();

    const url = googleTTS.getAudioUrl(text, {
        lang: 'es',
        slow: false,
        host: 'https://translate.google.com',
    });

    currentAudioProcess = player.play(url, (err) => {
        currentAudioProcess = null;
        if (err && !skipCurrent) {
            console.error('❌ Error al reproducir:', err);
        }
        playNextInQueue(); // Continuar con el siguiente audio
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
    console.log(`Presiona 'm' para silenciar el mensaje en reproducción.`);
    console.log(`Presiona 'q' para cerrar el script.`);
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
