/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './src/Assets/Icon';
import { COLORS } from './src/Core/Colors';
import Home from './src/Components/home';
import PayCode from './src/Components/PayCode';
import { Dinero } from './src/Modules/Dinero';
import Completed, { Payment } from './src/Components/Completed';

const Header = () => {
  return (
    <View style={styles.header}>
      <Icon type="DarkLogo" style={{ height: 40, width: 30 }} />
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={ScreenOptions} />
        <Stack.Screen
          name="Completed"
          component={Completed}
          options={ScreenOptionsNoHeader}
        />
        <Stack.Screen
          name="PayCode"
          component={PayCode}
          options={ScreenOptionsNoHeader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    height: 125,
    backgroundColor: COLORS.skyGrey,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
});

const ScreenOptions = {
  headerStyle: styles.header,
  header: Header,
};
const ScreenOptionsNoHeader = {
  headerStyle: styles.header,
  headerShown: false,
};

export type RootStackParamList = {
  PayCode: { amount: Dinero.Dinero };
  Home: undefined;
  Completed: { payment: Payment };
};

export default App;
