import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import {Main} from './screens/Main'
import {Register} from './screens/Register'
import {Lateral} from './screens/Lateral'

const Stack = createStackNavigator()

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name='Main'
        component={Main}
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name='Lateral'
        component={Lateral}
        options={ { headerShown: false } } 
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}