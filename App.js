import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Home} from './screens/Home';
import {Registro} from './screens/Registro';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        component={Home}
        options={{ title: 'Drone Management' }}/>
      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{ title: 'Registro' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}