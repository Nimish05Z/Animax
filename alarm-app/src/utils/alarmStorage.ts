import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Alarm } from '../types/alarm';

const STORAGE_KEY = '@alarms';

export async function loadAlarms(): Promise<Alarm[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Alarm[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveAlarms(alarms: Alarm[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
}
