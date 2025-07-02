// Leaderboard/LevelRanking.tsx

import {useTheme} from '@sudoku/shared-themes';
import {GameLogEntryV2, Level, PlayerProfile} from '@sudoku/shared-types';
import {getLevelStatsForLevel} from '@sudoku/shared-utils';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {renderMedal} from './sub/RankingComponents';

type LevelRankingProps = {
  levels: Level[];
  logs: GameLogEntryV2[];
  players: PlayerProfile[];
};

const LevelRanking = ({levels, logs, players}: LevelRankingProps) => {
  const [activeLevel, setActiveLevel] = useState<Level>(levels[0]);
  const {mode, theme} = useTheme();

  const stats = getLevelStatsForLevel(logs, players, activeLevel);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabRow}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setActiveLevel(level)}
            style={[
              styles.chip,
              {
                backgroundColor:
                  level === activeLevel
                    ? theme.primary
                    : theme.settingItemBackground,
              },
            ]}>
            <Text
              style={[
                styles.chipText,
                {color: level === activeLevel ? theme.text : theme.secondary},
              ]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {stats.map((entry, index) => (
          <View
            key={entry.playerId}
            style={[styles.card, {backgroundColor: theme.card}]}>
            {renderMedal(mode, index + 1)}
            <Text style={[styles.name, {color: theme.text}]}>
              {entry.playerName}
            </Text>
            <Text style={[styles.stat, {color: theme.secondary}]}>
              🎯 Ván thắng: {entry.completedGames}
            </Text>
            <Text style={[styles.stat, {color: theme.secondary}]}>
              ⏱ Thời gian TB: ~{Math.round(entry.avgDuration)}s
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  stat: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default LevelRanking;
