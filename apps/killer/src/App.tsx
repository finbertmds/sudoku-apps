// src/App.tsx

import {autoDetectLanguage, getLanguage} from '@/i18n/i18n';
import AboutGame from '@/screens/AboutGame';
import BoardScreen from '@/screens/BoardScreen';
import BottomTabs from '@/screens/BottomTabs';
import HowToPlayScreen from '@/screens/HowToPlayScreen';
import OptionsScreen from '@/screens/OptionsScreen';
import PlayerScreen from '@/screens/PlayerScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import SkWebViewScreen from '@/screens/SkWebViewScreen';
import {darkTheme, lightTheme} from '@/theme/themeStyles';
import {env} from '@/utils/appUtil';
import {generateBoard} from '@/utils/boardUtil';
import {constantEnv, SCREENS} from '@/utils/constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {LanguageCode, RootStackParamList} from '@sudoku/shared-types';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
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
  }, []);

  useAppPause(
    () => {},
    () => {
      setTimeout(() => {
        initEnv();
        autoDetectLanguage();
      }, 200);
    },
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider
          lightTheme={lightTheme}
          darkTheme={darkTheme}
          setRootMode={setRootMode}>
          <Stack.Navigator>
            <Stack.Screen
              name={SCREENS.HOME_TABS}
              component={BottomTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.BOARD}
              component={BoardScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.OPTIONS}
              component={OptionsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.SETTINGS}
              component={SettingsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.HOW_TO_PLAY}
              component={HowToPlayScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.ABOUT_GAME}
              component={AboutGame}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.SK_WEBVIEW}
              component={SkWebViewScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREENS.PLAYERS}
              component={PlayerScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>

          <StatusBar
            barStyle={rootMode === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
