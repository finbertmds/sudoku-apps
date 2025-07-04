// PlayerScreen/index.tsx

import {Header, PlayerCard, PlayerModal} from '@sudoku/shared-components';
import {CORE_EVENTS} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {useAlert, usePlayerProfile} from '@sudoku/shared-hooks';
import {PlayerService} from '@sudoku/shared-services';
import {useTheme} from '@sudoku/shared-themes';
import {PlayerProfile} from '@sudoku/shared-types';
import {createNewPlayer} from '@sudoku/shared-utils';
import {DEFAULT_PLAYER_ID} from '@sudoku/shared-utils/constants';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PlayerScreen = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {
    allPlayers,
    switchPlayer,
    player,
    deletePlayer,
    createPlayer,
    updatePlayerName,
    reloadPlayer,
    reloadAllPlayers,
  } = usePlayerProfile();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<PlayerProfile | null>(
    null,
  );

  const selectedPlayer = allPlayers.find((p) => p.id === player?.id);
  const otherPlayers = allPlayers.filter((p) => p.id !== player?.id);

  const {alert} = useAlert();

  const handleDefaultPlayerUpdateDone = () => {
    reloadPlayer();
    reloadAllPlayers();
  };

  useEffect(() => {
    eventBus.on(
      CORE_EVENTS.defaultPlayerUpdated_Done,
      handleDefaultPlayerUpdateDone,
    );
    return () =>
      eventBus.off(
        CORE_EVENTS.defaultPlayerUpdated_Done,
        handleDefaultPlayerUpdateDone,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: string) => {
    switchPlayer(id);
    eventBus.emit(CORE_EVENTS.switchPlayer, id);
  };

  const handleEdit = (_player: PlayerProfile) => {
    setEditingPlayer(_player);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingPlayer(null);
  };

  const handleModalSubmit = (mode: 'create' | 'edit', newName: string) => {
    if (!newName.trim()) {
      return;
    }
    if (mode === 'create') {
      const newPlayer: PlayerProfile = createNewPlayer(newName);
      createPlayer(newPlayer);
    } else {
      if (editingPlayer) {
        if (editingPlayer.id === DEFAULT_PLAYER_ID) {
          const newPlayer: PlayerProfile = createNewPlayer(newName);
          createPlayer(newPlayer);
          if (player?.id === DEFAULT_PLAYER_ID) {
            switchPlayer(newPlayer.id);
          }
          eventBus.emit(CORE_EVENTS.defaultPlayerUpdated, newPlayer.id);
        } else {
          updatePlayerName(editingPlayer.id, newName);
        }
      }
    }
  };

  const handleDelete = (id: string) => {
    if (!PlayerService.canDeletePlayer(id)) {
      alert(t('cannotDeletePlayerTitle'), t('cannotDeletePlayerMessage'));
      return;
    }
    alert(t('deletePlayerTitle'), t('deletePlayerMessage'), [
      {text: t('cancelBtn'), style: 'cancel'},
      {
        text: t('deleteBtn'),
        style: 'destructive',
        onPress: () => {
          deletePlayer(id);
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Header
        title={t('players')}
        showBack={true}
        showSettings={false}
        showTheme={true}
      />
      <Text
        style={[
          styles.title,
          {color: theme.text, backgroundColor: theme.backgroundSecondary},
        ]}>
        {t('selectPlayerTitle')}
      </Text>
      {selectedPlayer && (
        <View
          style={[
            styles.selectedPlayerContainer,
            {backgroundColor: theme.backgroundSecondary},
          ]}>
          <PlayerCard
            key={selectedPlayer.id}
            player={selectedPlayer}
            isSelected={selectedPlayer.id === player?.id}
            canDelete={selectedPlayer.id !== DEFAULT_PLAYER_ID}
            onPress={() => handleSelect(selectedPlayer.id)}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </View>
      )}
      <ScrollView
        style={[
          styles.contentContainer,
          {backgroundColor: theme.backgroundSecondary},
        ]}>
        {otherPlayers.map((p) => (
          <PlayerCard
            key={p.id}
            player={p}
            isSelected={p.id === player?.id}
            canDelete={p.id !== DEFAULT_PLAYER_ID}
            onPress={() => handleSelect(p.id)}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ScrollView>
      <View style={{backgroundColor: theme.backgroundSecondary}}>
        <TouchableOpacity
          onPress={() => setShowCreateModal(true)}
          style={[styles.button, {borderColor: theme.buttonBlue}]}>
          <Text style={[styles.buttonText, {color: theme.buttonBlue}]}>
            {t('addPlayerBtn')}
          </Text>
        </TouchableOpacity>
      </View>
      {showCreateModal && (
        <Modal transparent onRequestClose={handleCloseModal}>
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.overlay}>
              <PlayerModal
                onClose={handleCloseModal}
                initialName={editingPlayer?.name ?? ''}
                onSubmit={handleModalSubmit}
                mode={editingPlayer ? 'edit' : 'create'}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedPlayerContainer: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerScreen;
