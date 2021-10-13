import { Maybe } from 'monet';
import uuid from 'react-native-uuid';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export enum PaymentStatus {
  CANCELED = 0,
  PENDING = 1,
  AUTHORIZED = 2,
  PRE_AUTHORIZED = 3,
  UNCONFIRMED = 4,
}

export interface Payment {
  id: string;
  amount: number;
  userId: Maybe<string>;
  merchantId: string;
  status: PaymentStatus;
}
export interface FirestorePayment {
  id: string;
  amount: number;
  userId: string;
  merchantId: string;
  status: PaymentStatus;
}

export const buildFirestorePayent = (
  amount: number,
  merchantId: string,
  userId: string = '',
  status: PaymentStatus = PaymentStatus.UNCONFIRMED,
): FirestorePayment => {
  const payment: FirestorePayment = {
    id: uuid.v4() as string,
    amount,
    userId,
    merchantId,
    status,
  };
  return payment;
};

export const buildPayent = (
  amount: number,
  merchantId: string,
  userId: Maybe<string> = Maybe.Nothing(),
  status: PaymentStatus = PaymentStatus.UNCONFIRMED,
): Payment => {
  const payment: Payment = {
    id: uuid.v4() as string,
    amount,
    userId,
    merchantId,
    status,
  };
  return payment;
};

export function onResult(
  documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  onChanges: (payment: Payment) => void,
) {
  if (!documentSnapshot.exists) {
    return;
  }
  const data = documentSnapshot.data() as any;

  console.log('onResult', data);

  if (data.status === PaymentStatus.UNCONFIRMED) {
    return;
  }

  const newPayment: Payment = buildPayent(
    data.amount,
    data.merchantId,
    Maybe.Just(data.userId),
    data.status,
  );

  console.log('Changed payment result:', newPayment);
  onChanges(newPayment);
}

export function onError(error: Error) {
  console.error(error);
}

export function setPaymentListener(
  payment: FirestorePayment,
  onChanges: (payment: Payment) => void,
) {
  firestore()
    .collection('payments')
    .doc(payment.id)
    .onSnapshot(
      documentSnapshot => onResult(documentSnapshot, onChanges),
      onError,
    );
}
export const addPayment = async (payment: FirestorePayment) => {
  return await firestore()
    .collection('payments')
    .doc(payment.id)
    .set({ ...payment });
};
