/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './src/Assets/Icon';
import { COLORS } from './src/Core/Colors';
import Home from './src/Components/home';
import PayCode from './src/Components/PayCode';
import { Payment } from './src/Components/PayCode/helper';
import firestore from '@react-native-firebase/firestore';
import { Maybe } from 'monet';

const Header = () => {
  return (
    <View style={styles.header}>
      <Icon type="DarkLogo" style={{ height: 40, width: 30 }} />
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Merchant {
  id: string;
  email: string;
  name: string;
  walletId: string;
}

export const MerchantContext = createContext(
  Maybe.Nothing() as Maybe<Merchant>,
);

const App = () => {
  const [merchant, setMerchant] = useState(Maybe.Nothing() as Maybe<Merchant>);
  useEffect(() => {
    firestore()
      .collection('merchants')
      .doc('rDDJa9JfEk0NjlW1kmDc') // TODO: Get this from the logged in user
      .get()
      .then(documentSnapshot => {
        console.log('merchant exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data() as any;

          const firestoreMerchant = {
            id: data.id,
            name: data.name,
            email: data.email,
            walletId: data.walletId,
          } as Merchant;

          console.log('Merchant data: ', firestoreMerchant);
          setMerchant(Maybe.Just(firestoreMerchant));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MerchantContext.Provider value={merchant}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={ScreenOptions} />
          {/* <Stack.Screen
          name="Completed"
          component={Completed}
          options={ScreenOptionsNoHeader}
        /> */}
          <Stack.Screen
            name="PayCode"
            component={PayCode}
            options={ScreenOptionsNoHeader}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MerchantContext.Provider>
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
  PayCode: { amount: Dinero.Dinero; payment: Payment };
  Home: undefined;
};

export default App;
