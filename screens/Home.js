import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Entypo'
import React, { useState, useEffect } from 'react'
import {FlightPermits} from './FlightPermits'
import { StatusBar } from 'expo-status-bar'
import {Flightlogs} from './Flightlogs'
import {Checklists} from './Checklists'
import {Projects} from './Projects'

export const Home = ({route, navigation}) => {
  const [projects, setProjects] = useState([])
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')

  const Tab = createMaterialTopTabNavigator()

  async function logout() {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('pilotId')
      navigation.navigate('Main')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <MenuProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.containerHeader}>
          <View style={{flex: 2, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} >
              <Icon name={'menu'} size={28} color={'white'} style={{marginRight:10, marginLeft:10}}/>
            </TouchableOpacity> 
          </View>
          <View  style={{flex: 11,  alignItems: 'center'}}>
            <Text style={styles.textHeader}>DRONE TOOLS</Text>
          </View>
          <Menu>
            <MenuTrigger style={styles.trigger}>
              <Icon name={'cog'} size={28} color={'white'} style={{marginRight:10, marginLeft:10}}/>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle = {{padding:8,height:96,width:120}}>
              <MenuOption 
                customStyles={{optionWrapper: { height:48,width:120}, optionText: {color: 'black'}}}
                onSelect={() => alert(`Configuración`)} text='Configuración'
              />
              <MenuOption
                customStyles={{optionWrapper: { height:48,width:120}, optionText: {color: 'black'}}}
                onSelect={() => {logout()}} text='Cerrar Sesión'
              />
            </MenuOptions>
          </Menu>
        </View>
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: '#e91e63',
            labelStyle: { fontSize: 11, color: 'white' },
            tabStyle: { width: 120 },
            style: { backgroundColor: 'rgba(21,42,113,1)'},
            indicatorStyle :{ backgroundColor:'white' },
            scrollEnabled: true
          }}
        >
          <Tab.Screen
            name="Proyectos"
            component={Projects}
            tabBarOptions={{
              indicatorStyle: { backgroundColor:'white'}
            }}
          />
          <Tab.Screen name="Bitacoras" component={Flightlogs} />
          <Tab.Screen name="Permisos" component={FlightPermits} />
          <Tab.Screen name="Listas de Chequeo" component={Checklists} />
        </Tab.Navigator>
      </View>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(21,42,113,1)',
    flexDirection: 'column'
  },
  containerHeader: {
    height: 40,
    backgroundColor: 'rgba(21,42,113,1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    flexDirection: 'row'
  },
  textHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  trigger: {
    padding: 5,
    margin: 5,
  }
}); 