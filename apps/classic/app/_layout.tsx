// _layout.tsx

import {autoDetectLanguage} from '@/i18n/i18n';
import {darkTheme, lightTheme} from '@/theme/themeStyles';
import {SCREENS} from '@/utils/constants';
import {setupEventListeners} from '@sudoku/shared-events';
import {useAppPause} from '@sudoku/shared-hooks';
import {
  createExpoNavigationImpl,
  setNavigationImpl,
} from '@sudoku/shared-navigation';
import {runMigrationsIfNeeded} from '@sudoku/shared-storages';
import {ThemeProvider} from '@sudoku/shared-themes';
import {useFonts} from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    setNavigationImpl(createExpoNavigationImpl());
  }, [router]);

  useEffect(() => {
    setupEventListeners();
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
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREENS.HOME_TABS} />
        <Stack.Screen name={SCREENS.NOT_FOUND} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
