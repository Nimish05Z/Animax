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

### Install on your phone (recommended: GitHub Actions)

Every push to `main` that changes `alarm-app/` automatically builds a debug APK via GitHub Actions and publishes it here:

**[Download latest APK → Releases](https://github.com/Nimish05Z/Animax/releases/tag/latest-apk)**

Direct link (always the newest build on `main`):

```
https://github.com/Nimish05Z/Animax/releases/download/latest-apk/WakeUp.apk
```

**Workflow:**
1. Edit the alarm app in Cursor
2. Commit and push to `main`
3. GitHub Actions runs Gradle and uploads `WakeUp.apk`
4. Open the release link on your phone → download → install

**On your phone:**
1. Enable **Install unknown apps** for your browser (Settings → Security)
2. Download `WakeUp.apk`
3. Tap **Install** — no Expo Go needed

PR builds also upload an APK artifact (Actions tab → latest run → Artifacts) for testing before merge.

### Alternative: EAS cloud build

```bash
cd alarm-app
npm install
npx eas login          # one-time: free Expo account
npm run build:apk      # cloud build (~10-15 min)
```

### Development with Expo Go

```bash
cd alarm-app
npm install
npm start
```

Scan the QR code with **Expo Go**, or press `a` / `i` for an emulator.

### Requirements

- Node.js 18+ for local development
- Android phone for installing the APK
- Expo Go only if you want live dev reload (optional)

> **Note:** Alarms use local push notifications. Grant notification permissions when prompted. On Android, exact alarm permissions may be required for reliable scheduling.
