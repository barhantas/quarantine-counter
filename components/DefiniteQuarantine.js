import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import CountDown from 'react-native-countdown-component';
import Button from 'react-native-button';
import { QuarantineProgress } from './QuarantineProgress';
import Text from './Text';
import Colors from '../constants/Colors';
import AppStyle from '../AppStyle';

export default function DefiniteQuarantine({
  quarantineCounter,
  quarantineDurationInDays,
  onPressFinishQuarantine,
}) {
  return (
    <View>
      <Text id={'labelQuarantineEndsIn'} style={AppStyle.header} />

      <CountDown
        until={quarantineCounter}
        size={20}
        digitStyle={styles.digitStyle}
        digitTxtStyle={styles.digitTxtStyle}
        timeLabels={{
          d: i18n.t('labelDay'),
          h: i18n.t('labelHour'),
          m: i18n.t('labelMinute'),
          s: i18n.t('labelSecond'),
        }}
      />
      <QuarantineProgress
        quarantineDurationInDays={quarantineDurationInDays}
        quarantineCounter={quarantineCounter}
      />

      <View style={styles.buttonContainer}>
        <Button style={AppStyle.defaultButton} onPress={onPressFinishQuarantine}>
          {i18n.t('labelFinishMyQuarantine')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  digitStyle: {
    backgroundColor: Colors.green500,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  digitTxtStyle: {
    color: 'white',
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
  },
});
