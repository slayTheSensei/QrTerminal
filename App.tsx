/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './src/Assets/Icon';
import { COLORS } from './src/Core/Colors';
import Home from './src/home';

const Header = () => {
  return (
    <View style={styles.header}>
      <Icon type="DarkLogo" style={{ height: 40, width: 30 }} />
    </View>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={ScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    height: 150,
    backgroundColor: COLORS.skyGrey,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
});

const ScreenOptions = {
  headerStyle: styles.header,
  header: Header,
};

export default App;
