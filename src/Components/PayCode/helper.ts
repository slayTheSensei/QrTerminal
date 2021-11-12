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
  merchantWalletId: string;
  authorizationCode: string;
  createdAt: string;
}
export interface FirestorePayment {
  id: string;
  amount: number;
  userId: string;
  merchantId: string;
  status: PaymentStatus;
  merchantWalletId: string;
  authorizationCode: string;
  createdAt: string;
}

export const buildFirestorePayent = (
  amount: number,
  merchantId: string,
  walletId: string,
  userId: string = '',
  status: PaymentStatus = PaymentStatus.UNCONFIRMED,
): FirestorePayment => {
  const payment: FirestorePayment = {
    id: uuid.v4() as string,
    amount,
    userId,
    merchantId,
    status,
    merchantWalletId: walletId,
    authorizationCode: '',
    createdAt: '',
  };
  return payment;
};

export const buildPayent = (
  amount: number,
  merchantId: string,
  merchantWalletId: string,
  userId: Maybe<string> = Maybe.Nothing(),
  status: PaymentStatus = PaymentStatus.UNCONFIRMED,
): Payment => {
  const payment: Payment = {
    id: uuid.v4() as string,
    amount,
    userId,
    merchantId,
    status,
    merchantWalletId,
    authorizationCode: '',
    createdAt: '',
  };
  return payment;
};

export function onResult(
  documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  onChanges: (payment: Payment) => void,
) {
  if (!documentSnapshot.exists) {
    // TODO Navigate back home
    return;
  }
  const data = documentSnapshot.data() as any;

  if (data.status === PaymentStatus.UNCONFIRMED) {
    return;
  }

  const newPayment: Payment = buildPayent(
    data.amount,
    data.merchantId,
    data.merchantWalletId,
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

export const deletePayment = async (paymentId: string) => {
  console.log('DeletingPayment', paymentId);
  await firestore()
    .collection('payments')
    .doc(paymentId)
    .delete()
    .then(() => {
      console.log('Payment deleted!');
    });
};
