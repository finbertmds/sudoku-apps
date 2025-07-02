// Statistics/ChartsStats.tsx

import EmptyContainer from '@/commons/EmptyContainer';
import GameBarChart from '@/Statistics/GameBarChart';
import GamePieChart from '@/Statistics/GamePieChart';
import GameStackedBarChart from '@/Statistics/GameStackedBarChart';
import TimeLineChart from '@/Statistics/TimeLineChart';
import {useTheme} from '@sudoku/shared-themes';
import {GameLogEntryV2, TimeFilter} from '@sudoku/shared-types';
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
  logs: GameLogEntryV2[];
  filter: TimeFilter;
};

const ChartsStats = ({logs, filter}: ChartsStatsProps) => {
  const {mode, theme} = useTheme();
  const {t} = useTranslation();
  const dailyStats = useMemo(
    () => getDailyStatsFromLogs(logs, filter),
    [logs, filter],
  );
  const levelCounts = useMemo(
    () => convertToPieData(logs, mode, t, filter),
    [logs, mode, t, filter],
  );
  const stackedData = useMemo(
    () => convertToStackedData(logs, mode, t, filter),
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

export default ChartsStats;
