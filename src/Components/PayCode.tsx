import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../Core/Colors';
import { FONTS } from '../Core/Fonts';
import Header from '../Core/Header';

interface PayCodeProps {}

const PayCode = (props: PayCodeProps) => {
  const {} = props;

  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Header
        onClose={() =>
          Alert.alert(
            'Cancel Payment',
            'Are you sure you want to cancel the payment?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => navigation.goBack() },
            ],
          )
        }
        title=""
      />
      <View style={styles.container}>
        <Text style={styles.label}>Order Total</Text>
        <Text style={styles.balance}>{'$50.00'}</Text>
        <QRCode
          value="http://awesome.link.qr"
          size={270}
          enableLinearGradient
          linearGradient={COLORS.vinylGradient}
        />
        <View style={styles.msgContainer}>
          <Text style={styles.msg}>{'Scan to pay'}</Text>
        </View>
      </View>
    </View>
  );
};

export default PayCode;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.skyGrey,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 64,
  },
  label: {
    fontFamily: FONTS.avenirLight,
    fontSize: 12,
  },
  balance: {
    fontFamily: FONTS.avenirBlack,
    fontSize: 42,
    marginBottom: 48,
    color: COLORS.vinylBlack,
  },
  msgContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  msg: {
    marginTop: 96,
    fontSize: 30,
    fontFamily: FONTS.avenirBlack,
    color: COLORS.vinylBlack,
  },
});
