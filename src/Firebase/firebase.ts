import firestore from '@react-native-firebase/firestore';
import { User } from '../Modules/Firebase';

export const getAllUsers = async () => {
  let result = [] as any;
  await firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        result.push(documentSnapshot.data());
      });
    });
};

export const getUser = async (userId?: string) => {
  if (userId) {
    const user = (await (
      await firestore().collection('users').doc(userId).get()
    ).data()) as User;

    console.log('Customer', user);
    return user;
  }
  console.log('No userId found');
  return null;
};
