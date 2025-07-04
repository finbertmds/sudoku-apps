// HowToPlayScreen/index.tsx

import {TUTORIAL_IMAGES} from '@/utils/constants';
import {Header, HowToPlay} from '@sudoku/shared-components';
import {useSafeGoBack} from '@sudoku/shared-hooks';
import {useTheme} from '@sudoku/shared-themes';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HowToPlayScreen = () => {
  const goBack = useSafeGoBack();
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Header
        title={t('howToPlay.title')}
        showBack={true}
        showSettings={false}
        showTheme={false}
      />
      <HowToPlay tutorialImages={TUTORIAL_IMAGES} onClose={() => goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HowToPlayScreen;
