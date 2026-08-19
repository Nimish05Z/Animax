import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import type { Alarm } from '../types/alarm';

type AlarmItemProps = {
  alarm: Alarm;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = minute.toString().padStart(2, '0');

  return `${displayHour}:${displayMinute} ${period}`;
}

export function AlarmItem({ alarm, onToggle, onDelete }: AlarmItemProps) {
  return (
    <View style={[styles.card, !alarm.enabled && styles.cardDisabled]}>
      <View style={styles.info}>
        <Text style={[styles.time, !alarm.enabled && styles.textDisabled]}>
          {formatTime(alarm.hour, alarm.minute)}
        </Text>
        <Text style={[styles.label, !alarm.enabled && styles.textDisabled]}>{alarm.label}</Text>
        <Text style={styles.repeat}>Every day</Text>
      </View>

      <View style={styles.actions}>
        <Switch
          value={alarm.enabled}
          onValueChange={() => onToggle(alarm.id)}
          trackColor={{ false: '#3A3A3C', true: '#34C759' }}
          thumbColor="#FFFFFF"
        />
        <Pressable
          accessibilityLabel={`Delete ${alarm.label}`}
          onPress={() => onDelete(alarm.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDisabled: {
    opacity: 0.55,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '300',
    letterSpacing: 1,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  repeat: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  textDisabled: {
    color: '#8E8E93',
  },
  actions: {
    alignItems: 'flex-end',
    gap: 12,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#FF453A',
    fontSize: 14,
    fontWeight: '600',
  },
});
