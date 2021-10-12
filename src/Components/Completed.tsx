import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { Maybe } from 'monet';
import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RootStackParamList } from '../../App';
import Icon from '../Assets/Icon';
import { COLORS } from '../Core/Colors';
import { FONTS } from '../Core/Fonts';
import Header from '../Core/Header';
import { Dinero } from '../Modules/Dinero';

enum PaymentStatus {
  CANCELED = 0,
  PENDING = 1,
  AUTHORIZED = 2,
  PRE_AUTHORIZED = 3,
}

export interface Payment {
  id: string;
  amount: number;
  userId: string;
  merchantId: string;
  status: PaymentStatus;
}

interface CompletedProps {
  route: RouteProp<RootStackParamList, 'Completed'>;
}

const Completed = (props: CompletedProps) => {
  const payment = props.route.params.payment;

  const [pendingPayment, setPayment] = React.useState(
    Maybe.Nothing() as Maybe<Payment>,
  );

  const [customer] = React.useState('');
  const navigation = useNavigation() as NavigationProp<any>;

  const isPaid = payment.status === PaymentStatus.AUTHORIZED;

  React.useEffect(() => {
    setPayment(Maybe.Just(payment));
  }, [payment]);

  const formatedAmount = Dinero({
    amount: pendingPayment.map(p => p.amount).getOrElse(0),
  }).toFormat('$0,0.00');

  const completedContent = (
    <>
      <Icon type="Completed" style={{ width: 127, height: 127 }} />
      <Text style={styles.title}>Payment Completed</Text>
      <Text style={styles.text}>{`${
        customer || 'Desmond Pearson'
      } has has completed the payment`}</Text>
    </>
  );

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
        {isPaid ? (
          completedContent
        ) : (
          <>
            <ActivityIndicator color={COLORS.vinylBlue} size="large" />
            <Text style={styles.title}>Payment Processing</Text>
            <Text
              style={
                styles.text
              }>{`Waiting to the customer to complete the ${formatedAmount} payment.`}</Text>
          </>
        )}
      </View>
    </>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.skyGrey,
    paddingBottom: 100,
  },
  text: {
    marginTop: 12,
    marginHorizontal: 50,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.avenirLight,
  },
  title: {
    marginTop: 48,
    fontSize: 24,
    fontFamily: FONTS.avenirBlack,
  },
});
