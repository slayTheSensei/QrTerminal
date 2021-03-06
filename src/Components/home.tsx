import { NavigationProp, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getAllUsers } from '../Firebase/firebase';
import { COLORS } from './../Core/Colors';
import Digits from './Digits';

interface HomeProps {}

const Home = (props: HomeProps) => {
  const {} = props;

  React.useEffect(() => {
    getAllUsers().then(u => {
      console.log('Users', u);
    });
  });

  const navigation = useNavigation() as NavigationProp<any>;

  return (
    <View style={styles.container}>
      <Digits
        onPress={amount => navigation.navigate('PayCode', { amount })}
        disableButton={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.skyGrey,
  },
});
