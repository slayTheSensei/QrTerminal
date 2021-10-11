import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { RootStackParamList } from '../../App';
import { COLORS } from '../Core/Colors';
import { FONTS } from '../Core/Fonts';
import Header from '../Core/Header';

const MOCK_PAYMENT = {
  id: '1',
  amount: 7500,
  userId: 'a',
  merchantId: 'b',
  status: 1,
};

interface PayCodeProps {
  route: RouteProp<RootStackParamList, 'PayCode'>;
}

const PayCode = (props: PayCodeProps) => {
  const amount = props.route.params.amount;
  const [value, setValue] = React.useState('');
  const navigation = useNavigation() as NavigationProp<any>;

  const codeValue = `https://demo.vinylpay.com/?amount=${value}&venue=Demo-Greens`;

  React.useEffect(() => {
    const formatedAmount = amount.toFormat('$0,0.00');

    setValue(formatedAmount);
  }, [amount]);

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

      <Text style={styles.label}>Order Total</Text>
      <Text style={styles.balance}>{value}</Text>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Completed', { payment: MOCK_PAYMENT })
          }>
          <QRCode
            value={codeValue}
            size={250}
            backgroundColor="transparent"
            enableLinearGradient
            linearGradient={COLORS.vinylGradient}
          />
        </TouchableOpacity>
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
    marginTop: 96,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontFamily: FONTS.avenirLight,
    fontSize: 12,
    marginTop: 48,
  },
  balance: {
    fontFamily: FONTS.avenirBlack,
    fontSize: 42,
    color: COLORS.vinylBlack,
  },
  msgContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  msg: {
    marginTop: 24,
    fontSize: 24,
    fontFamily: FONTS.avenirBlack,
    color: COLORS.vinylBlack,
  },
});
