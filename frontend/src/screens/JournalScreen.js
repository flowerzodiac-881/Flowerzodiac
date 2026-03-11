import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { useProfile } from '../context/ProfileContext';

const MOODS = ['😊', '😐', '😢', '😤', '😴', '🤔'];

/**
 * Journal screen for reflective writing.
 */
export function JournalScreen() {
  const { theme, confirmActions, ttsEnabled } = useProfile();

  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState(null);

  const addEntry = useCallback(() => {
    if (!body.trim() && !title.trim()) return;
    const entry = {
      id: Date.now().toString(),
      title: title.trim() || 'Untitled',
      body: body.trim(),
      mood,
      created_at: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setTitle('');
    setBody('');
    setMood(null);
  }, [title, body, mood]);

  const deleteEntry = useCallback((id) => {
    const doDelete = () => setEntries((prev) => prev.filter((e) => e.id !== id));
    if (confirmActions) {
      Alert.alert('Delete Entry', 'Are you sure?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: doDelete },
      ]);
    } else {
      doDelete();
    }
  }, [confirmActions]);

  const speakEntry = useCallback(async (text) => {
    if (!ttsEnabled) return;
    try {
      await Speech.speak(text, { language: 'en' });
    } catch {
      // TTS not available
    }
  }, [ttsEnabled]);

  const renderEntry = ({ item }) => (
    <View style={[styles.entryCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius }]} accessible accessibilityLabel={`Journal entry: ${item.title}`}>
      <View style={styles.entryHeader}>
        <Text style={[styles.entryTitle, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}>{item.title}</Text>
        {item.mood && <Text style={styles.entryMood}>{item.mood}</Text>}
      </View>
      <Text style={[styles.entryBody, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]} numberOfLines={3}>{item.body}</Text>
      <View style={styles.entryActions}>
        {ttsEnabled && (
          <TouchableOpacity onPress={() => speakEntry(item.body)} style={[styles.iconBtn, { minHeight: theme.tapMinSize }]} accessibilityLabel="Read entry aloud">
            <Text style={{ fontSize: 18 }}>🔊</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteEntry(item.id)} style={[styles.iconBtn, { minHeight: theme.tapMinSize }]} accessibilityLabel="Delete entry">
          <Text style={{ fontSize: 18 }}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xl }]} accessibilityRole="header">
        Journal
      </Text>

      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md, minHeight: theme.tapMinSize }]}
        placeholder="Title (optional)"
        placeholderTextColor={theme.colors.textSecondary}
        value={title}
        onChangeText={setTitle}
        accessibilityLabel="Entry title"
      />

      <TextInput
        style={[styles.input, styles.bodyInput, { borderColor: theme.colors.border, color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}
        placeholder="What's on your mind?"
        placeholderTextColor={theme.colors.textSecondary}
        value={body}
        onChangeText={setBody}
        multiline
        accessibilityLabel="Entry body"
      />

      <View style={styles.moodRow}>
        <Text style={[styles.moodLabel, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]}>Mood:</Text>
        {MOODS.map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMood(mood === m ? null : m)}
            style={[styles.moodBtn, { backgroundColor: mood === m ? theme.colors.primary + '30' : 'transparent', borderRadius: theme.borderRadius, minWidth: theme.tapMinSize, minHeight: theme.tapMinSize }]}
            accessibilityRole="radio"
            accessibilityState={{ selected: mood === m }}
            accessibilityLabel={`Mood ${m}`}
          >
            <Text style={{ fontSize: 24 }}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={addEntry}
        style={[styles.saveBtn, { backgroundColor: theme.colors.primary, minHeight: theme.tapMinSize, borderRadius: theme.borderRadius }]}
        accessibilityLabel="Save journal entry"
      >
        <Text style={[styles.saveBtnText, { fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}>Save Entry</Text>
      </TouchableOpacity>

      <FlatList data={entries} renderItem={renderEntry} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 8 },
  bodyInput: { minHeight: 100, textAlignVertical: 'top' },
  moodRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' },
  moodLabel: { marginRight: 8 },
  moodBtn: { alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
  saveBtn: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12, marginBottom: 16 },
  saveBtnText: { color: '#FFF', fontWeight: '600' },
  list: { paddingBottom: 40 },
  entryCard: { padding: 14, marginBottom: 10 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  entryTitle: { fontWeight: '600', flex: 1 },
  entryMood: { fontSize: 22, marginLeft: 8 },
  entryBody: { marginBottom: 8 },
  entryActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  iconBtn: { paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
});
