// +not-found.tsx

import {useTheme} from '@sudoku/shared-themes';
import {Link, Stack} from 'expo-router';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';

export default function NotFoundScreen() {
  const {theme} = useTheme();
  const {t} = useTranslation();
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={[styles.title, {color: theme.text}]}>
          {t('thisScreenDoesNotExist')}
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.link, {color: theme.text}]}>
            {t('goToHomeScreen')}
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: '#0a7ea4',
  },
});
