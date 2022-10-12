import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../screens/Auth';
import Home from '../screens/Home';
import EmailAuth from '../screens/EmailAuth';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EmailAuth" component={EmailAuth} />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
