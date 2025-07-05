// Player/PlayerCard.tsx

import {Ionicons, MaterialCommunityIcons} from '@sudoku/shared-icons';
import {useTheme} from '@sudoku/shared-themes';
import {PlayerProfile} from '@sudoku/shared-types';
import {
  DEFAULT_PLAYER_ID,
  getAvatarColor,
  PlayerColorKey,
} from '@sudoku/shared-utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type PlayerCardProps = {
  player: PlayerProfile;
  isSelected: boolean;
  canDelete: boolean;
  onPress: () => void;
  onDelete: (id: string) => void;
  onEdit: (player: PlayerProfile) => void;
};

const PlayerCardComponent = ({
  player,
  isSelected,
  canDelete,
  onPress,
  onDelete,
  onEdit,
}: PlayerCardProps) => {
  const {t} = useTranslation();
  const {mode, theme} = useTheme();
  const bgColor = getAvatarColor(player.avatarColor as PlayerColorKey, mode);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: theme.background},
        isSelected && [
          {
            borderWidth: 1,
            borderColor: theme.buttonBlue,
            backgroundColor: theme.selectedCardBg,
          },
        ],
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.avatar,
          {backgroundColor: bgColor},
          isSelected && [
            styles.selectedAvatar,
            {borderColor: theme.buttonBlue},
          ],
        ]}>
        <Text style={styles.avatarText}>
          {player.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, {color: theme.text}]}>
          {player.name} {player.id === DEFAULT_PLAYER_ID && t('defaultPlayer')}
        </Text>
        <Text style={[styles.subtext, {color: theme.secondary}]}>
          {t('gamesCount', {count: player.totalGames})}
        </Text>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={() => onEdit(player)}>
        <MaterialCommunityIcons name="pencil" size={20} color={theme.text} />
      </TouchableOpacity>
      {!isSelected && canDelete && (
        <TouchableOpacity
          onPress={() => onDelete(player.id)}
          style={styles.button}>
          <Ionicons name="trash" size={20} color={theme.danger} />
        </TouchableOpacity>
      )}
      {isSelected && (
        <View style={styles.button}>
          <View style={[styles.checkMark, {backgroundColor: theme.buttonBlue}]}>
            <Text style={[styles.checkText, {color: theme.text}]}>✓</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedAvatar: {
    borderWidth: 1,
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 13,
    marginTop: 4,
  },
  checkMark: {
    width: 22,
    height: 22,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 16,
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const PlayerCard = React.memo(PlayerCardComponent);
