import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PayCodeProps {}

const PayCode = (props: PayCodeProps) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <Text>PayCode</Text>
    </View>
  );
};

export default PayCode;

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});
