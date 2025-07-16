// Ionicons.tsx

import React from 'react';
import {Platform} from 'react-native';

const isWeb = typeof window !== 'undefined' && Platform.OS === 'web';

let IconComponent: any;

if (isWeb) {
  const {Ionicons} = require('@expo/vector-icons');
  IconComponent = Ionicons;
} else {
  const mod = require('react-native-vector-icons/Ionicons');
  IconComponent = mod.default;
}

type Props = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

const Ionicons = ({name, size = 24, color = 'black', style}: Props) => {
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export {Ionicons};
