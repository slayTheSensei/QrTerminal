import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from './Core/Colors';
import Digits from './Digits';

interface HomeProps {}

const Home = (props: HomeProps) => {
  const {} = props;

  return (
    <View style={styles.container}>
      <Digits onPress={() => {}} disableButton />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.skyGrey,
  },
});
