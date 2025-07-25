// _layout.tsx

import {autoDetectLanguage, getLanguage} from '@/i18n/i18n';
import {darkTheme, lightTheme} from '@/theme/themeStyles';
import {env} from '@/utils/appUtil';
import {generateBoard} from '@/utils/boardUtil';
import {constantEnv, SCREENS} from '@/utils/constants';
import {setupEventListeners, setupInitGameHandler} from '@sudoku/shared-events';
import {useAppPause} from '@sudoku/shared-hooks';
import {
  BackgroundService,
  BoardService,
  SettingsService,
  StatsService,
} from '@sudoku/shared-services';
import {runMigrationsIfNeeded} from '@sudoku/shared-storages';
import {ThemeProvider} from '@sudoku/shared-themes';
import {LanguageCode} from '@sudoku/shared-types';
import {useFonts} from 'expo-font';
import {Stack, useFocusEffect} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useCallback, useEffect, useState} from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const [rootMode, setRootMode] = useState<'light' | 'dark'>('light');
  const initEnv = useCallback(() => {
    BackgroundService.init(env);
    BoardService.init(constantEnv);
    SettingsService.init(constantEnv);
    StatsService.init(constantEnv);
  }, []);

  useEffect(() => {
    initEnv();

    setupInitGameHandler({
      generateBoard: generateBoard,
    });
    setupEventListeners();

    getLanguage().then((language) =>
      runMigrationsIfNeeded(language as LanguageCode),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      initEnv();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useAppPause(
    () => {},
    () => {
      setTimeout(() => {
        initEnv();
        autoDetectLanguage();
      }, 200);
    },
  );
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      setRootMode={setRootMode}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREENS.HOME_TABS} />
        <Stack.Screen name={SCREENS.NOT_FOUND} />
      </Stack>
      <StatusBar
        style={rootMode === 'dark' ? 'light' : 'dark'}
        backgroundColor="transparent"
        translucent
      />
    </ThemeProvider>
  );
}
