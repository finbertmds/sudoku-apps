// Main/WhatsNew.tsx

import {useTheme} from '@sudoku/shared-themes';
import {AppId} from '@sudoku/shared-types';
import {getWhatsNewLatest} from '@sudoku/shared-utils/whatsNew/whatsNewUtil';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type WhatsNewProps = {
  appId: AppId;
  version: string;
  onGotIt: () => void;
  onClose: () => void;
};

const WhatsNewComponent = ({
  appId,
  version,
  onGotIt,
  onClose,
}: WhatsNewProps) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const latest = getWhatsNewLatest(appId, version);

  return (
    <>
      <Modal transparent onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.modalContainer,
                {backgroundColor: theme.background},
              ]}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: theme.text}}>
                {latest.title}
              </Text>
              {latest.changes.map((line, idx) => (
                <Text key={idx} style={{color: theme.text}}>
                  • {line}
                </Text>
              ))}
              <TouchableOpacity
                accessibilityLabel="WhatsNewGotIt"
                testID="WhatsNewGotIt"
                onPress={() => {
                  onClose();
                  onGotIt();
                }}>
                <Text style={{color: theme.text}}>{t('gotIt')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 30,
  },
});

export const WhatsNew = React.memo(WhatsNewComponent);
