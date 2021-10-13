/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Maybe } from 'monet';
import QRCode from 'react-native-qrcode-svg';
import { MerchantContext, RootStackParamList } from '../../../App';
import Icon from '../../Assets/Icon';
import { COLORS } from '../../Core/Colors';
import { FONTS } from '../../Core/Fonts';
import Header from '../../Core/Header';
import Dinero from 'dinero.js';
import {
  addPayment,
  buildFirestorePayent,
  Payment,
  PaymentStatus,
  setPaymentListener,
} from './helper';
import Button from '../../Core/Button';

const { Just, Nothing } = Maybe;

const MOCK_PAYMENT = {
  id: '1',
  amount: 7500,
  userId: 'a',
  merchantId: 'b',
  status: 2,
};

interface PayCodeProps {
  route: RouteProp<RootStackParamList, 'PayCode'>;
}

const PayCode = (props: PayCodeProps) => {
  const { amount } = props.route.params;

  // STATE
  const [value, setValue] = React.useState('');
  const navigation = useNavigation() as NavigationProp<any>;
  const [customer] = React.useState('');
  const [pendingPayment, setPayment] = React.useState(
    Nothing() as Maybe<Payment>,
  );
  const merchant = React.useContext(MerchantContext).orNull();

  // LIFECYCLE
  React.useEffect(() => {
    const fetchPayment = async () => {
      const formatedValue = amount.toFormat('$0,0.00');
      setValue(formatedValue);

      if (merchant) {
        const payment = await buildFirestorePayent(
          amount.toUnit(),
          merchant.id,
        );

        await addPayment(payment).then(async () => {
          return await setPaymentListener(payment, p => setPayment(Just(p)));
        });
      }
    };

    fetchPayment();
  }, []);

  // LOGIC
  const pay = pendingPayment.orUndefined();

  const isPaid = pay?.status === PaymentStatus.AUTHORIZED;
  const isConfirmed = pay?.status === PaymentStatus.PENDING;

  const codeValue = `https://demo.vinylpay.com/?amount=${value}&venue=Demo-Greens`;

  const formatedAmount = Dinero({
    amount: pendingPayment.map(p => p.amount).getOrElse(0),
  }).toFormat('$0,0.00');

  // SCREENS
  const ScanScreen = () => {
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

        <View style={[styles.container, { paddingTop: 64 }]}>
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

  const PendingScreen = () => {
    return (
      <>
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
                { text: 'OK', onPress: () => navigation.navigate('Home') },
              ],
            )
          }
          title=""
        />
        <View style={styles.container}>
          <>
            <ActivityIndicator color={COLORS.vinylBlue} size="large" />
            <Text style={styles.title}>Payment Processing</Text>
            <Text
              style={
                styles.text
              }>{`Waiting to the customer to complete the ${formatedAmount} payment.`}</Text>
          </>
        </View>
      </>
    );
  };

  const CompletedScreen = () => {
    return (
      <>
        <Header title="" />
        <View style={[styles.container, { paddingBottom: 24 }]}>
          <>
            <Icon type="Completed" style={{ width: 127, height: 127 }} />
            <Text style={styles.title}>Payment Completed</Text>
            <Text style={styles.text}>{`${
              customer || 'Desmond Pearson'
            } has has completed the payment`}</Text>
          </>
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 48 }}>
          <Button
            onPress={() => {
              navigation.navigate('Home');
            }}
            type="Primary"
            label="To Home Screen"
          />
        </View>
      </>
    );
  };

  // RENDER

  if (isPaid) {
    return <CompletedScreen />;
  }

  if (isConfirmed) {
    return <PendingScreen />;
  }

  return <ScanScreen />;
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
    backgroundColor: COLORS.skyGrey,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
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
  title: {
    marginTop: 48,
    fontSize: 24,
    fontFamily: FONTS.avenirBlack,
  },
  msg: {
    marginTop: 24,
    fontSize: 24,
    fontFamily: FONTS.avenirBlack,
    color: COLORS.vinylBlack,
  },
  text: {
    marginTop: 12,
    marginHorizontal: 50,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.avenirLight,
  },
});
