import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {TabRoute} from './TabRoute';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';


const Stack = createNativeStackNavigator();

export const AuthenticationRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabRoute" component={TabRoute} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
