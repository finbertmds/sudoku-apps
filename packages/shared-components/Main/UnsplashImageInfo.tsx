// Main/UnsplashImageInfo.tsx

import {useTheme} from '@sudoku/shared-themes';
import {UNSPLASH_URL} from '@sudoku/shared-utils';
import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

type UnsplashImageInfoProps = {
  unsplashUtm: string;
  photographerName: string;
  photographerLink: string;
};

const UnsplashImageInfoComponent = ({
  unsplashUtm,
  photographerName,
  photographerLink,
}: UnsplashImageInfoProps) => {
  const {theme} = useTheme();
  return (
    <View style={styles.attributionContainer}>
      <Text style={[styles.attributionText, {color: theme.text}]}>
        Photo by{' '}
        <Text
          style={[styles.linkText, {color: theme.secondary}]}
          onPress={() =>
            Linking.openURL((photographerLink ?? UNSPLASH_URL) + unsplashUtm)
          }>
          {photographerName}
        </Text>{' '}
        on{' '}
        <Text
          style={[styles.linkText, {color: theme.secondary}]}
          onPress={() => Linking.openURL(UNSPLASH_URL + unsplashUtm)}>
          Unsplash
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  attributionContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  attributionText: {
    fontSize: 14,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});

export const UnsplashImageInfo = React.memo(UnsplashImageInfoComponent);
