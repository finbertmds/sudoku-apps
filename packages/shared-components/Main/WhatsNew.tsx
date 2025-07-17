// Main/WhatsNew.tsx

import {Feather} from '@sudoku/shared-icons';
import {useTheme} from '@sudoku/shared-themes';
import {
  LanguageCode,
  WhatsNewChange,
  WhatsNewEntry,
} from '@sudoku/shared-types';
import {getTranslated} from '@sudoku/shared-utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
  entries: WhatsNewEntry[];
  onClose: () => void;
  onGotIt: () => void;
};

const WhatsNewComponent = ({visible, onClose, entries, onGotIt}: Props) => {
  const {t, i18n} = useTranslation();
  const {theme, mode} = useTheme();

  const renderChange = (change: WhatsNewChange, idx: number) => (
    <View key={idx} style={styles.changeContainer}>
      <Feather
        name="check-circle"
        size={20}
        color={theme.cardIcon}
        style={{marginRight: 10, marginTop: 2}}
      />
      <View style={{flex: 1}}>
        <Text style={[styles.changeTitle, {color: theme.cardText}]}>
          {getTranslated(change.title, i18n.language as LanguageCode, 'en')}
        </Text>
        <Text style={[styles.changeDescription, {color: theme.cardSubtitle}]}>
          {getTranslated(
            change.description,
            i18n.language as LanguageCode,
            'en',
          )}
        </Text>
      </View>
    </View>
  );

  const renderEntry = ({item}: {item: WhatsNewEntry}) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          shadowColor: mode === 'dark' ? '#000' : '#ccc',
        },
      ]}>
      <Text style={[styles.versionText, {color: theme.cardText}]}>
        {item.version}
      </Text>
      {item.changes.map(renderChange)}
    </View>
  );

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} backdropOpacity={0.4}>
      <View
        style={[styles.modalContent, {backgroundColor: theme.cardBackground}]}>
        <Text style={[styles.headerText, {color: theme.cardText}]}>
          {t('whatsNew.title')}
        </Text>

        <FlatList
          data={entries}
          keyExtractor={(item) => item.version}
          renderItem={renderEntry}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 8}}
        />

        <Pressable
          onPress={onGotIt}
          style={[styles.okButton, {backgroundColor: theme.cardIcon}]}>
          <Text style={[styles.okText, {color: theme.cardText}]}>
            {t('common.ok')}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 16,
    borderRadius: 24,
    maxHeight: '90%',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 4,
    marginBottom: 4,
  },
  changeTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  changeDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  okButton: {
    marginTop: 4,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  okText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export const WhatsNew = React.memo(WhatsNewComponent);
