/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
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
  deletePayment,
  Payment,
  PaymentStatus,
  setPaymentListener,
} from './helper';
import Button from '../../Core/Button';
import { toDinero } from '../../Modules/Dinero';
import { getUser } from '../../Firebase/firebase';
import { User } from '../../Modules/Firebase';
import { capitalizeFirstLetter } from '../../Modules/StringHelpers';
import { isTablet } from 'react-native-device-info';

const { Just, Nothing } = Maybe;

interface PayCodeProps {
  route: RouteProp<RootStackParamList, 'PayCode'>;
}

const PayCode = (props: PayCodeProps) => {
  const { amount } = props.route.params;
  const QR_SIZE = isTablet() ? 400 : 250;

  // STATE
  const [value, setValue] = React.useState<Dinero.Dinero>();
  const navigation = useNavigation() as NavigationProp<any>;
  const [customer, setCustomer] = React.useState<User>();
  const [paymentId, setPaymentId] = React.useState('');
  const [pendingPayment, setPayment] = React.useState(
    Nothing() as Maybe<Payment>,
  );
  const merchant = React.useContext(MerchantContext).orNull();

  // LIFECYCLE
  React.useEffect(() => {
    const fetchPayment = async () => {
      setValue(amount);

      if (merchant) {
        const payment = await buildFirestorePayent(
          amount.toUnit(),
          merchant.id,
          merchant.walletId,
        );

        setPaymentId(payment.id);

        await addPayment(payment).then(async () => {
          return await setPaymentListener(payment, async p => {
            setPayment(Just(p));

            console.log('Payment', p);

            const userId = p.userId.getOrElse('');

            const user = await getUser(userId);

            if (user) {
              setCustomer(user);
            }
          });
        });
      }
    };

    fetchPayment();
  }, []);

  // LOGIC
  const pay = pendingPayment.orUndefined();

  const isPaid = pay?.status === PaymentStatus.AUTHORIZED;
  const isConfirmed = pay?.status === PaymentStatus.PENDING;

  const formatedValue = value?.toFormat('0.00');

  const codeValue = `https://app.vinylpay.com/?amount=${formatedValue}&venue=${merchant?.name}&id=${paymentId}`;

  const formatedAmount = pendingPayment
    .map(payment => {
      return toDinero(payment.amount) || Dinero({ amount: 0 });
    })
    .getOrElse(Dinero({ amount: 0 }))
    .toFormat('$0,0.00');

  // SCREENS
  const ScanScreen = () => {
    return (
      <View style={[styles.root]}>
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
                {
                  text: 'OK',
                  onPress: async () => {
                    await deletePayment(paymentId);
                    navigation.navigate('Home');
                  },
                },
              ],
            )
          }
          title=""
        />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.label}>Order Total</Text>
          <Text style={styles.balance}>{value?.toFormat('$0,0.00')}</Text>

          <View style={styles.container}>
            <QRCode
              value={codeValue}
              size={QR_SIZE}
              backgroundColor="transparent"
              enableLinearGradient
              linearGradient={COLORS.vinylGradient}
            />
            <View style={styles.msgContainer}>
              <Text style={styles.msg}>{'Scan the code'}</Text>
            </View>
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
                {
                  text: 'OK',
                  onPress: async () => {
                    await deletePayment(paymentId);
                    navigation.navigate('Home');
                  },
                },
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
            <Text style={styles.text}>{`${capitalizeFirstLetter(
              customer?.firstName || 'The customer',
            )} has completed the payment`}</Text>
          </>
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 48,
            backgroundColor: COLORS.skyGrey,
          }}>
          <Button
            style={{ maxWidth: 500 }}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginTop: 48,
    fontSize: 24,
    fontFamily: FONTS.avenirBlack,
  },
  msg: {
    marginTop: 100,
    fontSize: 36,
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
