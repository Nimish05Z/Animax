import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import type { Alarm } from '../types/alarm';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  if (!requested.granted) {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('alarms', {
      name: 'Alarms',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
    });
  }

  return true;
}

export async function scheduleAlarmNotification(alarm: Alarm): Promise<string> {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: alarm.label || 'Alarm',
      body: 'Time to wake up!',
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: alarm.hour,
      minute: alarm.minute,
      channelId: Platform.OS === 'android' ? 'alarms' : undefined,
    },
  });

  return notificationId;
}

export async function cancelAlarmNotification(notificationId?: string): Promise<void> {
  if (!notificationId) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
