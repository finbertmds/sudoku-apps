// MaterialCommunityIcons.tsx

import React from 'react';
import {Platform} from 'react-native';

const isWeb = typeof window !== 'undefined' && Platform.OS === 'web';

let IconComponent: any;

if (isWeb) {
  const {MaterialCommunityIcons} = require('@expo/vector-icons');
  IconComponent = MaterialCommunityIcons;
} else {
  const mod = require('react-native-vector-icons/MaterialCommunityIcons');
  IconComponent = mod.default;
}

type Props = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

const MaterialCommunityIcons = ({
  name,
  size = 24,
  color = 'black',
  style,
}: Props) => {
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export {MaterialCommunityIcons};
