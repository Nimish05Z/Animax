import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type AddAlarmModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (hour: number, minute: number, label: string) => Promise<void>;
};

function getDefaultTime(): Date {
  const date = new Date();
  date.setSeconds(0, 0);
  date.setMinutes(date.getMinutes() + 1);
  return date;
}

export function AddAlarmModal({ visible, onClose, onSave }: AddAlarmModalProps) {
  const [time, setTime] = useState(getDefaultTime);
  const [label, setLabel] = useState('');
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setTime(getDefaultTime());
    setLabel('');
    setSaving(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTimeChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(time.getHours(), time.getMinutes(), label);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    handleClose();
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>New Alarm</Text>

          <Text style={styles.fieldLabel}>Label</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Morning alarm"
            placeholderTextColor="#636366"
            style={styles.input}
            maxLength={40}
          />

          <Text style={styles.fieldLabel}>Time</Text>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              themeVariant="dark"
            />
          </View>

          <View style={styles.buttons}>
            <Pressable onPress={handleClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              disabled={saving}
              onPress={handleSave}
              style={[styles.button, styles.saveButton, saving && styles.buttonDisabled]}
            >
              <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  fieldLabel: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pickerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2C2C2E',
  },
  saveButton: {
    backgroundColor: '#0A84FF',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
