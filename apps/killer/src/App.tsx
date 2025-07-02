// src/App.tsx
import {SCREENS} from '@/utils/constants';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setupEventListeners} from '@sudoku/shared-events';
import {useAppPause} from '@sudoku/shared-hooks';
import {
  createReactNavigationImpl,
  setNavigationImpl,
} from '@sudoku/shared-navigation';
import {runMigrationsIfNeeded} from '@sudoku/shared-storages';
import {ThemeProvider} from '@sudoku/shared-themes';
import {RootStackParamList} from '@sudoku/shared-types';
import React, {useEffect, useRef} from 'react';
import './i18n/i18n';
import {autoDetectLanguage} from './i18n/i18n';
import BottomTabs from './navigation/BottomTabs';
import AboutGame from './screens/AboutGame';
import BoardScreen from './screens/BoardScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import OptionsScreen from './screens/OptionsScreen';
import PlayerScreen from './screens/PlayerScreen';
import SettingsScreen from './screens/SettingsScreen';
import SkWebViewScreen from './screens/SkWebViewScreen';
import {darkTheme, lightTheme} from './theme/themeStyles';

const Stack = createNativeStackNavigator<RootStackParamList>();
setupEventListeners();

const App = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    setNavigationImpl(createReactNavigationImpl(navigationRef));
  }, []);

  useEffect(() => {
    runMigrationsIfNeeded();
  }, []);

  useAppPause(
    () => {},
    () => {
      setTimeout(() => {
        autoDetectLanguage();
      }, 200);
    },
  );

  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <NavigationContainer ref={navigationRef}>
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
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
