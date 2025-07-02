// Leaderboard/sub/RankingComponents.tsx

import {MaterialCommunityIcons} from '@sudoku/shared-icons';
import {MAX_PLAYER_RANKING_COUNT, medalColors} from '@sudoku/shared-utils';
import {ColorSchemeName, StyleSheet} from 'react-native';

export const renderMedal = (mode: ColorSchemeName, rank: number) => {
  if (mode === null || mode === undefined) {
    return null;
  }
  const colors = medalColors[mode];
  const color = colors[rank - 1];
  if (rank > MAX_PLAYER_RANKING_COUNT) {
    return null;
  }

  const glowStyle =
    rank === 1
      ? {
          shadowColor: color,
          shadowOpacity: 0.9,
          shadowRadius: 8,
          shadowOffset: {width: 0, height: 0},
          elevation: 6,
        }
      : {};

  return (
    <MaterialCommunityIcons
      name="medal"
      size={20}
      color={color}
      style={[styles.rank, glowStyle]}
    />
  );
};

const styles = StyleSheet.create({
  rank: {
    marginRight: 8,
  },
});
