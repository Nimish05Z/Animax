import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AddAlarmModal } from './src/components/AddAlarmModal';
import { AlarmItem } from './src/components/AlarmItem';
import { useAlarms } from './src/hooks/useAlarms';

export default function App() {
  const { alarms, loading, addAlarm, toggleAlarm, deleteAlarm } = useAlarms();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Alarms</Text>
        <Text style={styles.subtitle}>Set daily reminders that ring on your phone</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color="#0A84FF" size="large" />
        </View>
      ) : (
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            alarms.length === 0 && styles.listContentEmpty,
          ]}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No alarms yet</Text>
              <Text style={styles.emptyText}>Tap the + button to create your first alarm.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <AlarmItem alarm={item} onToggle={toggleAlarm} onDelete={deleteAlarm} />
          )}
        />
      )}

      <Pressable
        accessibilityLabel="Add alarm"
        onPress={() => setModalVisible(true)}
        style={styles.fab}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      <AddAlarmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={addAlarm}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 15,
    marginTop: 6,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A84FF',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 38,
    fontWeight: '300',
  },
});
