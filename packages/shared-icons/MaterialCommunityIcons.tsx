// MaterialCommunityIcons.tsx

import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import React from 'react';
import {Platform} from 'react-native';

const isExpo = Platform.OS === 'web' || isExpoGo;

let IconComponent: any;

if (isExpo) {
  const {MaterialCommunityIcons} = require('@expo/vector-icons');
  IconComponent = MaterialCommunityIcons;
} else {
  IconComponent =
    require('react-native-vector-icons/MaterialCommunityIcons').default;
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

export default MaterialCommunityIcons;
