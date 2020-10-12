import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Home} from './screens/Home'
import {Registro} from './screens/Registro'
import {Main} from './screens/Main'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name='Home'
        component={Home}
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name='Registro'
        component={Registro}
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name='Main'
        component={Main}
        options={ { headerShown: false } } 
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}