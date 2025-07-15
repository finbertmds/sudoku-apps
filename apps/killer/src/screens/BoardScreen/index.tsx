// src/screens/BoardScreen/index.tsx

import {KillerLevel} from '@/types';
import {env} from '@/utils/appUtil';
import {constantEnv, SCREENS, TUTORIAL_IMAGES} from '@/utils/constants';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {BannerAdSafeBase} from '@sudoku/shared-components/commons/BannerAdSafe.base';
import {CORE_EVENTS, GameEndedCoreEvent} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {
  useAppPause,
  useHintCounter,
  useMistakeCounter,
} from '@sudoku/shared-hooks';
import {useInterstitialAdSafeBase} from '@sudoku/shared-hooks/useInterstitialAdSafe.base';
import {BoardService, SettingsService} from '@sudoku/shared-services';
import {useTheme} from '@sudoku/shared-themes';
import {
  AppSettings,
  BoardParamProps,
  BoardScreenRouteProp,
  CageInfo,
  Cell,
  CellValue,
  RootStackParamList,
  SavedGame,
} from '@sudoku/shared-types';
import {
  BANNER_HEIGHT,
  checkBoardIsSolved,
  createEmptyGrid,
  createEmptyGridNotes,
  createEmptyGridNumber,
  deepCloneBoard,
  deepCloneNotes,
  getAvailableMemoNumbers,
  getTutorialImageList,
  NUMBERS_1_TO_9,
  removeNoteFromPeers,
} from '@sudoku/shared-utils';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const BoardScreen = () => {
  const {mode, theme} = useTheme();
  const {t} = useTranslation();
  const route = useRoute<BoardScreenRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {id, level: levelParam, type} = route.params as BoardParamProps;
  const level = levelParam as KillerLevel;

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [solvedBoard, setSolvedBoard] = useState<number[][]>(
    createEmptyGridNumber(),
  );
  const [cages, setCages] = useState<CageInfo[]>([]);
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
    if (type === 'init') {
      let initGame = await BoardService.loadInit();
      if (!initGame) {
        return;
      }
      setIsLoading(false);
      setBoard(deepCloneBoard(initGame.initialBoard));
      setHistory([deepCloneBoard(initGame.initialBoard)]);
      setNotes(createEmptyGridNotes<string>());
      setCages(initGame.cages);
      setSolvedBoard(initGame.solvedBoard);
      setIsPlaying(true);
    } else {
      const initGame = await BoardService.loadInit();
      const savedGame = await BoardService.loadSaved();
      setIsLoading(false);

      if (initGame && savedGame) {
        setBoard(deepCloneBoard(savedGame.savedBoard));
        setHistory(savedGame.savedHistory);
        setNotes(savedGame.savedNotes);
        setCages(initGame.cages);
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
  } = useInterstitialAdSafeBase(env);
  useEffect(() => {
    loadRewarded();
  }, [loadRewarded]);
  useEffect(() => {
    if (isClosedRewarded) {
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
    eventBus.emit(CORE_EVENTS.gameEnded, {
      id: id,
      level: level,
      timePlayed: secondsRef.current,
      mistakes: totalMistakes,
      hintCount: totalHintCountUsed,
      completed: false,
    } as GameEndedCoreEvent);
    navigation.goBack();
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
    eventBus.emit(CORE_EVENTS.gameEnded, {
      id: id,
      level: level,
      timePlayed: secondsRef.current,
      mistakes: totalMistakes,
      hintCount: totalHintCountUsed,
      completed: false,
    } as GameEndedCoreEvent);
    navigation.goBack();
  };
  // ===========================================================

  const handleResetGame = async () => {
    await BoardService.clear();
  };
  // ===========================================================

  const handleSaveGame = async () => {
    const savedGame = {
      savedId: id,
      savedLevel: level,
      // savedScore: score,
      savedBoard: board,
      savedHintCount: hintCount,
      savedTotalHintCountUsed: totalHintCountUsed,
      savedMistake: mistakes,
      savedTotalMistake: totalMistakes,
      savedTimePlayed: secondsRef.current,
      savedHistory: history,
      savedNotes: notes,
      lastSaved: new Date(),
    } as SavedGame;
    await BoardService.save(savedGame);
  };

  const handleBackPress = async () => {
    await handleSaveGame();
    setIsPlaying(false);
    navigation.goBack();
  };

  const handleGoToSettings = async () => {
    await handleSaveGame();
    setIsPlaying(false);
    setIsPaused(true);
    navigation.navigate(SCREENS.SETTINGS, {
      showAdvancedSettings: '0',
    });
  };

  const handlePause = async () => {
    await handleSaveGame();
    setIsPlaying(false);
    setIsPaused(true);
    setShowPauseModal(true);
  };

  const handleResume = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setShowPauseModal(false);
  };

  const saveHistory = (newBoard: CellValue[][]) => {
    setHistory((prev) => [...prev, deepCloneBoard(newBoard)]);
  };

  /**
   * Quay trở lại trạng thái board trước đó
   */
  const handleUndo = () => {
    if (history.length <= 1) {
      return;
    }

    const lastState = history[history.length - 2];
    setBoard(deepCloneBoard(lastState));
    setHistory((prev) => prev.slice(0, -1));
  };

  /**
   * Xoá giá trị của ô đã chọn
   */
  const handleErase = () => {
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
    saveHistory(newBoard);
  };

  const handleCheckSolved = (_totalHintCountUsed: number) => {
    setIsPlaying(false);
    setIsPaused(true);

    Alert.alert(
      t('done'),
      t('congratulations'),
      [
        {
          text: t('backToMain'),
          onPress: async () => {
            eventBus.emit(CORE_EVENTS.gameEnded, {
              id: id,
              level: level,
              timePlayed: secondsRef.current,
              mistakes: totalMistakes,
              hintCount: _totalHintCountUsed,
              completed: true,
            } as GameEndedCoreEvent);
            await BoardService.clear();
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleInputCorrectValue = (
    row: number,
    col: number,
    num: number,
    _totalHintCountUsed: number,
  ) => {
    const newBoard = deepCloneBoard(board);
    newBoard[row][col] = num;
    setBoard(newBoard);

    if (settings.autoRemoveNotes) {
      setNotes((prevNotes) => removeNoteFromPeers(prevNotes, row, col, num));
    }

    if (checkBoardIsSolved(newBoard, solvedBoard)) {
      handleCheckSolved(_totalHintCountUsed);
    }

    saveHistory(newBoard);
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
    Alert.alert(t('solution'), t('allDone'), [{text: t('ok')}], {
      cancelable: false,
    });

    const clonedSolved = deepCloneBoard(solvedBoard);
    setSelectedCell(null);
    setBoard(clonedSolved);
    setNotes(createEmptyGridNotes<string>());
    // handleCheckSolved(solvedBoard);
    saveHistory(clonedSolved);
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

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (limitMistakeReached && !isLoadedRewarded && !isClosedRewarded) {
      Alert.alert(
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
      Alert.alert(
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
            showCage={true}
            cages={cages}
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
            isNoteMode={noteMode}
            availableMemoNumbers={availableMemoNumbers}
            board={board}
            settings={settings}
            onSelectNumber={handleNumberPress}
          />
        </View>
        <BannerAdSafeBase env={env} />
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
