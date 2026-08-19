import { useCallback, useEffect, useState } from 'react';

import type { Alarm } from '../types/alarm';
import { loadAlarms, saveAlarms } from '../utils/alarmStorage';
import {
  cancelAlarmNotification,
  requestNotificationPermissions,
  scheduleAlarmNotification,
} from '../utils/notifications';

function createAlarmId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useAlarms() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      await requestNotificationPermissions();
      const stored = await loadAlarms();
      if (active) {
        setAlarms(stored);
        setLoading(false);
      }
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const persistAlarms = useCallback(async (nextAlarms: Alarm[]) => {
    setAlarms(nextAlarms);
    await saveAlarms(nextAlarms);
  }, []);

  const addAlarm = useCallback(
    async (hour: number, minute: number, label: string) => {
      const alarm: Alarm = {
        id: createAlarmId(),
        hour,
        minute,
        label: label.trim() || 'Alarm',
        enabled: true,
      };

      alarm.notificationId = await scheduleAlarmNotification(alarm);
      await persistAlarms([...alarms, alarm]);
    },
    [alarms, persistAlarms],
  );

  const toggleAlarm = useCallback(
    async (id: string) => {
      const nextAlarms = await Promise.all(
        alarms.map(async (alarm) => {
          if (alarm.id !== id) {
            return alarm;
          }

          const enabled = !alarm.enabled;

          if (enabled) {
            const notificationId = await scheduleAlarmNotification({ ...alarm, enabled });
            return { ...alarm, enabled, notificationId };
          }

          await cancelAlarmNotification(alarm.notificationId);
          return { ...alarm, enabled, notificationId: undefined };
        }),
      );

      await persistAlarms(nextAlarms);
    },
    [alarms, persistAlarms],
  );

  const deleteAlarm = useCallback(
    async (id: string) => {
      const alarm = alarms.find((item) => item.id === id);
      if (alarm) {
        await cancelAlarmNotification(alarm.notificationId);
      }

      await persistAlarms(alarms.filter((item) => item.id !== id));
    },
    [alarms, persistAlarms],
  );

  return {
    alarms,
    loading,
    addAlarm,
    toggleAlarm,
    deleteAlarm,
  };
}
