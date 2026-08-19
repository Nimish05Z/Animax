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

### Getting started

```bash
cd alarm-app
npm install
npm start
```

Scan the QR code with the **Expo Go** app on your phone, or press `a` for Android emulator / `i` for iOS simulator.

### Requirements

- Node.js 18+
- Expo Go app on a physical device, or an Android/iOS emulator

> **Note:** Alarms use local push notifications. Grant notification permissions when prompted. On Android, exact alarm permissions may be required for reliable scheduling.
