// Board/InfoPanel.tsx

import {useAlert, useGameTimer} from '@sudoku/shared-hooks';
import {MaterialCommunityIcons} from '@sudoku/shared-icons';
import {useTheme} from '@sudoku/shared-themes';
import {AppSettings} from '@sudoku/shared-types';
import {DeviceUtil, formatTime} from '@sudoku/shared-utils';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type InfoPanelProps = {
  maxMistakes: number;
  maxTimePlayed: number;
  isPlaying: boolean;
  level: string;
  mistakes: number;
  secondsRef: React.RefObject<number>;
  isPaused: boolean;
  settings: AppSettings;
  onPause: () => void;
  onLimitTimeReached: () => Promise<void>;
};

const InfoPanelComponent = ({
  maxMistakes,
  maxTimePlayed,
  isPlaying,
  level,
  mistakes,
  secondsRef,
  isPaused,
  settings,
  onPause,
  onLimitTimeReached,
}: InfoPanelProps) => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  const {alert} = useAlert();

  const {getSeconds, stopTimer} = useGameTimer(isPlaying, {
    maxTimePlayed,
    onLimitReached: async () => {
      stopTimer();
      alert(
        t('timeWarning'),
        t('playedLimit', {limit: formatTime(maxTimePlayed)}),
        [
          {
            text: t('ok'),
            onPress: () => {
              onLimitTimeReached();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    },
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      secondsRef.current = getSeconds();
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.infoBlock}>
        <Text style={[styles.title, {color: theme.text}]}>{t('level')}</Text>
        <Text style={[styles.value, {color: theme.text}]}>
          {t(`level.${level}`)}
        </Text>
      </View>

      {settings.mistakeLimit && (
        <View style={styles.infoBlock}>
          <Text style={[styles.title, {color: theme.text}]}>
            {t('mistakes')}
          </Text>
          <Text style={[styles.value, {color: theme.text}]}>
            {mistakes}/{maxMistakes}
          </Text>
        </View>
      )}

      {settings.timer && (
        <View style={styles.infoBlock}>
          <Text style={[styles.title, {color: theme.text}]}>{t('time')}</Text>
          <Text style={[styles.value, {color: theme.text}]}>
            {tick > 0 ? formatTime(getSeconds()) : '-'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.infoBlock} onPress={onPause}>
        {!isPaused ? (
          <MaterialCommunityIcons
            name="pause-circle-outline"
            size={28}
            color={theme.iconColor}
          />
        ) : (
          <MaterialCommunityIcons
            name="play-circle-outline"
            size={28}
            color={theme.iconColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%' as const,
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    marginTop: DeviceUtil.isTablet() ? 0 : 20,
    marginBottom: DeviceUtil.isTablet() ? 0 : 20,
  },
  infoBlock: {
    alignItems: 'center' as const,
    minWidth: 70,
  },
  title: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
});

export const InfoPanel = React.memo(InfoPanelComponent);
