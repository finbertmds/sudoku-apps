// Statistics/ChartsStats.tsx

import {EmptyContainer} from '@sudoku/shared-components/commons/EmptyContainer';
import {GameBarChart} from '@sudoku/shared-components/Statistics/GameBarChart';
import {GamePieChart} from '@sudoku/shared-components/Statistics/GamePieChart';
import {GameStackedBarChart} from '@sudoku/shared-components/Statistics/GameStackedBarChart';
import {TimeLineChart} from '@sudoku/shared-components/Statistics/TimeLineChart';
import {useTheme} from '@sudoku/shared-themes';
import {GameLogEntryV3, Level, TimeFilter} from '@sudoku/shared-types';
import {
  convertToPieData,
  convertToStackedData,
  getChartConfig,
  getDailyStatsFromLogs,
} from '@sudoku/shared-utils';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';

type ChartsStatsProps = {
  logs: GameLogEntryV3[];
  filter: TimeFilter;
  levels: Level[];
};

const ChartsStatsComponent = ({logs, filter, levels}: ChartsStatsProps) => {
  const {mode, theme} = useTheme();
  const {t} = useTranslation();
  const dailyStats = useMemo(
    () => getDailyStatsFromLogs(logs, filter),
    [logs, filter],
  );
  const levelCounts = useMemo(
    () => convertToPieData(logs, mode, t, filter, levels),
    [logs, mode, t, filter],
  );
  const stackedData = useMemo(
    () => convertToStackedData(logs, mode, t, filter, levels),
    [logs, mode, t, filter],
  );
  const chartConfig = useMemo(() => getChartConfig(mode), [mode]);

  return (
    <>
      {logs.length === 0 ? (
        <EmptyContainer />
      ) : (
        <ScrollView style={{backgroundColor: theme.background}}>
          <GameBarChart dailyStats={dailyStats} chartConfig={chartConfig} />
          <TimeLineChart dailyStats={dailyStats} chartConfig={chartConfig} />
          <GamePieChart levelCounts={levelCounts} chartConfig={chartConfig} />
          <GameStackedBarChart
            stackedData={stackedData}
            chartConfig={chartConfig}
          />
        </ScrollView>
      )}
    </>
  );
};

export const ChartsStats = ChartsStatsComponent;
