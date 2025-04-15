# 🎥 TikTok Live Scraper

A Node.js project to connect to TikTok live streams and capture real-time events like:

- 👋 Users joining the live
- 🎁 Receiving gifts
- 🔁 Live stream shares

> 🔧 Built with the [tiktok-live-connector](https://www.npmjs.com/package/tiktok-live-connector) library

---

## 🚀 Features

- Logs each user joining the live (only once)
- Detects and prints every gift received
- Tracks each time someone shares the live
- Clean and modular code
- Compatible with Linux (Ubuntu)

---

## 📦 Requirements

- Node.js (v18 or later recommended)
- npm (v9 or later)

### 🛠 Install on Ubuntu

```bash
sudo apt update
sudo apt install nodejs npm -y
```

---

## 📂 Project Setup

1. Clone the repository:

```bash
git clone https://github.com/Jhongdlp/tiktok-scraping.git
cd tiktok-scraping
```

2. Install dependencies:

```bash
npm install tiktok-live-connector
```

---

## ▶️ Usage

### 1. Read gifts

```bash
node regalos.js
```

### 2. Log users joining the live

```bash
node usuarios.js
```

### 3. Detect shares

```bash
node compartidos.js
```

> 💡 Make sure to set the TikTok `username` correctly in each script.

---

## 🧠 Console Output Example

```bash
New user: @jhon_paul
➡️ Joined the live

User @anna_girl sent a gift: 🌹 Rose x5

📤 @darkmode23 shared the live
```

---

## 📄 License

MIT © [Jhon Paul Guadalupe Andrade](https://github.com/Jhongdlp)

---

## 🌟 If you liked this project...

Give it a ⭐ on GitHub and share it with other curious devs like you!