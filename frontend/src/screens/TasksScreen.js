import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useProfile } from '../context/ProfileContext';

const STATUSES = ['todo', 'in_progress', 'done'];
const STATUS_LABELS = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };

/**
 * ADHD / Executive Function screen with Kanban-style micro-tasks and Pomodoro timer.
 */
export function TasksScreen() {
  const { theme, safeMode, gamificationEnabled, pomodoroWorkMinutes, pomodoroBreakMinutes, confirmActions } = useProfile();

  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState('todo');
  const [undoStack, setUndoStack] = useState([]);

  // Pomodoro
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(pomodoroWorkMinutes * 60);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (pomodoroActive) {
      timerRef.current = setInterval(() => {
        setPomodoroSeconds((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            setPomodoroActive(false);
            const nextBreak = !isBreak;
            setIsBreak(nextBreak);
            setPomodoroSeconds((nextBreak ? pomodoroBreakMinutes : pomodoroWorkMinutes) * 60);
            Alert.alert(nextBreak ? 'Break time!' : 'Focus time!', nextBreak ? 'Take a short break.' : 'Time to get back to work.');
            return (nextBreak ? pomodoroBreakMinutes : pomodoroWorkMinutes) * 60;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [pomodoroActive, isBreak, pomodoroWorkMinutes, pomodoroBreakMinutes]);

  const addTask = useCallback(() => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const task = {
      id: Date.now().toString(),
      title: trimmed,
      status: 'todo',
      priority: 0,
      created_at: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
    setNewTitle('');
  }, [newTitle]);

  const moveTask = useCallback((id, newStatus) => {
    setTasks((prev) => {
      const old = prev.find((t) => t.id === id);
      if (old) setUndoStack((s) => [...s, { ...old }]);
      return prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    });
  }, []);

  const deleteTask = useCallback((id) => {
    const doDelete = () => {
      setTasks((prev) => {
        const old = prev.find((t) => t.id === id);
        if (old) setUndoStack((s) => [...s, { ...old, _deleted: true }]);
        return prev.filter((t) => t.id !== id);
      });
    };

    if (confirmActions) {
      Alert.alert('Delete Task', 'Are you sure?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: doDelete },
      ]);
    } else {
      doDelete();
    }
  }, [confirmActions]);

  const undo = useCallback(() => {
    setUndoStack((stack) => {
      if (stack.length === 0) return stack;
      const last = stack[stack.length - 1];
      if (last._deleted) {
        const restored = { ...last };
        delete restored._deleted;
        setTasks((prev) => [restored, ...prev]);
      } else {
        setTasks((prev) => prev.map((t) => (t.id === last.id ? last : t)));
      }
      return stack.slice(0, -1);
    });
  }, []);

  const filtered = tasks.filter((t) => t.status === filter);
  const minutes = Math.floor(pomodoroSeconds / 60);
  const seconds = pomodoroSeconds % 60;

  const renderTask = ({ item }) => (
    <View style={[styles.taskCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius }]} accessible accessibilityLabel={`Task: ${item.title}`}>
      <Text style={[styles.taskTitle, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}>{item.title}</Text>
      {gamificationEnabled && item.status === 'done' && <Text style={styles.badge}>🏆</Text>}
      <View style={styles.taskActions}>
        {item.status !== 'done' && (
          <TouchableOpacity onPress={() => moveTask(item.id, item.status === 'todo' ? 'in_progress' : 'done')} style={[styles.actionBtn, { minHeight: theme.tapMinSize, backgroundColor: theme.colors.primary }]} accessibilityLabel="Move task forward">
            <Text style={styles.actionText}>{item.status === 'todo' ? '▶' : '✓'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTask(item.id)} style={[styles.actionBtn, { minHeight: theme.tapMinSize, backgroundColor: theme.colors.error }]} accessibilityLabel="Delete task">
          <Text style={styles.actionText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xl }]} accessibilityRole="header">
        Tasks
      </Text>

      {/* Pomodoro Timer */}
      <View style={[styles.pomodoroContainer, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius }]}>
        <Text style={[styles.pomodoroLabel, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]}>
          {isBreak ? 'Break' : 'Focus'}
        </Text>
        <Text style={[styles.pomodoroTime, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xxl }]}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </Text>
        <TouchableOpacity
          onPress={() => setPomodoroActive((a) => !a)}
          style={[styles.pomodoroBtn, { backgroundColor: theme.colors.primary, minHeight: theme.tapMinSize }]}
          accessibilityLabel={pomodoroActive ? 'Pause timer' : 'Start timer'}
        >
          <Text style={styles.pomodoroBtnText}>{pomodoroActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
      </View>

      {/* Add task */}
      <View style={styles.addRow}>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md, minHeight: theme.tapMinSize }]}
          placeholder="Add a micro-task..."
          placeholderTextColor={theme.colors.textSecondary}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={addTask}
          accessibilityLabel="New task title"
        />
        <TouchableOpacity onPress={addTask} style={[styles.addBtn, { backgroundColor: theme.colors.primary, minHeight: theme.tapMinSize }]} accessibilityLabel="Add task">
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Undo */}
      {undoStack.length > 0 && (
        <TouchableOpacity onPress={undo} style={[styles.undoBtn, { backgroundColor: theme.colors.warning, minHeight: theme.tapMinSize }]} accessibilityLabel="Undo last action">
          <Text style={[styles.undoBtnText, { fontFamily: theme.fontFamily }]}>↩ Undo</Text>
        </TouchableOpacity>
      )}

      {/* Kanban filter tabs */}
      <View style={styles.tabs}>
        {STATUSES.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setFilter(s)}
            style={[styles.tab, { backgroundColor: filter === s ? theme.colors.primary : theme.colors.surface, borderRadius: theme.borderRadius, minHeight: theme.tapMinSize }]}
            accessibilityRole="tab"
            accessibilityState={{ selected: filter === s }}
            accessibilityLabel={STATUS_LABELS[s]}
          >
            <Text style={[styles.tabText, { color: filter === s ? '#FFF' : theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]}>
              {STATUS_LABELS[s]}
              {!safeMode ? ` (${tasks.filter((t) => t.status === s).length})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} renderItem={renderTask} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontWeight: '700', marginBottom: 12 },
  pomodoroContainer: { alignItems: 'center', padding: 16, marginBottom: 16 },
  pomodoroLabel: { marginBottom: 4 },
  pomodoroTime: { fontWeight: '700', marginBottom: 8 },
  pomodoroBtn: { paddingHorizontal: 32, paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  pomodoroBtnText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  addRow: { flexDirection: 'row', marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12 },
  addBtn: { marginLeft: 8, width: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: '#FFF', fontSize: 24, fontWeight: '600' },
  undoBtn: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginBottom: 12, alignItems: 'center', justifyContent: 'center' },
  undoBtnText: { fontWeight: '600', fontSize: 14 },
  tabs: { flexDirection: 'row', marginBottom: 12 },
  tab: { flex: 1, marginHorizontal: 4, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  tabText: { fontWeight: '500' },
  list: { paddingBottom: 40 },
  taskCard: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 8 },
  taskTitle: { flex: 1, fontWeight: '500' },
  badge: { fontSize: 20, marginHorizontal: 6 },
  taskActions: { flexDirection: 'row' },
  actionBtn: { width: 36, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginLeft: 6 },
  actionText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
