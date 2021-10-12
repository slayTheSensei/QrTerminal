import firestore from '@react-native-firebase/firestore';

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

  return result;
};
