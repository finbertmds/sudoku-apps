// BoardScreen/index.tsx

import {ClassicInitGame, ClassicLevel, ClassicSavedGame} from '@/types';
import {env} from '@/utils/appUtil';
import {constantEnv, TUTORIAL_IMAGES} from '@/utils/constants';
import {BannerAdSafe, useInterstitialAdSafe} from '@sudoku/shared-ads-safe';
import {
  ActionButtons,
  ConfirmDialog,
  Grid,
  Header,
  HowToPlay,
  InfoPanel,
  NumberPad,
  PauseModal,
} from '@sudoku/shared-components';
import {CORE_EVENTS, GameEndedCoreEvent} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {
  useAlert,
  useAppPause,
  useHintCounter,
  useMistakeCounter,
  useSafeAreaInsetsSafe,
  useSafeGoBack,
} from '@sudoku/shared-hooks';
import {
  BoardService,
  SettingsService,
  StatsService,
} from '@sudoku/shared-services';
import {useTheme} from '@sudoku/shared-themes';
import {
  AppSettings,
  BoardParamProps,
  Cell,
  CellValue,
  GameEndedData,
  SavedGame,
} from '@sudoku/shared-types';
import {
  BANNER_HEIGHT,
  BOARD_TYPE,
  checkBoardIsSolved,
  createEmptyGrid,
  createEmptyGridNotes,
  deepCloneBoard,
  deepCloneNotes,
  getAvailableMemoNumbers,
  getTutorialImageList,
  NUMBERS_1_TO_9,
  removeNoteFromPeers,
} from '@sudoku/shared-utils';
import {router, useFocusEffect, useLocalSearchParams} from 'expo-router';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const BoardScreen = () => {
  const {mode, theme} = useTheme();
  const {t} = useTranslation();
  const rawParams = useLocalSearchParams();
  const {id, level: levelParam, type} = rawParams as BoardParamProps;
  const level = levelParam as ClassicLevel;

  const goBack = useSafeGoBack();
  const {alert} = useAlert();

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [solvedBoard, setSolvedBoard] =
    useState<CellValue[][]>(createEmptyGrid<CellValue>());
  // const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
  const [noteMode, setNoteMode] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [availableMemoNumbers, setAvailableMemoNumbers] =
    useState<number[]>(NUMBERS_1_TO_9);

  const [board, setBoard] =
    useState<CellValue[][]>(createEmptyGrid<CellValue>());
  const [history, setHistory] = useState<CellValue[][][]>([
    createEmptyGrid<CellValue>(),
  ]);
  const [notes, setNotes] = useState<string[][][]>(
    createEmptyGridNotes<string>(),
  );

  const handleCellPress = useCallback(
    (cell: Cell | null) => {
      setSelectedCell(cell);
      if (noteMode && cell) {
        const availableMemoNumbers = getAvailableMemoNumbers(board, cell);
        setAvailableMemoNumbers(availableMemoNumbers);
      } else {
        setAvailableMemoNumbers(NUMBERS_1_TO_9);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noteMode],
  );

  useEffect(() => {
    if (noteMode && selectedCell) {
      const availableMemoNumbers = getAvailableMemoNumbers(board, selectedCell);
      setAvailableMemoNumbers(availableMemoNumbers);
    } else {
      setAvailableMemoNumbers(NUMBERS_1_TO_9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteMode, selectedCell]);

  // Lấy initGame and savedGame
  // ===========================================================
  const handeGameStarted = async () => {
    if (type === BOARD_TYPE.INIT || type === BOARD_TYPE.UNFINISHED) {
      let initGame = (await BoardService.loadInit()) as ClassicInitGame;
      if (!initGame) {
        return;
      }
      setIsLoading(false);
      setBoard(deepCloneBoard(initGame.initialBoard));
      setHistory([deepCloneBoard(initGame.initialBoard)]);
      setNotes(createEmptyGridNotes<string>());
      // setScore(initGame.savedScore);
      setSolvedBoard(initGame.solvedBoard);
      setIsPlaying(true);
    } else if (type === BOARD_TYPE.SAVED) {
      const initGame = (await BoardService.loadInit()) as ClassicInitGame;
      const savedGame = (await BoardService.loadSaved()) as ClassicSavedGame;
      setIsLoading(false);

      if (initGame && savedGame) {
        setBoard(deepCloneBoard(savedGame.savedBoard));
        setHistory(savedGame.savedHistory);
        setNotes(savedGame.savedNotes);
        // setScore(savedGame.savedScore);
        setSolvedBoard(initGame.solvedBoard);
        setIsPlaying(true);
      }
    }
  };
  const handleAfterCheckHasPlayed = async () => {
    await SettingsService.setHasPlayed(true);
    setShowHowToPlay(false);
    await handeGameStarted();
  };

  useEffect(() => {
    SettingsService.getHasPlayed().then((hasPlayed) => {
      if (!hasPlayed) {
        setShowHowToPlay(true);
      } else {
        handleAfterCheckHasPlayed();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    eventBus.on(CORE_EVENTS.gameStarted, handeGameStarted);
    return () => eventBus.off(CORE_EVENTS.gameStarted, handeGameStarted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ===========================================================

  // Lấy settings
  // ===========================================================
  const [settings, setSettings] = useState<AppSettings>(
    constantEnv.DEFAULT_SETTINGS,
  );
  const savedSettingsRef = useRef<AppSettings>(null);
  useEffect(() => {
    SettingsService.load().then((data) => {
      if (data) {
        setSettings(data);
      }
    });
  }, []);
  useEffect(() => {
    const handeSettingUpdated = async (_settings: AppSettings) => {
      savedSettingsRef.current = _settings;
    };
    eventBus.on(CORE_EVENTS.settingsUpdated, handeSettingUpdated);
    return () => eventBus.off(CORE_EVENTS.settingsUpdated, handeSettingUpdated);
  }, []);
  // ===========================================================

  // Hiển thị rewarded ad và xử lý khi đóng ad
  // ===========================================================
  const {
    isLoaded: isLoadedRewarded,
    isClosed: isClosedRewarded,
    load: loadRewarded,
    show: showRewarded,
  } = useInterstitialAdSafe(env);
  useEffect(() => {
    loadRewarded();
  }, [loadRewarded]);
  useEffect(() => {
    if (Platform.OS !== 'web' && isClosedRewarded) {
      setIsPlaying(true);
      setIsPaused(false);
      if (limitMistakeReached) {
        resetMistakes();
      } else if (limitHintReached) {
        resetHintCount();
      }
      loadRewarded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosedRewarded]);
  const {
    totalMistakes,
    mistakes,
    limitMistakeReached,
    incrementMistake,
    resetMistakes,
  } = useMistakeCounter({
    maxMistakes: constantEnv.MAX_MISTAKES,
    onLimitReached: () => {
      setIsPlaying(false);
      setIsPaused(true);
    },
  });
  const {
    totalHintCountUsed,
    hintCount,
    limitHintReached,
    decrementHintCount,
    resetHintCount,
    changeLimitHintReached,
  } = useHintCounter({
    maxHintCount: constantEnv.MAX_HINTS,
    onLimitReached: () => {
      setIsPlaying(false);
      setIsPaused(true);
    },
  });

  const handleLimitMistakeReached = async () => {
    await handleResetGame();
    const gameEndedData: GameEndedData = {
      id: id,
      level: level,
      timePlayed: secondsRef.current,
      mistakes: totalMistakes,
      hintCount: totalHintCountUsed,
      completed: false,
    };
    const newEntry = await StatsService.recordGameEnd(gameEndedData);
    const payload: GameEndedCoreEvent = {
      completed: gameEndedData.completed,
      newEntry: newEntry,
    };
    eventBus.emit(CORE_EVENTS.gameEnded, payload);
    goBack();
  };

  const handleLimitHintReached = (_isPlaying: boolean = false) => {
    if (!_isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
      changeLimitHintReached(true);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      changeLimitHintReached(false);
    }
  };

  const handleWatchAdToContinue = (typeAd: 'mistake' | 'hint') => {
    if (isLoadedRewarded) {
      showRewarded();
    } else {
      if (typeAd === 'mistake') {
        handleLimitMistakeReached();
      } else {
        handleLimitHintReached(true);
      }
    }
  };
  // ===========================================================

  // Hiển thị thời gian đã chơi
  // ===========================================================
  const secondsRef = useRef(0);
  const handleLimitTimeReached = async () => {
    await handleResetGame();
    const gameEndedData: GameEndedData = {
      id: id,
      level: level,
      timePlayed: secondsRef.current,
      mistakes: totalMistakes,
      hintCount: totalHintCountUsed,
      completed: false,
    };
    const newEntry = await StatsService.recordGameEnd(gameEndedData);
    const payload: GameEndedCoreEvent = {
      completed: gameEndedData.completed,
      newEntry: newEntry,
    };
    eventBus.emit(CORE_EVENTS.gameEnded, payload);
    goBack();
  };
  // ===========================================================

  const handleResetGame = async () => {
    await BoardService.clear();
  };
  // ===========================================================

  const handleSaveGame = async (
    newBoard: CellValue[][],
    newHistory: CellValue[][][],
  ) => {
    const savedGame = {
      savedId: id,
      savedLevel: level,
      // savedScore: score,
      savedBoard: newBoard,
      savedHintCount: hintCount,
      savedTotalHintCountUsed: totalHintCountUsed,
      savedMistake: mistakes,
      savedTotalMistake: totalMistakes,
      savedTimePlayed: secondsRef.current,
      savedHistory: newHistory,
      savedNotes: notes,
      lastSaved: new Date(),
    } as SavedGame;
    await BoardService.save(savedGame);
  };

  const handleBackPress = async () => {
    await handleSaveGame(board, history);
    setIsPlaying(false);
    goBack();
  };

  const handleGoToSettings = async () => {
    await handleSaveGame(board, history);
    setIsPlaying(false);
    setIsPaused(true);
    router.push({
      pathname: '/SettingsScreen',
      params: {showAdvancedSettings: '0'},
    });
  };

  const handlePause = async () => {
    await handleSaveGame(board, history);
    setIsPlaying(false);
    setIsPaused(true);
    setShowPauseModal(true);
  };

  const handleResume = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setShowPauseModal(false);
  };

  /**
   * Quay trở lại trạng thái board trước đó
   */
  const handleUndo = async () => {
    if (history.length <= 1) {
      return;
    }

    const lastState = history[history.length - 2];
    setBoard(deepCloneBoard(lastState));
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    await handleSaveGame(deepCloneBoard(lastState), newHistory);
  };

  /**
   * Xoá giá trị của ô đã chọn
   */
  const handleErase = async () => {
    if (!selectedCell) {
      return;
    }
    const {row, col} = selectedCell;
    if (board[row][col] === null || board[row][col] === 0) {
      return;
    }
    if (!__DEV__) {
      const currentValue = board[row][col];
      const correctValue = solvedBoard[row][col];
      if (currentValue === correctValue) {
        return;
      }
    }
    const newNotes = deepCloneNotes(notes);
    newNotes[row][col] = [];
    setNotes(newNotes);
    const newBoard = deepCloneBoard(board);
    newBoard[row][col] = null;
    setSelectedCell({...selectedCell, value: null});
    setBoard(newBoard);

    const newHistory = [...history, deepCloneBoard(newBoard)];
    setHistory(newHistory);

    await handleSaveGame(newBoard, newHistory);
  };

  const handleCheckSolved = (_totalHintCountUsed: number) => {
    setIsPlaying(false);
    setIsPaused(true);

    alert(
      t('done'),
      t('congratulations'),
      [
        {
          text: t('backToMain'),
          onPress: async () => {
            const gameEndedData: GameEndedData = {
              id: id,
              level: level,
              timePlayed: secondsRef.current,
              mistakes: totalMistakes,
              hintCount: _totalHintCountUsed,
              completed: true,
            };
            const newEntry = await StatsService.recordGameEnd(gameEndedData);
            const payload: GameEndedCoreEvent = {
              completed: gameEndedData.completed,
              newEntry: newEntry,
            };
            eventBus.emit(CORE_EVENTS.gameEnded, payload);
            await BoardService.clear();
            goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleInputCorrectValue = async (
    row: number,
    col: number,
    num: CellValue,
    _totalHintCountUsed: number,
  ) => {
    setSelectedCell({row, col, value: num});

    const newBoard = deepCloneBoard(board);
    newBoard[row][col] = num;
    setBoard(newBoard);

    if (settings.autoRemoveNotes) {
      setNotes((prevNotes) => removeNoteFromPeers(prevNotes, row, col, num));
    }

    if (checkBoardIsSolved(newBoard, solvedBoard)) {
      handleCheckSolved(_totalHintCountUsed);
    }

    const newHistory = [...history, deepCloneBoard(newBoard)];
    setHistory(newHistory);

    await handleSaveGame(newBoard, newHistory);
  };

  const handleHint = () => {
    if (!selectedCell) {
      return;
    }
    const {row, col} = selectedCell;
    if (board[row][col] === solvedBoard[row][col]) {
      return;
    }
    if (hintCount <= 0) {
      handleLimitHintReached(false);
      return;
    }
    decrementHintCount();
    const solvedNum = solvedBoard[row][col];
    handleInputCorrectValue(row, col, solvedNum, totalHintCountUsed + 1);
  };

  /**
   * Kiểm tra board đã được giải quyết chưa
   */
  const handleSolve = () => {
    alert(t('solution'), t('allDone'), [{text: t('ok')}], {
      cancelable: false,
    });

    const clonedSolved = deepCloneBoard(solvedBoard);
    setSelectedCell(null);
    setBoard(clonedSolved);
    setNotes(createEmptyGridNotes<string>());
    // handleCheckSolved(solvedBoard);
    const newHistory = [...history, deepCloneBoard(clonedSolved)];
    setHistory(newHistory);
  };

  /**
   * Điền số vào ô đã chọn
   * @param num Số
   */
  const handleNumberPress = (num: number) => {
    if (!selectedCell) {
      return;
    }
    const {row, col} = selectedCell;
    const currentValue = board[row][col];

    if (noteMode) {
      if (currentValue != null) {
        return;
      }
      const newNotes = deepCloneNotes(notes);
      const cellNotes = newNotes[row][col];
      if (cellNotes.includes(num.toString())) {
        newNotes[row][col] = cellNotes.filter((n) => n !== num.toString());
      } else {
        newNotes[row][col] = [...cellNotes, num.toString()].sort();
      }
      setNotes(newNotes);
    } else {
      if (currentValue === num) {
        return;
      }
      const correctValue = solvedBoard[row][col];
      if (settings.mistakeLimit && num !== correctValue) {
        if (mistakes >= constantEnv.MAX_MISTAKES) {
          return;
        } else {
          incrementMistake();
        }
      }
      handleInputCorrectValue(row, col, num, totalHintCountUsed);
    }
  };

  const timeoutRefs = useRef<{[key: string]: NodeJS.Timeout}>({});
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(timeoutRefs.current).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  useAppPause(
    () => {
      if (!isPaused) {
        setTimeout(async () => {
          try {
            await handlePause();
          } catch (error) {
            console.error('AppStateChange:', error);
          }
        }, 100);
      }
    },
    () => {
      if (!isPaused) {
        setIsPaused(true);
        setShowPauseModal(true);
      }
    },
  );

  useFocusEffect(
    useCallback(() => {
      setIsPlaying(true);
      setIsPaused(false);
      if (savedSettingsRef.current) {
        setSettings(savedSettingsRef.current);
      }
    }, []),
  );

  const insets = useSafeAreaInsetsSafe();

  useEffect(() => {
    if (limitMistakeReached && !isLoadedRewarded && !isClosedRewarded) {
      alert(
        t('mistakeWarning.title'),
        t('mistakeWarning.messageNotAd', {max: constantEnv.MAX_MISTAKES}),
        [
          {
            text: t('ok'),
            onPress: () => {
              handleLimitMistakeReached();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitMistakeReached, isLoadedRewarded]);

  useEffect(() => {
    if (limitHintReached && !isLoadedRewarded && !isClosedRewarded) {
      alert(
        t('hintWarning.title'),
        t('hintWarning.messageNotAd'),
        [
          {
            text: t('ok'),
            onPress: () => {
              handleLimitHintReached(true);
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitHintReached, isLoadedRewarded]);

  if (isLoading) {
    return (
      <SafeAreaView
        edges={['top']}
        style={[styles.loadingContainer, {backgroundColor: theme.background}]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  if (showHowToPlay) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, {backgroundColor: theme.background}]}>
        <Header
          title={t('appName')}
          showBack={true}
          showSettings={false}
          showTheme={false}
        />
        <HowToPlay
          slides={getTutorialImageList(TUTORIAL_IMAGES, mode)}
          onClose={handleAfterCheckHasPlayed}
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, {backgroundColor: theme.background}]}>
        <Header
          title={t('appName')}
          showBack={true}
          showSettings={true}
          onSettings={handleGoToSettings}
          showTheme={true}
          onBack={handleBackPress}
        />
        <View
          style={[
            styles.contentContainerNoAd,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom + BANNER_HEIGHT,
            },
          ]}>
          <InfoPanel
            isPlaying={isPlaying}
            // score={score}
            level={level}
            mistakes={mistakes}
            secondsRef={secondsRef}
            isPaused={isPaused}
            settings={settings}
            onPause={handlePause}
            onLimitTimeReached={handleLimitTimeReached}
            maxMistakes={constantEnv.MAX_MISTAKES}
            maxTimePlayed={constantEnv.MAX_TIME_PLAYED}
          />
          <Grid
            board={board}
            showCage={false}
            cages={[]}
            notes={notes}
            solvedBoard={solvedBoard}
            selectedCell={selectedCell}
            settings={settings}
            onPress={handleCellPress}
          />
          <ActionButtons
            noteMode={noteMode}
            hintCount={hintCount}
            onNote={setNoteMode}
            onUndo={handleUndo}
            onErase={handleErase}
            onHint={handleHint}
            onSolve={handleSolve}
          />
          <NumberPad
            board={board}
            settings={settings}
            isNoteMode={noteMode}
            availableMemoNumbers={availableMemoNumbers}
            onSelectNumber={handleNumberPress}
          />
        </View>
        {Platform.OS !== 'web' && <BannerAdSafe env={env} />}
      </SafeAreaView>
      {showPauseModal && (
        <PauseModal
          maxMistakes={constantEnv.MAX_MISTAKES}
          level={level}
          mistake={mistakes}
          time={secondsRef.current}
          settings={settings}
          onResume={() => handleResume()}
        />
      )}
      {limitMistakeReached && isLoadedRewarded && (
        <ConfirmDialog
          title={t('mistakeWarning.title')}
          message={t('mistakeWarning.message', {max: constantEnv.MAX_MISTAKES})}
          cancelText={t('ad.cancel')}
          confirmText={t('ad.confirm')}
          disableBackdropClose={true}
          onCancel={() => {
            handleLimitMistakeReached();
          }}
          onConfirm={() => {
            handleWatchAdToContinue('mistake');
          }}
        />
      )}
      {limitHintReached && isLoadedRewarded && (
        <ConfirmDialog
          title={t('hintWarning.title')}
          message={t('hintWarning.message', {max: constantEnv.MAX_HINTS})}
          cancelText={t('ad.cancel')}
          confirmText={t('ad.confirm')}
          disableBackdropClose={true}
          onCancel={() => {
            handleLimitHintReached(true);
          }}
          onConfirm={() => {
            handleWatchAdToContinue('hint');
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerNoAd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default BoardScreen;
