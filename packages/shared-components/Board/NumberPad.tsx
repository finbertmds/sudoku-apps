// Board/NumberPad.tsx

import {useNumberCounts} from '@sudoku/shared-hooks';
import {useTheme} from '@sudoku/shared-themes';
import {AppSettings, CellValue} from '@sudoku/shared-types';
import {BOARD_SIZE, DeviceUtil} from '@sudoku/shared-utils';
import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type NumberPadProps = {
  board: CellValue[][];
  settings: AppSettings;
  isNoteMode: boolean;
  availableMemoNumbers: number[];
  onSelectNumber: (num: number) => void;
};

const NumberPadComponent = ({
  board,
  settings,
  isNoteMode,
  availableMemoNumbers,
  onSelectNumber,
}: NumberPadProps) => {
  const {theme} = useTheme();
  const counts = useNumberCounts(board, settings);

  // Tạo mảng số từ 1-9 một lần duy nhất
  const numbers = useMemo(
    () => Array.from({length: BOARD_SIZE}, (_, i) => i + 1),
    [],
  );

  const isDisabled = (num: number) => {
    if (isNoteMode && settings.smartMemo) {
      return counts[num] === BOARD_SIZE || !availableMemoNumbers.includes(num);
    }
    return counts[num] === BOARD_SIZE;
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      {numbers.map((num) => (
        <TouchableOpacity
          key={num}
          style={[styles.button]}
          onPress={() => onSelectNumber(num)}
          disabled={isDisabled(num)}>
          <Text
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {color: theme.text, fontSize: 32},
            ]}>
            {isDisabled(num) ? ' ' : num}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    width: '100%' as const,
    alignItems: 'center' as const,
    marginTop: DeviceUtil.isTablet() ? 10 : 0,
    marginBottom: 20,
    paddingHorizontal: 32,
  },
  button: {
    width: DeviceUtil.isTablet() ? 60 : 40,
    height: DeviceUtil.isTablet() ? 60 : 40,
    borderRadius: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
});

export const NumberPad = React.memo(NumberPadComponent);
