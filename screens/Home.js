import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Entypo'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {Projects} from './Projects'
import {Checklists} from './Checklists'
import {Flightlogs} from './Flightlogs'

export const Home = ({route, navigation}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')

  //useEffect( () => {
/*     setSignedIn(route.params.signedIn)
    setName(route.params.name)
    setLastName(route.params.lastName)
    setPhotoUrl(route.params.photoUrl) */
 // }, [])
  const Tab = createMaterialTopTabNavigator()

  return (

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
        <View  style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity onPress={{}} >
            <Icon name={'cog'} size={28} color={'white'} style={{marginRight:10, marginLeft:10}}/>
          </TouchableOpacity> 
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: { fontSize: 12, color: 'white' },
          style: { backgroundColor: 'rgba(21,42,113,1)'},
          indicatorStyle :{ backgroundColor:'white' }
        }}
      >
        <Tab.Screen
          name="Projects"
          component={Projects}
          tabBarOptions={{
            indicatorStyle: { backgroundColor:'white'}
          }}
        />
        <Tab.Screen name="Checklists" component={Checklists} />
        <Tab.Screen name="Flightlogs" component={Flightlogs} />
      </Tab.Navigator>
    </View>
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
}); 