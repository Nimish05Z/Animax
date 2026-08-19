# Animax Repository

This repository contains two projects:

## `animax/`

The original Animax website — a landing page showcasing favorite animated movies. Open `animax/index.html` in a browser to view it.

## `alarm-app/`

A mobile alarm application built with **React Native** and **Expo**.

### Features

- Create alarms with a custom label and time
- Daily repeating notifications
- Toggle alarms on or off
- Delete alarms
- Persistent storage across app restarts

### Getting started (development)

```bash
cd alarm-app
npm install
npm start
```

Scan the QR code with the **Expo Go** app on your phone, or press `a` for Android emulator / `i` for iOS simulator.

### Install directly on your phone (APK)

You do **not** need Expo Go for this. Build a standalone `.apk` and sideload it:

```bash
cd alarm-app
npm install
npx eas login          # one-time: free Expo account
npm run build:apk      # cloud build (~10-15 min)
```

When the build finishes, Expo gives you a download link. Transfer the APK to your phone and open it to install.

**On your phone:**
1. Enable **Install unknown apps** for your browser or file manager (Settings → Security)
2. Download/open the APK
3. Tap **Install** — the app runs on its own, like any normal Android app

**Local build (optional, needs Android Studio):**

```bash
npm run build:apk:local
```

This produces an APK on your machine without using Expo's cloud servers.

### Requirements

- Node.js 18+
- Expo Go app on a physical device, or an Android/iOS emulator

> **Note:** Alarms use local push notifications. Grant notification permissions when prompted. On Android, exact alarm permissions may be required for reliable scheduling.
