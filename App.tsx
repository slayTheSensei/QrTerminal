import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text>QR Terminal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
