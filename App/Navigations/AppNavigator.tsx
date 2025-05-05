import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import Products from '../Containers/Products';
import Cart from '../Containers/Products/cart';
import Details from '../Containers/Products/details';
import Favorites from '../Containers/Products/favorites';
import Search from '../Containers/Products/search';
import SplashScreen from '../Containers/SplashScreen';

type RootStackParamList = {
  SplashScreen: undefined;
  Products: undefined;
  Details: undefined;
  Cart: undefined;
  Search: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#174CA1'},
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
